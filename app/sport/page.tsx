import type { Metadata } from "next";
import SportContent from "./SportContent";

export const metadata: Metadata = {
  title: "Two Lions Sport | Two Lions",
  description:
    "Two Lions Sport: events, hockey, padel, sportwear, media, sponsorship, academy, facilities and awards.",
};

export default function SportPage() {
  return <SportContent />;
}
