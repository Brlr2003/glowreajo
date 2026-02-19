import type { MetadataRoute } from "next"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
const API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://glowreajo.com"

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ]

  const dynamicPages: MetadataRoute.Sitemap = []

  // Product pages
  try {
    let offset = 0
    const limit = 100
    while (true) {
      const data = await fetchJson<{ products: any[]; count: number }>(
        `/store/products?limit=${limit}&offset=${offset}`
      )
      if (!data) break
      for (const p of data.products) {
        dynamicPages.push({
          url: `${baseUrl}/product/${p.handle}`,
          lastModified: new Date(p.updated_at),
          changeFrequency: "weekly",
          priority: 0.8,
        })
      }
      offset += limit
      if (offset >= data.count) break
    }
  } catch {}

  // Category pages
  try {
    const data = await fetchJson<{ product_categories: any[] }>("/store/product-categories")
    if (data) {
      for (const cat of data.product_categories) {
        dynamicPages.push({
          url: `${baseUrl}/shop/${cat.handle}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        })
      }
    }
  } catch {}

  // Blog posts
  try {
    const data = await fetchJson<{ blog_posts: any[] }>("/store/blog")
    if (data) {
      for (const post of data.blog_posts) {
        dynamicPages.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updated_at || post.published_at),
          changeFrequency: "monthly",
          priority: 0.6,
        })
      }
    }
  } catch {}

  return [...staticPages, ...dynamicPages]
}
