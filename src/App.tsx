import { useState } from 'react';
import type { Product } from './data/storeConfig';
import type { ShopCategoryFilter } from './utils/shopLogic';
import { useGlobalAntiGravityRuntime } from './hooks/useAntiGravity';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { CollectionsAndShop } from './components/CollectionsAndShop';
import { QuickViewModal } from './components/QuickViewModal';
import { BrandStorySections } from './components/BrandStorySections';
import { ContactAndFooter } from './components/ContactAndFooter';

export default function App() {
  useGlobalAntiGravityRuntime();

  const [activeCategory, setActiveCategory] = useState<ShopCategoryFilter>('All');
  const [quickViewState, setQuickViewState] = useState<{
    product: Product;
    colorIndex: number;
  } | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-primary)]">
      <HeaderNav />

      <main className="flex-1">
        <HeroSection />

        <CollectionsAndShop
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onQuickView={(product, colorIndex) =>
            setQuickViewState({ product, colorIndex })
          }
        />

        <BrandStorySections />
      </main>

      <ContactAndFooter />

      <QuickViewModal
        product={quickViewState?.product ?? null}
        initialColorIndex={quickViewState?.colorIndex ?? 0}
        onClose={() => setQuickViewState(null)}
      />
    </div>
  );
}
