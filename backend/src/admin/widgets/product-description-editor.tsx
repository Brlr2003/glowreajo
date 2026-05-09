import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Label, Button } from "@medusajs/ui"
import { useState, useEffect } from "react"
import { RichTextEditor } from "../routes/blog/components/RichTextEditor"

type DetailWidgetProps = {
  data: { id: string; description: string | null; metadata: Record<string, any> | null }
}

function ProductDescriptionEditorWidget({ data }: DetailWidgetProps) {
  const metadata = data.metadata || {}
  const [descHtml, setDescHtml] = useState("")
  const [descHtmlAr, setDescHtmlAr] = useState("")
  const [howToUseHtml, setHowToUseHtml] = useState("")
  const [howToUseHtmlAr, setHowToUseHtmlAr] = useState("")
  const [ingredientsHtml, setIngredientsHtml] = useState("")
  const [ingredientsHtmlAr, setIngredientsHtmlAr] = useState("")
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null)

  useEffect(() => {
    setDescHtml((metadata.description_html as string) || "")
    setDescHtmlAr((metadata.description_html_ar as string) || "")
    setHowToUseHtml((metadata.how_to_use_html as string) || "")
    setHowToUseHtmlAr((metadata.how_to_use_html_ar as string) || "")
    setIngredientsHtml((metadata.ingredients_html as string) || "")
    setIngredientsHtmlAr((metadata.ingredients_html_ar as string) || "")
  }, [data.id])

  function isEmptyHtml(html: string): boolean {
    const stripped = html.replace(/<[^>]+>/g, "").trim()
    return stripped === ""
  }

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
            description_html: isEmptyHtml(descHtml) ? "" : descHtml,
            description_html_ar: isEmptyHtml(descHtmlAr) ? "" : descHtmlAr,
            how_to_use_html: isEmptyHtml(howToUseHtml) ? "" : howToUseHtml,
            how_to_use_html_ar: isEmptyHtml(howToUseHtmlAr) ? "" : howToUseHtmlAr,
            ingredients_html: isEmptyHtml(ingredientsHtml) ? "" : ingredientsHtml,
            ingredients_html_ar: isEmptyHtml(ingredientsHtmlAr) ? "" : ingredientsHtmlAr,
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
        <Heading level="h2">Rich Description</Heading>
        <span className="text-xs text-ui-fg-muted">
          Use this for formatted descriptions with bullets, bold, headings.
        </span>
      </div>
      <div className="flex flex-col gap-6 px-6 py-4">
        <div>
          <Label className="mb-1 block text-sm font-medium">Description (English)</Label>
          <RichTextEditor content={descHtml} onChange={setDescHtml} />
        </div>
        <div>
          <Label className="mb-1 block text-sm font-medium">Description (Arabic)</Label>
          <div dir="rtl">
            <RichTextEditor content={descHtmlAr} onChange={setDescHtmlAr} />
          </div>
        </div>
        <div>
          <Label className="mb-1 block text-sm font-medium">How to Use (English)</Label>
          <RichTextEditor content={howToUseHtml} onChange={setHowToUseHtml} />
        </div>
        <div>
          <Label className="mb-1 block text-sm font-medium">How to Use (Arabic)</Label>
          <div dir="rtl">
            <RichTextEditor content={howToUseHtmlAr} onChange={setHowToUseHtmlAr} />
          </div>
        </div>
        <div>
          <Label className="mb-1 block text-sm font-medium">Ingredients (English)</Label>
          <RichTextEditor content={ingredientsHtml} onChange={setIngredientsHtml} />
        </div>
        <div>
          <Label className="mb-1 block text-sm font-medium">Ingredients (Arabic)</Label>
          <div dir="rtl">
            <RichTextEditor content={ingredientsHtmlAr} onChange={setIngredientsHtmlAr} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" size="small" onClick={handleSave} isLoading={saving}>
            Save Rich Content
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

export default ProductDescriptionEditorWidget
