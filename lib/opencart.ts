import type { StoreProduct } from "@/components/store/types";

export type OpenCartFetchOptions = {
  category?: string;
  slug?: string;
  lang?: "it" | "en";
  revalidate?: number;
};

type OpenCartApiResponse = {
  success: boolean;
  category?: string;
  count?: number;
  products?: (StoreProduct & { inStock?: boolean; quantity?: number })[];
  error?: string;
};

const OPENCART_API_URL =
  process.env.OPENCART_API_URL || "https://shop.twolionsinternational.com";
const OPENCART_API_SECRET =
  process.env.OPENCART_API_SECRET || "TwoLions_LiveSecret_2026_KeySecure";

/**
 * Recupera i prodotti direttamente dall'installazione OpenCart.
 * In caso di errore o server non raggiungibile, restituisce null per permettere
 * al chiamante di effettuare il fallback sui dati statici locali senza crashare.
 */
export async function getOpenCartProducts(
  options: OpenCartFetchOptions = {}
): Promise<StoreProduct[] | null> {
  const { category, slug, lang = "it", revalidate = 60 } = options;

  const endpoints = [
    "/index.php?route=extension/twolions/products",
    "/api_products.php",
  ];

  for (const endpoint of endpoints) {
    const url = new URL(endpoint, OPENCART_API_URL);
    if (category) url.searchParams.set("category", category);
    if (slug) url.searchParams.set("slug", slug);
    if (lang) url.searchParams.set("lang", lang);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${OPENCART_API_SECRET}`,
          Accept: "application/json",
        },
        next: {
          revalidate,
          tags: ["opencart-products", ...(category ? [`opencart-${category}`] : [])],
        },
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (res.ok) {
        const data = (await res.json()) as OpenCartApiResponse;
        if (data.success && Array.isArray(data.products)) {
          return data.products.map((p) => ({
            id: p.id,
            slug: p.slug,
            category: p.category,
            name: p.name,
            amountCents: p.amountCents,
            price: p.price,
            isDiscounted: Boolean(p.isDiscounted),
            shortDescription: p.shortDescription,
            fullDescription: Array.isArray(p.fullDescription)
              ? p.fullDescription
              : [p.shortDescription],
            imageSrc: p.imageSrc,
            imageAlt: p.imageAlt || p.name,
          }));
        }
      }
    } catch {
      // Prova endpoint successivo
    }
  }

  return null;
}

/**
 * Cerca un singolo prodotto su OpenCart in base allo slug.
 */
export async function getOpenCartProductBySlug(
  slug: string,
  lang: "it" | "en" = "it"
): Promise<StoreProduct | null> {
  const products = await getOpenCartProducts({ slug, lang });
  if (products && products.length > 0) {
    return products[0];
  }
  return null;
}
