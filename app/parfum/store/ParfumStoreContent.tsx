"use client";

import StoreCatalogContent from "@/components/store/StoreCatalogContent";
import { storePageContent } from "./storeContent";

export default function ParfumStoreContent() {
  return (
    <StoreCatalogContent
      contentByLanguage={storePageContent}
      storeBasePath="/parfum/store"
    />
  );
}
