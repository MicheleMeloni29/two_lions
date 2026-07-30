export function formatStorePrice(
  amountCents: number,
  lang: "it" | "en"
) {
  if (amountCents === 0) {
    return "00,00 €";
  }

  return new Intl.NumberFormat(lang === "it" ? "it-IT" : "en-US", {
    style: "currency",
    currency: "EUR",
  }).format(amountCents / 100);
}
