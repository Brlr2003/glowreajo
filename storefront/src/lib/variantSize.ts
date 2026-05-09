// Extracts a human-readable size label for a product variant.
// Order: metadata.size override → variant option whose title looks like size/volume →
// any non-empty option value → variant.title (when not a generic "Default Variant").
export function extractVariantSize(product: any, variant: any): string {
  const metaSize = (product?.metadata as any)?.size
  if (metaSize && typeof metaSize === "string" && metaSize.trim()) return metaSize.trim()

  const options = variant?.options
  if (Array.isArray(options) && options.length > 0) {
    const sizeKeyRegex = /size|volume|حجم|سعة|مقاس/i
    const sizeOpt = options.find((o: any) => {
      const title = o?.option?.title || o?.title || ""
      return typeof title === "string" && sizeKeyRegex.test(title)
    })
    if (sizeOpt?.value) return String(sizeOpt.value)
    const firstWithValue = options.find((o: any) => o?.value)
    if (firstWithValue?.value) return String(firstWithValue.value)
  }

  const variantTitle = variant?.title
  if (variantTitle && typeof variantTitle === "string" && variantTitle.toLowerCase() !== "default variant") {
    return variantTitle
  }
  return ""
}
