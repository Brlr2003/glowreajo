import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Label, Button, Input } from "@medusajs/ui"
import { useState, useEffect } from "react"
import { Plus, X } from "lucide-react"

const SKIN_TYPES = ["All Skin Types", "Oily", "Dry", "Combination", "Sensitive"]
const CONCERNS = ["Acne", "Hydration", "Anti-aging", "Brightening", "Pores", "Sun Protection"]

type DetailWidgetProps = {
  data: { id: string; metadata: Record<string, any> | null }
}

function MultiSelect({
  label,
  defaults,
  selected,
  onToggle,
  onAdd,
  onRemoveCustom,
}: {
  label: string
  defaults: string[]
  selected: string[]
  onToggle: (value: string) => void
  onAdd: (value: string) => void
  onRemoveCustom: (value: string) => void
}) {
  const [adding, setAdding] = useState(false)
  const [custom, setCustom] = useState("")

  const customValues = selected.filter((v) => !defaults.includes(v))
  const allOptions = [...defaults, ...customValues]

  function handleAdd() {
    const val = custom.trim()
    if (val && !allOptions.includes(val)) {
      onAdd(val)
    }
    setCustom("")
    setAdding(false)
  }

  return (
    <div>
      <Label className="mb-2 block text-sm font-medium">{label}</Label>
      <div className="flex flex-wrap gap-1.5">
        {allOptions.map((opt) => {
          const isActive = selected.includes(opt)
          const isCustom = !defaults.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              className={`relative rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                isActive
                  ? "border-ui-tag-purple-border bg-ui-tag-purple-bg text-ui-tag-purple-text"
                  : "border-ui-border-base bg-ui-bg-base text-ui-fg-subtle hover:bg-ui-bg-base-hover"
              }`}
            >
              {opt}
              {isCustom && (
                <span
                  onClick={(e) => { e.stopPropagation(); onRemoveCustom(opt) }}
                  className="ml-1.5 inline-flex items-center"
                >
                  <X className="h-3 w-3" />
                </span>
              )}
            </button>
          )
        })}
        {adding ? (
          <form
            onSubmit={(e) => { e.preventDefault(); handleAdd() }}
            className="flex items-center gap-1"
          >
            <input
              autoFocus
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onBlur={() => { if (!custom.trim()) setAdding(false) }}
              placeholder="Type & Enter"
              className="h-7 w-28 rounded-full border border-ui-border-base bg-ui-bg-base px-3 text-xs outline-none focus:border-ui-border-interactive"
            />
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="flex items-center gap-1 rounded-full border border-dashed border-ui-border-base px-3 py-1 text-xs text-ui-fg-muted hover:border-ui-border-interactive hover:text-ui-fg-subtle transition-colors"
          >
            <Plus className="h-3 w-3" />
            Add
          </button>
        )}
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
    } else {
      setSkinTypes([])
    }
    const c = metadata.concerns
    if (c && typeof c === "string") {
      setConcerns(c.split(",").map((s: string) => s.trim()).filter(Boolean))
    } else {
      setConcerns([])
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
          defaults={SKIN_TYPES}
          selected={skinTypes}
          onToggle={toggleSkinType}
          onAdd={(v) => setSkinTypes((prev) => [...prev, v])}
          onRemoveCustom={(v) => setSkinTypes((prev) => prev.filter((x) => x !== v))}
        />
        <MultiSelect
          label="Concerns"
          defaults={CONCERNS}
          selected={concerns}
          onToggle={toggleConcern}
          onAdd={(v) => setConcerns((prev) => [...prev, v])}
          onRemoveCustom={(v) => setConcerns((prev) => prev.filter((x) => x !== v))}
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
