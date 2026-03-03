"use client"

import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "@/i18n/routing"
import { Globe } from "lucide-react"
import type { Locale } from "@/i18n/config"

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations("languageSwitcher")

  const switchLocale = () => {
    const next: Locale = locale === "en" ? "ar" : "en"
    router.replace(pathname, { locale: next })
  }

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-1.5 px-3 py-2 rounded-full cursor-pointer text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
      aria-label={t("label")}
    >
      <Globe className="h-4.5 w-4.5" />
      <span className="text-xs font-medium hidden sm:inline">{t("switchTo")}</span>
    </button>
  )
}
