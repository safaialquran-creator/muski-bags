import { useMemo, useState } from 'react';
import { Eye, MessageCircle, Search, X } from 'lucide-react';
import { BRAND_CONFIG, PRODUCTS, type Product } from '../data/storeConfig';
import {
  buildWhatsAppOrderUrl,
  filterAndSortProducts,
  formatPrice,
  type ShopCategoryFilter,
  type ShopSortOption,
} from '../utils/shopLogic';
import { getFloatStyle, useCardTilt } from '../hooks/useAntiGravity';
import { FloatingBagVisual } from './FloatingBagVisual';

interface CollectionsAndShopProps {
  activeCategory: ShopCategoryFilter;
  onSelectCategory: (category: ShopCategoryFilter) => void;
  onQuickView: (product: Product, colorIndex: number) => void;
}

const COLLECTION_CARDS: {
  title: string;
  filter: ShopCategoryFilter;
  subtitle: string;
  image: string;
  alt: string;
  depth: string;
}[] = [
  {
    title: 'Crescent Bags',
    filter: 'Crescent Bags',
    subtitle: 'White & Twist-Lock Crescent styles',
    image: '/assets/bags/white-crescent.png',
    alt: 'White Crescent Bag from Crescent Bags collection',
    depth: '0.04',
  },
  {
    title: 'Hobo Bags',
    filter: 'Hobo Bags',
    subtitle: 'Ribbed Textured Hobo collection',
    image: '/assets/bags/hobo-beige.png',
    alt: 'Textured Hobo Bag from Hobo Bags collection',
    depth: '0.06',
  },
  {
    title: 'New Arrivals',
    filter: 'New Arrivals',
    subtitle: 'Twist-Lock Crescent with gold chain',
    image: '/assets/bags/twist-lock-maroon.png',
    alt: 'Twist-Lock Crescent Bag in Maroon from New Arrivals',
    depth: '0.045',
  },
];

const FILTER_CHIPS: ShopCategoryFilter[] = [
  'All',
  'Crescent Bags',
  'Hobo Bags',
  'New Arrivals',
];

