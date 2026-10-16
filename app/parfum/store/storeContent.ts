import type { StorePageContent, StoreProduct, StoreProductFormat } from "@/components/store/types";

type ProductCopy = {
  baseId: string;
  baseSlug: string;
  name: string;
  description: string;
  imageSrc: string;
};

const productCopy: Record<"it" | "en", ProductCopy[]> = {
  it: [
    {
      baseId: "PF-TL-SIGNATURE",
      baseSlug: "two-lions",
      name: "Two Lions",
      description:
        "L'essenza ammiraglia del brand. Un accordo regale, magnetico e senza tempo che incarna l'anima più autentica ed esclusiva di Two Lions.",
      imageSrc: "/SectionsBackgrounds/Parfum.jpeg",
    },
    {
      baseId: "PF-CAG-FEMME",
      baseSlug: "cagliari-pour-femme",
      name: "Cagliari pour femme",
      description:
        "Raffinata, luminosa e magnetica con tocchi floreali e agrumati di Sardegna. Una presenza indimenticabile.",
      imageSrc: "/Parfum_Bottles/Cagliari_pourFemme.jpeg",
    },
    {
      baseId: "PF-CAG-HOMME",
      baseSlug: "cagliari-pour-homme",
      name: "Cagliari pour homme",
      description:
        "Un accordo nobile e deciso, tra note marine e legni mediterranei. L'eleganza fiera dell'uomo Two Lions.",
      imageSrc: "/Parfum_Bottles/Cagliari_pourHomme.jpeg",
    },
    {
      baseId: "PF-CAG-UNISEX",
      baseSlug: "cagliari-unisex",
      name: "Cagliari unisex",
      description:
        "Un'essenza fresca e avvolgente che fonde brezza costiera e macchia mediterranea. Identità e armonia senza confini.",
      imageSrc: "/Parfum_Bottles/Cagliari_unisex.jpeg",
    },
  ],
  en: [
    {
      baseId: "PF-TL-SIGNATURE",
      baseSlug: "two-lions",
      name: "Two Lions",
      description:
        "The brand's flagship signature essence. A regal, magnetic, and timeless accord embodying the true luxury and spirit of Two Lions.",
      imageSrc: "/SectionsBackgrounds/Parfum.jpeg",
    },
    {
      baseId: "PF-CAG-FEMME",
      baseSlug: "cagliari-pour-femme",
      name: "Cagliari pour femme",
      description:
        "Refined, luminous, and magnetic with floral and citrus Sardinian touches. An unforgettable presence.",
      imageSrc: "/Parfum_Bottles/Cagliari_pourFemme.jpeg",
    },
    {
      baseId: "PF-CAG-HOMME",
      baseSlug: "cagliari-pour-homme",
      name: "Cagliari pour homme",
      description:
        "A noble and decisive accord of marine notes and Mediterranean woods. The proud elegance of the Two Lions man.",
      imageSrc: "/Parfum_Bottles/Cagliari_pourHomme.jpeg",
    },
    {
      baseId: "PF-CAG-UNISEX",
      baseSlug: "cagliari-unisex",
      name: "Cagliari unisex",
      description:
        "A fresh and enveloping essence blending coastal breeze and Mediterranean scrub. Identity and harmony without boundaries.",
      imageSrc: "/Parfum_Bottles/Cagliari_unisex.jpeg",
    },
  ],
};

function buildProducts(lang: "it" | "en"): StoreProduct[] {
  return productCopy[lang].map((product) => {
    const formats: StoreProductFormat[] = [
      {
        id: `${product.baseId}-50ML`,
        slug: `${product.baseSlug}-50ml`,
        label: "50 ml",
        price: "00,00€",
        amountCents: 0,
        isDiscounted: false,
        inStock: false,
        quantity: 0,
      },
      {
        id: `${product.baseId}-10ML`,
        slug: `${product.baseSlug}-10ml`,
        label: "10 ml",
        price: "00,00€",
        amountCents: 0,
        isDiscounted: false,
        inStock: false,
        quantity: 0,
      },
    ];

    return {
      id: product.baseId,
      slug: product.baseSlug,
      category: "Parfum",
      name: product.name,
      amountCents: 0,
      price: "00,00€",
      isDiscounted: false,
      shortDescription: product.description,
      fullDescription:
        lang === "it"
          ? [
              product.description,
              "Fragranza esclusiva Two Lions Parfum disponibile nei formati 50 ml e 10 ml.",
              "Prezzo temporaneamente impostato a 00,00 in attesa del collegamento a OpenCart.",
            ]
          : [
              product.description,
              "Exclusive Two Lions Parfum fragrance available in 50 ml and 10 ml formats.",
              "Price temporarily set to 00.00 while waiting for the OpenCart connection.",
            ],
      imageSrc: product.imageSrc,
      imageAlt: product.name,
      formats,
      inStock: false,
      quantity: 0,
    };
  });
}

export const storePageContent: Record<"it" | "en", StorePageContent> = {
  it: {
    allProductsLabel: "Tutti",
    discountsLabel: "Sconti",
    resultsLabel: "prodotti",
    emptyLabel: "Nessun prodotto disponibile per questo filtro.",
    addToCartLabel: "Acquista",
    addedToCartLabel: "Aggiunto",
    openProductLabel: "Vedi prodotto",
    chooseFormatLabel: "Scegli formato",
    formatLabel: "Formato",
    backToStoreLabel: "Torna allo store",
    detailLabel: "Descrizione completa",
    cartTitle: "Carrello",
    emptyCartLabel: "Il carrello e vuoto.",
    checkoutLabel: "Procedi al pagamento",
    quantityLabel: "Qta",
    totalLabel: "Totale",
    cartAriaLabel: "Apri il carrello",
    removeFromCartLabel: "Rimuovi",
    checkoutTitle: "Checkout",
    checkoutEmptyLabel: "Aggiungi prodotti al carrello per procedere.",
    sortLabel: "Ordina per",
    filterLabel: "Filtra per",
    sortOptions: {
      priceAsc: "Prezzo crescente",
      priceDesc: "Prezzo decrescente",
      nameAsc: "Nome A-Z",
    },
    categories: ["Parfum"],
    products: buildProducts("it"),
  },
  en: {
    allProductsLabel: "All",
    discountsLabel: "Discounts",
    resultsLabel: "products",
    emptyLabel: "No products are available for this filter.",
    addToCartLabel: "Buy now",
    addedToCartLabel: "Added",
    openProductLabel: "View product",
    chooseFormatLabel: "Choose size",
    formatLabel: "Size",
    backToStoreLabel: "Back to store",
    detailLabel: "Full description",
    cartTitle: "Cart",
    emptyCartLabel: "Your cart is empty.",
    checkoutLabel: "Proceed to payment",
    quantityLabel: "Qty",
    totalLabel: "Total",
    cartAriaLabel: "Open cart",
    removeFromCartLabel: "Remove",
    checkoutTitle: "Checkout",
    checkoutEmptyLabel: "Add products to the cart to continue.",
    sortLabel: "Sort by",
    filterLabel: "Filter by",
    sortOptions: {
      priceAsc: "Price low to high",
      priceDesc: "Price high to low",
      nameAsc: "Name A-Z",
    },
    categories: ["Parfum"],
    products: buildProducts("en"),
  },
};

export function getStoreProduct(lang: "it" | "en", slug: string) {
  return (
    storePageContent[lang].products.find((product) => product.slug === slug) ||
    storePageContent[lang].products.find((product) =>
      product.formats?.some((f) => f.slug === slug)
    )
  );
}
