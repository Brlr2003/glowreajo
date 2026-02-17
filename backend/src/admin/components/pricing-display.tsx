import { Container, Heading, Label, Button, Input, Select } from "@medusajs/ui"
import { useState, useEffect } from "react"

type DiscountMode = "none" | "fixed" | "percentage" | "direct"

const MODE_LABELS: Record<DiscountMode, string> = {
  none: "None",
  fixed: "Fixed Amount",
  percentage: "Percentage",
  direct: "Direct Price",
}

const VALUE_LABELS: Record<DiscountMode, string> = {
  none: "",
  fixed: "Markup (JOD)",
  percentage: "Discount %",
  direct: "Was Price (JOD)",
}

function resolveMode(metadata: Record<string, any>): DiscountMode {
  if (metadata.compare_at_price) return "direct"
  if (metadata.discount_type === "fixed" && metadata.discount_value) return "fixed"
  if (metadata.discount_type === "percentage" && metadata.discount_value) return "percentage"
  return "none"
}

function resolveValue(metadata: Record<string, any>, mode: DiscountMode): string {
  if (mode === "direct") return metadata.compare_at_price || ""
  if (mode === "fixed" || mode === "percentage") return metadata.discount_value || ""
  return ""
}

export function PricingDisplay({
  productId,
  metadata,
}: {
  productId: string
  metadata: Record<string, any>
}) {
  const [mode, setMode] = useState<DiscountMode>("none")
  const [value, setValue] = useState("")
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null)

  useEffect(() => {
    const m = resolveMode(metadata)
    setMode(m)
    setValue(resolveValue(metadata, m))
  }, [productId])

  function buildMetadata(): Record<string, any> {
    const clean: Record<string, any> = {}
    Object.keys(metadata).forEach((key: string) => {
      if (!["compare_at_price", "discount_type", "discount_value"].includes(key)) {
        clean[key] = metadata[key]
      }
    })

    if (mode === "direct" && value.trim()) {
      clean.compare_at_price = value.trim()
    } else if ((mode === "fixed" || mode === "percentage") && value.trim()) {
      clean.discount_type = mode
      clean.discount_value = value.trim()
    }

    return clean
  }

  async function handleSave() {
    setSaving(true)
    setFeedback(null)
    try {
      const res = await fetch(`/admin/products/${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ metadata: buildMetadata() }),
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
        <Heading level="h2">Pricing Display</Heading>
      </div>
      <div className="flex flex-col gap-4 px-6 py-4">
        <div>
          <Label className="mb-2 block text-sm font-medium">Discount Type</Label>
          <Select value={mode} onValueChange={(v: string) => { setMode(v as DiscountMode); setValue("") }}>
            <Select.Trigger>
              <Select.Value placeholder="Select type" />
            </Select.Trigger>
            <Select.Content>
              {(Object.keys(MODE_LABELS) as DiscountMode[]).map((key: DiscountMode) => (
                <Select.Item key={key} value={key}>
                  {MODE_LABELS[key]}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>

        {mode !== "none" && (
          <div>
            <Label className="mb-2 block text-sm font-medium">{VALUE_LABELS[mode]}</Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            />
          </div>
        )}

        <div className="flex items-center gap-3">
          <Button variant="primary" size="small" onClick={handleSave} isLoading={saving}>
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
