"use client"

import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "@/i18n/routing"
import { Globe } from "lucide-react"
import type { Locale } from "@/i18n/config"

export function LanguageSwitcher({ variant = "compact" }: { variant?: "compact" | "full" }) {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations("languageSwitcher")

  const switchLocale = () => {
    const next: Locale = locale === "en" ? "ar" : "en"
    router.replace(pathname, { locale: next })
  }

  if (variant === "full") {
    return (
      <button
        onClick={switchLocale}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-text-primary hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
        aria-label={t("label")}
      >
        <Globe className="h-5 w-5" />
        <span style={{ fontFamily: "var(--font-arabic)" }}>{t("switchTo")}</span>
        <span className="ms-auto text-xs font-medium text-text-secondary bg-muted px-2 py-0.5 rounded-full">
          {locale === "en" ? "AR" : "EN"}
        </span>
      </button>
    )
  }

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-1.5 px-3 py-2 rounded-full cursor-pointer text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
      aria-label={t("label")}
    >
      <Globe className="h-4.5 w-4.5" />
      <span className="text-xs font-medium hidden sm:inline" style={{ fontFamily: "var(--font-arabic)" }}>{t("switchTo")}</span>
    </button>
  )
}
