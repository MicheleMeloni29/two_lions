import type { Metadata } from "next";
import FoodBeverageStoreContent from "./FoodBeverageStoreContent";

export const metadata: Metadata = {
  title: "Food & Beverage Store | Two Lions",
  description:
    "Two Lions Food & Beverage Store: vetrina digitale per linee food, beverage, coffee, wine, gifting e canali retail, horeca ed export.",
};

export default function FoodBeverageStorePage() {
  return <FoodBeverageStoreContent />;
}
