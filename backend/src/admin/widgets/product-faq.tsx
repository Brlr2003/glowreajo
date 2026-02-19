import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, Input, Textarea, Label } from "@medusajs/ui"
import { useState, useEffect } from "react"

type DetailWidgetProps = {
  data: { id: string; metadata: Record<string, any> | null }
}

interface FaqItem {
  q: string
  a: string
}

function ProductFaqWidget({ data }: DetailWidgetProps) {
  const metadata = data.metadata || {}
  const [items, setItems] = useState<FaqItem[]>([])
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null)

  useEffect(() => {
    try {
      const raw = metadata.faq
      if (raw && typeof raw === "string") {
        setItems(JSON.parse(raw))
      } else {
        setItems([])
      }
    } catch {
      setItems([])
    }
  }, [data.id])

  function addItem() {
    setItems((prev) => [...prev, { q: "", a: "" }])
  }

  function updateItem(index: number, field: "q" | "a", value: string) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)))
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSave() {
    setSaving(true)
    setFeedback(null)
    const validItems = items.filter((i) => i.q.trim() && i.a.trim())
    try {
      const res = await fetch(`/admin/products/${data.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          metadata: { ...metadata, faq: JSON.stringify(validItems) },
        }),
      })
      if (!res.ok) throw new Error("Failed to save")
      setItems(validItems)
      setFeedback({ type: "success", msg: "FAQ saved!" })
    } catch (e: any) {
      setFeedback({ type: "error", msg: e.message || "Save failed" })
    } finally {
      setSaving(false)
      setTimeout(() => setFeedback(null), 3000)
    }
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Product FAQ</Heading>
        <Button variant="secondary" size="small" onClick={addItem}>
          + Add Question
        </Button>
      </div>
      <div className="flex flex-col gap-4 px-6 py-4">
        {items.length === 0 && (
          <p className="text-ui-fg-muted text-sm">
            No FAQ entries yet. Add questions your customers commonly ask about this product.
          </p>
        )}
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border border-ui-border-base p-4">
            <div className="flex items-start justify-between gap-2 mb-3">
              <Label className="text-xs font-medium text-ui-fg-muted">Question {i + 1}</Label>
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="text-xs text-ui-fg-muted hover:text-ui-fg-error transition-colors"
              >
                Remove
              </button>
            </div>
            <Input
              placeholder="Question..."
              value={item.q}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateItem(i, "q", e.target.value)}
              className="mb-2"
            />
            <Textarea
              placeholder="Answer..."
              value={item.a}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateItem(i, "a", e.target.value)}
              rows={3}
            />
          </div>
        ))}
        <div className="flex items-center gap-3">
          <Button variant="primary" size="small" onClick={handleSave} isLoading={saving}>
            Save FAQ
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
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default ProductFaqWidget
