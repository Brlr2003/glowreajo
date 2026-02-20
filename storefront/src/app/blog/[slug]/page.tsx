import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { medusaFetch } from "@/lib/medusa-fetch"
import { BlogPostContent } from "@/components/blog/BlogPostContent"
import { JsonLd } from "@/components/seo/JsonLd"
import { buildBlogPostJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/schemas"
import { Breadcrumb } from "@/components/shared/Breadcrumb"

const SITE_URL = "https://glowreajo.com"

async function getPost(slug: string) {
  try {
    const data = await medusaFetch<{ blog_post: any }>(`/store/blog/${slug}`, { revalidate: 60 })
    return data.blog_post || null
  } catch {
    return null
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) return { title: "Post Not Found" }

  const title = post.seo_title || post.title
  const description = post.seo_description || post.excerpt || `Read ${post.title} on GlowReaJo Blog.`
  const url = `${SITE_URL}/blog/${post.slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | GlowReaJo Blog`,
      description,
      type: "article",
      url,
      siteName: "GlowReaJo",
      images: post.cover_image
        ? [{ url: post.cover_image, width: 1200, height: 630, alt: title }]
        : [{ url: "/og-image.png", width: 1200, height: 630, alt: "GlowReaJo Blog" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | GlowReaJo Blog`,
      description,
      images: [post.cover_image || "/og-image.png"],
    },
  }
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
  ]

  return (
    <div className="container-app py-8">
      <JsonLd data={[buildBlogPostJsonLd(post), buildBreadcrumbJsonLd(breadcrumbItems)]} />
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" },
        { label: post.title },
      ]} />
      <BlogPostContent post={post} />
    </div>
  )
}
