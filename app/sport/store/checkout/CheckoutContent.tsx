"use client";

import StoreCheckoutContent from "@/components/store/StoreCheckoutContent";
import { storePageContent } from "../storeContent";

export default function CheckoutContent() {
  return (
    <StoreCheckoutContent
      contentByLanguage={storePageContent}
      storeBasePath="/sport/store"
    />
  );
}
