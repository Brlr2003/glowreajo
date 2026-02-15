import Medusa from "@medusajs/js-sdk"

export const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
})

// Cache the Jordan region ID so we don't fetch it every time
let cachedRegionId: string | null = null

export async function getRegionId(): Promise<string> {
  if (cachedRegionId) return cachedRegionId
  try {
    const { regions } = await medusa.store.region.list()
    const jordan = regions.find((r: any) => r.currency_code === "jod") || regions[0]
    cachedRegionId = jordan?.id || ""
  } catch {
    cachedRegionId = ""
  }
  return cachedRegionId
}
