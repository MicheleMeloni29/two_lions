"use client";

import { useEffect, useState } from "react";
import {
  addStoreCartItem,
  getStoreCartCount,
  readStoreCart,
  removeStoreCartItem,
  STORE_CART_EVENT,
  type StoreCartState,
} from "@/lib/storeCart";

export function useStoreCart() {
  const [cart, setCart] = useState<StoreCartState>({});

  useEffect(() => {
    const syncCart = () => {
      setCart(readStoreCart());
    };

    syncCart();
    window.addEventListener(STORE_CART_EVENT, syncCart);
    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener(STORE_CART_EVENT, syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  return {
    cart,
    itemCount: getStoreCartCount(cart),
    addItem: (productSlug: string) => {
      addStoreCartItem(productSlug);
      setCart(readStoreCart());
    },
    removeItem: (productSlug: string) => {
      removeStoreCartItem(productSlug);
      setCart(readStoreCart());
    },
  };
}
