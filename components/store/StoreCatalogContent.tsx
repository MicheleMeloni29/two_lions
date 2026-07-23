"use client";

import { useMemo, useState } from "react";
import StoreCartDropdown from "@/components/store/StoreCartDropdown";
import StoreProductGrid from "@/components/store/StoreProductGrid";
import CompactHeader from "@/components/UI/CompactHeader";
import { useResetScrollOnMount } from "@/hooks/useResetScrollOnMount";
import { getAllStoreProducts } from "@/lib/storeCatalog";
import type { StoreContentByLanguage } from "./types";

type StoreCatalogContentProps = {
  contentByLanguage: StoreContentByLanguage;
  storeBasePath: string;
};

export default function StoreCatalogContent({
  contentByLanguage,
  storeBasePath,
}: StoreCatalogContentProps) {
  const [lang, setLang] = useState<"it" | "en">("it");
  const content = contentByLanguage[lang];
  const cartProducts = useMemo(() => getAllStoreProducts(lang), [lang]);

  useResetScrollOnMount();

  return (
    <main className="min-h-screen bg-white text-primary">
      <CompactHeader
        lang={lang}
        onToggleLang={() =>
          setLang((current) => (current === "it" ? "en" : "it"))
        }
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

      <section className="px-4 pb-16 pt-28 sm:px-5 md:px-8 md:pb-20 md:pt-32 xl:px-14 xl:pb-24 xl:pt-36">
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
            products={content.products}
          />
        </div>
      </section>
    </main>
  );
}
