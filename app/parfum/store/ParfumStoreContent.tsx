"use client";

import StoreCatalogContent from "@/components/store/StoreCatalogContent";
import type { StoreProduct } from "@/components/store/types";
import { storePageContent } from "./storeContent";

type ParfumStoreContentProps = {
  liveProducts?: StoreProduct[] | null;
};

export default function ParfumStoreContent({
  liveProducts,
}: ParfumStoreContentProps) {
  return (
    <StoreCatalogContent
      contentByLanguage={storePageContent}
      storeBasePath="/parfum/store"
      liveProducts={liveProducts}
    />
  );
}
