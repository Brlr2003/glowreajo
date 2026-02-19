import { Container, Heading } from "@medusajs/ui"
import { BlogForm } from "../components/BlogForm"

function BlogCreatePage() {
  async function handleSubmit(data: any) {
    const payload = {
      ...data,
      tags: data.tags
        ? JSON.stringify(data.tags.split(",").map((t: string) => t.trim()).filter(Boolean))
        : "[]",
      published_at: data.status === "published" ? new Date().toISOString() : null,
    }

    const res = await fetch("/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message || "Failed to create post")
    }

    window.location.href = "/app/blog"
  }

  return (
    <Container className="p-0">
      <div className="px-6 py-4 border-b border-ui-border-base">
        <Heading level="h1">Create Blog Post</Heading>
      </div>
      <div className="px-6 py-6">
        <BlogForm onSubmit={handleSubmit} submitLabel="Create Post" />
      </div>
    </Container>
  )
}

export default BlogCreatePage
