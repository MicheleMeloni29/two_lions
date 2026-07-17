import type { Metadata } from "next";
import CheckoutContent from "./CheckoutContent";

export const metadata: Metadata = {
  title: "Checkout | Two Lions",
  description: "Checkout Food & Beverage Store.",
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
