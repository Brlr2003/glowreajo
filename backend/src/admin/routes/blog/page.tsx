import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, Badge } from "@medusajs/ui"
import { useState, useEffect } from "react"

interface BlogPost {
  id: string
  title: string
  slug: string
  status: string
  published_at: string | null
  created_at: string
}

function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    try {
      const res = await fetch("/admin/blog", { credentials: "include" })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setPosts(data.blog_posts || [])
    } catch {
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return
    try {
      await fetch(`/admin/blog/${id}`, { method: "DELETE", credentials: "include" })
      setPosts((prev) => prev.filter((p) => p.id !== id))
    } catch {}
  }

  function formatDate(dateStr: string | null) {
    if (!dateStr) return "-"
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <Container className="p-8">
        <p className="text-ui-fg-muted">Loading posts...</p>
      </Container>
    )
  }

  return (
    <Container className="p-0">
      <div className="flex items-center justify-between px-6 py-4 border-b border-ui-border-base">
        <Heading level="h1">Blog Posts</Heading>
        <a href="/app/blog/create">
          <Button variant="primary" size="small">
            Create Post
          </Button>
        </a>
      </div>

      {posts.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <p className="text-ui-fg-muted">No blog posts yet.</p>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-ui-border-base text-left text-xs font-medium text-ui-fg-muted">
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-ui-border-base hover:bg-ui-bg-base-hover">
                <td className="px-6 py-3">
                  <a
                    href={`/app/blog/${post.id}`}
                    className="text-sm font-medium text-ui-fg-base hover:text-ui-fg-interactive"
                  >
                    {post.title}
                  </a>
                  <p className="text-xs text-ui-fg-muted mt-0.5">/{post.slug}</p>
                </td>
                <td className="px-6 py-3">
                  <Badge color={post.status === "published" ? "green" : "grey"}>
                    {post.status}
                  </Badge>
                </td>
                <td className="px-6 py-3 text-sm text-ui-fg-subtle">
                  {formatDate(post.published_at || post.created_at)}
                </td>
                <td className="px-6 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <a href={`/app/blog/${post.id}`}>
                      <Button variant="secondary" size="small">
                        Edit
                      </Button>
                    </a>
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Blog",
})

export default BlogListPage
