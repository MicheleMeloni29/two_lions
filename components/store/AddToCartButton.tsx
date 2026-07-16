"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const CART_STORAGE_KEY = "two-lions-store-cart";

type AddToCartButtonProps = {
  productSlug: string;
  idleLabel: string;
  addedLabel: string;
  className?: string;
};

type CartState = Record<string, number>;

function readCart(): CartState {
  if (typeof window === "undefined") {
    return {};
  }

  const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);

  if (!rawCart) {
    return {};
  }

  try {
    return JSON.parse(rawCart) as CartState;
  } catch {
    return {};
  }
}

export default function AddToCartButton({
  productSlug,
  idleLabel,
  addedLabel,
  className,
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(() => {
    const cart = readCart();
    return Boolean(cart[productSlug]);
  });

  const handleClick = () => {
    const currentCart = readCart();
    const nextQuantity = (currentCart[productSlug] ?? 0) + 1;
    const nextCart = {
      ...currentCart,
      [productSlug]: nextQuantity,
    };

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextCart));
    setIsAdded(true);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex w-full items-center justify-center border border-[color:var(--color-thirdary)] bg-[color:var(--color-thirdary)] px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-primary)] transition hover:bg-white hover:border-[color:var(--color-thirdary)] sm:text-[12px]",
        className
      )}
    >
      {isAdded ? addedLabel : idleLabel}
    </button>
  );
}
