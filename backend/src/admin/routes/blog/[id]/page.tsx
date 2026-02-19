import { Container, Heading, Button } from "@medusajs/ui"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { BlogForm } from "../components/BlogForm"

function BlogEditPage() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPost()
  }, [id])

  async function fetchPost() {
    try {
      const res = await fetch(`/admin/blog/${id}`, { credentials: "include" })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setPost(data.blog_post)
    } catch {
      setPost(null)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(data: any) {
    const payload = {
      ...data,
      tags: data.tags
        ? JSON.stringify(data.tags.split(",").map((t: string) => t.trim()).filter(Boolean))
        : "[]",
      published_at:
        data.status === "published" && !post?.published_at
          ? new Date().toISOString()
          : post?.published_at || null,
    }

    const res = await fetch(`/admin/blog/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message || "Failed to update post")
    }

    window.location.href = "/app/blog"
  }

  async function handleDelete() {
    if (!confirm("Delete this post permanently?")) return
    await fetch(`/admin/blog/${id}`, { method: "DELETE", credentials: "include" })
    window.location.href = "/app/blog"
  }

  if (loading) {
    return (
      <Container className="p-8">
        <p className="text-ui-fg-muted">Loading post...</p>
      </Container>
    )
  }

  if (!post) {
    return (
      <Container className="p-8">
        <p className="text-ui-fg-error">Post not found.</p>
      </Container>
    )
  }

  const tags = (() => {
    try {
      const parsed = typeof post.tags === "string" ? JSON.parse(post.tags) : post.tags
      return Array.isArray(parsed) ? parsed.join(", ") : ""
    } catch {
      return ""
    }
  })()

  return (
    <Container className="p-0">
      <div className="flex items-center justify-between px-6 py-4 border-b border-ui-border-base">
        <Heading level="h1">Edit: {post.title}</Heading>
        <Button variant="secondary" size="small" onClick={handleDelete}>
          Delete Post
        </Button>
      </div>
      <div className="px-6 py-6">
        <BlogForm
          initial={{
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt || "",
            content: post.content || "",
            cover_image: post.cover_image || "",
            author: post.author || "",
            tags,
            status: post.status,
            seo_title: post.seo_title || "",
            seo_description: post.seo_description || "",
          }}
          onSubmit={handleSubmit}
          submitLabel="Update Post"
        />
      </div>
    </Container>
  )
}

export default BlogEditPage
