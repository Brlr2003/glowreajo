import { medusaFetch } from "@/lib/medusa-fetch"
import { getCategories, getCategoryName } from "@/lib/categories"
import { getSiteSettings } from "@/lib/site-settings"
import { JsonLd } from "@/components/seo/JsonLd"
import { buildFaqJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/schemas"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { FaqPageClient } from "@/components/faq/FaqPageClient"
import { getTranslations } from "next-intl/server"

const SITE_URL = "https://glowreajo.com"

interface FaqGroup {
  label: string
  type: "category" | "product" | "general"
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

async function getProducts(): Promise<any[]> {
  try {
    const data = await medusaFetch<{ products: any[] }>("/store/products?limit=100&fields=+metadata")
    return data.products || []
  } catch {
    return []
  }
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [categories, products, siteSettings, t, tc] = await Promise.all([
    getCategories(),
    getProducts(),
    getSiteSettings(locale),
    getTranslations("faqPage"),
    getTranslations("common"),
  ])

  const faqField = locale === "ar" ? "faq_ar" : "faq"
  const groups: FaqGroup[] = []
  const allFaqItems: { q: string; a: string }[] = []

  // General FAQs from site settings (shown first)
  const generalFaqRaw = (siteSettings as any)?.general_faq
  const generalItems = parseFaq(generalFaqRaw)
  if (generalItems.length > 0) {
    groups.push({ label: t("filterGeneral"), type: "general", items: generalItems })
    allFaqItems.push(...generalItems)
  }

  for (const cat of categories) {
    const items = parseFaq(cat.metadata?.[faqField]) || parseFaq(cat.metadata?.faq)
    if (items.length > 0) {
      groups.push({ label: getCategoryName(cat, locale), type: "category", items })
      allFaqItems.push(...items)
    }
  }

  for (const product of products) {
    const items = parseFaq(product.metadata?.faq)
    if (items.length > 0) {
      groups.push({ label: product.title, type: "product", items })
      allFaqItems.push(...items)
    }
  }

  return (
    <>
      <JsonLd data={[buildFaqJsonLd(allFaqItems), buildBreadcrumbJsonLd([
        { name: "Home", url: SITE_URL },
        { name: "FAQ", url: `${SITE_URL}/${locale}/faq` },
      ])]} />
      <div className="container-app py-10">
        <Breadcrumb items={[{ label: tc("home"), href: "/" }, { label: tc("faq") }]} />
        <div className="mt-8 mb-10 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">{t("title")}</h1>
          <p className="mt-3 text-text-secondary max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
        {groups.length === 0 ? (
          <p className="text-center text-text-muted">{t("noFaqs")}</p>
        ) : (
          <FaqPageClient groups={groups} />
        )}
      </div>
    </>
  )
}
