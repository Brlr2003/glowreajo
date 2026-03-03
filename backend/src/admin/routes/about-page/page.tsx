import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, Label } from "@medusajs/ui"
import { useState, useEffect } from "react"
import { RichTextEditor } from "../blog/components/RichTextEditor"
import { ValuesEditor, type ValueCard } from "./components/ValuesEditor"

const DEFAULT_VALUES: ValueCard[] = [
  { icon: "heart", title: "Passion for Skincare", description: "" },
  { icon: "sparkles", title: "100% Authentic", description: "" },
  { icon: "globe", title: "K-Beauty for Jordan", description: "" },
  { icon: "leaf", title: "Clean & Effective", description: "" },
]

interface AboutFields {
  about_intro: string
  about_story: string
  about_values: ValueCard[]
  about_kbeauty: string
}

const EMPTY: AboutFields = {
  about_intro: "",
  about_story: "",
  about_values: DEFAULT_VALUES,
  about_kbeauty: "",
}

function AboutPageEditor() {
  const [fields, setFields] = useState<AboutFields>(EMPTY)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    try {
      const res = await fetch("/admin/site-settings", { credentials: "include" })
      if (!res.ok) throw new Error()
      const data = await res.json()
      if (data.site_setting) {
        const s = data.site_setting
        let parsedValues = DEFAULT_VALUES
        if (s.about_values) {
          try { parsedValues = JSON.parse(s.about_values) } catch {}
        }
        setFields({
          about_intro: s.about_intro ?? "",
          about_story: s.about_story ?? "",
          about_values: parsedValues,
          about_kbeauty: s.about_kbeauty ?? "",
        })
      }
    } catch {
      /* leave defaults */
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    setFeedback(null)
    try {
      const res = await fetch("/admin/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          about_intro: fields.about_intro,
          about_story: fields.about_story,
          about_values: JSON.stringify(fields.about_values),
          about_kbeauty: fields.about_kbeauty,
        }),
      })
      if (!res.ok) throw new Error("Failed to save")
      setFeedback({ type: "success", msg: "About page saved!" })
    } catch (e: any) {
      setFeedback({ type: "error", msg: e.message || "Save failed" })
    } finally {
      setSaving(false)
      setTimeout(() => setFeedback(null), 3000)
    }
  }

  if (loading) {
    return <Container className="p-8"><p className="text-ui-fg-muted">Loading...</p></Container>
  }

  return (
    <Container className="p-0">
      <div className="px-6 py-4 border-b border-ui-border-base">
        <Heading level="h1">About Page</Heading>
        <p className="text-ui-fg-muted text-sm mt-1">
          Edit the content shown on the storefront About page.
        </p>
      </div>

      <div className="p-6 max-w-3xl flex flex-col gap-8">
        <section>
          <Heading level="h2" className="mb-3">Intro Paragraph</Heading>
          <p className="text-ui-fg-muted text-xs mb-2">
            The subtitle text below "About GlowReaJo". Leave empty to use default.
          </p>
          <textarea
            value={fields.about_intro}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFields((prev) => ({ ...prev, about_intro: e.target.value }))
            }
            rows={3}
            placeholder="GlowReaJo was born from a simple idea..."
            className="w-full rounded-md border border-ui-border-base bg-ui-bg-base px-3 py-2 text-sm resize-none"
          />
        </section>

        <section>
          <Heading level="h2" className="mb-3">Our Story</Heading>
          <p className="text-ui-fg-muted text-xs mb-2">
            Rich text for the "Our Story" section. Leave empty to use default.
          </p>
          <RichTextEditor
            content={fields.about_story}
            onChange={(html: string) => setFields((prev) => ({ ...prev, about_story: html }))}
          />
        </section>

        <section>
          <Heading level="h2" className="mb-3">Our Values</Heading>
          <p className="text-ui-fg-muted text-xs mb-2">
            Value cards displayed in a grid. Each has an icon, title, and description.
          </p>
          <ValuesEditor
            values={fields.about_values}
            onChange={(vals: ValueCard[]) => setFields((prev) => ({ ...prev, about_values: vals }))}
          />
        </section>

        <section>
          <Heading level="h2" className="mb-3">Why Korean Skincare</Heading>
          <p className="text-ui-fg-muted text-xs mb-2">
            Rich text for the "Why Korean Skincare?" section. Leave empty to use default.
          </p>
          <RichTextEditor
            content={fields.about_kbeauty}
            onChange={(html: string) => setFields((prev) => ({ ...prev, about_kbeauty: html }))}
          />
        </section>

        <div className="flex items-center gap-3">
          <Button variant="primary" size="small" onClick={handleSave} isLoading={saving}>
            Save About Page
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

export const config = defineRouteConfig({
  label: "About Page",
})

export default AboutPageEditor
