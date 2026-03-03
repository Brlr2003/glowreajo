"use client"

import { useState, useEffect } from "react"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import { Sparkles, Instagram, MessageCircle, Mail, Phone } from "lucide-react"

interface FooterCategory {
  id: string
  name: string
  handle: string
  metadata?: Record<string, any>
}

interface Settings {
  phone: string | null
  email: string | null
  whatsapp: string | null
  instagram_handle: string | null
  instagram_url: string | null
}

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
const API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

const DEFAULTS: Settings = {
  phone: "+962 7 7726 1248",
  email: "info@glowreajo.com",
  whatsapp: "96277261248",
  instagram_handle: "@glowreajo",
  instagram_url: "https://instagram.com/glowreajo",
}

export function Footer() {
  const t = useTranslations("footer")
  const tc = useTranslations("common")
  const locale = useLocale()
  const [categories, setCategories] = useState<FooterCategory[]>([])
  const [settings, setSettings] = useState<Settings>(DEFAULTS)

  useEffect(() => {
    fetch(`${BACKEND_URL}/store/product-categories?limit=5&fields=+metadata`, {
      headers: { "x-publishable-api-key": API_KEY },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data.product_categories || []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    fetch(`${BACKEND_URL}/store/site-settings?locale=${locale}`, {
      headers: { "x-publishable-api-key": API_KEY },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.site_setting) {
          const s = data.site_setting
          setSettings({
            phone: s.phone || DEFAULTS.phone,
            email: s.email || DEFAULTS.email,
            whatsapp: s.whatsapp || DEFAULTS.whatsapp,
            instagram_handle: s.instagram_handle || DEFAULTS.instagram_handle,
            instagram_url: s.instagram_url || DEFAULTS.instagram_url,
          })
        }
      })
      .catch(() => {})
  }, [locale])

  const phoneDigits = settings.phone?.replace(/\s+/g, "") || ""

  return (
    <footer className="mt-20 rounded-t-3xl bg-text-primary text-white">
      <div className="container-app py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl font-bold">GlowReaJo</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">{tc("shop")}</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/shop" className="hover:text-primary transition-colors">
                  {tc("shop")}
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/shop/${cat.handle}`}
                    className="hover:text-primary transition-colors"
                  >
                    {locale === "ar" && cat.metadata?.name_ar ? cat.metadata.name_ar : cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">{tc("about")}</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">{tc("blog")}</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">{tc("faq")}</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">{tc("contact")}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">{tc("contact")}</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href={`tel:${phoneDigits}`} dir="ltr" className="hover:text-white transition-colors">{settings.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${settings.email}`} dir="ltr" className="hover:text-white transition-colors">{settings.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{t("whatsapp")}</a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                <a href={settings.instagram_url || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{settings.instagram_handle}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          {t("copyright")}
        </div>
      </div>
    </footer>
  )
}
