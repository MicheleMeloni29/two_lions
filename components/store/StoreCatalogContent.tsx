"use client";

import { useMemo } from "react";
import StoreCartDropdown from "@/components/store/StoreCartDropdown";
import StoreProductGrid from "@/components/store/StoreProductGrid";
import CompactHeader from "@/components/UI/CompactHeader";
import { useResetScrollOnMount } from "@/hooks/useResetScrollOnMount";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getAllStoreProducts } from "@/lib/storeCatalog";
import type { StoreContentByLanguage, StoreProduct } from "./types";

type StoreCatalogContentProps = {
  contentByLanguage: StoreContentByLanguage;
  storeBasePath: string;
  liveProducts?: StoreProduct[] | null;
};

export default function StoreCatalogContent({
  contentByLanguage,
  storeBasePath,
  liveProducts,
}: StoreCatalogContentProps) {
  const { lang, toggleLang } = useSiteLanguage();
  const content = contentByLanguage[lang];
  const products = useMemo(() => {
    if (!liveProducts || liveProducts.length === 0) {
      return content.products;
    }
    return content.products.map((localProd) => {
      const match = liveProducts.find((lp) => lp.slug === localProd.slug);
      if (!match) return localProd;
      return {
        ...localProd,
        price: match.price,
        amountCents: match.amountCents,
        quantity: match.quantity,
        inStock: match.inStock,
        imageSrc: match.imageSrc || localProd.imageSrc,
      };
    });
  }, [content.products, liveProducts]);

  const cartProducts = useMemo(() => {
    const base = getAllStoreProducts(lang);
    if (!liveProducts || liveProducts.length === 0) return base;
    const liveWithBase = liveProducts.map((p) => ({ ...p, storeBasePath }));
    const liveSlugs = new Set(liveWithBase.map((p) => p.slug));
    return [...base.filter((p) => !liveSlugs.has(p.slug)), ...liveWithBase];
  }, [lang, liveProducts, storeBasePath]);

  useResetScrollOnMount();

  return (
    <main className="min-h-screen bg-white text-primary">
      <CompactHeader
        lang={lang}
        onToggleLang={toggleLang}
        accessory={
          <StoreCartDropdown
            lang={lang}
            products={cartProducts}
            checkoutHref={`${storeBasePath}/checkout`}
            labels={{
              cartTitle: content.cartTitle,
              emptyCartLabel: content.emptyCartLabel,
              checkoutLabel: content.checkoutLabel,
              quantityLabel: content.quantityLabel,
              totalLabel: content.totalLabel,
              cartAriaLabel: content.cartAriaLabel,
              removeFromCartLabel: content.removeFromCartLabel,
            }}
          />
        }
      />

      <section className="px-3.5 pb-14 pt-24 sm:px-5 sm:pb-16 sm:pt-28 md:px-8 md:pb-20 md:pt-32 xl:px-14 xl:pb-24 xl:pt-36">
        <div className="mx-auto max-w-7xl">
          <StoreProductGrid
            anchorId="catalogo"
            productBasePath={storeBasePath}
            allLabel={content.allProductsLabel}
            discountsLabel={content.discountsLabel}
            resultsLabel={content.resultsLabel}
            emptyLabel={content.emptyLabel}
            addToCartLabel={content.addToCartLabel}
            addedToCartLabel={content.addedToCartLabel}
            openProductLabel={content.openProductLabel}
            sortLabel={content.sortLabel}
            filterLabel={content.filterLabel}
            sortOptions={content.sortOptions}
            categories={content.categories}
            products={products}
          />
        </div>
      </section>
    </main>
  );
}
