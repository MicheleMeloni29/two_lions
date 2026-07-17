export const STORE_CART_KEY = "two-lions-store-cart";
export const STORE_CART_EVENT = "two-lions-store-cart-updated";

export type StoreCartState = Record<string, number>;

export function readStoreCart(): StoreCartState {
  if (typeof window === "undefined") {
    return {};
  }

  const rawCart = window.localStorage.getItem(STORE_CART_KEY);

  if (!rawCart) {
    return {};
  }

  try {
    return JSON.parse(rawCart) as StoreCartState;
  } catch {
    return {};
  }
}

export function writeStoreCart(nextCart: StoreCartState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORE_CART_KEY, JSON.stringify(nextCart));
  window.dispatchEvent(new Event(STORE_CART_EVENT));
}

export function addStoreCartItem(productSlug: string) {
  const currentCart = readStoreCart();
  const nextCart = {
    ...currentCart,
    [productSlug]: (currentCart[productSlug] ?? 0) + 1,
  };

  writeStoreCart(nextCart);
}

export function removeStoreCartItem(productSlug: string) {
  const currentCart = readStoreCart();

  if (!(productSlug in currentCart)) {
    return;
  }

  const nextCart = { ...currentCart };
  delete nextCart[productSlug];

  writeStoreCart(nextCart);
}

export function getStoreCartCount(cart: StoreCartState) {
  return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
}
