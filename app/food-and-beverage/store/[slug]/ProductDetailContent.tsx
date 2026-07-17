"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/store/AddToCartButton";
import StoreCartDropdown from "@/components/store/StoreCartDropdown";
import CompactHeader from "@/components/UI/CompactHeader";
import { useResetScrollOnMount } from "@/hooks/useResetScrollOnMount";
import { getStoreProduct, storePageContent } from "../storeContent";

type ProductDetailContentProps = {
  slug: string;
};

export default function ProductDetailContent({
  slug,
}: ProductDetailContentProps) {
  const [lang, setLang] = useState<"it" | "en">("it");
  const content = storePageContent[lang];
  const product = getStoreProduct(lang, slug);

  useResetScrollOnMount();

  if (!product) {
    notFound();
  }

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
        <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:items-start">
          <div className="overflow-hidden border border-[color:var(--color-primary)]/10 bg-white shadow-[0_24px_70px_rgba(31,39,92,0.08)]">
            <div className="relative aspect-[4/5]">
              <Image
                src={product.imageSrc}
                alt={product.imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-6 border border-[color:var(--color-primary)]/10 bg-white p-6 shadow-[0_24px_70px_rgba(31,39,92,0.08)] md:p-8">
            <Link
              href="/food-and-beverage/store"
              className="inline-flex w-fit items-center gap-3 border border-[color:var(--color-primary)]/10 bg-white px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-primary)] transition hover:border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white sm:text-[12px]"
            >
              <span aria-hidden="true">&larr;</span>
              <span>{content.backToStoreLabel}</span>
            </Link>

            <div className="space-y-3">
              <h1 className="font-change-serif-bold text-[2rem] uppercase leading-[0.94] tracking-[0.015em] text-[color:var(--color-primary)] sm:text-[2.5rem] md:text-[3.2rem]">
                {product.name}
              </h1>
              <p className="text-[12px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] sm:text-[13px]">
                {product.price}
              </p>
              <p className="text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:text-[15px] md:leading-7">
                {product.shortDescription}
              </p>
            </div>

            <AddToCartButton
              productSlug={product.slug}
              idleLabel={content.addToCartLabel}
              addedLabel={content.addedToCartLabel}
              className="w-fit min-w-[15rem]"
            />

            <div className="space-y-4 border-t border-[color:var(--color-primary)]/10 pt-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] sm:text-[12px]">
                {content.detailLabel}
              </p>
              {product.fullDescription.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:text-[15px] md:leading-7"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
