"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/store/AddToCartButton";
import StoreCartDropdown from "@/components/store/StoreCartDropdown";
import CompactHeader from "@/components/UI/CompactHeader";
import { useResetScrollOnMount } from "@/hooks/useResetScrollOnMount";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getAllStoreProducts } from "@/lib/storeCatalog";
import { cn } from "@/lib/utils";
import type { StoreContentByLanguage, StoreProduct } from "./types";

type StoreProductDetailContentProps = {
  slug: string;
  contentByLanguage: StoreContentByLanguage;
  storeBasePath: string;
  initialProduct?: StoreProduct | null;
};

export default function StoreProductDetailContent({
  slug,
  contentByLanguage,
  storeBasePath,
  initialProduct,
}: StoreProductDetailContentProps) {
  const { lang, toggleLang } = useSiteLanguage();
  const content = contentByLanguage[lang];
  const localizedProduct =
    content.products.find((item) => item.slug === slug) ||
    content.products.find((item) => item.formats?.some((f) => f.slug === slug));

  const product = localizedProduct
    ? {
        ...localizedProduct,
        ...(initialProduct
          ? {
              price: initialProduct.price,
              amountCents: initialProduct.amountCents,
              quantity: initialProduct.quantity,
              inStock: initialProduct.inStock,
              imageSrc: initialProduct.imageSrc || localizedProduct.imageSrc,
              formats: initialProduct.formats || localizedProduct.formats,
            }
          : {}),
      }
    : initialProduct;

  const defaultFormatSlug = useMemo(() => {
    if (!product?.formats || product.formats.length === 0) return slug;
    // Cerca se lo slug corrisponde a uno specifico formato (es. arrivando da link vecchio)
    const exactMatch = product.formats.find((f) => f.slug === slug);
    if (exactMatch) return exactMatch.slug;
    // Cerca il formato da 50ml come predefinito di punta
    const format50 = product.formats.find((f) => f.slug.includes("50ml"));
    return format50 ? format50.slug : product.formats[0].slug;
  }, [product, slug]);

  const [selectedFormatSlug, setSelectedFormatSlug] = useState<string>(defaultFormatSlug);

  const activeFormat = useMemo(() => {
    return product?.formats?.find((f) => f.slug === selectedFormatSlug) || null;
  }, [product, selectedFormatSlug]);

  const currentPrice = activeFormat ? activeFormat.price : (product?.price ?? "00,00€");
  const currentAmountCents = activeFormat ? activeFormat.amountCents : (product?.amountCents ?? 0);
  const currentInStock = activeFormat
    ? (activeFormat.inStock ?? false)
    : (product?.inStock ?? false);
  const cartSlug = activeFormat ? activeFormat.slug : (product?.slug ?? slug);

  const cartProducts = useMemo(() => {
    const base = getAllStoreProducts(lang);
    if (!initialProduct) return base;
    const initialWithBase = { ...initialProduct, storeBasePath };
    return [
      ...base.filter((p) => p.slug !== initialProduct.slug),
      initialWithBase,
    ];
  }, [lang, initialProduct, storeBasePath]);

  useResetScrollOnMount();

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-primary">
      <CompactHeader
        lang={lang}
        onToggleLang={toggleLang}
        accessory={
          <StoreCartDropdown
            lang={lang}
            products={cartProducts}
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
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 xl:hidden">
            <Link
              href={storeBasePath}
              className="inline-flex w-fit items-center gap-2.5 border border-[color:var(--color-primary)]/10 bg-white px-3.5 py-2.5 text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-primary)] transition hover:border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white sm:px-4 sm:py-3 sm:text-[11px] sm:tracking-[0.22em]"
            >
              <span aria-hidden="true">&larr;</span>
              <span>{content.backToStoreLabel}</span>
            </Link>
          </div>

          <div className="grid gap-5 sm:gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:items-start">
            <div className="overflow-hidden bg-[color:var(--color-primary)]/[0.02] xl:bg-transparent">
              <div className="relative mx-auto aspect-square max-h-[22rem] w-full sm:max-h-[26rem] xl:aspect-[4/5] xl:max-h-none">
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  fill
                  sizes="(min-width: 1280px) 44vw, 100vw"
                  className="object-contain p-4 sm:p-6"
                />
              </div>
            </div>

            <div className="space-y-5 border border-[color:var(--color-primary)]/10 bg-white p-5 shadow-[0_24px_70px_rgba(31,39,92,0.08)] sm:space-y-6 sm:p-6 md:p-8">
              <Link
                href={storeBasePath}
                className="hidden w-fit items-center gap-3 border border-[color:var(--color-primary)]/10 bg-white px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-primary)] transition hover:border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white sm:text-[12px] xl:inline-flex"
              >
                <span aria-hidden="true">&larr;</span>
                <span>{content.backToStoreLabel}</span>
              </Link>

              <div className="space-y-3">
                <h1 className="font-change-serif-bold text-[1.65rem] uppercase leading-[0.98] tracking-[0.015em] text-[color:var(--color-primary)] sm:text-[2.35rem] md:text-[3.2rem] md:leading-[0.94]">
                  {product.name}
                </h1>
                <p className="text-[12px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] sm:text-[13px]">
                  {currentPrice}
                </p>
                <p className="text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:text-[15px] md:leading-7">
                  {product.shortDescription}
                </p>
              </div>

              {product.formats && product.formats.length > 1 && (
                <div className="space-y-2.5 pt-1">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)]">
                    {content.formatLabel || "Formato"}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {product.formats.map((format) => {
                      const isSelected = activeFormat?.slug === format.slug;
                      return (
                        <button
                          key={format.slug}
                          type="button"
                          onClick={() => setSelectedFormatSlug(format.slug)}
                          className={cn(
                            "cursor-pointer border px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300 sm:text-[12px]",
                            isSelected
                              ? "border-[color:var(--color-thirdary)] bg-[color:var(--color-thirdary)] text-[color:var(--color-primary)] shadow-sm"
                              : "border-[color:var(--color-primary)]/20 bg-white text-[color:var(--color-primary)] hover:border-[color:var(--color-thirdary)] hover:text-[color:var(--color-thirdary)]"
                          )}
                        >
                          {format.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <AddToCartButton
                productSlug={cartSlug}
                idleLabel={content.addToCartLabel}
                addedLabel={content.addedToCartLabel}
                disabled={currentInStock === false || currentAmountCents === 0}
                outOfStockLabel={currentInStock === false ? "Non disponibile" : "In arrivo"}
                className="w-full sm:w-fit sm:min-w-[15rem]"
              />

              <div className="space-y-3.5 border-t border-[color:var(--color-primary)]/10 pt-5 sm:space-y-4 sm:pt-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] sm:text-[12px]">
                  {content.detailLabel}
                </p>
                {product.fullDescription.map((paragraph: string, idx: number) => (
                  <p
                    key={`${product.slug}-desc-${idx}`}
                    className="text-[13px] leading-6 text-[color:var(--color-secondary)] sm:text-sm md:text-[15px] md:leading-7"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
