import { Button, Input, Label } from "@medusajs/ui"

const ICON_OPTIONS = ["heart", "sparkles", "globe", "leaf", "shield", "star", "zap", "sun"]

export interface ValueCard {
  icon: string
  title: string
  description: string
}

interface ValuesEditorProps {
  values: ValueCard[]
  onChange: (values: ValueCard[]) => void
}

export function ValuesEditor({ values, onChange }: ValuesEditorProps) {
  function updateCard(index: number, field: keyof ValueCard, value: string) {
    const updated = values.map((v: ValueCard, i: number) =>
      i === index ? { ...v, [field]: value } : v
    )
    onChange(updated)
  }

  function addCard() {
    if (values.length >= 6) return
    onChange([...values, { icon: "heart", title: "", description: "" }])
  }

  function removeCard(index: number) {
    onChange(values.filter((_: ValueCard, i: number) => i !== index))
  }

  return (
    <div className="flex flex-col gap-4">
      {values.map((card: ValueCard, i: number) => (
        <div key={i} className="rounded-lg border border-ui-border-base p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-ui-fg-base">Value #{i + 1}</span>
            <Button variant="secondary" size="small" onClick={() => removeCard(i)}>
              Remove
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label className="mb-1.5 block text-sm font-medium">Icon</Label>
              <select
                value={card.icon}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  updateCard(i, "icon", e.target.value)
                }
                className="w-full rounded-md border border-ui-border-base bg-ui-bg-base px-3 py-1.5 text-sm"
              >
                {ICON_OPTIONS.map((ic: string) => (
                  <option key={ic} value={ic}>{ic}</option>
                ))}
              </select>
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">Title</Label>
              <Input
                value={card.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateCard(i, "title", e.target.value)
                }
                placeholder="e.g. Passion for Skincare"
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="mb-1.5 block text-sm font-medium">Description</Label>
              <textarea
                value={card.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  updateCard(i, "description", e.target.value)
                }
                rows={2}
                placeholder="Short description of this value..."
                className="w-full rounded-md border border-ui-border-base bg-ui-bg-base px-3 py-2 text-sm resize-none"
              />
            </div>
          </div>
        </div>
      ))}
      {values.length < 6 && (
        <Button variant="secondary" size="small" onClick={addCard}>
          + Add Value
        </Button>
      )}
    </div>
  )
}
