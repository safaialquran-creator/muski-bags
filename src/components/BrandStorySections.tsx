import { useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Gem,
  Instagram,
  MapPin,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from 'lucide-react';
import { BRAND_CONFIG, CUSTOMER_REVIEWS, INSTAGRAM_TILES } from '../data/storeConfig';
import { getFloatStyle, useCardTilt } from '../hooks/useAntiGravity';

const WHY_ITEMS = [
  {
    title: 'Quality pe no compromise',
    description: 'Carefully checked stitching, hardware, and durable faux leather finish.',
    Icon: ShieldCheck,
  },
  {
    title: 'Affordable luxury',
    description: 'Boutique aesthetics crafted for everyday value without inflated markups.',
    Icon: Gem,
  },
  {
    title: 'Trendy designs',
    description: 'Curated crescent and textured hobo silhouettes in versatile shades.',
    Icon: Sparkles,
  },
  {
    title: 'COD nationwide',
    description: 'Pay in cash when your parcel arrives anywhere across Pakistan.',
    Icon: Truck,
  },
];

const ORDER_STEPS = [
  {
    step: '01',
    title: 'Choose your bag',
    description: 'Pick your style and favorite color in the shop or Quick View.',
    Icon: ShoppingBag,
  },
  {
    step: '02',
    title: 'Message us on WhatsApp',
    description: 'Tap Order on WhatsApp to send your bag details directly to us.',
    Icon: MessageCircle,
  },
  {
    step: '03',
    title: 'Receive at your door and pay cash',
    description: 'Parcel delivers nationwide to your address with Cash on Delivery.',
    Icon: MapPin,
  },
];

function FloatingTile({
  image,
  alt,
  label,
  index,
}: {
  image: string;
  alt: string;
  label: string;
  index: number;
}) {
  const { surfaceRef, onPointerMove, onPointerLeave } = useCardTilt(5);

  return (
    <a
      href={BRAND_CONFIG.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-ag-observe="true"
      aria-label={`${label} on Instagram ${BRAND_CONFIG.instagramHandle}`}
      className="block h-full"
    >
      <div
        ref={surfaceRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="ag-tilt-surface rounded-2xl border border-[var(--border-hairline)] hover:border-[var(--gold)] bg-[var(--bg-surface)] p-3 flex flex-col items-center hover:shadow-[0_18px_32px_-16px_var(--gold-shadow)]"
      >
        <div
          className="relative w-full aspect-square flex flex-col items-center justify-center overflow-hidden"
          style={getFloatStyle(index + 5)}
        >
          <div className="ag-float-item ag-inner-parallax relative w-[86%] h-[82%] flex items-center justify-center">
            <img
              src={image}
              alt={alt}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="bag-feather-mask w-full h-full object-contain rounded-2xl"
            />
            <div className="ag-hover-sheen absolute inset-0 rounded-xl" aria-hidden="true" />
          </div>
          <div className="ag-ground-ellipse w-[58%] h-2.5 -mt-1 rounded-full" aria-hidden="true" />
        </div>
        <span className="mt-2 text-xs text-[var(--text-secondary)] truncate w-full text-center">
          {label}
        </span>
      </div>
    </a>
  );
}

export function BrandStorySections() {
  const reviewsTrackRef = useRef<HTMLDivElement | null>(null);

  const scrollReviews = (direction: -1 | 1) => {
    const track = reviewsTrackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * 300, behavior: 'smooth' });
  };

  return (
    <>
      {/* 9. Why Muski Bags */}
      <section id="why-us" className="py-14 sm:py-20 bg-[var(--bg-page)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-serif-display text-[clamp(1.85rem,3.2vw,2.6rem)] font-normal">
              <span className="text-[var(--text-primary)]">Why</span>{' '}
              <span className="text-gold-gradient">Muski</span>{' '}
              <span className="text-[var(--text-primary)]">Bags</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)]">
              {BRAND_CONFIG.description}
            </p>
          </div>

          <div
            data-ag-observe="true"
            className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          >
            {WHY_ITEMS.map(({ title, description, Icon }, idx) => (
              <div
                key={title}
                style={getFloatStyle(idx + 2, 1.05)}
                className="flex flex-col"
              >
                <div className="ag-float-item h-full rounded-2xl border border-[var(--border-hairline)] hover:border-[var(--gold)] bg-[var(--bg-surface)] p-6 transition-colors">
                  <div className="w-11 h-11 rounded-xl border border-[var(--border-gold)] bg-[var(--bg-card)] flex items-center justify-center text-[var(--gold-dark)] dark:text-[var(--gold-light)]">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-serif-display text-xl font-medium text-[var(--text-primary)]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {description}
                  </p>
                </div>
                <div
                  className="ag-ground-ellipse w-[68%] h-3 mx-auto mt-1 rounded-full"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. How to Order */}
      <section className="py-14 sm:py-20 bg-[var(--bg-surface)] border-y border-[var(--border-hairline)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-serif-display text-[clamp(1.85rem,3.2vw,2.6rem)] font-normal">
              <span className="text-gold-gradient">How to</span>{' '}
              <span className="text-[var(--text-primary)]">Order</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)]">
              Three simple steps with Cash on Delivery nationwide.
            </p>
          </div>

          <div
            data-ag-observe="true"
            className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {ORDER_STEPS.map(({ step, title, description, Icon }, idx) => (
              <div key={step} style={getFloatStyle(idx + 6)} className="flex flex-col">
                <div className="ag-float-item h-full rounded-2xl border border-[var(--border-hairline)] hover:border-[var(--gold)] bg-[var(--bg-page)] p-6 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-serif-display text-2xl font-semibold text-gold-gradient tabular-nums">
                      {step}
                    </span>
                    <div className="w-10 h-10 rounded-xl border border-[var(--border-gold)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--gold-dark)] dark:text-[var(--gold-light)]">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="mt-4 font-serif-display text-xl font-medium text-[var(--text-primary)]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {description}
                  </p>
                </div>
                <div
                  className="ag-ground-ellipse w-[64%] h-3 mx-auto mt-1 rounded-full"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Customer Reviews (swipeable row of 4 placeholder reviews) */}
      <section id="reviews" className="py-14 sm:py-20 bg-[var(--bg-page)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-serif-display text-[clamp(1.85rem,3.2vw,2.6rem)] font-normal">
                <span className="text-gold-gradient">Customer</span>{' '}
                <span className="text-[var(--text-primary)]">Reviews</span>
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)]">
                Feedback from customers across Pakistan.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => scrollReviews(-1)}
                aria-label="Scroll reviews left"
                className="w-11 h-11 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--gold)] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollReviews(1)}
                aria-label="Scroll reviews right"
                className="w-11 h-11 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--gold)] transition-colors"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            ref={reviewsTrackRef}
            data-ag-observe="true"
            className="mt-8 flex lg:grid lg:grid-cols-4 gap-5 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4 lg:mx-0 lg:px-0"
          >
            {CUSTOMER_REVIEWS.map((review, idx) => (
              <article
                key={review.id}
                style={getFloatStyle(idx + 1, 1.08)}
                className="min-w-[270px] sm:min-w-[300px] lg:min-w-0 snap-start flex flex-col"
              >
                <div className="ag-float-item h-full rounded-2xl border border-[var(--border-hairline)] hover:border-[var(--gold)] bg-[var(--bg-surface)] p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-[var(--gold)]" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: review.rating }).map((_, sIdx) => (
                        <Star
                          key={sIdx}
                          className="w-4 h-4 fill-current"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-primary)]">
                      “{review.comment}”
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[var(--border-hairline)] text-xs text-[var(--text-secondary)]">
                    <span className="font-medium text-[var(--text-primary)]">{review.name}</span>
                    <span aria-hidden="true"> • </span>
                    <span>{review.city}</span>
                    <span aria-hidden="true"> • </span>
                    <span>{review.product}</span>
                  </div>
                </div>
                <div
                  className="ag-ground-ellipse w-[64%] h-2.5 mx-auto mt-1 rounded-full"
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Instagram Section */}
      <section className="py-14 sm:py-20 bg-[var(--bg-surface)] border-y border-[var(--border-hairline)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif-display text-[clamp(1.85rem,3.2vw,2.6rem)] font-normal">
                <span className="text-[var(--text-primary)]">Follow</span>{' '}
                <span className="text-gold-gradient">{BRAND_CONFIG.instagramHandle}</span>
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)]">
                Explore our bag styles on Instagram.
              </p>
            </div>
            <a
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-luxury min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm whitespace-nowrap shrink-0 self-start sm:self-auto"
            >
              <Instagram className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Follow Us</span>
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {INSTAGRAM_TILES.map((tile, idx) => (
              <FloatingTile
                key={tile.id}
                image={tile.image}
                alt={tile.alt}
                label={tile.label}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
