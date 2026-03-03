import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Label, Button, Input, Textarea } from "@medusajs/ui"
import { useState, useEffect } from "react"

type DetailWidgetProps = {
  data: { id: string; metadata: Record<string, any> | null }
}

function ProductTranslationWidget({ data }: DetailWidgetProps) {
  const metadata = data.metadata || {}

  const [titleAr, setTitleAr] = useState("")
  const [descAr, setDescAr] = useState("")
  const [howToUseAr, setHowToUseAr] = useState("")
  const [ingredientsAr, setIngredientsAr] = useState("")
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null)

  useEffect(() => {
    setTitleAr((metadata.title_ar as string) || "")
    setDescAr((metadata.description_ar as string) || "")
    setHowToUseAr((metadata.how_to_use_ar as string) || "")
    setIngredientsAr((metadata.ingredients_ar as string) || "")
  }, [data.id])

  async function handleSave() {
    setSaving(true)
    setFeedback(null)
    try {
      const res = await fetch(`/admin/products/${data.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          metadata: {
            ...metadata,
            title_ar: titleAr.trim(),
            description_ar: descAr.trim(),
            how_to_use_ar: howToUseAr.trim(),
            ingredients_ar: ingredientsAr.trim(),
          },
        }),
      })
      if (!res.ok) throw new Error("Failed to save")
      setFeedback({ type: "success", msg: "Saved!" })
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
        <Heading level="h2">Arabic Translation</Heading>
      </div>
      <div className="flex flex-col gap-4 px-6 py-4">
        <div>
          <Label className="mb-1 block text-sm font-medium">Title (Arabic)</Label>
          <Input
            dir="rtl"
            placeholder="اسم المنتج بالعربي"
            value={titleAr}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitleAr(e.target.value)}
          />
        </div>
        <div>
          <Label className="mb-1 block text-sm font-medium">Description (Arabic)</Label>
          <Textarea
            dir="rtl"
            placeholder="وصف المنتج بالعربي"
            value={descAr}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescAr(e.target.value)}
            rows={4}
          />
        </div>
        <div>
          <Label className="mb-1 block text-sm font-medium">How to Use (Arabic)</Label>
          <Textarea
            dir="rtl"
            placeholder="طريقة الاستخدام بالعربي"
            value={howToUseAr}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setHowToUseAr(e.target.value)}
            rows={3}
          />
        </div>
        <div>
          <Label className="mb-1 block text-sm font-medium">Ingredients (Arabic)</Label>
          <Textarea
            dir="rtl"
            placeholder="المكونات بالعربي"
            value={ingredientsAr}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setIngredientsAr(e.target.value)}
            rows={3}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" size="small" onClick={handleSave} isLoading={saving}>
            Save Arabic
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

export const config = defineWidgetConfig({
  zone: "product.details.side.before",
})

export default ProductTranslationWidget
