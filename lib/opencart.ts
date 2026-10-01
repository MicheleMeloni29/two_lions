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

  const url = new URL("/api_products.php", OPENCART_API_URL);
  if (category) url.searchParams.set("category", category);
  if (slug) url.searchParams.set("slug", slug);
  if (lang) url.searchParams.set("lang", lang);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000); // 6 secondi di timeout

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

    if (!res.ok) {
      console.warn(`[OpenCart API] HTTP Error ${res.status} da ${url.toString()}`);
      return null;
    }

    const data = (await res.json()) as OpenCartApiResponse;
    if (!data.success || !Array.isArray(data.products)) {
      console.warn("[OpenCart API] Risposta non valida:", data);
      return null;
    }

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
  } catch (error) {
    console.warn(
      `[OpenCart API] Impossibile contattare OpenCart su ${url.toString()}:`,
      error instanceof Error ? error.message : error
    );
    return null;
  }
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
