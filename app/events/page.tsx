import type { Metadata } from "next";
import EventsContent from "./EventsContent";

export const metadata: Metadata = {
  title: "Two Lions Events | Two Lions",
  description:
    "Two Lions Events: organizzazione e sponsorizzazione di eventi sportivi, raduni vintage, iniziative culturali e format proprietari per la valorizzazione del territorio.",
};

export default function EventsPage() {
  return <EventsContent />;
}
