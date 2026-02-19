import { medusaFetch } from "@/lib/medusa-fetch"
import { getCategories } from "@/lib/categories"
import { JsonLd } from "@/components/seo/JsonLd"
import { buildFaqJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/schemas"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { FaqPageClient } from "@/components/faq/FaqPageClient"

const SITE_URL = "https://glowreajo.com"

interface FaqGroup {
  label: string
  type: "category" | "product"
  items: { q: string; a: string }[]
}

function parseFaq(raw: any): { q: string; a: string }[] {
  if (!raw || typeof raw !== "string") return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default async function FaqPage() {
  const [categories, productsData] = await Promise.all([
    getCategories(),
    medusaFetch<{ products: any[] }>("/store/products?limit=100&fields=+metadata"),
  ])

  const groups: FaqGroup[] = []
  const allFaqItems: { q: string; a: string }[] = []

  for (const cat of categories) {
    const items = parseFaq(cat.metadata?.faq)
    if (items.length > 0) {
      groups.push({ label: cat.name, type: "category", items })
      allFaqItems.push(...items)
    }
  }

  for (const product of productsData.products || []) {
    const items = parseFaq(product.metadata?.faq)
    if (items.length > 0) {
      groups.push({ label: product.title, type: "product", items })
      allFaqItems.push(...items)
    }
  }

  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "FAQ", url: `${SITE_URL}/faq` },
  ]

  return (
    <>
      <JsonLd data={[buildFaqJsonLd(allFaqItems), buildBreadcrumbJsonLd(breadcrumbItems)]} />
      <div className="container-app py-10">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />

        <div className="mt-8 mb-10 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
            Find answers about our Korean skincare products, categories, shipping, and more.
          </p>
        </div>

        {groups.length === 0 ? (
          <p className="text-center text-text-muted">No FAQs available yet.</p>
        ) : (
          <FaqPageClient groups={groups} />
        )}
      </div>
    </>
  )
}
