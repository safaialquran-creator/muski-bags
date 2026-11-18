import { useRef, useState, type FormEvent } from 'react';
import { Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BRAND_CONFIG } from '../data/storeConfig';
import { buildContactWhatsAppUrl, validateContactForm } from '../utils/shopLogic';
import { getFloatStyle } from '../hooks/useAntiGravity';

export function ContactAndFooter() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; message?: string }>({});
  const [generatedWaUrl, setGeneratedWaUrl] = useState<string | null>(null);
  const waAnchorRef = useRef<HTMLAnchorElement | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateContactForm({ name, phone, message });
    if (!validation.valid) {
      setErrors(validation.errors);
      setGeneratedWaUrl(null);
      return;
    }

    setErrors({});
    const url = buildContactWhatsAppUrl(BRAND_CONFIG.whatsappDigits, {
      name,
      phone,
      message,
    });
    setGeneratedWaUrl(url);

    // Navigate via anchor click (avoids window.open / window.alert)
    window.setTimeout(() => {
      waAnchorRef.current?.click();
    }, 0);
  };

  return (
    <>
      {/* 13. Contact Section */}
      <section id="contact" className="py-14 sm:py-20 bg-[var(--bg-page)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Direct Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="font-serif-display text-[clamp(1.85rem,3.2vw,2.6rem)] font-normal">
                <span className="text-gold-gradient">Contact</span>{' '}
                <span className="text-[var(--text-primary)]">Us</span>
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)]">
                Reach out directly on WhatsApp, phone, email, or Instagram.
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[var(--gold-dark)] dark:text-[var(--gold-light)] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                    Phone / WhatsApp
                  </p>
                  <a
                    href={`tel:${BRAND_CONFIG.phoneDisplay.replace(/\s+/g, '')}`}
                    className="font-medium text-[var(--text-primary)] hover:text-[var(--gold-dark)] transition-colors"
                  >
                    {BRAND_CONFIG.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-[var(--gold-dark)] dark:text-[var(--gold-light)] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                    WhatsApp
                  </p>
                  <a
                    href={BRAND_CONFIG.whatsappBaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[var(--text-primary)] hover:text-[var(--gold-dark)] transition-colors"
                  >
                    wa.me/{BRAND_CONFIG.whatsappDigits}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[var(--gold-dark)] dark:text-[var(--gold-light)] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                    Email
                  </p>
                  <a
                    href={`mailto:${BRAND_CONFIG.email}`}
                    className="font-medium text-[var(--text-primary)] hover:text-[var(--gold-dark)] transition-colors break-all"
                  >
                    {BRAND_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--gold-dark)] dark:text-[var(--gold-light)] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                    Location
                  </p>
                  <p className="font-medium text-[var(--text-primary)]">{BRAND_CONFIG.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Instagram className="w-5 h-5 text-[var(--gold-dark)] dark:text-[var(--gold-light)] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                    Instagram
                  </p>
                  <a
                    href={BRAND_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[var(--text-primary)] hover:text-[var(--gold-dark)] transition-colors"
                  >
                    {BRAND_CONFIG.instagramHandle}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="Ayesha Khan"
                    required
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-page)] text-sm text-[var(--text-primary)] focus:border-[var(--gold)] focus:outline-none"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1.5"
                  >
                    Phone / WhatsApp
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    placeholder="0300 1234567"
                    required
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-page)] text-sm text-[var(--text-primary)] focus:border-[var(--gold)] focus:outline-none"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  placeholder="Share the bag name, color, or your city for COD delivery..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-page)] text-sm text-[var(--text-primary)] focus:border-[var(--gold)] focus:outline-none resize-y"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="btn-gold min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Send on WhatsApp</span>
                </button>

                {generatedWaUrl && (
                  <a
                    ref={waAnchorRef}
                    href={generatedWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium underline underline-offset-4 text-[var(--gold-dark)] dark:text-[var(--gold-light)]"
                  >
                    Open WhatsApp Message
                  </a>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 14. Footer (light cream & white theme matching logo) */}
      <footer className="bg-[#FBF7F0] text-[#111111] border-t border-[rgba(201,162,75,0.35)] pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[rgba(201,162,75,0.22)]">
            <div className="md:col-span-5 space-y-4">
              <div className="inline-block bg-white rounded-xl p-3 border border-[rgba(201,162,75,0.35)] shadow-xs">
                <img
                  src={BRAND_CONFIG.logoImage}
                  alt="Muski Bags logo"
                  className="h-14 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="brand-tagline text-xs text-[#9C6F1E]">{BRAND_CONFIG.tagline}</p>
              <p className="text-sm text-[#6B6B6B] max-w-sm">
                {BRAND_CONFIG.description} {BRAND_CONFIG.codNote}
              </p>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h3 className="font-serif-display text-lg font-normal text-[#9C6F1E]">Quick Links</h3>
              <ul className="space-y-2 text-sm text-[#6B6B6B]">
                <li>
                  <a href="#home" className="hover:text-[#9C6F1E] transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#shop" className="hover:text-[#9C6F1E] transition-colors">
                    Shop
                  </a>
                </li>
                <li>
                  <a href="#collections" className="hover:text-[#9C6F1E] transition-colors">
                    Collections
                  </a>
                </li>
                <li>
                  <a href="#why-us" className="hover:text-[#9C6F1E] transition-colors">
                    Why Us
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-[#9C6F1E] transition-colors">
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#9C6F1E] transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3">
              <h3 className="font-serif-display text-lg font-normal text-[#9C6F1E]">Contact</h3>
              <ul className="space-y-2 text-sm text-[#6B6B6B]">
                <li>
                  <a
                    href={BRAND_CONFIG.whatsappBaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#9C6F1E] transition-colors"
                  >
                    WhatsApp: {BRAND_CONFIG.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${BRAND_CONFIG.email}`}
                    className="hover:text-[#9C6F1E] transition-colors break-all"
                  >
                    Email: {BRAND_CONFIG.email}
                  </a>
                </li>
                <li>Location: {BRAND_CONFIG.location}</li>
                <li>
                  <a
                    href={BRAND_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#9C6F1E] transition-colors"
                  >
                    Instagram: {BRAND_CONFIG.instagramHandle}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 text-center sm:text-left text-xs sm:text-sm text-[#6B6B6B]">
            <p>© 2026 Muski Bags. All rights reserved. 👜</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button on every screen */}
      <div
        className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 pb-safe"
        style={getFloatStyle(8, 0.9)}
      >
        <a
          href={BRAND_CONFIG.whatsappBaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Order on WhatsApp"
          title="Order on WhatsApp"
          className="ag-float-item btn-gold w-12 h-12 rounded-full inline-flex items-center justify-center shadow-[0_14px_30px_-8px_rgba(156,111,30,0.55)] border border-[#F1DC8E]"
        >
          <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
        </a>
      </div>
    </>
  );
}
