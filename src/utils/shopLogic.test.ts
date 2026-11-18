import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS, BRAND_CONFIG } from '../data/storeConfig';
import {
  filterAndSortProducts,
  buildWhatsAppOrderUrl,
  validateContactForm,
  buildContactWhatsAppUrl,
  formatPrice,
} from './shopLogic';

test('PRODUCTS contains exactly the three specified bags', () => {
  assert.equal(PRODUCTS.length, 3);
  assert.deepEqual(
    PRODUCTS.map((p) => p.name),
    ['White Crescent Bag', 'Twist-Lock Crescent Bag', 'Textured Hobo Bag']
  );
  assert.equal(PRODUCTS[0].colors.length, 1);
  assert.equal(PRODUCTS[1].colors.length, 4);
  assert.equal(PRODUCTS[2].colors.length, 6);
});

test('filterAndSortProducts filters by category, new arrivals, and search query', () => {
  const all = filterAndSortProducts(PRODUCTS, {
    category: 'All',
    searchQuery: '',
    sortBy: 'newest',
  });
  assert.equal(all.length, 3);
  assert.equal(all[0].name, 'Twist-Lock Crescent Bag');

  const hobo = filterAndSortProducts(PRODUCTS, {
    category: 'Hobo Bags',
    searchQuery: '',
    sortBy: 'newest',
  });
  assert.equal(hobo.length, 1);
  assert.equal(hobo[0].name, 'Textured Hobo Bag');

  const newArrivals = filterAndSortProducts(PRODUCTS, {
    category: 'New Arrivals',
    searchQuery: '',
    sortBy: 'newest',
  });
  assert.equal(newArrivals.length, 1);
  assert.equal(newArrivals[0].name, 'Twist-Lock Crescent Bag');

  const colorSearch = filterAndSortProducts(PRODUCTS, {
    category: 'All',
    searchQuery: 'lavender',
    sortBy: 'newest',
  });
  assert.equal(colorSearch.length, 1);
  assert.equal(colorSearch[0].name, 'Twist-Lock Crescent Bag');
});

test('buildWhatsAppOrderUrl encodes the exact required message format', () => {
  const url = buildWhatsAppOrderUrl(BRAND_CONFIG.whatsappDigits, {
    name: 'Twist-Lock Crescent Bag',
    color: 'Lavender',
    qty: 2,
    price: 1500,
  });

  assert.ok(url.startsWith('https://wa.me/923087525726?text='));
  const decoded = decodeURIComponent(url.split('?text=')[1]);
  assert.equal(
    decoded,
    'Assalam o Alaikum! I want to order: Twist-Lock Crescent Bag, Color: Lavender, Qty: 2, Price: Rs. 1500. Please confirm availability.'
  );
});

test('validateContactForm rejects empty or invalid inputs and accepts valid data', () => {
  const bad = validateContactForm({ name: '', phone: '123', message: 'hi' });
  assert.equal(bad.valid, false);
  assert.ok(bad.errors.name);
  assert.ok(bad.errors.phone);
  assert.ok(bad.errors.message);

  const ok = validateContactForm({
    name: 'Ayesha',
    phone: '03087525726',
    message: 'Is White Crescent Bag in stock?',
  });
  assert.equal(ok.valid, true);
  assert.deepEqual(ok.errors, {});

  const contactUrl = buildContactWhatsAppUrl(BRAND_CONFIG.whatsappDigits, {
    name: 'Ayesha',
    phone: '03087525726',
    message: 'Is White Crescent Bag in stock?',
  });
  assert.ok(contactUrl.startsWith('https://wa.me/923087525726?text='));
});

test('formatPrice formats Rs. cleanly', () => {
  assert.equal(formatPrice(1500), 'Rs. 1500');
});
