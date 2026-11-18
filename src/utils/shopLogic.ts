import type { Product } from '../data/storeConfig';

export type ShopCategoryFilter = 'All' | 'Crescent Bags' | 'Hobo Bags' | 'New Arrivals';
export type ShopSortOption = 'newest' | 'price-asc' | 'price-desc';

export interface ShopFilterState {
  category: ShopCategoryFilter;
  searchQuery: string;
  sortBy: ShopSortOption;
}

export interface WhatsAppOrderParams {
  name: string;
  color: string;
  qty: number;
  price: number;
}

export interface ContactFormInput {
  name: string;
  phone: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
}

/**
 * Deterministic filter and sort over the catalog array.
 */
export function filterAndSortProducts(
  products: Product[],
  state: ShopFilterState
): Product[] {
  const query = state.searchQuery.trim().toLowerCase();

  const filtered = products.filter((item) => {
    if (state.category === 'Crescent Bags' && item.category !== 'Crescent Bags') {
      return false;
    }
    if (state.category === 'Hobo Bags' && item.category !== 'Hobo Bags') {
      return false;
    }
    if (state.category === 'New Arrivals' && item.badge !== 'New') {
      return false;
    }

    if (!query) return true;

    const haystack = [
      item.name,
      item.category,
      item.description,
      item.badge,
      ...item.colors.map((c) => c.name),
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(query);
  });

  return [...filtered].sort((a, b) => {
    if (state.sortBy === 'price-asc') {
      return a.price - b.price || b.releaseOrder - a.releaseOrder;
    }
    if (state.sortBy === 'price-desc') {
      return b.price - a.price || b.releaseOrder - a.releaseOrder;
    }
    return b.releaseOrder - a.releaseOrder;
  });
}

/**
 * Formats PKR price consistently as "Rs. 1500"
 */
export function formatPrice(price: number): string {
  return `Rs. ${price}`;
}

/**
 * Builds the exact WhatsApp order URL requested:
 * https://wa.me/923087525726?text=<URL-encoded>
 * "Assalam o Alaikum! I want to order: {name}, Color: {color}, Qty: {qty}, Price: Rs. {price}. Please confirm availability."
 */
export function buildWhatsAppOrderUrl(
  whatsappDigits: string,
  params: WhatsAppOrderParams
): string {
  const safeQty = Math.max(1, Math.floor(params.qty || 1));
  const message = `Assalam o Alaikum! I want to order: ${params.name}, Color: ${params.color}, Qty: ${safeQty}, Price: Rs. ${params.price}. Please confirm availability.`;
  return `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}`;
}

/**
 * Validates the Contact form fields without substituting silent fallbacks.
 */
export function validateContactForm(input: ContactFormInput): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};
  const trimmedName = input.name.trim();
  const trimmedPhone = input.phone.trim();
  const trimmedMessage = input.message.trim();

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name.';
  }

  const digitCount = trimmedPhone.replace(/\D/g, '').length;
  if (digitCount < 7) {
    errors.phone = 'Please enter a valid phone or WhatsApp number.';
  }

  if (trimmedMessage.length < 4) {
    errors.message = 'Please write a short message.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Builds a WhatsApp URL from validated Contact form data.
 */
export function buildContactWhatsAppUrl(
  whatsappDigits: string,
  input: ContactFormInput
): string {
  const text = `Assalam o Alaikum! Name: ${input.name.trim()}, Phone: ${input.phone.trim()}. Message: ${input.message.trim()}`;
  return `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(text)}`;
}
