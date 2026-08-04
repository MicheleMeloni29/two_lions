import type { Metadata } from "next";
import ShopContent from "./ShopContent";

export const metadata: Metadata = {
  title: "Shop | Two Lions",
  description:
    "Two Lions Shop: accesso agli store Food & Beverage, Sport e Parfum.",
};

export default function ShopPage() {
  return <ShopContent />;
}
