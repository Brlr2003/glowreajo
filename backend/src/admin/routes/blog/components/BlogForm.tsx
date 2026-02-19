import { Button, Input, Textarea, Label, Select } from "@medusajs/ui"
import { useState, useRef } from "react"
import { RichTextEditor } from "./RichTextEditor"

interface BlogFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
  author: string
  tags: string
  status: string
  seo_title: string
  seo_description: string
}

interface BlogFormProps {
  initial?: Partial<BlogFormData>
  onSubmit: (data: BlogFormData) => Promise<void>
  submitLabel?: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function BlogForm({ initial = {}, onSubmit, submitLabel = "Save" }: BlogFormProps) {
  const [form, setForm] = useState<BlogFormData>({
    title: initial.title || "",
    slug: initial.slug || "",
    excerpt: initial.excerpt || "",
    content: initial.content || "",
    cover_image: initial.cover_image || "",
    author: initial.author || "GlowReaJo Team",
    tags: initial.tags || "",
    status: initial.status || "draft",
    seo_title: initial.seo_title || "",
    seo_description: initial.seo_description || "",
  })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  function update(field: keyof BlogFormData, value: string) {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      if (field === "title" && !initial.slug) {
        next.slug = slugify(value)
      }
      return next
    })
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError("")
    try {
      const formData = new FormData()
      formData.append("files", file)

      const res = await fetch("/admin/uploads", {
        method: "POST",
        credentials: "include",
        body: formData,
      })

      if (!res.ok) throw new Error("Upload failed")

      const data = await res.json()
      const url = data.files?.[0]?.url
      if (url) {
        update("cover_image", url)
      }
    } catch (err: any) {
      setError(err.message || "Image upload failed")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim() || !form.slug.trim()) {
      setError("Title and slug are required")
      return
    }
    setSaving(true)
    setError("")
    try {
      await onSubmit(form)
    } catch (err: any) {
      setError(err.message || "Save failed")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-1.5 block text-sm font-medium">Title *</Label>
          <Input
            value={form.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("title", e.target.value)}
            placeholder="Post title"
          />
        </div>
        <div>
          <Label className="mb-1.5 block text-sm font-medium">Slug *</Label>
          <Input
            value={form.slug}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("slug", e.target.value)}
            placeholder="post-slug"
          />
        </div>
      </div>

      <div>
        <Label className="mb-1.5 block text-sm font-medium">Excerpt</Label>
        <Textarea
          value={form.excerpt}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => update("excerpt", e.target.value)}
          placeholder="Short summary of the post..."
          rows={2}
        />
      </div>

      <div>
        <Label className="mb-1.5 block text-sm font-medium">Content</Label>
        <RichTextEditor
          content={form.content}
          onChange={(html: string) => update("content", html)}
        />
      </div>

      <div>
        <Label className="mb-1.5 block text-sm font-medium">Cover Image</Label>
        <div className="flex items-center gap-3">
          <Input
            value={form.cover_image}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("cover_image", e.target.value)}
            placeholder="Image URL or upload below"
            className="flex-1"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Button
            type="button"
            variant="secondary"
            size="small"
            onClick={() => fileInputRef.current?.click()}
            isLoading={uploading}
          >
            Upload
          </Button>
        </div>
        {form.cover_image && (
          <div className="mt-2 rounded-lg border border-ui-border-base overflow-hidden">
            <img
              src={form.cover_image}
              alt="Cover preview"
              className="w-full max-h-48 object-cover"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-1.5 block text-sm font-medium">Author</Label>
          <Input
            value={form.author}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("author", e.target.value)}
            placeholder="Author name"
          />
        </div>
        <div>
          <Label className="mb-1.5 block text-sm font-medium">Tags (comma-separated)</Label>
          <Input
            value={form.tags}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("tags", e.target.value)}
            placeholder="skincare, routine, tips"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-1.5 block text-sm font-medium">Status</Label>
          <Select value={form.status} onValueChange={(v: string) => update("status", v)}>
            <Select.Trigger>
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="draft">Draft</Select.Item>
              <Select.Item value="published">Published</Select.Item>
            </Select.Content>
          </Select>
        </div>
        <div>
          <Label className="mb-1.5 block text-sm font-medium">SEO Title</Label>
          <Input
            value={form.seo_title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("seo_title", e.target.value)}
            placeholder="Custom SEO title"
          />
        </div>
      </div>

      <div>
        <Label className="mb-1.5 block text-sm font-medium">SEO Description</Label>
        <Input
          value={form.seo_description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("seo_description", e.target.value)}
          placeholder="Custom meta description"
        />
      </div>

      {error && <p className="text-ui-fg-error text-sm">{error}</p>}

      <div>
        <Button type="submit" variant="primary" isLoading={saving}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
