import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { medusaFetch } from "@/lib/medusa-fetch"
import { getCategoryByHandle, getCategories } from "@/lib/categories"
import { ShopPageClient } from "@/components/shop/ShopPageClient"
import { CategoryFaq } from "@/components/shop/CategoryFaq"
import { JsonLd } from "@/components/seo/JsonLd"
import { buildBreadcrumbJsonLd, buildCollectionJsonLd } from "@/lib/seo/schemas"

const SITE_URL = "https://glowreajo.com"

async function getProductsByCategory(categoryId: string) {
  try {
    const regionData = await medusaFetch<{ regions: any[] }>("/store/regions")
    const region = regionData.regions.find((r: any) => r.currency_code === "jod") || regionData.regions[0]
    const regionId = region?.id || ""

    const data = await medusaFetch<{ products: any[] }>(
      `/store/products?limit=50&region_id=${regionId}&category_id[]=${categoryId}&fields=*categories,*images,+metadata,+variants.inventory_quantity`
    )
    return data.products
  } catch {
    return []
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category: handle } = await params
  const cat = await getCategoryByHandle(handle)

  if (!cat) return { title: "Category Not Found" }

  const description = cat.metadata?.description || `Shop ${cat.name} - authentic Korean skincare products at GlowReaJo, Jordan.`
  const url = `${SITE_URL}/shop/${cat.handle}`

  return {
    title: `${cat.name} - Korean Skincare`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${cat.name} | GlowReaJo`,
      description,
      type: "website",
      url,
      siteName: "GlowReaJo",
    },
  }
}

export default async function CategoryPage(
  { params }: { params: Promise<{ category: string }> }
) {
  const { category: handle } = await params
  const [cat, allCategories] = await Promise.all([
    getCategoryByHandle(handle),
    getCategories(),
  ])

  if (!cat) notFound()

  const products = await getProductsByCategory(cat.id)

  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Shop", url: `${SITE_URL}/shop` },
    { name: cat.name, url: `${SITE_URL}/shop/${cat.handle}` },
  ]

  const clientBreadcrumb = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: cat.name },
  ]

  return (
    <>
      <JsonLd data={[buildCollectionJsonLd(cat, products.length), buildBreadcrumbJsonLd(breadcrumbItems)]} />
      <ShopPageClient
        initialProducts={products}
        categories={allCategories}
        title={cat.name}
        subtitle={cat.metadata?.description || `Explore our ${cat.name.toLowerCase()} collection`}
        breadcrumbItems={clientBreadcrumb}
      />
      <CategoryFaq category={cat} />
    </>
  )
}
