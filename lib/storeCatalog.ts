import { storePageContent as foodBeverageStoreContent } from "@/app/food-and-beverage/store/storeContent";
import { storePageContent as parfumStoreContent } from "@/app/parfum/store/storeContent";
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
    ...parfumStoreContent[lang].products.flatMap((product) => {
      const base: StoreCatalogProduct = {
        ...product,
        storeBasePath: "/parfum/store",
      };
      if (!product.formats || product.formats.length === 0) {
        return [base];
      }
      const formatProducts: StoreCatalogProduct[] = product.formats.map((f) => ({
        ...product,
        id: f.id,
        slug: f.slug,
        name: `${product.name} (${f.label})`,
        price: f.price,
        amountCents: f.amountCents,
        isDiscounted: Boolean(f.isDiscounted),
        inStock: Boolean(f.inStock),
        quantity: f.quantity ?? product.quantity,
        storeBasePath: "/parfum/store",
      }));
      return [base, ...formatProducts];
    }),
  ];
}
