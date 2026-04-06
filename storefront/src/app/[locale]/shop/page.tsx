import { medusaFetch } from "@/lib/medusa-fetch"
import { getCategories } from "@/lib/categories"
import { ShopPageClient } from "@/components/shop/ShopPageClient"
import { JsonLd } from "@/components/seo/JsonLd"
import { buildBreadcrumbJsonLd } from "@/lib/seo/schemas"

const SITE_URL = "https://glowreajo.com"

async function getProducts(locale?: string) {
  try {
    const regionData = await medusaFetch<{ regions: any[] }>("/store/regions")
    const region = regionData.regions.find((r: any) => r.currency_code === "jod") || regionData.regions[0]
    const regionId = region?.id || ""

    const data = await medusaFetch<{ products: any[] }>(
      `/store/products?limit=50&region_id=${regionId}&fields=*categories,*images,*tags,+metadata,+variants.inventory_quantity`,
      { locale }
    )
    return data.products
  } catch {
    return []
  }
}

export default async function ShopPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [products, categories] = await Promise.all([getProducts(locale), getCategories(locale)])

  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Shop", url: `${SITE_URL}/shop` },
  ]

  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbItems)} />
      <ShopPageClient initialProducts={products} categories={categories} />
    </>
  )
}
