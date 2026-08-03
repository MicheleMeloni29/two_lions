import type { Metadata } from "next";
import ParfumStoreContent from "./ParfumStoreContent";

export const metadata: Metadata = {
  title: "Parfum Store | Two Lions",
  description:
    "Two Lions Parfum Store: fragranze Self Pass, Corner Corto, Two Lions, Long Corner, Push e Short Corner nei formati 10 ml e 50 ml.",
};

export default function ParfumStorePage() {
  return <ParfumStoreContent />;
}
