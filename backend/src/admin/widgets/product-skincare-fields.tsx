import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Label, Button, Input } from "@medusajs/ui"
import { useState, useEffect } from "react"

const SKIN_TYPES = ["All Skin Types", "Oily", "Dry", "Combination", "Sensitive"]
const CONCERNS = ["Acne", "Hydration", "Anti-aging", "Brightening", "Pores", "Sun Protection"]

type DetailWidgetProps = {
  data: { id: string; metadata: Record<string, any> | null }
}

function MultiSelect({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  return (
    <div>
      <Label className="mb-2 block text-sm font-medium">{label}</Label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const isActive = selected.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                isActive
                  ? "border-ui-tag-purple-border bg-ui-tag-purple-bg text-ui-tag-purple-text"
                  : "border-ui-border-base bg-ui-bg-base text-ui-fg-subtle hover:bg-ui-bg-base-hover"
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SkincareFieldsWidget({ data }: DetailWidgetProps) {
  const metadata = data.metadata || {}

  const [skinTypes, setSkinTypes] = useState<string[]>([])
  const [concerns, setConcerns] = useState<string[]>([])
  const [brand, setBrand] = useState("")
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null)

  useEffect(() => {
    const st = metadata.skin_type
    if (st && typeof st === "string") {
      setSkinTypes(st.split(",").map((s: string) => s.trim()).filter(Boolean))
    }
    const c = metadata.concerns
    if (c && typeof c === "string") {
      setConcerns(c.split(",").map((s: string) => s.trim()).filter(Boolean))
    }
    setBrand((metadata.brand as string) || "")
  }, [data.id])

  function toggleSkinType(value: string) {
    setSkinTypes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  function toggleConcern(value: string) {
    setConcerns((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
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
            skin_type: skinTypes.join(", "),
            concerns: concerns.join(", "),
            brand: brand.trim(),
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
        <Heading level="h2">Skincare Attributes</Heading>
      </div>
      <div className="flex flex-col gap-4 px-6 py-4">
        <MultiSelect
          label="Skin Type"
          options={SKIN_TYPES}
          selected={skinTypes}
          onToggle={toggleSkinType}
        />
        <MultiSelect
          label="Concerns"
          options={CONCERNS}
          selected={concerns}
          onToggle={toggleConcern}
        />
        <div>
          <Label className="mb-2 block text-sm font-medium">Brand</Label>
          <Input
            placeholder="e.g. COSRX, Purito, Klairs"
            value={brand}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBrand(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="small"
            onClick={handleSave}
            isLoading={saving}
          >
            Save
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
  zone: "product.details.side.before",
})

export default SkincareFieldsWidget
