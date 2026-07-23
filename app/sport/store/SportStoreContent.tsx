"use client";

import StoreCatalogContent from "@/components/store/StoreCatalogContent";
import { storePageContent } from "./storeContent";

export default function SportStoreContent() {
  return (
    <StoreCatalogContent
      contentByLanguage={storePageContent}
      storeBasePath="/sport/store"
    />
  );
}
