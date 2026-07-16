import Link from "next/link";
import { cn } from "@/lib/utils";
import type { StoreAction, StoreButtonVariant } from "./types";

type StoreLinkButtonProps = StoreAction & {
  className?: string;
  variant?: StoreButtonVariant;
};

const variantClasses: Record<StoreButtonVariant, string> = {
  gold: "border border-[color:var(--color-thirdary)] bg-[color:var(--color-thirdary)] text-[color:var(--color-primary)] hover:bg-white hover:border-white",
  light: "border border-white/18 bg-white/10 text-white hover:bg-white hover:text-[color:var(--color-primary)]",
  outline:
    "border border-[color:var(--color-primary)]/14 bg-transparent text-[color:var(--color-primary)] hover:border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white",
};

export default function StoreLinkButton({
  href,
  label,
  variant = "gold",
  className,
}: StoreLinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex w-fit items-center justify-center px-5 py-3 text-[11px] uppercase tracking-[0.22em] transition sm:text-[12px]",
        variantClasses[variant],
        className
      )}
    >
      {label}
    </Link>
  );
}
