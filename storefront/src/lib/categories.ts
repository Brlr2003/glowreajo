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

export function getCategoryName(cat: MedusaCategory, locale: string): string {
  if (locale === "ar" && cat.metadata?.name_ar) return cat.metadata.name_ar
  return cat.name
}

export function getCategoryDescription(cat: MedusaCategory, locale: string): string | undefined {
  if (locale === "ar" && cat.metadata?.description_ar) return cat.metadata.description_ar
  return cat.metadata?.description || cat.description
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
