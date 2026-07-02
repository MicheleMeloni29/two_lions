import type { Metadata } from "next";
import LuxurySardabookingContent from "./LuxurySardabookingContent";

export const metadata: Metadata = {
    title: "Luxury Sardabooking | Two Lions",
    description:
        "Two Lions Luxury Sardabooking: ville, hotel e resort, esperienze, eventi, real estate, concierge, incoming e corporate.",
};

export default function LuxurySardabookingPage() {
    return <LuxurySardabookingContent />;
}
