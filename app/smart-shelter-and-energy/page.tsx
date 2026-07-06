import type { Metadata } from "next";
import SmartShelterEnergyContent from "./SmartShelterEnergyContent";

export const metadata: Metadata = {
  title: "Smart Shelter & Energy | Two Lions",
  description:
    "Two Lions Smart Shelter & Energy: smart shelter, solar energy, e-mobility, smart city, climate systems, urban furniture, identity infrastructure, engineering and maintenance.",
};

export default function SmartShelterAndEnergyPage() {
  return <SmartShelterEnergyContent />;
}
