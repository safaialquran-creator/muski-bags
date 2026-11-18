import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getFloatStyle } from '../hooks/useAntiGravity';
import type { ProductColor } from '../data/storeConfig';

interface FloatingBagVisualProps {
  colors: ProductColor[];
  activeColorIndex: number;
  productName: string;
  floatIndex: number;
  aspectClass?: string;
  enableSheen?: boolean;
  priority?: boolean;
}

/**
 * Renders a feathered bag photograph levitating over a height-aware gold ground shadow.
 * Crossfades cleanly across selected color swatches without interrupting float motion.
 */
export function FloatingBagVisual({
  colors,
  activeColorIndex,
  productName,
  floatIndex,
  aspectClass = 'aspect-[4/3]',
  enableSheen = true,
  priority = false,
}: FloatingBagVisualProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const floatStyle = getFloatStyle(floatIndex);

  return (
    <div
      className={`relative w-full ${aspectClass} flex flex-col items-center justify-center select-none overflow-hidden`}
      style={floatStyle}
    >
      {/* Floating bag layer */}
      <div className="ag-float-item ag-inner-parallax relative w-[86%] h-[82%] flex items-center justify-center">
        {colors.map((color, idx) => {
          const isActive = idx === activeColorIndex;
          const hasFailed = failedImages[color.image];

          if (hasFailed) {
            return isActive ? (
              <div
                key={color.name}
                className="flex flex-col items-center justify-center gap-2 text-center p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)]"
              >
                <ShoppingBag className="w-8 h-8 text-[var(--gold-dark)]" aria-hidden="true" />
                <span className="text-xs text-[var(--text-secondary)]">
                  {productName} — {color.name}
                </span>
              </div>
            ) : null;
          }

          return (
            <img
              key={`${color.name}-${color.image}`}
              src={color.image}
              alt={`${productName} in ${color.name} by Muski Bags`}
              loading={priority ? 'eager' : 'lazy'}
              referrerPolicy="no-referrer"
              onError={() =>
                setFailedImages((prev) => ({
                  ...prev,
                  [color.image]: true,
                }))
              }
              className={`bag-feather-mask absolute inset-0 w-full h-full object-contain rounded-2xl transition-opacity duration-300 ease-out pointer-events-none ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden={!isActive}
            />
          );
        })}

        {enableSheen && (
          <div
            className="ag-hover-sheen absolute inset-0 rounded-2xl"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Height-aware gold-tinted ground shadow ellipse */}
      <div
        className="ag-ground-ellipse w-[62%] h-4 -mt-1 rounded-full pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
