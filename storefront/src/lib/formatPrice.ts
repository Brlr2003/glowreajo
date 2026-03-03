export function formatPrice(amount: number, locale?: string): string {
  if (locale === "ar") {
    return `${amount.toFixed(2)} دينار`
  }
  return `${amount.toFixed(2)} JOD`
}
