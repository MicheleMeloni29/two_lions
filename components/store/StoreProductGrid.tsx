"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import StoreProductCard from "./StoreProductCard";
import type { StoreProduct } from "./types";

type SortKey = "default" | "priceAsc" | "priceDesc" | "nameAsc";
type MobileFilterValue = "all" | "discounts" | string;

type StoreProductGridProps = {
  anchorId?: string;
  allLabel: string;
  discountsLabel: string;
  resultsLabel: string;
  emptyLabel: string;
  addToCartLabel: string;
  addedToCartLabel: string;
  openProductLabel: string;
  sortLabel: string;
  filterLabel: string;
  sortOptions: {
    priceAsc: string;
    priceDesc: string;
    nameAsc: string;
  };
  categories: string[];
  products: StoreProduct[];
};

export default function StoreProductGrid({
  anchorId,
  allLabel,
  discountsLabel,
  resultsLabel,
  emptyLabel,
  addToCartLabel,
  addedToCartLabel,
  openProductLabel,
  sortLabel,
  filterLabel,
  sortOptions,
  categories,
  products,
}: StoreProductGridProps) {
  const [activeCategory, setActiveCategory] = useState(allLabel);
  const [showDiscountsOnly, setShowDiscountsOnly] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("default");

  let filteredProducts =
    activeCategory === allLabel
      ? [...products]
      : products.filter((product) => product.category === activeCategory);

  if (showDiscountsOnly) {
    filteredProducts = filteredProducts.filter((product) => product.isDiscounted);
  }

  if (sortKey === "priceAsc") {
    filteredProducts.sort((left, right) => left.amountCents - right.amountCents);
  } else if (sortKey === "priceDesc") {
    filteredProducts.sort((left, right) => right.amountCents - left.amountCents);
  } else if (sortKey === "nameAsc") {
    filteredProducts.sort((left, right) => left.name.localeCompare(right.name));
  }

  const filterItems = [allLabel, ...categories];
  const mobileFilterValue: MobileFilterValue = showDiscountsOnly
    ? "discounts"
    : activeCategory === allLabel
      ? "all"
      : activeCategory;

  const handleMobileFilterChange = (value: MobileFilterValue) => {
    if (value === "discounts") {
      setActiveCategory(allLabel);
      setShowDiscountsOnly(true);
      return;
    }

    if (value === "all") {
      setActiveCategory(allLabel);
      setShowDiscountsOnly(false);
      return;
    }

    setShowDiscountsOnly(false);
    setActiveCategory(value);
  };

  return (
    <section id={anchorId} className="space-y-6 md:space-y-7">
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center">
        <div className="md:order-1">
          <select
            value={sortKey}
            onChange={(event) => setSortKey(event.target.value as SortKey)}
            aria-label={sortLabel}
            className="min-w-[13rem] border border-[color:var(--color-primary)]/10 bg-white px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-primary)] outline-none transition focus:border-[color:var(--color-primary)] sm:text-[12px]"
          >
            <option value="default">{sortLabel}</option>
            <option value="priceAsc">{sortOptions.priceAsc}</option>
            <option value="priceDesc">{sortOptions.priceDesc}</option>
            <option value="nameAsc">{sortOptions.nameAsc}</option>
          </select>
        </div>

        <div className="md:hidden">
          <select
            value={mobileFilterValue}
            onChange={(event) =>
              handleMobileFilterChange(event.target.value as MobileFilterValue)
            }
            aria-label={filterLabel}
            className="min-w-[13rem] border border-[color:var(--color-primary)]/10 bg-white px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-primary)] outline-none transition focus:border-[color:var(--color-primary)] sm:text-[12px]"
          >
            <option value="all">{filterLabel}</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
            <option value="discounts">{discountsLabel}</option>
          </select>
        </div>

        <div className="hidden flex-wrap gap-3 md:order-2 md:flex">
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

          <button
            type="button"
            onClick={() => setShowDiscountsOnly((current) => !current)}
            aria-pressed={showDiscountsOnly}
            className={cn(
              "cursor-pointer border border-[color:var(--color-thirdary)] px-4 py-3 text-[11px] uppercase tracking-[0.22em] transition sm:text-[12px]",
              showDiscountsOnly
                ? "bg-[color:var(--color-thirdary)] text-[color:var(--color-primary)]"
                : "bg-[color:var(--color-thirdary)] text-[color:var(--color-primary)] opacity-78 hover:opacity-100"
            )}
          >
            {discountsLabel}
          </button>
        </div>
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
