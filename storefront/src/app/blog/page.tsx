import { medusaFetch } from "@/lib/medusa-fetch"
import { BlogListClient } from "@/components/blog/BlogListClient"
import { JsonLd } from "@/components/seo/JsonLd"
import { buildBreadcrumbJsonLd } from "@/lib/seo/schemas"
import { Breadcrumb } from "@/components/shared/Breadcrumb"

const SITE_URL = "https://glowreajo.com"

async function getBlogPosts() {
  try {
    const data = await medusaFetch<{ blog_posts: any[] }>("/store/blog", { revalidate: 60 })
    return data.blog_posts || []
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
  ])

  return (
    <div className="container-app py-8">
      <JsonLd data={breadcrumbJsonLd} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <div className="mb-8 text-center">
        <h1 className="font-heading text-4xl font-bold text-text-primary">Blog</h1>
        <p className="mt-2 text-text-secondary">
          Skincare tips, K-beauty guides, and product reviews
        </p>
      </div>
      <BlogListClient posts={posts} />
    </div>
  )
}
