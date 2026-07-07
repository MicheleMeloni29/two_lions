import type { Metadata } from "next";
import ParfumContent from "./ParfumContent";

export const metadata: Metadata = {
  title: "Parfum | Two Lions",
  description:
    "Two Lions Parfum: linea club, edizioni limitate NFC, appartenenza sportiva, storytelling digitale e heritage collection.",
};

export default function ParfumPage() {
  return <ParfumContent />;
}
