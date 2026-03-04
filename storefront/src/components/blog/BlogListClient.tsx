"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { BlogCard } from "@/components/blog/BlogCard"

const MAX_VISIBLE_TAGS = 8
const POSTS_PER_PAGE = 9

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
  const [currentPage, setCurrentPage] = useState(1)

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

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
  const paginatedPosts = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  const handleTagChange = (tag: string) => {
    setActiveTag(tag)
    setCurrentPage(1)
  }

  return (
    <>
      {topTags.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => handleTagChange("")}
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
              onClick={() => handleTagChange(tag)}
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
          {paginatedPosts.map((post: any) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => { setCurrentPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }) }}
            disabled={currentPage === 1}
            className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-surface text-text-secondary hover:bg-primary/10 hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
            {t("previous")}
          </button>
          <span className="text-sm text-text-muted px-3">
            {t("page", { page: currentPage, total: totalPages })}
          </span>
          <button
            onClick={() => { setCurrentPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }) }}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-surface text-text-secondary hover:bg-primary/10 hover:text-primary"
          >
            {t("next")}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  )
}
