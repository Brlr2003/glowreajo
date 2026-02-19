import Link from "next/link"
import Image from "next/image"
import { memo } from "react"

interface BlogCardProps {
  post: any
}

function BlogCardInner({ post }: BlogCardProps) {
  const tags = parseTags(post.tags)
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="rounded-2xl bg-surface shadow-soft overflow-hidden transition-all hover:shadow-card hover:-translate-y-1">
        {post.cover_image && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-5">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.slice(0, 3).map((tag: string) => (
                <span key={tag} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h2 className="font-heading text-lg font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="mt-2 text-sm text-text-secondary line-clamp-2">
              {post.excerpt}
            </p>
          )}
          <div className="mt-3 flex items-center gap-3 text-xs text-text-muted">
            {post.author && <span>{post.author}</span>}
            {date && <span>{date}</span>}
          </div>
        </div>
      </article>
    </Link>
  )
}

function parseTags(tags: any): string[] {
  if (!tags) return []
  if (Array.isArray(tags)) return tags
  if (typeof tags === "string") {
    try {
      const parsed = JSON.parse(tags)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  return []
}

export const BlogCard = memo(BlogCardInner)
