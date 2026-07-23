import { storePageContent as foodBeverageStoreContent } from "@/app/food-and-beverage/store/storeContent";
import { storePageContent as sportStoreContent } from "@/app/sport/store/storeContent";
import type { StoreCatalogProduct } from "@/components/store/types";

export function getAllStoreProducts(
  lang: "it" | "en"
): StoreCatalogProduct[] {
  return [
    ...foodBeverageStoreContent[lang].products.map((product) => ({
      ...product,
      storeBasePath: "/food-and-beverage/store",
    })),
    ...sportStoreContent[lang].products.map((product) => ({
      ...product,
      storeBasePath: "/sport/store",
    })),
  ];
}
