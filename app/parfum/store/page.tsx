import type { Metadata } from "next";
import { getOpenCartProducts } from "@/lib/opencart";
import ParfumStoreContent from "./ParfumStoreContent";

export const metadata: Metadata = {
  title: "Parfum Store | Two Lions",
  description:
    "Two Lions Parfum Store: fragranze Cagliari pour homme, Cagliari unisex e Cagliari pour femme nei formati 10 ml e 50 ml.",
};

export default async function ParfumStorePage() {
  const liveProducts = await getOpenCartProducts({ category: "parfum" });
  return <ParfumStoreContent liveProducts={liveProducts} />;
}
