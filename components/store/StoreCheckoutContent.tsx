"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import StoreCartDropdown from "@/components/store/StoreCartDropdown";
import CompactHeader from "@/components/UI/CompactHeader";
import { useStoreCart } from "@/hooks/useStoreCart";
import { useResetScrollOnMount } from "@/hooks/useResetScrollOnMount";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getAllStoreProducts } from "@/lib/storeCatalog";
import { formatStorePrice } from "@/lib/storePricing";
import type { StoreContentByLanguage } from "./types";

type StoreCheckoutContentProps = {
  contentByLanguage: StoreContentByLanguage;
  storeBasePath: string;
};

export default function StoreCheckoutContent({
  contentByLanguage,
  storeBasePath,
}: StoreCheckoutContentProps) {
  const { lang, toggleLang } = useSiteLanguage();
  const content = contentByLanguage[lang];
  const products = useMemo(() => getAllStoreProducts(lang), [lang]);
  const { cart } = useStoreCart();

  useResetScrollOnMount();

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

  return (
    <main className="min-h-screen bg-white text-primary">
      <CompactHeader
        lang={lang}
        onToggleLang={toggleLang}
        accessory={
          <StoreCartDropdown
            lang={lang}
            products={products}
            checkoutHref={`${storeBasePath}/checkout`}
            labels={{
              cartTitle: content.cartTitle,
              emptyCartLabel: content.emptyCartLabel,
              checkoutLabel: content.checkoutLabel,
              quantityLabel: content.quantityLabel,
              totalLabel: content.totalLabel,
              cartAriaLabel: content.cartAriaLabel,
              removeFromCartLabel: content.removeFromCartLabel,
            }}
          />
        }
      />

      <section className="px-3.5 pb-14 pt-24 sm:px-5 sm:pb-16 sm:pt-28 md:px-8 md:pb-20 md:pt-32 xl:px-14 xl:pb-24 xl:pt-36">
        <div className="mx-auto max-w-5xl space-y-5 sm:space-y-6">
          <div className="space-y-2.5 border-b border-[color:var(--color-primary)]/10 pb-5 sm:space-y-3 sm:pb-6">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)]">
              {content.checkoutTitle}
            </p>
            <h1 className="font-change-serif-bold text-[1.75rem] uppercase leading-[0.96] tracking-[0.015em] text-[color:var(--color-primary)] sm:text-[2.4rem] md:text-[3rem] md:leading-[0.94]">
              {content.checkoutLabel}
            </h1>
          </div>

          {cartItems.length > 0 ? (
            <div className="space-y-3.5 sm:space-y-4 md:space-y-5">
              {cartItems.map(({ product, quantity }) => (
                <article
                  key={product.slug}
                  className="grid grid-cols-[4.25rem_minmax(0,1fr)_auto] items-center gap-3 border border-[color:var(--color-primary)]/10 bg-white p-3.5 shadow-[0_24px_70px_rgba(31,39,92,0.08)] sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:gap-4 sm:p-4 md:grid-cols-[6rem_minmax(0,1fr)_auto] md:p-5"
                >
                  <div className="relative aspect-square overflow-hidden bg-[color:var(--color-primary)]/[0.02] md:bg-transparent">
                    <Image
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      fill
                      sizes="(min-width: 768px) 96px, (min-width: 640px) 80px, 68px"
                      className="object-contain p-1.5"
                    />
                  </div>

                  <div className="min-w-0 space-y-1.5 sm:space-y-2">
                    <p className="font-change-serif-bold line-clamp-2 text-[0.92rem] uppercase leading-[1.12] tracking-[0.02em] text-[color:var(--color-primary)] sm:text-[1rem] md:line-clamp-none md:text-[1.1rem] md:leading-[1.08]">
                      {product.name}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-secondary)] sm:text-[12px] sm:tracking-[0.18em]">
                      {content.quantityLabel} {quantity}
                    </p>
                  </div>

                  <p className="font-change-serif-bold text-right text-[1rem] tracking-[0.01em] text-[color:var(--color-thirdary)] sm:text-[1.1rem] md:text-[1.2rem]">
                    {formatStorePrice(product.amountCents * quantity, lang)}
                  </p>
                </article>
              ))}

              <div className="flex items-center justify-between border border-[color:var(--color-primary)]/10 bg-white px-4 py-4 shadow-[0_24px_70px_rgba(31,39,92,0.08)] sm:px-5 sm:py-5">
                <span className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-primary)]">
                  {content.totalLabel}
                </span>
                <span className="font-change-serif-bold text-[1.2rem] tracking-[0.01em] text-[color:var(--color-thirdary)] sm:text-[1.35rem]">
                  {formatStorePrice(totalAmount, lang)}
                </span>
              </div>
            </div>
          ) : (
            <div className="border border-[color:var(--color-primary)]/10 bg-white px-5 py-6 text-[13px] leading-6 text-[color:var(--color-secondary)] shadow-[0_24px_70px_rgba(31,39,92,0.08)] sm:text-sm md:text-[15px] md:leading-7">
              {content.checkoutEmptyLabel}
            </div>
          )}

          <Link
            href={storeBasePath}
            className="inline-flex w-full items-center justify-center border border-[color:var(--color-primary)]/14 bg-white px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-primary)] transition hover:border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white sm:w-fit sm:text-[12px]"
          >
            {content.backToStoreLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
