import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, Input, Label, Switch } from "@medusajs/ui"
import { useState, useEffect } from "react"
import { AnnouncementEditor } from "./components/AnnouncementEditor"

interface Settings {
  announcement_enabled: boolean
  announcement_content: string
  phone: string
  email: string
  whatsapp: string
  instagram_handle: string
  instagram_url: string
  tiktok_url: string
  facebook_url: string
}

const EMPTY: Settings = {
  announcement_enabled: false,
  announcement_content: "",
  phone: "",
  email: "",
  whatsapp: "",
  instagram_handle: "",
  instagram_url: "",
  tiktok_url: "",
  facebook_url: "",
}

function SiteSettingsPage() {
  const [settings, setSettings] = useState<Settings>(EMPTY)
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
      if (data.site_setting) {
        const s = data.site_setting
        setSettings({
          announcement_enabled: s.announcement_enabled ?? false,
          announcement_content: s.announcement_content ?? "",
          phone: s.phone ?? "",
          email: s.email ?? "",
          whatsapp: s.whatsapp ?? "",
          instagram_handle: s.instagram_handle ?? "",
          instagram_url: s.instagram_url ?? "",
          tiktok_url: s.tiktok_url ?? "",
          facebook_url: s.facebook_url ?? "",
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
        body: JSON.stringify(settings),
      })
      if (!res.ok) throw new Error("Failed to save")
      setFeedback({ type: "success", msg: "Settings saved!" })
    } catch (e: any) {
      setFeedback({ type: "error", msg: e.message || "Save failed" })
    } finally {
      setSaving(false)
      setTimeout(() => setFeedback(null), 3000)
    }
  }

  function update(field: keyof Settings, value: any) {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return <Container className="p-8"><p className="text-ui-fg-muted">Loading...</p></Container>
  }

  return (
    <Container className="p-0">
      <div className="px-6 py-4 border-b border-ui-border-base">
        <Heading level="h1">Site Settings</Heading>
        <p className="text-ui-fg-muted text-sm mt-1">
          Manage announcement bar, contact info, and social links.
        </p>
      </div>

      <div className="p-6 max-w-2xl flex flex-col gap-8">
        <section>
          <Heading level="h2" className="mb-4">Announcement Bar</Heading>
          <div className="flex items-center gap-3 mb-4">
            <Switch
              checked={settings.announcement_enabled}
              onCheckedChange={(v: boolean) => update("announcement_enabled", v)}
            />
            <Label>Enable announcement bar</Label>
          </div>
          <AnnouncementEditor
            content={settings.announcement_content}
            onChange={(html: string) => update("announcement_content", html)}
          />
        </section>

        <section>
          <Heading level="h2" className="mb-4">Contact Info</Heading>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-1.5 block text-sm font-medium">Phone</Label>
              <Input
                placeholder="+962 7 7726 1248"
                value={settings.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("phone", e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">Email</Label>
              <Input
                placeholder="info@glowreajo.com"
                value={settings.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("email", e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">WhatsApp Number</Label>
              <Input
                placeholder="96277261248 (no + or spaces)"
                value={settings.whatsapp}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("whatsapp", e.target.value)}
              />
            </div>
          </div>
        </section>

        <section>
          <Heading level="h2" className="mb-4">Social Links</Heading>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-1.5 block text-sm font-medium">Instagram Handle</Label>
              <Input
                placeholder="@glowreajo"
                value={settings.instagram_handle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("instagram_handle", e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">Instagram URL</Label>
              <Input
                placeholder="https://instagram.com/glowreajo"
                value={settings.instagram_url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("instagram_url", e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">TikTok URL</Label>
              <Input
                placeholder="https://tiktok.com/@glowreajo"
                value={settings.tiktok_url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("tiktok_url", e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">Facebook URL</Label>
              <Input
                placeholder="https://facebook.com/glowreajo"
                value={settings.facebook_url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("facebook_url", e.target.value)}
              />
            </div>
          </div>
        </section>

        <div className="flex items-center gap-3">
          <Button variant="primary" size="small" onClick={handleSave} isLoading={saving}>
            Save Settings
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
  label: "Site Settings",
})

export default SiteSettingsPage
