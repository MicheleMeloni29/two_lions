"use client";

import { useState } from "react";
import StoreCartDropdown from "@/components/store/StoreCartDropdown";
import CompactHeader from "@/components/UI/CompactHeader";
import StoreProductGrid from "@/components/store/StoreProductGrid";
import { useResetScrollOnMount } from "@/hooks/useResetScrollOnMount";
import { storePageContent } from "./storeContent";

export default function FoodBeverageStoreContent() {
  const [lang, setLang] = useState<"it" | "en">("it");
  const content = storePageContent[lang];

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
            products={content.products}
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
