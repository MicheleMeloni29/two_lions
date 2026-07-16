"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import StoreProductCard from "./StoreProductCard";
import type { StoreProduct } from "./types";

type StoreProductGridProps = {
  anchorId?: string;
  allLabel: string;
  resultsLabel: string;
  emptyLabel: string;
  addToCartLabel: string;
  addedToCartLabel: string;
  openProductLabel: string;
  categories: string[];
  products: StoreProduct[];
};

export default function StoreProductGrid({
  anchorId,
  allLabel,
  resultsLabel,
  emptyLabel,
  addToCartLabel,
  addedToCartLabel,
  openProductLabel,
  categories,
  products,
}: StoreProductGridProps) {
  const [activeCategory, setActiveCategory] = useState(allLabel);

  const filteredProducts =
    activeCategory === allLabel
      ? products
      : products.filter((product) => product.category === activeCategory);

  const filterItems = [allLabel, ...categories];

  return (
    <section id={anchorId} className="space-y-6 md:space-y-7">
      <div className="flex flex-wrap gap-3">
        {filterItems.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
            className={cn(
              "cursor-pointer border px-4 py-3 text-[11px] uppercase tracking-[0.22em] transition sm:text-[12px]",
              activeCategory === category
                ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)] text-white"
                : "border-[color:var(--color-primary)]/10 bg-white text-[color:var(--color-primary)] hover:border-[color:var(--color-primary)]"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-secondary)]/75 sm:text-[12px]">
        {filteredProducts.length} {resultsLabel}
      </p>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <StoreProductCard
              key={product.id}
              product={product}
              addToCartLabel={addToCartLabel}
              addedToCartLabel={addedToCartLabel}
              openProductLabel={openProductLabel}
            />
          ))}
        </div>
      ) : (
        <div className="border border-[color:var(--color-primary)]/10 bg-white px-5 py-6 text-[13px] leading-6 text-[color:var(--color-secondary)] shadow-[0_24px_70px_rgba(31,39,92,0.08)] sm:text-sm md:text-[15px] md:leading-7">
          {emptyLabel}
        </div>
      )}
    </section>
  );
}
