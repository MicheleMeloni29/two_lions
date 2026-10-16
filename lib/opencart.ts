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

function sortPerfumes(products: StoreProduct[]): StoreProduct[] {
  const getOrder = (item: StoreProduct) => {
    const n = item.name.toLowerCase();
    const s = item.slug.toLowerCase();
    if (n.includes("femme") || s.includes("femme")) return 1;
    if (n.includes("homme") || s.includes("homme")) return 2;
    if (n.includes("unisex") || s.includes("unisex")) return 3;
    if (n.includes("two lions") || s.includes("two-lions") || n.includes("man")) return 4;
    return 99;
  };
  return [...products].sort((a, b) => getOrder(a) - getOrder(b));
}

async function fetchLiveOpenCartStoreParfums(
  lang: "it" | "en" = "it"
): Promise<StoreProduct[]> {
  const languageParam = lang === "en" ? "en-gb" : "it-it";
  const urls = [
    `${OPENCART_API_URL}/index.php?route=product/category&path=60&language=${languageParam}`,
    `${OPENCART_API_URL}/index.php?route=product/search&search=LIONS&language=${languageParam}`,
  ];

  const seen = new Set<string>();
  const parsedProducts: StoreProduct[] = [];

  for (const url of urls) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: "text/html" },
        next: { revalidate: 60, tags: ["opencart-parfum"] },
      });
      clearTimeout(timeout);

      if (!res.ok) continue;
      const html = await res.text();
      const regex = /<div class="product-thumb">([\s\S]*?)<\/form>\s*<\/div>\s*<\/div>/g;
      let match;

      while ((match = regex.exec(html)) !== null) {
        const chunk = match[1];
        const idMatch = chunk.match(/product_id=(\d+)/);
        const nameMatch = chunk.match(/<h4><a [^>]*>([^<]+)<\/a><\/h4>/);
        const imgMatch = chunk.match(/<img [^>]*src="([^"]+)"/);
        const descMatch = chunk.match(/<p>([\s\S]*?)<\/p>/);
        const priceMatch = chunk.match(/class="price-new">([^<]+)<\/span>/);

        if (!idMatch || !nameMatch) continue;
        const ocId = idMatch[1];
        if (seen.has(ocId)) continue;
        seen.add(ocId);

        const rawName = nameMatch[1].trim();
        const rawDesc = descMatch ? descMatch[1].replace(/<[^>]+>/g, " ").trim() : "";
        const rawPrice = priceMatch ? priceMatch[1].trim() : "00,00€";

        // Determinazione slug e fallback immagini
        let slug = "parfum-product";
        let imageSrc = imgMatch ? imgMatch[1] : "";
        let baseId = `PF-${ocId}`;

        const nLower = rawName.toLowerCase();
        if (nLower.includes("femme")) {
          slug = "cagliari-pour-femme-rosso";
          baseId = "PF-CAG-FEMME";
          imageSrc = "/Parfum_Bottles/Cagliari_pourFemme.jpeg";
        } else if (nLower.includes("homme")) {
          slug = "cagliari-pour-homme-blu";
          baseId = "PF-CAG-HOMME";
          imageSrc = "/Parfum_Bottles/Cagliari_pourHomme.jpeg";
        } else if (nLower.includes("unisex")) {
          slug = "cagliari-unisex-rossoblu";
          baseId = "PF-CAG-UNISEX";
          imageSrc = "/Parfum_Bottles/Cagliari_unisex.jpeg";
        } else if (nLower.includes("two lions") || nLower.includes("man")) {
          slug = "two-lions-for-man";
          baseId = "PF-TL-MAN";
          imageSrc = "/Parfum_Bottles/TwoLions_forMan.jpg";
        }

        parsedProducts.push({
          id: baseId,
          slug,
          category: "Parfum",
          name: rawName,
          amountCents: 0,
          price: rawPrice.includes("$0.00") ? "00,00€" : rawPrice,
          isDiscounted: false,
          shortDescription: rawDesc.slice(0, 160) + (rawDesc.length > 160 ? "..." : ""),
          fullDescription: [rawDesc],
          imageSrc,
          imageAlt: rawName,
          formats: [
            {
              id: `${baseId}-50ML`,
              slug: `${slug}-50ml`,
              label: "50 ml",
              price: "00,00€",
              amountCents: 0,
              isDiscounted: false,
              inStock: true,
              quantity: 50,
            },
            {
              id: `${baseId}-10ML`,
              slug: `${slug}-10ml`,
              label: "10 ml",
              price: "00,00€",
              amountCents: 0,
              isDiscounted: false,
              inStock: true,
              quantity: 50,
            },
          ],
          inStock: true,
          quantity: 100,
        });
      }
    } catch {
      // Ignora errori di rete temporanei
    }
  }

  return sortPerfumes(parsedProducts);
}

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
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          let mapped: StoreProduct[] = data.products.map((p) => ({
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
            formats: p.formats,
            inStock: typeof p.inStock === "boolean" ? p.inStock : (p.quantity ? p.quantity > 0 : true),
            quantity: typeof p.quantity === "number" ? p.quantity : 0,
          }));

          if (!category || category.toLowerCase() === "parfum") {
            mapped = sortPerfumes(mapped);
          }
          if (slug) {
            mapped = mapped.filter((p) => p.slug === slug || p.formats?.some((f) => f.slug === slug));
          }
          return mapped;
        }
      }
    } catch {
      // Prova endpoint successivo
    }
  }

  // Fallback per categoria "parfum": estrae in tempo reale dalla vetrina pubblica live di OpenCart
  if (!category || category.toLowerCase() === "parfum") {
    try {
      const liveParfums = await fetchLiveOpenCartStoreParfums(lang);
      if (liveParfums && liveParfums.length > 0) {
        if (slug) {
          const filtered = liveParfums.filter(
            (p) => p.slug === slug || p.formats?.some((f) => f.slug === slug)
          );
          return filtered.length > 0 ? filtered : liveParfums;
        }
        return liveParfums;
      }
    } catch {
      // Fallback su null per consentire il fallback statico locale
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
