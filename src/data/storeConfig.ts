/**
 * Muski Bags — Central Store Configuration & Catalog
 *
 * HOW TO EDIT:
 * 1. Add a product: copy any object inside `PRODUCTS` and update id, name, category, price, colors, etc.
 * 2. Change phone/WhatsApp: update `BRAND_CONFIG.whatsappDigits` and `BRAND_CONFIG.phoneDisplay`.
 * 3. Replace images: swap files in `public/assets/bags/` or update the `image` path on each color swatch.
 * 4. Tweak animations: adjust `ANIMATION_SETTINGS` (floatDistancePx, floatSpeedSec, tiltMaxDeg).
 */

export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Crescent Bags' | 'Hobo Bags';
  price: number;
  oldPrice?: number;
  colors: ProductColor[];
  description: string;
  badge: 'Best Seller' | 'New';
  inStock: true;
  releaseOrder: number;
}

export interface CustomerReview {
  id: string;
  name: string;
  city: string;
  product: string;
  rating: number;
  comment: string;
}

export interface InstagramTile {
  id: string;
  image: string;
  alt: string;
  label: string;
}

export const BRAND_CONFIG = {
  name: 'Muski Bags',
  tagline: 'Har Bag Ke Saath Ek Muskaan',
  description: 'Premium & trendy bags at affordable prices. Quality pe no compromise.',
  location: 'Gujranwala, Pakistan',
  codNote: 'Cash on Delivery (COD) available all over Pakistan.',
  phoneDisplay: '+92 308 7525726',
  whatsappDigits: '923087525726',
  whatsappBaseUrl: 'https://wa.me/923087525726',
  email: 'musamughal1122333@gmail.com',
  instagramUrl: 'https://www.instagram.com/muski.pk',
  instagramHandle: '@muski.pk',
  logoImage: '/assets/bags/muski-logo.png',
} as const;

/**
 * Anti-Gravity Animation Settings
 * - floatDistancePx: vertical bob amplitude in pixels (recommended 6–12)
 * - floatSpeedSec: base levitation cycle duration in seconds (recommended 5–9)
 * - tiltMaxDeg: maximum 3D cursor tilt angle on desktop in degrees (recommended 4–6)
 */
export const ANIMATION_SETTINGS = {
  floatDistancePx: 9,
  floatSpeedSec: 6.8,
  tiltMaxDeg: 6,
} as const;

/**
 * Product Catalog (Single Source Array)
 * PRICE NOTE: Only the White Crescent Bag price (Rs. 1500) is confirmed;
 * Twist-Lock Crescent Bag and Textured Hobo Bag prices are editable placeholders.
 */
