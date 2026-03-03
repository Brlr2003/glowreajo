import type { MetadataRoute } from "next"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
const API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
const LOCALES = ["en", "ar"]

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BACKEND_URL}${path}`, {
      headers: { "x-publishable-api-key": API_KEY },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

function localeEntries(path: string, opts: Partial<MetadataRoute.Sitemap[0]> = {}): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://glowreajo.com"
  return LOCALES.map((locale) => ({
    url: `${baseUrl}/${locale}${path}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${baseUrl}/${l}${path}`])),
    },
    ...opts,
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    ...localeEntries("", { changeFrequency: "daily", priority: 1 }),
    ...localeEntries("/shop", { changeFrequency: "daily", priority: 0.9 }),
    ...localeEntries("/blog", { changeFrequency: "weekly", priority: 0.7 }),
    ...localeEntries("/faq", { changeFrequency: "weekly", priority: 0.6 }),
    ...localeEntries("/about", { changeFrequency: "monthly", priority: 0.5 }),
    ...localeEntries("/contact", { changeFrequency: "monthly", priority: 0.5 }),
  ]

  try {
    let offset = 0
    const limit = 100
    while (true) {
      const data = await fetchJson<{ products: any[]; count: number }>(
        `/store/products?limit=${limit}&offset=${offset}`
      )
      if (!data) break
      for (const p of data.products) {
        entries.push(...localeEntries(`/product/${p.handle}`, {
          lastModified: new Date(p.updated_at),
          changeFrequency: "weekly",
          priority: 0.8,
        }))
      }
      offset += limit
      if (offset >= data.count) break
    }
  } catch {}

  try {
    const data = await fetchJson<{ product_categories: any[] }>("/store/product-categories")
    if (data) {
      for (const cat of data.product_categories) {
        entries.push(...localeEntries(`/shop/${cat.handle}`, { changeFrequency: "weekly", priority: 0.8 }))
      }
    }
  } catch {}

  try {
    const data = await fetchJson<{ blog_posts: any[] }>("/store/blog")
    if (data) {
      for (const post of data.blog_posts) {
        entries.push(...localeEntries(`/blog/${post.slug}`, {
          lastModified: new Date(post.updated_at || post.published_at),
          changeFrequency: "monthly",
          priority: 0.6,
        }))
      }
    }
  } catch {}

  return entries
}
