import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Outfit, Cairo } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { localeDirections } from "@/i18n/config"
import "@/styles/globals.css"
import { Providers } from "./providers"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
})

const siteUrl = "https://glowreajo.com"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("title"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: "GlowReaJo" }],
    creator: "GlowReaJo",
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale === "ar" ? "ar_JO" : "en_US",
      url: siteUrl,
      siteName: t("siteName"),
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "GlowReaJo" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-image.png"],
    },
    icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
    alternates: {
      canonical: siteUrl,
      languages: { en: `${siteUrl}/en`, ar: `${siteUrl}/ar` },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()
  const dir = localeDirections[locale as keyof typeof localeDirections] || "ltr"

  return (
    <html lang={locale} dir={dir} className={`${plusJakarta.variable} ${outfit.variable} ${cairo.variable}`}>
      <body className="min-h-screen bg-background antialiased">
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
