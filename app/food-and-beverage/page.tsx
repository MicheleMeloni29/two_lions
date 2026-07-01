import type { Metadata } from "next";
import FoodBeverageContent from "./FoodBeverageContent";

export const metadata: Metadata = {
  title: "Food & Beverage | Two Lions",
  description:
    "Two Lions Food & Beverage: produzioni alimentari, beverage, coffee & tea, wine & spirits, hospitality, retail e Brand Sardinia.",
};

export default function FoodAndBeveragePage() {
  return <FoodBeverageContent />;
}
