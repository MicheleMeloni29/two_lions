import type { Metadata } from "next";
import IdentityAdvertisingContent from "./IdentityAdvertisingContent";

export const metadata: Metadata = {
  title: "Identity Advertising | Two Lions",
  description:
    "Two Lions Identity Advertising: infrastrutture identitarie, mobilita, sport, territorio, corporate, premium e media.",
};

export default function IdentityAdvertisingPage() {
  return <IdentityAdvertisingContent />;
}
