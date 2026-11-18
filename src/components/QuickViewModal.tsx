import { useEffect, useState } from 'react';
import { MessageCircle, Minus, Plus, X } from 'lucide-react';
import { BRAND_CONFIG, type Product } from '../data/storeConfig';
import { buildWhatsAppOrderUrl, formatPrice } from '../utils/shopLogic';
import { FloatingBagVisual } from './FloatingBagVisual';

interface QuickViewModalProps {
  product: Product | null;
  initialColorIndex: number;
  onClose: () => void;
}

export function QuickViewModal({
  product,
  initialColorIndex,
  onClose,
}: QuickViewModalProps) {
  const [selectedColorIdx, setSelectedColorIdx] = useState(initialColorIndex);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setSelectedColorIdx(initialColorIndex);
    setQty(1);
  }, [product, initialColorIndex]);

  useEffect(() => {
    if (!product) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const activeColor = product.colors[selectedColorIdx] ?? product.colors[0];
  const whatsappUrl = buildWhatsAppOrderUrl(BRAND_CONFIG.whatsappDigits, {
    name: product.name,
    color: activeColor.name,
    qty,
    price: product.price,
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        aria-label="Close Quick View backdrop"
      />

      {/* Modal Panel (bottom sheet on mobile, centered card on desktop) */}
      <div className="modal-rise relative z-10 w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-t-2xl sm:rounded-2xl border border-[var(--border-gold)] shadow-2xl p-5 sm:p-8 pb-safe">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Quick View"
          className="absolute top-4 right-4 z-20 w-11 h-11 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-page)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--gold)] transition-colors"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Floating Photo inside Quick View */}
          <div className="rounded-2xl bg-[var(--bg-card)] p-4">
            <FloatingBagVisual
              colors={product.colors}
              activeColorIndex={selectedColorIdx}
              productName={product.name}
              floatIndex={0}
              aspectClass="aspect-square"
              enableSheen={false}
              priority
            />
          </div>

          {/* Product Details & Controls */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
              <span>{product.category}</span>
              <span aria-hidden="true">•</span>
              <span className="text-[var(--gold-dark)] dark:text-[var(--gold-light)] font-medium">
                {product.badge}
              </span>
            </div>

            <h2
              id="quick-view-title"
              className="mt-2 font-serif-display text-2xl sm:text-3xl font-normal text-[var(--text-primary)] pr-8"
            >
              {product.name}
            </h2>

            <p className="mt-2 text-xl font-medium tabular-nums text-[var(--text-gold)]">
              {formatPrice(product.price)}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
              {product.description}
            </p>

            {/* Color Picker */}
            <div className="mt-5">
              <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                Color: <span className="text-[var(--text-primary)] font-medium">{activeColor.name}</span>
              </p>
              <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Choose bag color">
                {product.colors.map((color, idx) => {
                  const selected = idx === selectedColorIdx;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColorIdx(idx)}
                      aria-label={`Color ${color.name}`}
                      aria-pressed={selected}
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full"
                    >
                      <span
                        className={`block w-7 h-7 rounded-full border transition-transform ${
                          selected
                            ? 'scale-110 ring-2 ring-[var(--gold)] ring-offset-2 ring-offset-[var(--bg-surface)] border-black/30'
                            : 'border-black/25 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                Quantity
              </span>
              <div className="inline-flex items-center rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-page)]">
                <button
                  type="button"
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                  aria-label="Decrease quantity"
                  className="w-11 h-11 flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--gold-dark)]"
                >
                  <Minus className="w-4 h-4" aria-hidden="true" />
                </button>
                <span
                  className="w-10 text-center text-sm font-medium tabular-nums"
                  aria-live="polite"
                >
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((prev) => Math.min(10, prev + 1))}
                  aria-label="Increase quantity"
                  className="w-11 h-11 flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--gold-dark)]"
                >
                  <Plus className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* COD Note */}
            <p className="mt-4 text-xs text-[var(--text-secondary)] border-t border-[var(--border-hairline)] pt-3">
              {BRAND_CONFIG.codNote}
            </p>

            {/* Order on WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-4 min-h-[48px] w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm sm:text-base"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
