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

function parseOlfactoryDetails(paragraphs: string[]) {
  let family = "";
  let gender = "";
  let headNotes = "";
  let heartNotes = "";
  let baseNotes = "";
  const storyParagraphs: string[] = [];

  for (const p of paragraphs) {
    const trimmed = p.trim();
    if (!trimmed) continue;

    if (/famiglia olfattiva|olfactory family/i.test(trimmed)) {
      family = trimmed;
    } else if (/genere:|gender:/i.test(trimmed)) {
      gender = trimmed;
    } else if (/note di testa|top notes/i.test(trimmed)) {
      headNotes = trimmed.replace(/^.*?(note di testa|top notes)[:\s-]*/i, "").trim();
    } else if (/note di cuore|heart notes/i.test(trimmed)) {
      heartNotes = trimmed.replace(/^.*?(note di cuore|heart notes)[:\s-]*/i, "").trim();
    } else if (/note di (fondo|base)|base notes/i.test(trimmed)) {
      baseNotes = trimmed.replace(/^.*?(note di (fondo|base)|base notes)[:\s-]*/i, "").trim();
    } else if (/piramide olfattiva|olfactory pyramid|tags:/i.test(trimmed)) {
      // Intestazione saltata, verrà renderizzata nel widget dedicato
    } else {
      storyParagraphs.push(trimmed);
    }
  }

  const hasPyramid = Boolean(headNotes || heartNotes || baseNotes);

  return {
    family,
    gender,
    headNotes,
    heartNotes,
    baseNotes,
    hasPyramid,
    storyParagraphs,
  };
}

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
    const exactMatch = product.formats.find((f) => f.slug === slug);
    if (exactMatch) return exactMatch.slug;
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

  const {
    family,
    gender,
    headNotes,
    heartNotes,
    baseNotes,
    hasPyramid,
    storyParagraphs,
  } = parseOlfactoryDetails(product.fullDescription);

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

      <section className="px-3.5 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 md:px-8 md:pb-24 md:pt-32 xl:px-14 xl:pb-28 xl:pt-36">
        <div className="mx-auto max-w-7xl">
          {/* Pulsante Torna allo Store per Mobile */}
          <div className="mb-5 xl:hidden">
            <Link
              href={storeBasePath}
              className="inline-flex w-fit items-center gap-2.5 border border-[color:var(--color-primary)]/15 bg-white px-3.5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-primary)] transition hover:border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white"
            >
              <span aria-hidden="true">&larr;</span>
              <span>{content.backToStoreLabel}</span>
            </Link>
          </div>

          <div className="grid gap-8 lg:gap-10 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-start">
            {/* COLONNA SINISTRA: Foto del Prodotto (Sticky su desktop) */}
            <div className="xl:sticky xl:top-32 space-y-4">
              <div className="relative overflow-hidden border border-[color:var(--color-primary)]/10 bg-gradient-to-b from-neutral-50/70 to-white p-5 sm:p-8 shadow-[0_20px_60px_rgba(31,39,92,0.06)]">
                {/* Badge Eau de Parfum */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block border border-[color:var(--color-primary)]/15 bg-white/95 backdrop-blur-xs px-3 py-1.5 text-[9px] uppercase tracking-[0.25em] text-[color:var(--color-primary)] font-medium shadow-xs">
                    Eau de Parfum
                  </span>
                </div>

                {/* Immagine Flacone */}
                <div className="relative mx-auto aspect-square w-full sm:aspect-[4/5] max-w-[26rem] flex items-center justify-center">
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    fill
                    priority
                    sizes="(min-width: 1280px) 42vw, (min-width: 640px) 70vw, 100vw"
                    className="object-contain p-3 sm:p-6 transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
              </div>

              {/* Garanzie e Valori Two Lions */}
              <div className="grid grid-cols-3 gap-2 border border-[color:var(--color-primary)]/10 bg-neutral-50/50 p-3 sm:p-4 text-center">
                <div className="space-y-0.5">
                  <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] text-[color:var(--color-primary)]">
                    {lang === "it" ? "100% Autentico" : "100% Authentic"}
                  </p>
                  <p className="text-[9px] text-[color:var(--color-secondary)]">
                    {lang === "it" ? "Two Lions Original" : "Original Blend"}
                  </p>
                </div>
                <div className="border-x border-[color:var(--color-primary)]/10 space-y-0.5">
                  <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] text-[color:var(--color-primary)]">
                    {lang === "it" ? "Made in Italy" : "Italian Craft"}
                  </p>
                  <p className="text-[9px] text-[color:var(--color-secondary)]">
                    {lang === "it" ? "Essenze Pregiate" : "Haute Parfumerie"}
                  </p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] text-[color:var(--color-primary)]">
                    {lang === "it" ? "Spedizione Rapida" : "Fast Delivery"}
                  </p>
                  <p className="text-[9px] text-[color:var(--color-secondary)]">
                    {lang === "it" ? "Corriere Espresso" : "Express Courier"}
                  </p>
                </div>
              </div>
            </div>

            {/* COLONNA DESTRA: Dettagli, Formati, Acquisto e Descrizione COMPLETA */}
            <div className="space-y-6 sm:space-y-7 border border-[color:var(--color-primary)]/10 bg-white p-6 shadow-[0_24px_70px_rgba(31,39,92,0.08)] sm:p-8 md:p-10">
              {/* Pulsante Torna allo Store Desktop */}
              <Link
                href={storeBasePath}
                className="hidden w-fit items-center gap-3 border border-[color:var(--color-primary)]/15 bg-white px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-primary)] transition hover:border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white xl:inline-flex"
              >
                <span aria-hidden="true">&larr;</span>
                <span>{content.backToStoreLabel}</span>
              </Link>

              {/* Titolo e Intestazione Prodotto */}
              <div className="space-y-3">
                <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-thirdary)]">
                  Two Lions • Haute Parfumerie
                </span>
                <h1 className="font-change-serif-bold text-[1.85rem] uppercase leading-[1.02] tracking-[0.015em] text-[color:var(--color-primary)] sm:text-[2.6rem] md:text-[3.2rem]">
                  {product.name}
                </h1>

                {/* Badge Famiglia Olfattiva & Genere se presenti */}
                {(family || gender) && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {family && (
                      <span className="inline-flex items-center border border-[color:var(--color-primary)]/15 bg-neutral-50 px-2.5 py-1 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] text-[color:var(--color-primary)]">
                        {family}
                      </span>
                    )}
                    {gender && (
                      <span className="inline-flex items-center border border-[color:var(--color-primary)]/15 bg-neutral-50 px-2.5 py-1 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] text-[color:var(--color-primary)]">
                        {gender}
                      </span>
                    )}
                  </div>
                )}

                {/* Prezzo in evidenza */}
                <div className="pt-2">
                  <p className="font-change-serif-bold text-2xl sm:text-3xl tracking-tight text-[color:var(--color-primary)]">
                    {currentPrice}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-secondary)]/80 mt-0.5">
                    {lang === "it" ? "IVA inclusa • Confezione Luxury Two Lions" : "VAT included • Luxury Two Lions Box"}
                  </p>
                </div>

                {/* Descrizione Breve Introduttiva */}
                <p className="text-[14px] leading-relaxed text-[color:var(--color-secondary)] sm:text-[15px] pt-1">
                  {product.shortDescription}
                </p>
              </div>

              {/* SELEZIONE FORMATI (50 ml / 10 ml) */}
              {product.formats && product.formats.length > 1 && (
                <div className="space-y-3 border-y border-[color:var(--color-primary)]/10 py-5">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-thirdary)] font-semibold">
                      {content.formatLabel || (lang === "it" ? "Seleziona Formato" : "Select Size")}
                    </p>
                    {activeFormat && (
                      <span className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-primary)] font-medium">
                        {lang === "it" ? "Scelto:" : "Selected:"} <strong className="font-semibold">{activeFormat.label}</strong>
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                    {product.formats.map((format) => {
                      const isSelected = activeFormat?.slug === format.slug;
                      return (
                        <button
                          key={format.slug}
                          type="button"
                          onClick={() => setSelectedFormatSlug(format.slug)}
                          className={cn(
                            "cursor-pointer flex flex-col items-center justify-center py-3.5 px-6 border text-center transition-all duration-300 sm:min-w-[8.5rem]",
                            isSelected
                              ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)] text-white shadow-md ring-1 ring-[color:var(--color-primary)]"
                              : "border-[color:var(--color-primary)]/20 bg-white text-[color:var(--color-primary)] hover:border-[color:var(--color-thirdary)] hover:bg-neutral-50"
                          )}
                        >
                          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase">
                            {format.label}
                          </span>
                          {format.price && format.price !== "00,00€" && (
                            <span
                              className={cn(
                                "text-[10px] tracking-wider mt-0.5",
                                isSelected ? "text-amber-200" : "text-[color:var(--color-thirdary)]"
                              )}
                            >
                              {format.price}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* AZIONE DI ACQUISTO (Pulsante Carrello) */}
              <div className="space-y-2 pt-1">
                <AddToCartButton
                  productSlug={cartSlug}
                  idleLabel={content.addToCartLabel}
                  addedLabel={content.addedToCartLabel}
                  disabled={currentInStock === false || currentAmountCents === 0}
                  outOfStockLabel={currentInStock === false ? "Non disponibile" : "In arrivo"}
                  className="w-full sm:w-fit sm:min-w-[16rem]"
                />
                {currentInStock === false && (
                  <p className="text-[11px] text-amber-700 tracking-wider">
                    {lang === "it"
                      ? "Disponibile su ordinazione o in arrivo a breve."
                      : "Available on backorder or restocking soon."}
                  </p>
                )}
              </div>

              {/* DESCRIZIONE COMPLETA & PIRAMIDE OLFATTIVA */}
              <div className="space-y-5 border-t border-[color:var(--color-primary)]/10 pt-6">
                <div className="flex items-center gap-2">
                  <div className="h-px w-6 bg-[color:var(--color-thirdary)]" />
                  <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-[color:var(--color-thirdary)] font-semibold">
                    {content.detailLabel || (lang === "it" ? "Descrizione Completa" : "Full Description")}
                  </p>
                </div>

                {/* Paragrafi del racconto olfattivo */}
                <div className="space-y-3.5">
                  {storyParagraphs.map((paragraph: string, idx: number) => (
                    <p
                      key={`${product.slug}-story-${idx}`}
                      className="text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed text-[color:var(--color-secondary)] font-normal"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* PIRAMIDE OLFATTIVA STRUTTURATA (Head, Heart, Base) */}
                {hasPyramid && (
                  <div className="mt-6 space-y-3 rounded-none border border-[color:var(--color-primary)]/10 bg-neutral-50/60 p-4 sm:p-5">
                    <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-primary)]">
                      {lang === "it" ? "Piramide Olfattiva" : "Olfactory Pyramid"}
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      {headNotes && (
                        <div className="border border-[color:var(--color-primary)]/10 bg-white p-3.5 space-y-1 shadow-2xs">
                          <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-thirdary)]">
                            {lang === "it" ? "Note di Testa" : "Top Notes"}
                          </span>
                          <p className="text-xs sm:text-[13px] font-medium leading-relaxed text-[color:var(--color-primary)]">
                            {headNotes}
                          </p>
                        </div>
                      )}

                      {heartNotes && (
                        <div className="border border-[color:var(--color-primary)]/10 bg-white p-3.5 space-y-1 shadow-2xs">
                          <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-thirdary)]">
                            {lang === "it" ? "Note di Cuore" : "Heart Notes"}
                          </span>
                          <p className="text-xs sm:text-[13px] font-medium leading-relaxed text-[color:var(--color-primary)]">
                            {heartNotes}
                          </p>
                        </div>
                      )}

                      {baseNotes && (
                        <div className="border border-[color:var(--color-primary)]/10 bg-white p-3.5 space-y-1 shadow-2xs">
                          <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-thirdary)]">
                            {lang === "it" ? "Note di Fondo" : "Base Notes"}
                          </span>
                          <p className="text-xs sm:text-[13px] font-medium leading-relaxed text-[color:var(--color-primary)]">
                            {baseNotes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
