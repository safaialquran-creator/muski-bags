import { useEffect, useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { BRAND_CONFIG } from '../data/storeConfig';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#shop' },
  { label: 'Collections', href: '#collections' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export function HeaderNav() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen]);

  return (
    <>
      {/* 1. Announcement Bar */}
      <div
        className="w-full bg-[#FBF7F0] text-[#9C6F1E] border-b border-[rgba(201,162,75,0.3)] overflow-hidden"
        role="region"
        aria-label="Store announcement"
      >
        <div className="marquee-track py-1.5 text-xs sm:text-[13px] tracking-[0.14em] uppercase font-normal whitespace-nowrap">
          <span className="px-8">
            Cash on Delivery All Over Pakistan • Premium Quality • Order on WhatsApp
          </span>
          <span className="px-8" aria-hidden="true">
            Cash on Delivery All Over Pakistan • Premium Quality • Order on WhatsApp
          </span>
          <span className="px-8" aria-hidden="true">
            Cash on Delivery All Over Pakistan • Premium Quality • Order on WhatsApp
          </span>
          <span className="px-8" aria-hidden="true">
            Cash on Delivery All Over Pakistan • Premium Quality • Order on WhatsApp
          </span>
        </div>
      </div>

      {/* 2. Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--header-scrolled-bg)] backdrop-blur-md shadow-[0_8px_24px_-12px_rgba(201,162,75,0.25)] border-b border-[var(--border-gold)]'
            : 'bg-white border-b border-[var(--border-hairline)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[76px] flex items-center justify-between gap-4">
          {/* Logo on left: native white in light mode, white rounded panel in dark mode */}
          <a
            href="#home"
            className="flex items-center shrink-0 rounded-xl bg-white px-2 py-1"
            aria-label="Muski Bags Home"
          >
            <img
              src={BRAND_CONFIG.logoImage}
              alt="Muski Bags logo"
              className="h-11 sm:h-14 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-7 text-sm font-normal tracking-wide text-[var(--text-primary)]"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative py-2 whitespace-nowrap shrink-0 hover:text-[var(--text-gold)] transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:bottom-1 after:w-0 after:h-[1.5px] after:bg-[var(--gold)] hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Primary WhatsApp CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={BRAND_CONFIG.whatsappBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold hidden sm:inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-sm whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[var(--border-hairline)] text-[var(--text-primary)] hover:border-[var(--gold)] transition-colors"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-nav-drawer"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-In Navigation Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          id="mobile-nav-drawer"
        >
          <button
            type="button"
            className="fixed inset-0 bg-black/55 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu backdrop"
          />

          <div className="relative w-72 max-w-[82vw] h-full bg-[var(--bg-surface)] text-[var(--text-primary)] border-l border-[var(--border-gold)] p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[var(--border-hairline)]">
                <div className="bg-white rounded-xl px-2.5 py-1 border border-[rgba(201,162,75,0.28)]">
                  <img
                    src={BRAND_CONFIG.logoImage}
                    alt="Muski Bags"
                    className="h-9 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[var(--border-hairline)] text-[var(--text-primary)]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile navigation">
                {NAV_LINKS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className="min-h-[44px] flex items-center px-3 rounded-xl text-base font-normal hover:bg-[var(--bg-subtle)] hover:text-[var(--gold-dark)] transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[var(--border-hairline)] space-y-3">
              <p className="brand-tagline text-[11px] text-[var(--text-secondary)]">
                {BRAND_CONFIG.tagline}
              </p>
              <a
                href={BRAND_CONFIG.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-3 text-sm"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
