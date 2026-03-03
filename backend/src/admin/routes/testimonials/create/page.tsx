import { Container, Heading, Button, Input, Textarea, Label, Select, Switch } from "@medusajs/ui"
import { useState } from "react"

const LANG_TABS = [
  { key: "en", label: "English" },
  { key: "ar", label: "العربية" },
] as const

function CreateTestimonialPage() {
  const [lang, setLang] = useState<"en" | "ar">("en")
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [text, setText] = useState("")
  const [product, setProduct] = useState("")
  const [nameAr, setNameAr] = useState("")
  const [locationAr, setLocationAr] = useState("")
  const [textAr, setTextAr] = useState("")
  const [productAr, setProductAr] = useState("")
  const [rating, setRating] = useState("5")
  const [sortOrder, setSortOrder] = useState("0")
  const [isActive, setIsActive] = useState(true)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null)

  async function handleSave() {
    if (!name.trim() || !text.trim()) {
      setFeedback({ type: "error", msg: "Name and review text are required" })
      return
    }
    setSaving(true)
    setFeedback(null)
    try {
      const res = await fetch("/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: name.trim(),
          location: location.trim() || null,
          text: text.trim(),
          product: product.trim() || null,
          name_ar: nameAr.trim() || null,
          location_ar: locationAr.trim() || null,
          text_ar: textAr.trim() || null,
          product_ar: productAr.trim() || null,
          rating: Number(rating),
          sort_order: Number(sortOrder),
          is_active: isActive,
        }),
      })
      if (!res.ok) throw new Error("Failed to create")
      setFeedback({ type: "success", msg: "Testimonial created!" })
      setTimeout(() => { window.location.href = "/app/testimonials" }, 1000)
    } catch (e: any) {
      setFeedback({ type: "error", msg: e.message || "Failed" })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Container className="p-0">
      <div className="px-6 py-4 border-b border-ui-border-base">
        <Heading level="h1">Add Testimonial</Heading>
      </div>

      <div className="p-6 max-w-xl flex flex-col gap-4">
        <div className="flex gap-1 border-b border-ui-border-base mb-4">
          {LANG_TABS.map((t) => (
            <button key={t.key} type="button" onClick={() => setLang(t.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${lang === t.key ? "border-ui-fg-interactive text-ui-fg-interactive" : "border-transparent text-ui-fg-muted hover:text-ui-fg-base"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {lang === "en" ? (
          <>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">Name *</Label>
              <Input value={name} onChange={(e: any) => setName(e.target.value)} placeholder="Customer name" />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">Location</Label>
              <Input value={location} onChange={(e: any) => setLocation(e.target.value)} placeholder="e.g. Amman" />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">Review Text *</Label>
              <Textarea value={text} onChange={(e: any) => setText(e.target.value)} placeholder="What the customer said..." rows={4} />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">Product</Label>
              <Input value={product} onChange={(e: any) => setProduct(e.target.value)} placeholder="Product name they reviewed" />
            </div>
          </>
        ) : (
          <>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">الاسم</Label>
              <Input dir="rtl" value={nameAr} onChange={(e: any) => setNameAr(e.target.value)} placeholder="اسم العميل" />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">الموقع</Label>
              <Input dir="rtl" value={locationAr} onChange={(e: any) => setLocationAr(e.target.value)} placeholder="مثال: عمّان" />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">نص المراجعة</Label>
              <Textarea dir="rtl" value={textAr} onChange={(e: any) => setTextAr(e.target.value)} placeholder="ما قاله العميل..." rows={4} />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">المنتج</Label>
              <Input dir="rtl" value={productAr} onChange={(e: any) => setProductAr(e.target.value)} placeholder="اسم المنتج الذي راجعوه" />
            </div>
          </>
        )}
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
            Cancel
          </Button>
          <Button variant="primary" size="small" onClick={handleSave} isLoading={saving}>
            Create Testimonial
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

export default CreateTestimonialPage