function CollectionCard({
  card,
  index,
  isActive,
  onSelect,
}: {
  card: (typeof COLLECTION_CARDS)[number];
  index: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  const { surfaceRef, onPointerMove, onPointerLeave } = useCardTilt();

  return (
    <div data-ag-observe="true" data-parallax-depth={card.depth} className="h-full">
      <div
        ref={surfaceRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className={`ag-tilt-surface group relative h-full rounded-2xl border p-5 sm:p-6 bg-[var(--bg-surface)] flex flex-col justify-between transition-colors ${
          isActive
            ? 'border-[var(--gold)] shadow-[0_18px_36px_-18px_var(--gold-shadow)]'
            : 'border-[var(--border-hairline)] hover:border-[var(--gold)]'
        }`}
      >
        <div
          className="relative w-full aspect-[4/3] flex flex-col items-center justify-center overflow-hidden"
          style={getFloatStyle(index + 3)}
        >
          <div className="ag-float-item ag-inner-parallax relative w-[82%] h-[82%] flex items-center justify-center">
            <img
              src={card.image}
              alt={card.alt}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="bag-feather-mask w-full h-full object-contain rounded-2xl"
            />
            <div className="ag-hover-sheen absolute inset-0 rounded-2xl" aria-hidden="true" />
          </div>
          <div className="ag-ground-ellipse w-[58%] h-3.5 -mt-1 rounded-full" aria-hidden="true" />
        </div>

        <div className="mt-4 pt-4 border-t border-[var(--border-hairline)] flex items-end justify-between gap-3">
          <div>
            <h3 className="font-serif-display text-xl sm:text-2xl font-normal text-[var(--text-gold)]">
              {card.title}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)]">{card.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onSelect}
            className="btn-outline-luxury min-h-[44px] px-4 py-2 text-xs sm:text-sm whitespace-nowrap shrink-0"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  product,
  index,
  onQuickView,
}: {
  product: Product;
  index: number;
  onQuickView: (product: Product, colorIndex: number) => void;
}) {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const { surfaceRef, onPointerMove, onPointerLeave } = useCardTilt();

  const activeColor = product.colors[selectedColorIdx] ?? product.colors[0];
  const whatsappUrl = buildWhatsAppOrderUrl(BRAND_CONFIG.whatsappDigits, {
    name: product.name,
    color: activeColor.name,
    qty: 1,
    price: product.price,
  });

  const parallaxDepth = index % 3 === 0 ? '0.035' : index % 3 === 1 ? '0.055' : '0.04';

  return (
    <article data-ag-observe="true" data-parallax-depth={parallaxDepth} className="h-full">
      <div
        ref={surfaceRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="ag-tilt-surface group h-full rounded-2xl border border-[var(--border-hairline)] hover:border-[var(--gold)] bg-[var(--bg-surface)] p-3 sm:p-5 flex flex-col justify-between hover:shadow-[0_22px_40px_-20px_var(--gold-shadow)]"
      >
        <div>
          {/* Top quiet metadata line (no pill sandwich) */}
          <div className="flex items-center justify-between gap-2 text-[11px] sm:text-xs tracking-wider uppercase">
            <span className="text-[var(--text-secondary)] truncate">{product.category}</span>
            <span className="font-medium text-[var(--gold-dark)] dark:text-[var(--gold-light)] whitespace-nowrap shrink-0">
              {product.badge}
            </span>
          </div>

          {/* Floating Bag Visual */}
          <div className="mt-2 rounded-xl bg-[var(--bg-card)] py-2">
            <FloatingBagVisual
              colors={product.colors}
              activeColorIndex={selectedColorIdx}
              productName={product.name}
              floatIndex={index + 2}
              aspectClass="aspect-square"
            />
          </div>

          {/* Title & Price */}
          <div className="mt-3 sm:mt-4">
            <h3 className="font-serif-display text-base sm:text-xl font-normal leading-snug text-[var(--text-primary)]">
              {product.name}
            </h3>
            <p className="mt-1 text-sm sm:text-base font-medium tabular-nums text-[var(--text-gold)]">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Color Swatches */}
          <div className="mt-3">
            <p className="text-[11px] sm:text-xs text-[var(--text-secondary)] mb-1.5">
              Color: <span className="text-[var(--text-primary)] font-medium">{activeColor.name}</span>
            </p>
            <div className="flex flex-wrap items-center gap-0.5" role="group" aria-label={`${product.name} colors`}>
              {product.colors.map((color, idx) => {
                const selected = idx === selectedColorIdx;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColorIdx(idx)}
                    aria-label={`Select ${color.name} color for ${product.name}`}
                    aria-pressed={selected}
                    title={color.name}
                    className="min-w-[34px] min-h-[36px] sm:min-w-[36px] sm:min-h-[38px] flex items-center justify-center rounded-full focus-visible:outline-2"
                  >
                    <span
                      className={`block w-5 h-5 sm:w-6 sm:h-6 rounded-full border transition-transform duration-200 ${
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
        </div>

        {/* Card CTAs */}
        <div className="mt-4 pt-3 border-t border-[var(--border-hairline)] flex flex-col gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold min-h-[44px] w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs sm:text-sm whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Order on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => onQuickView(product, selectedColorIdx)}
            className="btn-outline-luxury min-h-[44px] w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs sm:text-sm whitespace-nowrap"
          >
            <Eye className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Quick View</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export function CollectionsAndShop({
  activeCategory,
  onSelectCategory,
  onQuickView,
}: CollectionsAndShopProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<ShopSortOption>('newest');

  const visibleProducts = useMemo(
    () =>
      filterAndSortProducts(PRODUCTS, {
        category: activeCategory,
        searchQuery,
        sortBy,
      }),
    [activeCategory, searchQuery, sortBy]
  );

  const handleCollectionClick = (filter: ShopCategoryFilter) => {
    onSelectCategory(filter);
    const shopEl = document.getElementById('shop');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* 5. Collections Section */}
      <section id="collections" className="py-14 sm:py-20 bg-[var(--bg-page)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-serif-display text-[clamp(1.85rem,3.2vw,2.6rem)] font-normal">
              <span className="text-gold-gradient">Curated</span>{' '}
              <span className="text-[var(--text-primary)]">Collections</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)]">
              Select a collection to filter the catalog.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {COLLECTION_CARDS.map((card, index) => (
              <CollectionCard
                key={card.title}
                card={card}
                index={index}
                isActive={activeCategory === card.filter}
                onSelect={() => handleCollectionClick(card.filter)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Shop Section */}
      <section
        id="shop"
        className="py-14 sm:py-20 bg-[var(--bg-surface)] border-y border-[var(--border-hairline)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif-display text-[clamp(1.85rem,3.2vw,2.6rem)] font-normal">
                <span className="text-gold-gradient">Shop</span>{' '}
                <span className="text-[var(--text-primary)]">Bags</span>
              </h2>
              <p className="mt-1.5 text-sm sm:text-base text-[var(--text-secondary)]">
                {BRAND_CONFIG.codNote}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] tabular-nums">
              Showing {visibleProducts.length} of {PRODUCTS.length} styles
            </p>
          </div>

          {/* Filter Chips, Search, and Sort Toolbar */}
          <div className="mt-7 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div
              className="flex flex-wrap items-center gap-2"
              role="group"
              aria-label="Filter bags by category"
            >
              {FILTER_CHIPS.map((chip) => {
                const active = activeCategory === chip;
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => onSelectCategory(chip)}
                    aria-pressed={active}
                    className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      active
                        ? 'btn-gold shadow-xs'
                        : 'border border-[var(--border-hairline)] bg-[var(--bg-page)] text-[var(--text-primary)] hover:border-[var(--gold)]'
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Live Search */}
              <div className="relative flex-1 sm:w-64">
                <label htmlFor="shop-search" className="sr-only">
                  Search bags
                </label>
                <Search
                  className="w-4 h-4 text-[var(--text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="shop-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search bag or color..."
                  className="w-full min-h-[44px] pl-10 pr-10 py-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-page)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--gold)] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="shrink-0">
                <label htmlFor="shop-sort" className="sr-only">
                  Sort bags
                </label>
                <select
                  id="shop-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as ShopSortOption)}
                  className="w-full sm:w-auto min-h-[44px] px-4 py-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-page)] text-sm text-[var(--text-primary)] focus:border-[var(--gold)] focus:outline-none"
                >
                  <option value="newest">Sort: Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid: 4 columns desktop, 3 tablet, 2 mobile */}
          {visibleProducts.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {visibleProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-page)] p-8 text-center">
              <p className="font-serif-display text-xl text-[var(--text-primary)]">
                No bags match your current filter.
              </p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Try clearing the search query or selecting All categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('All');
                  setSearchQuery('');
                  setSortBy('newest');
                }}
                className="btn-gold mt-5 min-h-[44px] px-6 py-2.5 text-sm"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
