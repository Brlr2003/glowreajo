import { Container, Heading, Button, Input, Textarea, Label, Select, Switch } from "@medusajs/ui"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function EditTestimonialPage() {
  const { id } = useParams()
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [text, setText] = useState("")
  const [product, setProduct] = useState("")
  const [rating, setRating] = useState("5")
  const [sortOrder, setSortOrder] = useState("0")
  const [isActive, setIsActive] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/admin/testimonials/${id}`, { credentials: "include" })
        if (!res.ok) throw new Error("Failed")
        const data = await res.json()
        const t = data.testimonial
        setName(t.name || "")
        setLocation(t.location || "")
        setText(t.text || "")
        setProduct(t.product || "")
        setRating(String(t.rating ?? 5))
        setSortOrder(String(t.sort_order ?? 0))
        setIsActive(t.is_active ?? true)
      } catch {
        setFeedback({ type: "error", msg: "Failed to load testimonial" })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  async function handleSave() {
    if (!name.trim() || !text.trim()) {
      setFeedback({ type: "error", msg: "Name and review text are required" })
      return
    }
    setSaving(true)
    setFeedback(null)
    try {
      const res = await fetch(`/admin/testimonials/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: name.trim(),
          location: location.trim() || null,
          text: text.trim(),
          product: product.trim() || null,
          rating: Number(rating),
          sort_order: Number(sortOrder),
          is_active: isActive,
        }),
      })
      if (!res.ok) throw new Error("Failed to save")
      setFeedback({ type: "success", msg: "Testimonial updated!" })
    } catch (e: any) {
      setFeedback({ type: "error", msg: e.message || "Failed" })
    } finally {
      setSaving(false)
      setTimeout(() => setFeedback(null), 3000)
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this testimonial?")) return
    try {
      await fetch(`/admin/testimonials/${id}`, { method: "DELETE", credentials: "include" })
      window.location.href = "/app/testimonials"
    } catch {
      alert("Failed to delete")
    }
  }

  if (loading) {
    return <Container className="p-8"><p className="text-ui-fg-muted">Loading...</p></Container>
  }

  return (
    <Container className="p-0">
      <div className="px-6 py-4 border-b border-ui-border-base">
        <Heading level="h1">Edit Testimonial</Heading>
      </div>

      <div className="p-6 max-w-xl flex flex-col gap-4">
        <div>
          <Label className="mb-1.5 block text-sm font-medium">Name *</Label>
          <Input value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
        </div>
        <div>
          <Label className="mb-1.5 block text-sm font-medium">Location</Label>
          <Input value={location} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)} />
        </div>
        <div>
          <Label className="mb-1.5 block text-sm font-medium">Review Text *</Label>
          <Textarea value={text} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)} rows={4} />
        </div>
        <div>
          <Label className="mb-1.5 block text-sm font-medium">Product</Label>
          <Input value={product} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProduct(e.target.value)} />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <Label className="mb-1.5 block text-sm font-medium">Rating</Label>
            <Select value={rating} onValueChange={setRating}>
              <Select.Trigger><Select.Value /></Select.Trigger>
              <Select.Content>
                {[5, 4, 3, 2, 1].map((r) => (
                  <Select.Item key={r} value={String(r)}>{r} star{r > 1 ? "s" : ""}</Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>
          <div className="flex-1">
            <Label className="mb-1.5 block text-sm font-medium">Sort Order</Label>
            <Input type="number" value={sortOrder} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSortOrder(e.target.value)} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Switch checked={isActive} onCheckedChange={(v: boolean) => setIsActive(v)} />
          <Label>Active (visible on storefront)</Label>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <Button variant="secondary" size="small" onClick={() => { window.location.href = "/app/testimonials" }}>
            Back
          </Button>
          <Button variant="primary" size="small" onClick={handleSave} isLoading={saving}>
            Save Changes
          </Button>
          <Button variant="danger" size="small" onClick={handleDelete}>
            Delete
          </Button>
          {feedback && (
            <span className={`text-xs font-medium ${feedback.type === "success" ? "text-ui-fg-interactive" : "text-ui-fg-error"}`}>
              {feedback.msg}
            </span>
          )}
        </div>
      </div>
    </Container>
  )
}

export default EditTestimonialPage
