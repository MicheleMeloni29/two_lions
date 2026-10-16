import type { StorePageContent, StoreProduct, StoreProductFormat } from "@/components/store/types";

type ProductCopy = {
  baseId: string;
  baseSlug: string;
  name: string;
  description: string;
  fullDescription: string[];
  imageSrc: string;
};

const productCopy: Record<"it" | "en", ProductCopy[]> = {
  it: [
    {
      baseId: "PF-CAG-FEMME",
      baseSlug: "cagliari-pour-femme-rosso",
      name: "Cagliari pour femme ROSSO",
      description:
        "Raffinata, luminosa e magnetica con tocchi floreali e agrumati di Sardegna. Una presenza indimenticabile.",
      fullDescription: [
        "Famiglia olfattiva: Floreale · Genere: Femminile",
        "Evoluzione olfattiva del Narciso Rodriguez for her con focus sulle note di muschio e ambra. Profumo coinvolgente che non ammette compromessi, con una scia ed una persistenza incredibili. Evoca eleganza, raffinatezza e aristocrazia: una fragranza destinata a divenire velocemente un cult senza tempo.",
        "PIRAMIDE OLFATTIVA",
        "Note di testa: Rosa, Pesca",
        "Note di cuore: Muschio, Ambra",
        "Note di base: Sandalo, Patchouli",
      ],
      imageSrc: "/Parfum_Bottles/Cagliari_pourFemme.jpeg",
    },
    {
      baseId: "PF-CAG-HOMME",
      baseSlug: "cagliari-pour-homme-blu",
      name: "Cagliari pour homme BLU",
      description:
        "Un accordo nobile e deciso, tra note marine e legni mediterranei. L'eleganza fiera dell'uomo Two Lions.",
      fullDescription: [
        "Famiglia olfattiva: Orientale · Genere: Maschile",
        "Una fragranza maschile di nicchia, intensa e sofisticata, che reinterpreta il fascino delle grandi composizioni orientali della profumeria internazionale.",
        "Un mosaico di sensazioni intriganti, dove spezie preziose, legni aromatici e accordi avvolgenti danno vita a un viaggio olfattivo ricco di mistero e personalità.",
        "L'apertura è intensa e sorprendente: cannella, zafferano, incenso e noce moscata incontrano la profondità del legno di agar (oud), mentre la mela verde e la pera bianca donano una raffinata freschezza fruttata.",
        "Nel cuore, il patchouli esprime carattere e profondità, armonizzandosi con l'eleganza floreale del gelsomino.",
        "Il fondo rivela una personalità calda e magnetica: tabacco, vaniglia del Madagascar, ambra, sandalo e legno di guaiaco si fondono con il muschio bianco e il vetiver di Haiti, creando una composizione ricca di sfumature.",
        "PIRAMIDE OLFATTIVA",
        "Note di testa: Cannella, Legno di agar (Oud), Zafferano, Incenso, Noce moscata, Mela verde, Pera bianca",
        "Note di cuore: Patchouli, Gelsomino",
        "Note di fondo: Tabacco, Vaniglia del Madagascar, Ambra, Sandalo, Legno di guaiaco, Muschio bianco, Vetiver di Haiti",
      ],
      imageSrc: "/Parfum_Bottles/Cagliari_pourHomme.jpeg",
    },
    {
      baseId: "PF-CAG-UNISEX",
      baseSlug: "cagliari-unisex-rossoblu",
      name: "Cagliari unisex ROSSOBLU",
      description:
        "Un'essenza fresca e avvolgente che fonde brezza costiera e macchia mediterranea. Identità e armonia senza confini.",
      fullDescription: [
        "Freschezza mediterranea, sensualità orientale.",
        "Famiglia olfattiva: Orientale · Genere: Unisex",
        "Una fragranza raffinata e avvolgente, ispirata alla luminosità del Mediterraneo e al fascino misterioso delle essenze orientali. Un elisir olfattivo che evoca le atmosfere delle estati mediterranee, dove la freschezza degli agrumi incontra il calore delle note sensuali e avvolgenti.",
        "L'apertura è un'esplosione di energia e vitalità: l'arancia siciliana, il limone siciliano e il bergamotto calabrese si fondono in un accordo agrumato fresco, luminoso e irresistibile.",
        "Nel cuore, un ricco cesto di frutta mediterranea dona alla composizione una dolcezza raffinata, esotica e sorprendentemente seducente.",
        "Il fondo rivela una personalità calda e persistente: il muschio bianco si intreccia con l'ambra e i preziosi baccelli di vaniglia del Madagascar, creando una firma olfattiva morbida, intensa e avvolgente.",
        "PIRAMIDE OLFATTIVA",
        "Note di testa: Arancia siciliana, Limone siciliano, Bergamotto calabrese",
        "Note di cuore: Cesto di frutta del Mediterraneo",
        "Note di fondo: Muschio bianco, Ambra, Baccelli di vaniglia del Madagascar",
      ],
      imageSrc: "/Parfum_Bottles/Cagliari_unisex.jpeg",
    },
    {
      baseId: "PF-TL-MAN",
      baseSlug: "two-lions-for-man",
      name: "TWO LIONS for man",
      description:
        "Eleganza, carattere e seduzione. Una fragranza maschile dalla raffinata identità legnosa: apertura fresca con bergamotto e ribes nero, cuore nobile di betulla e patchouli, fondo caldo di ambra grigia e vaniglia.",
      fullDescription: [
        "Eleganza, carattere e seduzione.",
        "Famiglia olfattiva: Legnosa · Genere: Maschile",
        "Una fragranza maschile dalla raffinata identità legnosa, ispirata all'eleganza delle grandi creazioni della profumeria internazionale.",
        "L'apertura fresca e fruttata combina la vivacità del bergamotto, l'intensità del ribes nero, la dolcezza esotica dell'ananas e la freschezza croccante della mela.",
        "Nel cuore, la forza della betulla incontra la profondità del patchouli, mentre la rosa e il gelsomino del Marocco donano alla composizione una raffinata eleganza floreale.",
        "Il fondo rivela una personalità intensa e avvolgente, dove il muschio e il muschio di quercia si fondono con la morbidezza della vaniglia e le sfumature preziose dell'ambra grigia.",
        "PIRAMIDE OLFATTIVA",
        "Note di testa: Bergamotto, Ribes nero, Ananas, Mela",
        "Note di cuore: Betulla, Patchouli, Rosa, Gelsomino del Marocco",
        "Note di fondo: Muschio, Muschio di quercia, Vaniglia, Ambra grigia",
      ],
      imageSrc: "/Parfum_Bottles/TwoLions_forMan.jpg",
    },
  ],
  en: [
    {
      baseId: "PF-CAG-FEMME",
      baseSlug: "cagliari-pour-femme-rosso",
      name: "Cagliari pour femme ROSSO",
      description:
        "Refined, luminous, and magnetic with floral and citrus Sardinian touches. An unforgettable presence.",
      fullDescription: [
        "Olfactory Family: Floral · Gender: Feminine",
        "An olfactory evolution of Narciso Rodriguez for her with focus on musk and amber notes. An engaging fragrance that brooks no compromise, with incredible sillage and longevity. Evoking elegance, refinement, and aristocracy: a fragrance destined to quickly become a timeless cult.",
        "OLFACTORY PYRAMID",
        "Top notes: Rose, Peach",
        "Heart notes: Musk, Amber",
        "Base notes: Sandalwood, Patchouli",
      ],
      imageSrc: "/Parfum_Bottles/Cagliari_pourFemme.jpeg",
    },
    {
      baseId: "PF-CAG-HOMME",
      baseSlug: "cagliari-pour-homme-blu",
      name: "Cagliari pour homme BLU",
      description:
        "A noble and decisive accord of marine notes and Mediterranean woods. The proud elegance of the Two Lions man.",
      fullDescription: [
        "Olfactory Family: Oriental · Gender: Masculine",
        "An intense and sophisticated niche masculine fragrance that reinterprets the allure of the great oriental compositions of international perfumery.",
        "A mosaic of intriguing sensations, where precious spices, aromatic woods, and enveloping accords give life to an olfactory journey rich in mystery and personality.",
        "The opening is intense and surprising: cinnamon, saffron, frankincense, and nutmeg meet the depth of agarwood (oud), while green apple and white pear impart refined fruity freshness.",
        "At the heart, patchouli expresses character and depth, harmonizing with the floral elegance of jasmine.",
        "The drydown reveals a warm, magnetic personality: tobacco, Madagascar vanilla, amber, sandalwood, and guaiac wood blend with white musk and Haitian vetiver.",
        "OLFACTORY PYRAMID",
        "Top notes: Cinnamon, Agarwood (Oud), Saffron, Incense, Nutmeg, Green Apple, White Pear",
        "Heart notes: Patchouli, Jasmine",
        "Base notes: Tobacco, Madagascar Vanilla, Amber, Sandalwood, Guaiac Wood, White Musk, Haitian Vetiver",
      ],
      imageSrc: "/Parfum_Bottles/Cagliari_pourHomme.jpeg",
    },
    {
      baseId: "PF-CAG-UNISEX",
      baseSlug: "cagliari-unisex-rossoblu",
      name: "Cagliari unisex ROSSOBLU",
      description:
        "A fresh and enveloping essence blending coastal breeze and Mediterranean scrub. Identity and harmony without boundaries.",
      fullDescription: [
        "Mediterranean freshness, oriental sensuality.",
        "Olfactory Family: Oriental · Gender: Unisex",
        "A refined and enveloping fragrance inspired by Mediterranean brightness and the mysterious charm of oriental essences.",
        "An olfactory elixir evocative of Mediterranean summers, where citrus freshness meets the warmth of sensual accords.",
        "The opening is an explosion of energy and vitality: Sicilian orange, Sicilian lemon, and Calabrian bergamot blend in a fresh, luminous citrus accord.",
        "At the heart, a rich basket of Mediterranean fruits imparts refined, exotic sweetness.",
        "The base reveals a warm and lingering personality: white musk intertwines with amber and precious Madagascar vanilla pods.",
        "OLFACTORY PYRAMID",
        "Top notes: Sicilian Orange, Sicilian Lemon, Calabrian Bergamot",
        "Heart notes: Mediterranean Fruit Basket",
        "Base notes: White Musk, Amber, Madagascar Vanilla Pods",
      ],
      imageSrc: "/Parfum_Bottles/Cagliari_unisex.jpeg",
    },
    {
      baseId: "PF-TL-MAN",
      baseSlug: "two-lions-for-man",
      name: "TWO LIONS for man",
      description:
        "Elegance, character, and seduction. A masculine fragrance with a refined woody identity: fresh opening of bergamot and blackcurrant, noble heart of birch and patchouli, warm base of ambergris and vanilla.",
      fullDescription: [
        "Elegance, character, and seduction.",
        "Olfactory Family: Woody · Gender: Masculine",
        "A masculine fragrance with a refined woody identity, inspired by the timeless elegance of great international creations.",
        "The fresh and fruity opening combines the vibrancy of bergamot, the intensity of blackcurrant, the exotic sweetness of pineapple, and crisp apple.",
        "At the heart, the strength of birch meets the depth of patchouli, while rose and Moroccan jasmine bestow refined floral elegance.",
        "The base reveals an intense, enveloping personality where musk and oakmoss meld with soft vanilla and precious ambergris.",
        "OLFACTORY PYRAMID",
        "Top notes: Bergamot, Blackcurrant, Pineapple, Apple",
        "Heart notes: Birch, Patchouli, Rose, Moroccan Jasmine",
        "Base notes: Musk, Oakmoss, Vanilla, Ambergris",
      ],
      imageSrc: "/Parfum_Bottles/TwoLions_forMan.jpg",
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
      fullDescription: product.fullDescription,
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
  const s = slug.toLowerCase();
  return (
    storePageContent[lang].products.find((product) => {
      const pSlug = product.slug.toLowerCase();
      if (pSlug === s) return true;
      if (s.includes("femme") && pSlug.includes("femme")) return true;
      if (s.includes("homme") && pSlug.includes("homme")) return true;
      if (s.includes("unisex") && pSlug.includes("unisex")) return true;
      if ((s.includes("two-lions") || s.includes("lions")) && pSlug.includes("two-lions")) return true;
      return false;
    }) ||
    storePageContent[lang].products.find((product) =>
      product.formats?.some((f) => {
        const fSlug = f.slug.toLowerCase();
        if (fSlug === s) return true;
        const has50 = s.includes("50ml") && fSlug.includes("50ml");
        const has10 = s.includes("10ml") && fSlug.includes("10ml");
        if (s.includes("femme") && fSlug.includes("femme") && (has50 || has10)) return true;
        if (s.includes("homme") && fSlug.includes("homme") && (has50 || has10)) return true;
        if (s.includes("unisex") && fSlug.includes("unisex") && (has50 || has10)) return true;
        if ((s.includes("two-lions") || s.includes("lions")) && fSlug.includes("two-lions") && (has50 || has10)) return true;
        return false;
      })
    )
  );
}
