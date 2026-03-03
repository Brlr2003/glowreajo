"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MessageCircle, Instagram, Send, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { stagger, fadeInUp } from "@/lib/animations"
import { useTranslations, useLocale } from "next-intl"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
const API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

function formatPhoneDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, "")
  if (digits.startsWith("962") && digits.length === 12) {
    return `+${digits.slice(0, 3)} ${digits.slice(3, 4)} ${digits.slice(4, 8)} ${digits.slice(8)}`
  }
  if (digits.startsWith("962") && digits.length === 11) {
    return `+${digits.slice(0, 3)} ${digits.slice(3, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`
  }
  return raw.startsWith("+") ? raw : `+${raw}`
}

interface ContactItem {
  icon: typeof Phone
  label: string
  value: string
  href: string
}

function buildContacts(
  t: (key: string) => string,
  phone: string,
  email: string,
  whatsapp: string,
  instagram?: { handle: string; url?: string }
): ContactItem[] {
  const phoneDigits = phone.replace(/\D/g, "")
  const whatsappDigits = whatsapp.replace(/\D/g, "")
  const items: ContactItem[] = [
    { icon: Phone, label: t("phone"), value: formatPhoneDisplay(phone), href: `tel:+${phoneDigits}` },
    { icon: Mail, label: t("email"), value: email, href: `mailto:${email}` },
    { icon: MessageCircle, label: t("whatsapp"), value: formatPhoneDisplay(whatsapp), href: `https://wa.me/${whatsappDigits}` },
  ]
  if (instagram?.handle) {
    items.push({
      icon: Instagram,
      label: "Instagram",
      value: instagram.handle,
      href: instagram.url || `https://instagram.com/${instagram.handle.replace("@", "")}`,
    })
  }
  return items
}

const DEFAULT_PHONE = "962777261248"
const DEFAULT_EMAIL = "info@glowreajo.com"
const DEFAULT_WHATSAPP = "962782045415"

export default function ContactPage() {
  const t = useTranslations("contact")
  const locale = useLocale()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [contacts, setContacts] = useState<ContactItem[]>(() =>
    buildContacts(t, DEFAULT_PHONE, DEFAULT_EMAIL, DEFAULT_WHATSAPP)
  )

  useEffect(() => {
    fetch(`${BACKEND_URL}/store/site-settings?locale=${locale}`, {
      headers: { "x-publishable-api-key": API_KEY },
    })
      .then((res) => res.json())
      .then((data) => {
        const s = data.site_setting
        if (!s) return
        setContacts(
          buildContacts(
            t,
            s.phone || DEFAULT_PHONE,
            s.email || DEFAULT_EMAIL,
            s.whatsapp || DEFAULT_WHATSAPP,
            s.instagram_handle ? { handle: s.instagram_handle, url: s.instagram_url } : undefined
          )
        )
      })
      .catch(() => {})
  }, [locale, t])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.name && form.email && form.message) setSubmitted(true)
  }

  return (
    <div className="container-app py-12">
      <AnimatedSection>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="font-heading text-4xl font-bold text-text-primary md:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-text-secondary">{t("subtitle")}</p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-bold text-text-primary">{t("getInTouch")}</h2>
            <motion.div variants={stagger(0.08)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
              {contacts.map((contact) => (
                <motion.a
                  key={contact.label}
                  variants={fadeInUp}
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 rounded-2xl bg-surface p-5 shadow-soft hover:shadow-card transition-shadow"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 shrink-0">
                    <contact.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">{contact.label}</p>
                    <p className="font-medium text-text-primary" dir="ltr">{contact.value}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="rounded-2xl bg-surface p-8 shadow-soft">
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">{t("sendMessage")}</h2>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                <h3 className="font-heading text-lg font-semibold">{t("sent")}</h3>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label={t("yourName")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <Input label={t("yourEmail")} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <div>
                  <textarea
                    placeholder={t("yourMessage")}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none resize-none focus:border-primary transition-colors"
                  />
                </div>
                <Button type="submit" className="w-full flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" />
                  {t("sendMessage")}
                </Button>
              </form>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
