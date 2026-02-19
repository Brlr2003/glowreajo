"use client"

import { useState, useMemo } from "react"
import { BlogCard } from "@/components/blog/BlogCard"

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
  const [activeTag, setActiveTag] = useState("")

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    for (const post of posts) {
      for (const tag of parseTags(post.tags)) {
        tagSet.add(tag)
      }
    }
    return Array.from(tagSet).sort()
  }, [posts])

  const filtered = useMemo(() => {
    if (!activeTag) return posts
    return posts.filter((post: any) => parseTags(post.tags).includes(activeTag))
  }, [posts, activeTag])

  return (
    <>
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setActiveTag("")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              !activeTag
                ? "bg-primary text-white"
                : "bg-surface text-text-secondary hover:bg-primary/10 hover:text-primary"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
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
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-text-muted py-12">No posts found.</p>
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
