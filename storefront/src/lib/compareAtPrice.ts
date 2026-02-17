/**
 * Calculates the compare-at ("was") price from product metadata.
 *
 * Metadata options (set via Medusa admin):
 *  - compare_at_price: 20.45           → direct "was" price
 *  - discount_type: "fixed" + discount_value: 2    → actual + 2
 *  - discount_type: "percentage" + discount_value: 10 → actual / (1 - 0.10)
 *
 * Returns null if no valid compare-at price can be computed.
 */
export function getCompareAtPrice(actualPrice: number, metadata: any): number | null {
  if (!metadata || actualPrice <= 0) return null

  const directPrice = parseFloat(metadata.compare_at_price)
  if (!isNaN(directPrice) && directPrice > actualPrice) {
    return Math.round(directPrice * 100) / 100
  }

  const discountType = metadata.discount_type
  const discountValue = parseFloat(metadata.discount_value)

  if (!discountType || isNaN(discountValue) || discountValue <= 0) return null

  if (discountType === "fixed") {
    const result = actualPrice + discountValue
    return Math.round(result * 100) / 100
  }

  if (discountType === "percentage" && discountValue < 100) {
    const result = actualPrice / (1 - discountValue / 100)
    return Math.round(result * 100) / 100
  }

  return null
}
