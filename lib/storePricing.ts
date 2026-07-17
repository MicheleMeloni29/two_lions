export function formatStorePrice(
  amountCents: number,
  lang: "it" | "en"
) {
  return new Intl.NumberFormat(lang === "it" ? "it-IT" : "en-US", {
    style: "currency",
    currency: "EUR",
  }).format(amountCents / 100);
}
