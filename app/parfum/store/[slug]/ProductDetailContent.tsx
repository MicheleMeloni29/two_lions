"use client";

import StoreProductDetailContent from "@/components/store/StoreProductDetailContent";
import type { StoreProduct } from "@/components/store/types";
import { storePageContent } from "../storeContent";

type ProductDetailContentProps = {
  slug: string;
  initialProduct?: StoreProduct | null;
};

export default function ProductDetailContent({
  slug,
  initialProduct,
}: ProductDetailContentProps) {
  return (
    <StoreProductDetailContent
      slug={slug}
      contentByLanguage={storePageContent}
      storeBasePath="/parfum/store"
      initialProduct={initialProduct}
    />
  );
}
