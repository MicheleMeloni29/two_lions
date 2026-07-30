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
        "inline-flex w-full items-center justify-center border border-[color:var(--color-thirdary)] bg-white px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] transition-colors hover:border-[color:var(--color-thirdary)] hover:bg-[color:var(--color-thirdary)] hover:text-[color:var(--color-primary)] sm:text-[12px]",
        className
      )}
    >
      {isAdded ? addedLabel : idleLabel}
    </button>
  );
}
