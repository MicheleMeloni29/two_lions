---
name: opencart-store-workflow
description: >-
  Gestione completa dell'architettura e-commerce headless di Two Lions International: sincronizzazione tra cataloghi statici di fallback (storeContent.ts IT/EN) e API live OpenCart, divisioni store, carrello e build statica ibrida PHP.
  Use this skill whenever working on products, store divisions (food-and-beverage, parfum, sport), OpenCart API integration, cart/checkout logic, or static export in the two-lions project.
---

# Two Lions — OpenCart Headless & Multi-Division Store Workflow

Questa skill definisce il flusso operativo obbligatorio per lavorare sugli store delle divisioni (`food-and-beverage`, `parfum`, `sport`), sul catalogo aggregato (`/shop`), sull'integrazione con **OpenCart** e sulla build ibrida Next.js + PHP del progetto **two-lions**.

## 1. Regola d'Oro: Doppio Allineamento Obbligatorio (Fallback Statico + API OpenCart)

Il progetto `two-lions` adotta un'architettura **resiliente a doppio livello**: i componenti leggono i prodotti live da OpenCart tramite `lib/opencart.ts`, ma utilizzano i cataloghi statici locali come fallback immediato (e per la generazione delle rotte statiche in fase di build).

Ogni volta che aggiungi, modifichi o rimuovi prodotti, categorie o campi del catalogo, **devi sempre allineare entrambi i livelli**:

1. **Livello 1 — Cataloghi Statici di Fallback (`storeContent.ts` in IT e EN)**:
   - Food & Beverage: `app/food-and-beverage/store/storeContent.ts`
   - Parfum: `app/parfum/store/storeContent.ts`
   - Sport: `app/sport/store/storeContent.ts`
   - Aggregatore globale: `lib/storeCatalog.ts` (`getAllStoreProducts(lang)`)
   - **Importante**: Ogni file `storeContent.ts` contiene sia il ramo `it` sia il ramo `en`. Aggiorna sempre entrambe le lingue mantenendo identici `id`, `slug`, `category`, `amountCents`, `isDiscounted` e `imageSrc`.
2. **Livello 2 — Integrazione Live OpenCart (`lib/opencart.ts` & Bridge PHP)**:
   - Client Next.js: `lib/opencart.ts` (`getOpenCartProducts`, `getOpenCartProductBySlug`)
   - Bridge standalone PHP: `scripts/opencart-bridge/api_products.php`
   - Estensione nativa OCMOD: `scripts/opencart-extension/twolions/`
   - Verifica che la forma del tipo `StoreProduct` (`components/store/types.ts`) corrisponda esattamente ai campi restituiti dal bridge OpenCart (`id`, `slug`, `category`, `name`, `amountCents`, `price`, `isDiscounted`, `shortDescription`, `fullDescription`, `imageSrc`, `imageAlt`).

---

## 2. Gestione Prezzi, Carrello e Checkout
- **Prezzi (`lib/storePricing.ts`)**: `amountCents` (intero in centesimi, es. `2400` per `24,00 €`) è la fonte di verità per i calcoli del carrello, mentre `price` è la stringa formattata per la UI. Assicurati che `amountCents` e `price` siano sempre coerenti.
- **Carrello (`lib/storeCart.ts` e `hooks/useStoreCart.ts`)**: Il carrello è persistito lato client e condiviso tra le divisioni. Non rompere la compatibilità delle chiavi salvate in `localStorage`.

---

## 3. Traduzioni Generali e Build Statica Ibrida
1. **Dizionari UI (`locales/it.json` e `locales/en.json`)**:
   - Ogni testo dell'interfaccia fuori da `storeContent.ts` risiede in `locales/it.json` e `locales/en.json`. Dopo ogni modifica esegui:
     `node "C:\Users\micky\.gemini\config\skills\i18n-dictionary-sync\scripts\check-i18n.mjs" "C:\Users\micky\Desktop\Next.js projects\two-lions\locales"`
2. **Test Connessione OpenCart**:
   - Per verificare la raggiungibilità e la risposta dell'endpoint OpenCart live, esegui:
     `npm run test:opencart`
3. **Build Statica per Server Apache/Mailcow (`npm run build:static`)**:
   - Lo script `scripts/build-static.mjs` esegue `next build` con `STATIC_EXPORT=true` e genera automaticamente `out/contact.php` e `out/api/contact/index.php`.
   - Non rimuovere mai `generateStaticParams` dalle pagine `app/*/store/[slug]/page.tsx`, altrimenti `npm run build:static` fallirà.
