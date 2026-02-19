import Image from "next/image"

interface BlogPostContentProps {
  post: any
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

export function BlogPostContent({ post }: BlogPostContentProps) {
  const tags = parseTags(post.tags)
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return (
    <article className="max-w-3xl mx-auto">
      {post.cover_image && (
        <div className="rounded-2xl overflow-hidden mb-8">
          <Image
            src={post.cover_image}
            alt={post.title}
            width={768}
            height={512}
            className="w-full h-auto"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      )}

      <header className="mb-8">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-text-muted">
          {post.author && <span>By {post.author}</span>}
          {post.author && date && <span>&middot;</span>}
          {date && <time>{date}</time>}
        </div>
      </header>

      {post.content && (
        <div
          className="prose prose-lg max-w-none text-text-primary prose-headings:font-heading prose-headings:text-text-primary prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}
    </article>
  )
}