export const PRODUCTS: Product[] = [
  {
    id: 'white-crescent-bag',
    name: 'White Crescent Bag',
    category: 'Crescent Bags',
    price: 1500, // Confirmed price
    colors: [
      {
        name: 'White',
        hex: '#F6F4EF',
        image: '/assets/bags/white-crescent.png',
      },
    ],
    description:
      'White faux leather, tassel charm, adjustable shoulder strap, antique-silver brand plate.',
    badge: 'Best Seller',
    inStock: true,
    releaseOrder: 2,
  },
  {
    id: 'twist-lock-crescent-bag',
    name: 'Twist-Lock Crescent Bag',
    category: 'Crescent Bags',
    price: 1500, // Editable price (only White Crescent price is confirmed)
    colors: [
      {
        name: 'Lavender',
        hex: '#9A88A6',
        image: '/assets/bags/twist-lock-lavender.png',
      },
      {
        name: 'Maroon',
        hex: '#6E1D2E',
        image: '/assets/bags/twist-lock-maroon.png',
      },
      {
        name: 'Tan Brown',
        hex: '#7C422B',
        image: '/assets/bags/twist-lock-tan-brown.png',
      },
      {
        name: 'Pearl Grey',
        hex: '#D8D7D1',
        image: '/assets/bags/twist-lock-pearl-grey.png',
      },
    ],
    description: 'Gold twist-lock clasp and gold chain strap.',
    badge: 'New',
    inStock: true,
    releaseOrder: 3,
  },
  {
    id: 'textured-hobo-bag',
    name: 'Textured Hobo Bag',
    category: 'Hobo Bags',
    price: 1500, // Editable price (only White Crescent price is confirmed)
    colors: [
      {
        name: 'Beige',
        hex: '#D9CBB6',
        image: '/assets/bags/hobo-beige.png',
      },
      {
        name: 'Black',
        hex: '#1B1B1B',
        image: '/assets/bags/hobo-black.png',
      },
      {
        name: 'Tan',
        hex: '#814E33',
        image: '/assets/bags/hobo-tan.png',
      },
      {
        name: 'Maroon',
        hex: '#63262B',
        image: '/assets/bags/hobo-maroon.png',
      },
      {
        name: 'Pink',
        hex: '#DEA9B1',
        image: '/assets/bags/hobo-pink.png',
      },
      {
        name: 'Navy',
        hex: '#233048',
        image: '/assets/bags/hobo-navy.png',
      },
    ],
    description: 'Ribbed texture, gold nameplate, top handle.',
    badge: 'Best Seller',
    inStock: true,
    releaseOrder: 1,
  },
];

/**
 * PLACEHOLDER REVIEWS — Replace these 4 placeholder entries with real customer reviews.
 */
export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Ayesha Khan',
    city: 'Lahore',
    product: 'White Crescent Bag',
    rating: 5,
    comment:
      'Received my White Crescent Bag via Cash on Delivery in two days. Neat stitching and soft finish.',
  },
  {
    id: 'rev-2',
    name: 'Hira Tariq',
    city: 'Islamabad',
    product: 'Twist-Lock Crescent Bag',
    rating: 5,
    comment:
      'Ordered the Lavender color on WhatsApp. The gold twist-lock clasp looks clean and holds daily essentials.',
  },
  {
    id: 'rev-3',
    name: 'Sana Malik',
    city: 'Karachi',
    product: 'Textured Hobo Bag',
    rating: 5,
    comment:
      'The Beige Textured Hobo Bag matches the photos well. Quick confirmation on WhatsApp and smooth COD delivery.',
  },
  {
    id: 'rev-4',
    name: 'Zainab Raza',
    city: 'Gujranwala',
    product: 'Twist-Lock Crescent Bag',
    rating: 5,
    comment:
      'Picked the Maroon shade for a family dinner. Great value for the price and careful packaging.',
  },
];

export const INSTAGRAM_TILES: InstagramTile[] = [
  {
    id: 'ig-1',
    image: '/assets/bags/white-crescent.png',
    alt: 'White Crescent Bag by Muski Bags',
    label: 'White Crescent Bag',
  },
  {
    id: 'ig-2',
    image: '/assets/bags/twist-lock-lavender.png',
    alt: 'Twist-Lock Crescent Bag in Lavender',
    label: 'Lavender Crescent',
  },
  {
    id: 'ig-3',
    image: '/assets/bags/hobo-beige.png',
    alt: 'Textured Hobo Bag in Beige',
    label: 'Beige Textured Hobo',
  },
  {
    id: 'ig-4',
    image: '/assets/bags/twist-lock-maroon.png',
    alt: 'Twist-Lock Crescent Bag in Maroon',
    label: 'Maroon Crescent',
  },
  {
    id: 'ig-5',
    image: '/assets/bags/hobo-pink.png',
    alt: 'Textured Hobo Bag in Pink',
    label: 'Pink Textured Hobo',
  },
  {
    id: 'ig-6',
    image: '/assets/bags/hobo-navy.png',
    alt: 'Textured Hobo Bag in Navy',
    label: 'Navy Textured Hobo',
  },
];
