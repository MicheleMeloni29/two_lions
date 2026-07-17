"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatStorePrice } from "@/lib/storePricing";
import { useStoreCart } from "@/hooks/useStoreCart";
import type { StoreProduct } from "./types";

type StoreCartDropdownProps = {
  lang: "it" | "en";
  products: StoreProduct[];
  labels: {
    cartTitle: string;
    emptyCartLabel: string;
    checkoutLabel: string;
    quantityLabel: string;
    totalLabel: string;
    cartAriaLabel: string;
    removeFromCartLabel: string;
  };
};

export default function StoreCartDropdown({
  lang,
  products,
  labels,
}: StoreCartDropdownProps) {
  const { cart, itemCount, removeItem } = useStoreCart();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const cartItems = useMemo(() => {
    return products
      .filter((product) => (cart[product.slug] ?? 0) > 0)
      .map((product) => ({
        product,
        quantity: cart[product.slug],
      }));
  }, [cart, products]);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.amountCents * item.quantity,
    0
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative shrink-0" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-label={labels.cartAriaLabel}
        className="relative inline-flex h-11 w-11 items-center justify-center bg-transparent text-[color:var(--color-primary)] transition-colors hover:text-[color:var(--color-thirdary)]"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
          <path d="M3 4h2l2.2 10.2a1 1 0 0 0 1 .8h9.5a1 1 0 0 0 1-.8L21 7H7.2" />
        </svg>

        {itemCount > 0 ? (
          <span className="absolute -right-1.5 -top-1.5 inline-flex min-h-[1.3rem] min-w-[1.3rem] items-center justify-center rounded-full bg-[color:var(--color-thirdary)] px-1 text-[10px] font-semibold leading-none text-[color:var(--color-primary)]">
            {itemCount}
          </span>
        ) : null}
      </button>

      <div
        className={cn(
          "absolute right-0 top-[calc(100%+0.75rem)] z-[90] w-[min(92vw,24rem)] border border-[color:var(--color-primary)]/10 bg-white shadow-[0_28px_80px_-40px_rgba(0,35,91,0.45)] transition-all duration-200 max-md:fixed max-md:left-2 max-md:right-2 max-md:top-[4.9rem] max-md:w-auto",
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-1 opacity-0"
        )}
      >
        <div className="border-b border-[color:var(--color-primary)]/10 px-5 py-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)]">
            {labels.cartTitle}
          </p>
        </div>

        {cartItems.length > 0 ? (
          <>
            <div className="max-h-[22rem] overflow-y-auto px-5 py-4">
              <div className="space-y-4">
                {cartItems.map(({ product, quantity }) => (
                  <div
                    key={product.slug}
                    className="grid grid-cols-[4rem_minmax(0,1fr)_auto] gap-3"
                  >
                    <Link
                      href={`/food-and-beverage/store/${product.slug}`}
                      className="relative aspect-square overflow-hidden border border-[color:var(--color-primary)]/8 bg-[color:var(--color-secondary)]/4"
                    >
                      <Image
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    <Link
                      href={`/food-and-beverage/store/${product.slug}`}
                      className="min-w-0 space-y-2"
                    >
                      <p className="font-change-serif-bold text-[0.95rem] uppercase leading-[1.08] tracking-[0.02em] text-[color:var(--color-primary)]">
                        {product.name}
                      </p>
                      <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-secondary)]">
                        <span>
                          {labels.quantityLabel} {quantity}
                        </span>
                        <span className="font-change-serif-bold text-[color:var(--color-thirdary)]">
                          {formatStorePrice(product.amountCents * quantity, lang)}
                        </span>
                      </div>
                    </Link>

                    <button
                      type="button"
                      onClick={() => removeItem(product.slug)}
                      className="self-start text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-primary)]/70 transition hover:text-[color:var(--color-thirdary)]"
                    >
                      {labels.removeFromCartLabel}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[color:var(--color-primary)]/10 px-5 py-4">
              <div className="mb-4 flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-primary)]">
                <span>{labels.totalLabel}</span>
                <span className="font-change-serif-bold text-[1rem] tracking-[0.01em] text-[color:var(--color-thirdary)]">
                  {formatStorePrice(totalAmount, lang)}
                </span>
              </div>

              <Link
                href="/food-and-beverage/store/checkout"
                className="inline-flex w-full items-center justify-center border border-[color:var(--color-thirdary)] bg-[color:var(--color-thirdary)] px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-primary)] transition hover:bg-[color:var(--color-primary)] hover:text-white sm:text-[12px]"
              >
                {labels.checkoutLabel}
              </Link>
            </div>
          </>
        ) : (
          <div className="px-5 py-6 text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm">
            {labels.emptyCartLabel}
          </div>
        )}
      </div>
    </div>
  );
}
