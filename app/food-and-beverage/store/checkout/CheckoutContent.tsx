"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import StoreCartDropdown from "@/components/store/StoreCartDropdown";
import CompactHeader from "@/components/UI/CompactHeader";
import { useStoreCart } from "@/hooks/useStoreCart";
import { useResetScrollOnMount } from "@/hooks/useResetScrollOnMount";
import { formatStorePrice } from "@/lib/storePricing";
import { storePageContent } from "../storeContent";

export default function CheckoutContent() {
  const [lang, setLang] = useState<"it" | "en">("it");
  const content = storePageContent[lang];
  const { cart } = useStoreCart();

  useResetScrollOnMount();

  const cartItems = useMemo(() => {
    return content.products
      .filter((product) => (cart[product.slug] ?? 0) > 0)
      .map((product) => ({
        product,
        quantity: cart[product.slug],
      }));
  }, [cart, content.products]);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.amountCents * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-white text-primary">
      <CompactHeader
        lang={lang}
        onToggleLang={() =>
          setLang((current) => (current === "it" ? "en" : "it"))
        }
        accessory={
          <StoreCartDropdown
            lang={lang}
            products={content.products}
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

      <section className="px-4 pb-16 pt-28 sm:px-5 md:px-8 md:pb-20 md:pt-32 xl:px-14 xl:pb-24 xl:pt-36">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="space-y-3 border-b border-[color:var(--color-primary)]/10 pb-6">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)]">
              {content.checkoutTitle}
            </p>
            <h1 className="font-change-serif-bold text-[2rem] uppercase leading-[0.94] tracking-[0.015em] text-[color:var(--color-primary)] sm:text-[2.5rem] md:text-[3rem]">
              {content.checkoutLabel}
            </h1>
          </div>

          {cartItems.length > 0 ? (
            <div className="space-y-5">
              {cartItems.map(({ product, quantity }) => (
                <article
                  key={product.slug}
                  className="grid gap-4 border border-[color:var(--color-primary)]/10 bg-white p-5 shadow-[0_24px_70px_rgba(31,39,92,0.08)] md:grid-cols-[6rem_minmax(0,1fr)_auto] md:items-center"
                >
                  <div className="relative aspect-square overflow-hidden border border-[color:var(--color-primary)]/8 bg-[color:var(--color-secondary)]/4">
                    <Image
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="font-change-serif-bold text-[1.1rem] uppercase leading-[1.08] tracking-[0.02em] text-[color:var(--color-primary)]">
                      {product.name}
                    </p>
                    <p className="text-[12px] uppercase tracking-[0.18em] text-[color:var(--color-secondary)]">
                      {content.quantityLabel} {quantity}
                    </p>
                  </div>

                  <p className="font-change-serif-bold text-[1.2rem] tracking-[0.01em] text-[color:var(--color-thirdary)] md:text-right">
                    {formatStorePrice(product.amountCents * quantity, lang)}
                  </p>
                </article>
              ))}

              <div className="flex items-center justify-between border border-[color:var(--color-primary)]/10 bg-white px-5 py-5 shadow-[0_24px_70px_rgba(31,39,92,0.08)]">
                <span className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-primary)]">
                  {content.totalLabel}
                </span>
                <span className="font-change-serif-bold text-[1.35rem] tracking-[0.01em] text-[color:var(--color-thirdary)]">
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
            href="/food-and-beverage/store"
            className="inline-flex w-fit items-center justify-center border border-[color:var(--color-primary)]/14 bg-white px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-primary)] transition hover:border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white sm:text-[12px]"
          >
            {content.backToStoreLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
