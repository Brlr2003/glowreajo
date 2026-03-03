import { medusaFetch } from "@/lib/medusa-fetch"

export interface MedusaCategory {
  id: string
  name: string
  handle: string
  description?: string
  metadata?: Record<string, any>
  parent_category?: MedusaCategory | null
  category_children?: MedusaCategory[]
}

export async function getCategories(locale?: string): Promise<MedusaCategory[]> {
  try {
    const data = await medusaFetch<{ product_categories: MedusaCategory[] }>(
      "/store/product-categories?fields=+metadata&limit=50",
      { locale }
    )
    return data.product_categories || []
  } catch {
    return []
  }
}

export async function getCategoryByHandle(handle: string, locale?: string): Promise<MedusaCategory | null> {
  try {
    const data = await medusaFetch<{ product_categories: MedusaCategory[] }>(
      `/store/product-categories?handle=${handle}&fields=+metadata`,
      { locale }
    )
    return data.product_categories?.[0] || null
  } catch {
    return null
  }
}
