import type { Metadata } from "next";
import SportStoreContent from "./SportStoreContent";

export const metadata: Metadata = {
  title: "Sport Store | Two Lions",
  description:
    "Two Lions Sport Store: merchandising e prodotti ufficiali Breda 2026 per team, supporter ed eventi sportivi.",
};

export default function SportStorePage() {
  return <SportStoreContent />;
}
