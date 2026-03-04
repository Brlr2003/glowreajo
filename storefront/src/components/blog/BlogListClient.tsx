"use client"

import { useState, useMemo } from "react"
import { useTranslations } from "next-intl"
import { BlogCard } from "@/components/blog/BlogCard"

const MAX_VISIBLE_TAGS = 8

interface BlogListClientProps {
  posts: any[]
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

export function BlogListClient({ posts }: BlogListClientProps) {
  const t = useTranslations("blog")
  const [activeTag, setActiveTag] = useState("")
  const [showAllTags, setShowAllTags] = useState(false)

  const topTags = useMemo(() => {
    const counts = new Map<string, number>()
    for (const post of posts) {
      for (const tag of parseTags(post.tags)) {
        counts.set(tag, (counts.get(tag) || 0) + 1)
      }
    }
    return Array.from(counts.entries())
      .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
      .map((e: [string, number]) => e[0])
  }, [posts])

  const visibleTags = showAllTags ? topTags : topTags.slice(0, MAX_VISIBLE_TAGS)
  const hasMore = topTags.length > MAX_VISIBLE_TAGS

  const filtered = useMemo(() => {
    if (!activeTag) return posts
    return posts.filter((post: any) => parseTags(post.tags).includes(activeTag))
  }, [posts, activeTag])

  return (
    <>
      {topTags.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setActiveTag("")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              !activeTag
                ? "bg-primary text-white"
                : "bg-surface text-text-secondary hover:bg-primary/10 hover:text-primary"
            }`}
          >
            {t("all")}
          </button>
          {visibleTags.map((tag: string) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeTag === tag
                  ? "bg-primary text-white"
                  : "bg-surface text-text-secondary hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {tag}
            </button>
          ))}
          {hasMore && (
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors bg-surface text-primary hover:bg-primary/10"
            >
              {showAllTags ? t("showLess") : `+${topTags.length - MAX_VISIBLE_TAGS}`}
            </button>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-text-muted py-12">{t("noPosts")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post: any) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  )
}
