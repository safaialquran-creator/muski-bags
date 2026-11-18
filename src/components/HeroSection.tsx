import { useCallback, useRef, type PointerEvent } from 'react';
import { Award, Banknote, MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import { BRAND_CONFIG, PRODUCTS } from '../data/storeConfig';
import { getFloatStyle } from '../hooks/useAntiGravity';

const TRUST_ITEMS = [
  {
    title: 'Cash on Delivery',
    detail: 'Pay at your doorstep',
    Icon: Banknote,
  },
  {
    title: 'Nationwide Delivery',
    detail: 'Across all cities in Pakistan',
    Icon: Truck,
  },
  {
    title: 'Premium Quality',
    detail: 'Quality pe no compromise',
    Icon: Award,
  },
  {
    title: 'Easy WhatsApp Ordering',
    detail: 'Direct confirmation & support',
    Icon: ShieldCheck,
  },
];

export function HeroSection() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);

  const handleStageMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    rafRef.current = window.requestAnimationFrame(() => {
      stage.style.setProperty('--hero-mx', nx.toFixed(3));
      stage.style.setProperty('--hero-my', ny.toFixed(3));
    });
  }, []);

  const handleStageLeave = useCallback(() => {
    if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty('--hero-mx', '0');
    stage.style.setProperty('--hero-my', '0');
  }, []);

  const whiteBag = PRODUCTS[0];
  const twistBag = PRODUCTS[1];
  const hoboBag = PRODUCTS[2];

  return (
    <>
      {/* 3. Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden bg-[var(--bg-page)] pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-12 lg:pb-16"
      >
        {/* Faint gold ambient radial glow */}
        <div
          className="pointer-events-none absolute -top-24 right-[-10%] w-[520px] h-[520px] rounded-full blur-3xl opacity-75"
          style={{ background: 'radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Copy Column */}
          <div className="lg:col-span-6 hero-liftoff text-center lg:text-left">
            <h1 className="font-serif-display text-[clamp(2.35rem,4.6vw,4rem)] leading-[1.08] font-normal tracking-tight [text-wrap:balance]">
              <span className="text-gold-gradient">Carry Elegance.</span>{' '}
              <span className="text-[var(--text-primary)]">Wear a Smile.</span>
            </h1>

            <p className="brand-tagline mt-4 text-xs sm:text-sm text-[var(--text-gold)]">
              {BRAND_CONFIG.tagline}
            </p>

            <p className="mt-5 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
              {BRAND_CONFIG.description} {BRAND_CONFIG.codNote}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#shop"
                className="btn-gold min-h-[46px] inline-flex items-center justify-center px-7 py-3 text-sm sm:text-base whitespace-nowrap"
              >
                Shop Now
              </a>
              <a
                href={BRAND_CONFIG.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-luxury min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Floating Layered Bag Collage */}
          <div
            ref={stageRef}
            onPointerMove={handleStageMove}
            onPointerLeave={handleStageLeave}
            data-ag-observe="true"
            className="lg:col-span-6 hero-liftoff relative h-[320px] sm:h-[400px] lg:h-[450px] flex items-center justify-center select-none"
            style={
              {
                '--hero-mx': '0',
                '--hero-my': '0',
              } as React.CSSProperties
            }
          >
            {/* Back layer (moves less) */}
            <div
              data-parallax-depth="0.03"
              className="absolute right-2 sm:right-6 top-2 sm:top-4 w-[44%] max-w-[220px] transition-transform duration-300 ease-out"
              style={{
                transform:
                  'translate3d(calc(var(--hero-mx) * 10px), calc(var(--hero-my) * 10px), 0)',
              }}
            >
              <div style={getFloatStyle(2, 1.1)} className="flex flex-col items-center">
                <div className="ag-float-item w-full aspect-[3/4]">
                  <img
                    src={hoboBag.colors[2].image}
                    alt="Textured Hobo Bag in Tan"
                    className="bag-feather-mask w-full h-full object-contain rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="ag-ground-ellipse w-[64%] h-3 -mt-1 rounded-full" aria-hidden="true" />
              </div>
            </div>

            {/* Mid layer */}
            <div
              data-parallax-depth="0.05"
              className="absolute left-2 sm:left-4 bottom-8 sm:bottom-10 w-[46%] max-w-[235px] transition-transform duration-300 ease-out z-10"
              style={{
                transform:
                  'translate3d(calc(var(--hero-mx) * 18px), calc(var(--hero-my) * 16px), 0)',
              }}
            >
              <div style={getFloatStyle(4, 1.0)} className="flex flex-col items-center">
                <div className="ag-float-item w-full aspect-[4/3]">
                  <img
                    src={twistBag.colors[0].image}
                    alt="Twist-Lock Crescent Bag in Lavender"
                    className="bag-feather-mask w-full h-full object-contain rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="ag-ground-ellipse w-[68%] h-3.5 -mt-1 rounded-full" aria-hidden="true" />
              </div>
            </div>

            {/* Front hero layer (moves most) */}
            <div
              data-parallax-depth="0.075"
              className="relative z-20 w-[56%] max-w-[285px] translate-y-2 transition-transform duration-300 ease-out"
              style={{
                transform:
                  'translate3d(calc(var(--hero-mx) * 28px), calc(var(--hero-my) * 24px), 0)',
              }}
            >
              <div style={getFloatStyle(0, 0.95)} className="flex flex-col items-center">
                <div className="ag-float-item w-full aspect-square">
                  <img
                    src={whiteBag.colors[0].image}
                    alt="White Crescent Bag by Muski Bags"
                    className="bag-feather-mask w-full h-full object-contain rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="ag-ground-ellipse w-[70%] h-4 -mt-1 rounded-full" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trust Strip (4 items with floating trust icons) */}
      <section
        aria-label="Store highlights"
        className="border-y border-[var(--border-hairline)] bg-[var(--bg-surface)] py-8 sm:py-10"
      >
        <div
          data-ag-observe="true"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {TRUST_ITEMS.map(({ title, detail, Icon }, index) => (
            <div
              key={title}
              className="flex flex-col items-center text-center gap-2.5"
              style={getFloatStyle(index + 1)}
            >
              <div className="ag-float-item flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl border border-[var(--border-gold)] bg-[var(--bg-card)] flex items-center justify-center text-[var(--gold-dark)] dark:text-[var(--gold-light)]">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div
                  className="ag-ground-ellipse w-9 h-2 mt-1.5 rounded-full"
                  aria-hidden="true"
                />
              </div>
              <h2 className="font-serif-display text-base sm:text-lg font-medium text-[var(--text-primary)]">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">{detail}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
