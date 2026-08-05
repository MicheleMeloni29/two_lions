import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

type DivisionStoreCtaProps = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  actionLabel: string;
};

export default function DivisionStoreCta({
  eyebrow,
  title,
  description,
  href,
  actionLabel,
}: DivisionStoreCtaProps) {
  return (
    <div className="relative isolate overflow-hidden border border-[color:var(--color-thirdary)] bg-[color:var(--color-thirdary)] px-5 py-7 text-[color:var(--color-primary)] shadow-[0_26px_70px_rgba(31,39,92,0.18)] md:px-7 md:py-8 xl:px-9 xl:py-10">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden items-center pr-8 font-change-serif-bold text-[9rem] uppercase leading-none text-white/18 md:flex xl:text-[11rem]"
        aria-hidden="true"
      >
        Shop
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.34),transparent_42%),linear-gradient(270deg,rgba(37,30,87,0.16),transparent_38%)]" />

      <div className="relative grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex w-fit items-center gap-2 border border-[color:var(--color-primary)]/18 bg-white/24 px-3 py-2 text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-primary)] sm:text-[10px] md:text-[11px]">
            <ShoppingBag
              aria-hidden="true"
              className="h-4 w-4"
              strokeWidth={1.8}
            />
            <span>{eyebrow}</span>
          </div>

          <h3 className="font-change-serif-bold max-w-[16ch] text-[2.1rem] uppercase leading-[0.92] tracking-[0.015em] text-[color:var(--color-primary)] sm:text-[2.65rem] md:text-[3.45rem] xl:text-[4rem]">
            {title}
          </h3>

          <p className="max-w-3xl border-l-2 border-[color:var(--color-primary)]/70 pl-4 text-[13px] leading-6 text-[color:var(--color-primary)]/86 sm:text-sm md:pl-5 md:text-[15px] md:leading-7">
            {description}
          </p>
        </div>

        <Link
          href={href}
          className="group inline-flex w-full items-center justify-center gap-3 border border-[color:var(--color-primary)] bg-[color:var(--color-primary)] px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-white transition hover:border-white hover:bg-white hover:text-[color:var(--color-primary)] sm:w-fit sm:text-[12px] md:px-7 md:py-5"
        >
          <span>{actionLabel}</span>
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            strokeWidth={1.8}
          />
        </Link>
      </div>
    </div>
  );
}
