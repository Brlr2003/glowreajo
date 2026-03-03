import { medusaFetch } from "@/lib/medusa-fetch"
import { BlogListClient } from "@/components/blog/BlogListClient"
import { JsonLd } from "@/components/seo/JsonLd"
import { buildBreadcrumbJsonLd } from "@/lib/seo/schemas"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { getTranslations } from "next-intl/server"

const SITE_URL = "https://glowreajo.com"

async function getBlogPosts(locale: string) {
  try {
    const data = await medusaFetch<{ blog_posts: any[] }>(`/store/blog?locale=${locale}`, { revalidate: 60 })
    return data.blog_posts || []
  } catch {
    return []
  }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [posts, t] = await Promise.all([
    getBlogPosts(locale),
    getTranslations("blog"),
  ])
  const tc = await getTranslations("common")

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/${locale}/blog` },
  ])

  return (
    <div className="container-app py-8">
      <JsonLd data={breadcrumbJsonLd} />
      <Breadcrumb items={[{ label: tc("home"), href: "/" }, { label: t("title") }]} />
      <div className="mb-8 text-center">
        <h1 className="font-heading text-4xl font-bold text-text-primary">{t("title")}</h1>
        <p className="mt-2 text-text-secondary">{t("subtitle")}</p>
      </div>
      <BlogListClient posts={posts} />
    </div>
  )
}
