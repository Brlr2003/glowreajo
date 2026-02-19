import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, Input, Textarea, Label, Select } from "@medusajs/ui"
import { useState, useEffect } from "react"

const ICON_OPTIONS = [
  { value: "none", label: "Default" },
  { value: "droplets", label: "Droplets (Cleansers)" },
  { value: "flask", label: "Flask (Toners)" },
  { value: "pipette", label: "Pipette (Serums)" },
  { value: "layers", label: "Layers (Moisturizers)" },
  { value: "sun", label: "Sun (Sunscreens)" },
  { value: "leaf", label: "Leaf (Masks)" },
  { value: "package", label: "Package (Sets)" },
  { value: "sparkles", label: "Sparkles" },
]

const COLOR_OPTIONS = [
  { value: "none", label: "Default (Pink)" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "pink", label: "Pink" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
  { value: "teal", label: "Teal" },
  { value: "rose", label: "Rose" },
  { value: "orange", label: "Orange" },
]

interface FaqItem {
  q: string
  a: string
}

interface CategoryData {
  id: string
  name: string
  handle: string
  metadata: Record<string, any> | null
}

function CategorySettingsPage() {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [icon, setIcon] = useState("")
  const [color, setColor] = useState("")
  const [description, setDescription] = useState("")
  const [faq, setFaq] = useState<FaqItem[]>([])
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      const res = await fetch("/admin/product-categories?limit=50&fields=+metadata", {
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      setCategories(data.product_categories || [])
    } catch {
      setCategories([])
    } finally {
      setLoading(false)
    }
  }

  function selectCategory(cat: CategoryData) {
    setActiveId(cat.id)
    const meta = cat.metadata || {}
    setIcon(meta.icon || "none")
    setColor(meta.color || "none")
    setDescription(meta.description || "")
    try {
      setFaq(meta.faq ? JSON.parse(meta.faq) : [])
    } catch {
      setFaq([])
    }
    setFeedback(null)
  }

  function addFaqItem() {
    setFaq((prev) => [...prev, { q: "", a: "" }])
  }

  function updateFaqItem(index: number, field: "q" | "a", value: string) {
    setFaq((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)))
  }

  function removeFaqItem(index: number) {
    setFaq((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSave() {
    if (!activeId) return
    setSaving(true)
    setFeedback(null)
    const validFaq = faq.filter((i) => i.q.trim() && i.a.trim())
    const cat = categories.find((c) => c.id === activeId)
    const existingMeta = cat?.metadata || {}

    try {
      const res = await fetch(`/admin/product-categories/${activeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          metadata: {
            ...existingMeta,
            icon: icon === "none" ? "" : icon,
            color: color === "none" ? "" : color,
            description: description.trim(),
            faq: validFaq.length > 0 ? JSON.stringify(validFaq) : "",
          },
        }),
      })
      if (!res.ok) throw new Error("Failed to save")
      setFaq(validFaq)
      setFeedback({ type: "success", msg: "Category settings saved!" })
      fetchCategories()
    } catch (e: any) {
      setFeedback({ type: "error", msg: e.message || "Save failed" })
    } finally {
      setSaving(false)
      setTimeout(() => setFeedback(null), 3000)
    }
  }

  if (loading) {
    return (
      <Container className="p-8">
        <p className="text-ui-fg-muted">Loading categories...</p>
      </Container>
    )
  }

  return (
    <Container className="p-0">
      <div className="px-6 py-4 border-b border-ui-border-base">
        <Heading level="h1">Category Settings</Heading>
        <p className="text-ui-fg-muted text-sm mt-1">
          Configure icon, color, description, and FAQ for each product category.
        </p>
      </div>

      <div className="flex min-h-[60vh]">
        <div className="w-64 border-r border-ui-border-base p-4">
          <Label className="mb-2 block text-xs font-medium text-ui-fg-muted">Categories</Label>
          <div className="flex flex-col gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => selectCategory(cat)}
                className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  activeId === cat.id
                    ? "bg-ui-bg-base-pressed text-ui-fg-base font-medium"
                    : "text-ui-fg-subtle hover:bg-ui-bg-base-hover"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-6">
          {!activeId ? (
            <p className="text-ui-fg-muted text-sm">Select a category to configure.</p>
          ) : (
            <div className="flex flex-col gap-5 max-w-xl">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label className="mb-1.5 block text-sm font-medium">Icon</Label>
                  <Select value={icon} onValueChange={setIcon}>
                    <Select.Trigger>
                      <Select.Value placeholder="Select icon" />
                    </Select.Trigger>
                    <Select.Content>
                      {ICON_OPTIONS.map((opt) => (
                        <Select.Item key={opt.value} value={opt.value}>
                          {opt.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label className="mb-1.5 block text-sm font-medium">Color</Label>
                  <Select value={color} onValueChange={setColor}>
                    <Select.Trigger>
                      <Select.Value placeholder="Select color" />
                    </Select.Trigger>
                    <Select.Content>
                      {COLOR_OPTIONS.map((opt) => (
                        <Select.Item key={opt.value} value={opt.value}>
                          {opt.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="mb-1.5 block text-sm font-medium">Description</Label>
                <Textarea
                  placeholder="Category description shown on the storefront..."
                  value={description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium">FAQ</Label>
                  <Button variant="secondary" size="small" onClick={addFaqItem}>
                    + Add Question
                  </Button>
                </div>
                {faq.length === 0 && (
                  <p className="text-ui-fg-muted text-xs">No FAQ entries.</p>
                )}
                {faq.map((item, i) => (
                  <div key={i} className="rounded-lg border border-ui-border-base p-3 mb-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Label className="text-xs text-ui-fg-muted">Q{i + 1}</Label>
                      <button
                        type="button"
                        onClick={() => removeFaqItem(i)}
                        className="text-xs text-ui-fg-muted hover:text-ui-fg-error"
                      >
                        Remove
                      </button>
                    </div>
                    <Input
                      placeholder="Question..."
                      value={item.q}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFaqItem(i, "q", e.target.value)}
                      className="mb-2"
                    />
                    <Textarea
                      placeholder="Answer..."
                      value={item.a}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFaqItem(i, "a", e.target.value)}
                      rows={2}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <Button variant="primary" size="small" onClick={handleSave} isLoading={saving}>
                  Save Settings
                </Button>
                {feedback && (
                  <span
                    className={`text-xs font-medium ${
                      feedback.type === "success" ? "text-ui-fg-interactive" : "text-ui-fg-error"
                    }`}
                  >
                    {feedback.msg}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Category Settings",
})

export default CategorySettingsPage
