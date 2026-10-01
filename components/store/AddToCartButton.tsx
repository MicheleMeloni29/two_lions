"use client";

import { useStoreCart } from "@/hooks/useStoreCart";
import { cn } from "@/lib/utils";

type AddToCartButtonProps = {
  productSlug: string;
  idleLabel: string;
  addedLabel: string;
  outOfStockLabel?: string;
  disabled?: boolean;
  className?: string;
};

export default function AddToCartButton({
  productSlug,
  idleLabel,
  addedLabel,
  outOfStockLabel = "Non disponibile",
  disabled = false,
  className,
}: AddToCartButtonProps) {
  const { cart, addItem } = useStoreCart();
  const isAdded = Boolean(cart[productSlug]);

  const handleClick = () => {
    if (disabled) return;
    addItem(productSlug);
  };

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        className={cn(
          "inline-flex w-full cursor-not-allowed items-center justify-center border border-zinc-200 bg-zinc-100 px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-zinc-400 opacity-80 sm:text-[12px]",
          className
        )}
      >
        {outOfStockLabel}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex w-full cursor-pointer items-center justify-center border transition-all duration-300 px-5 py-3 text-[11px] uppercase tracking-[0.22em] sm:text-[12px]",
        isAdded
          ? "border-[color:var(--color-thirdary)] bg-[color:var(--color-thirdary)] font-medium text-[color:var(--color-primary)] shadow-sm"
          : "border-[color:var(--color-thirdary)] bg-white text-[color:var(--color-thirdary)] hover:bg-[color:var(--color-thirdary)] hover:text-[color:var(--color-primary)]",
        className
      )}
    >
      {isAdded ? addedLabel : idleLabel}
    </button>
  );
}
