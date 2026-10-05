"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import StoreProductCard from "./StoreProductCard";
import type { StoreProduct } from "./types";

type SortKey = "default" | "priceAsc" | "priceDesc" | "nameAsc";
type MobileFilterValue = "all" | "discounts" | string;

type StoreProductGridProps = {
  anchorId?: string;
  productBasePath: string;
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
  productBasePath,
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
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement | null>(null);
  const mobileFilterDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isSortOpen && !isMobileFilterOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortOpen(false);
      }

      if (
        mobileFilterDropdownRef.current &&
        !mobileFilterDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMobileFilterOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSortOpen(false);
        setIsMobileFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isSortOpen, isMobileFilterOpen]);

  const normalizedActiveCategory =
    activeCategory === allLabel || categories.includes(activeCategory)
      ? activeCategory
      : allLabel;

  let filteredProducts =
    normalizedActiveCategory === allLabel
      ? [...products]
      : products.filter(
          (product) => product.category === normalizedActiveCategory
        );

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
    : normalizedActiveCategory === allLabel
      ? "all"
      : normalizedActiveCategory;

  const sortMenuItems: { value: SortKey; label: string }[] = [
    { value: "default", label: sortLabel },
    { value: "priceAsc", label: sortOptions.priceAsc },
    { value: "priceDesc", label: sortOptions.priceDesc },
    { value: "nameAsc", label: sortOptions.nameAsc },
  ];

  const mobileFilterMenuItems: { value: MobileFilterValue; label: string }[] = [
    { value: "all", label: filterLabel },
    ...categories.map((category) => ({ value: category, label: category })),
    { value: "discounts", label: discountsLabel },
  ];

  const activeSortLabel =
    sortMenuItems.find((item) => item.value === sortKey)?.label ?? sortLabel;

  const activeMobileFilterLabel =
    mobileFilterMenuItems.find((item) => item.value === mobileFilterValue)
      ?.label ?? filterLabel;

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
    <section id={anchorId} className="space-y-5 sm:space-y-6 md:space-y-7">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:flex md:flex-row md:flex-wrap md:items-center md:gap-4">
        <div className="relative min-w-0 md:order-1" ref={sortDropdownRef}>
          <button
            type="button"
            onClick={() => {
              setIsMobileFilterOpen(false);
              setIsSortOpen((current) => !current);
            }}
            aria-expanded={isSortOpen}
            aria-haspopup="listbox"
            aria-label={sortLabel}
            className={cn(
              "flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 border bg-white px-2.5 py-2.5 text-[10px] uppercase tracking-[0.12em] transition-colors duration-200 sm:px-3.5 sm:py-3 sm:text-[11px] sm:tracking-[0.16em] md:w-auto md:min-w-[13rem] md:px-4 md:py-3 md:text-[12px] md:tracking-[0.18em]",
              isSortOpen || sortKey !== "default"
                ? "border-[color:var(--color-primary)] text-[color:var(--color-thirdary)]"
                : "border-[color:var(--color-primary)]/10 text-[color:var(--color-primary)] hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-thirdary)]"
            )}
          >
            <span className="truncate">{activeSortLabel}</span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className={`h-4 w-4 shrink-0 transition-transform duration-300 ease-out ${
                isSortOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <AnimatePresence>
            {isSortOpen ? (
              <motion.div
                key="store-sort-dropdown"
                role="listbox"
                aria-label={sortLabel}
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-full z-30 mt-2 w-max min-w-full max-w-[calc(100vw-1.75rem)] border border-[color:var(--color-primary)]/10 bg-white/95 px-2.5 py-2.5 shadow-[0_18px_42px_-12px_rgba(0,20,60,0.09),0_4px_12px_-2px_rgba(0,20,60,0.03)] backdrop-blur-xl sm:px-3 sm:py-3 md:w-[16rem]"
              >
                <div className="flex flex-col space-y-0.5">
                  {sortMenuItems.map((item) => {
                    const isItemActive = sortKey === item.value;

                    return (
                      <button
                        key={item.value}
                        type="button"
                        role="option"
                        aria-selected={isItemActive}
                        onClick={() => {
                          setSortKey(item.value);
                          setIsSortOpen(false);
                        }}
                        className={`group relative flex w-full cursor-pointer items-center py-2.5 pl-4 pr-2 text-left text-[10.5px] uppercase tracking-[0.18em] transition-all duration-200 sm:text-[11px] sm:tracking-[0.2em] lg:text-[11.5px] ${
                          isItemActive
                            ? "font-medium text-[color:var(--color-thirdary)]"
                            : "text-[color:var(--color-primary)] hover:translate-x-1 hover:text-[color:var(--color-thirdary)]"
                        }`}
                      >
                        <span
                          className={`absolute left-0 top-1/2 h-3.5 w-[2px] -translate-y-1/2 transition-all duration-200 ${
                            isItemActive
                              ? "bg-[color:var(--color-thirdary)] opacity-100"
                              : "bg-[color:var(--color-thirdary)] opacity-0 group-hover:opacity-100"
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="relative min-w-0 md:hidden" ref={mobileFilterDropdownRef}>
          <button
            type="button"
            onClick={() => {
              setIsSortOpen(false);
              setIsMobileFilterOpen((current) => !current);
            }}
            aria-expanded={isMobileFilterOpen}
            aria-haspopup="listbox"
            aria-label={filterLabel}
            className={cn(
              "flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 border bg-white px-2.5 py-2.5 text-[10px] uppercase tracking-[0.12em] transition-colors duration-200 sm:px-3.5 sm:py-3 sm:text-[11px] sm:tracking-[0.16em]",
              isMobileFilterOpen || mobileFilterValue !== "all"
                ? "border-[color:var(--color-primary)] text-[color:var(--color-thirdary)]"
                : "border-[color:var(--color-primary)]/10 text-[color:var(--color-primary)] hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-thirdary)]"
            )}
          >
            <span className="truncate">{activeMobileFilterLabel}</span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className={`h-4 w-4 shrink-0 transition-transform duration-300 ease-out ${
                isMobileFilterOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <AnimatePresence>
            {isMobileFilterOpen ? (
              <motion.div
                key="store-mobile-filter-dropdown"
                role="listbox"
                aria-label={filterLabel}
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 top-full z-30 mt-2 w-max min-w-full max-w-[calc(100vw-1.75rem)] border border-[color:var(--color-primary)]/10 bg-white/95 px-2.5 py-2.5 shadow-[0_18px_42px_-12px_rgba(0,20,60,0.09),0_4px_12px_-2px_rgba(0,20,60,0.03)] backdrop-blur-xl sm:px-3 sm:py-3"
              >
                <div className="flex flex-col space-y-0.5">
                  {mobileFilterMenuItems.map((item) => {
                    const isItemActive = mobileFilterValue === item.value;

                    return (
                      <button
                        key={item.value}
                        type="button"
                        role="option"
                        aria-selected={isItemActive}
                        onClick={() => {
                          handleMobileFilterChange(item.value);
                          setIsMobileFilterOpen(false);
                        }}
                        className={`group relative flex w-full cursor-pointer items-center py-2.5 pl-4 pr-2 text-left text-[10.5px] uppercase tracking-[0.18em] transition-all duration-200 sm:text-[11px] sm:tracking-[0.2em] ${
                          isItemActive
                            ? "font-medium text-[color:var(--color-thirdary)]"
                            : "text-[color:var(--color-primary)] hover:translate-x-1 hover:text-[color:var(--color-thirdary)]"
                        }`}
                      >
                        <span
                          className={`absolute left-0 top-1/2 h-3.5 w-[2px] -translate-y-1/2 transition-all duration-200 ${
                            isItemActive
                              ? "bg-[color:var(--color-thirdary)] opacity-100"
                              : "bg-[color:var(--color-thirdary)] opacity-0 group-hover:opacity-100"
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="hidden flex-wrap gap-3 md:order-2 md:flex">
          {filterItems.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={normalizedActiveCategory === category}
              className={cn(
                "cursor-pointer border px-4 py-3 text-[11px] uppercase tracking-[0.22em] transition sm:text-[12px]",
                normalizedActiveCategory === category
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
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <StoreProductCard
              key={product.id}
              product={product}
              productBasePath={productBasePath}
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
