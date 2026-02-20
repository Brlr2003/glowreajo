import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { medusaFetch } from "@/lib/medusa-fetch"
import { ProductPageClient } from "@/components/product/ProductPageClient"
import { JsonLd } from "@/components/seo/JsonLd"
import { buildProductJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/schemas"

const SITE_URL = "https://glowreajo.com"

async function getProduct(handle: string) {
  try {
    const regionData = await medusaFetch<{ regions: any[] }>("/store/regions")
    const region = regionData.regions.find((r: any) => r.currency_code === "jod") || regionData.regions[0]
    const regionId = region?.id || ""

    const data = await medusaFetch<{ products: any[] }>(
      `/store/products?handle=${handle}&region_id=${regionId}&fields=*categories,*images,+metadata,+variants.inventory_quantity`
    )
    return data.products[0] || null
  } catch {
    return null
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ handle: string }> }
): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)

  if (!product) {
    return { title: "Product Not Found" }
  }

  const title = product.title
  const description = product.description || `Shop ${product.title} - authentic Korean skincare at GlowReaJo, Jordan.`
  const image = product.thumbnail || product.images?.[0]?.url || `${SITE_URL}/og-image.png`
  const brand = (product.metadata as any)?.brand
  const url = `${SITE_URL}/product/${product.handle}`

  return {
    title,
    description: `${description.slice(0, 150)}${brand ? ` | ${brand}` : ""} — Buy online in Jordan.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${product.title} | GlowReaJo`,
      description: description.slice(0, 200),
      type: "website",
      url,
      siteName: "GlowReaJo",
      images: [{ url: image, width: 800, height: 800, alt: product.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | GlowReaJo`,
      description: description.slice(0, 200),
      images: [image],
    },
  }
}

export default async function ProductPage(
  { params }: { params: Promise<{ handle: string }> }
) {
  const { handle } = await params
  const product = await getProduct(handle)

  if (!product) {
    notFound()
  }

  const categoryName = product.categories?.[0]?.name
  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Shop", url: `${SITE_URL}/shop` },
    ...(categoryName ? [{ name: categoryName, url: `${SITE_URL}/shop/${product.categories[0]?.handle || categoryName.toLowerCase()}` }] : []),
    { name: product.title, url: `${SITE_URL}/product/${product.handle}` },
  ]

  return (
    <>
      <JsonLd data={[buildProductJsonLd(product), buildBreadcrumbJsonLd(breadcrumbItems)]} />
      <ProductPageClient product={product} />
    </>
  )
}
