"use client";

import { useStoreCart } from "@/hooks/useStoreCart";
import { cn } from "@/lib/utils";

type AddToCartButtonProps = {
  productSlug: string;
  idleLabel: string;
  addedLabel: string;
  className?: string;
};

export default function AddToCartButton({
  productSlug,
  idleLabel,
  addedLabel,
  className,
}: AddToCartButtonProps) {
  const { cart, addItem } = useStoreCart();
  const isAdded = Boolean(cart[productSlug]);

  const handleClick = () => {
    addItem(productSlug);
  };

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
