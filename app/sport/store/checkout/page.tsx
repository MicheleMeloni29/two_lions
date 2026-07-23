import type { Metadata } from "next";
import CheckoutContent from "./CheckoutContent";

export const metadata: Metadata = {
  title: "Checkout | Two Lions",
  description: "Checkout Sport Store.",
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
