import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, Input, Textarea, Label } from "@medusajs/ui"
import { useState, useEffect } from "react"

interface FaqItem {
  q: string
  a: string
}

const LANG_TABS = [
  { key: "en" as const, label: "English" },
  { key: "ar" as const, label: "العربية" },
]

function FaqSettingsPage() {
  const [faq, setFaq] = useState<FaqItem[]>([])
  const [faqAr, setFaqAr] = useState<FaqItem[]>([])
  const [lang, setLang] = useState<"en" | "ar">("en")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    try {
      const res = await fetch("/admin/site-settings", { credentials: "include" })
      if (!res.ok) throw new Error("Failed")
      const data = await res.json()
      const s = data.site_setting
      if (s?.general_faq) {
        try { setFaq(JSON.parse(s.general_faq)) } catch {}
      }
      if (s?.general_faq_ar) {
        try { setFaqAr(JSON.parse(s.general_faq_ar)) } catch {}
      }
    } catch {}
    setLoading(false)
  }

  function addItem() {
    if (lang === "en") setFaq((p) => [...p, { q: "", a: "" }])
    else setFaqAr((p) => [...p, { q: "", a: "" }])
  }

  function updateItem(i: number, field: "q" | "a", value: string) {
    const setter = lang === "en" ? setFaq : setFaqAr
    setter((p) => p.map((item, idx) => (idx === i ? { ...item, [field]: value } : item)))
  }

  function removeItem(i: number) {
    const setter = lang === "en" ? setFaq : setFaqAr
    setter((p) => p.filter((_, idx) => idx !== i))
  }

  async function handleSave() {
    setSaving(true)
    setFeedback(null)
    const validFaq = faq.filter((i) => i.q.trim() && i.a.trim())
    const validFaqAr = faqAr.filter((i) => i.q.trim() && i.a.trim())
    try {
      const res = await fetch("/admin/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          general_faq: validFaq.length > 0 ? JSON.stringify(validFaq) : null,
          general_faq_ar: validFaqAr.length > 0 ? JSON.stringify(validFaqAr) : null,
        }),
      })
      if (!res.ok) throw new Error("Failed to save")
      setFaq(validFaq)
      setFaqAr(validFaqAr)
      setFeedback({ type: "success", msg: "FAQ saved!" })
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

  const items = lang === "en" ? faq : faqAr

  return (
    <Container className="p-0">
      <div className="px-6 py-4 border-b border-ui-border-base">
        <Heading level="h1">FAQ Settings</Heading>
        <p className="text-ui-fg-muted text-sm mt-1">
          Manage general FAQ that appear on the FAQ page (not tied to any product or category).
        </p>
      </div>

      <div className="p-6 max-w-2xl">
        <div className="flex gap-1 border-b border-ui-border-base mb-6">
          {LANG_TABS.map((t) => (
            <button key={t.key} type="button" onClick={() => setLang(t.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                lang === t.key
                  ? "border-ui-fg-interactive text-ui-fg-interactive"
                  : "border-transparent text-ui-fg-muted hover:text-ui-fg-base"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <Label className="text-sm font-medium">
            {lang === "en" ? "Questions & Answers" : "الأسئلة والأجوبة"}
          </Label>
          <Button variant="secondary" size="small" onClick={addItem}>
            {lang === "en" ? "+ Add Question" : "+ إضافة سؤال"}
          </Button>
        </div>

        {items.length === 0 && (
          <p className="text-ui-fg-muted text-xs mb-4">
            {lang === "en" ? "No FAQ entries yet." : "لا توجد أسئلة بعد."}
          </p>
        )}

        {items.map((_: FaqItem, i: number) => (
          <div key={i} className="rounded-lg border border-ui-border-base p-3 mb-3">
            <div className="flex items-start justify-between gap-2 mb-2">
              <Label className="text-xs text-ui-fg-muted">
                {lang === "en" ? `Q${i + 1}` : `س${i + 1}`}
              </Label>
              <button type="button" onClick={() => removeItem(i)}
                className="text-xs text-ui-fg-muted hover:text-ui-fg-error">
                {lang === "en" ? "Remove" : "حذف"}
              </button>
            </div>
            <Input
              dir={lang === "ar" ? "rtl" : "ltr"}
              placeholder={lang === "en" ? "Question..." : "السؤال..."}
              value={items[i].q}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateItem(i, "q", e.target.value)}
              className="mb-2"
            />
            <Textarea
              dir={lang === "ar" ? "rtl" : "ltr"}
              placeholder={lang === "en" ? "Answer..." : "الجواب..."}
              value={items[i].a}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateItem(i, "a", e.target.value)}
              rows={2}
            />
          </div>
        ))}

        <div className="flex items-center gap-3 mt-4">
          <Button variant="primary" size="small" onClick={handleSave} isLoading={saving}>
            Save FAQ
          </Button>
          {feedback && (
            <span className={`text-xs font-medium ${
              feedback.type === "success" ? "text-ui-fg-interactive" : "text-ui-fg-error"
            }`}>
              {feedback.msg}
            </span>
          )}
        </div>
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "FAQ Settings",
})

export default FaqSettingsPage
