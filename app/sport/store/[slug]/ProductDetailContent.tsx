"use client";

import StoreProductDetailContent from "@/components/store/StoreProductDetailContent";
import { storePageContent } from "../storeContent";

type ProductDetailContentProps = {
  slug: string;
};

export default function ProductDetailContent({
  slug,
}: ProductDetailContentProps) {
  return (
    <StoreProductDetailContent
      slug={slug}
      contentByLanguage={storePageContent}
      storeBasePath="/sport/store"
    />
  );
}
