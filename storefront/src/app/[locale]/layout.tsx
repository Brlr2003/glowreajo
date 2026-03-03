import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Outfit, Noto_Sans_Arabic } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
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

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
})

const siteUrl = "https://glowreajo.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GlowReaJo | Korean Skincare in Jordan",
    template: "%s | GlowReaJo",
  },
  description:
    "Your trusted Korean skincare destination in Jordan. Authentic K-beauty products from COSRX, Laneige, Innisfree & more.",
  keywords: [
    "Korean skincare", "K-beauty", "skincare Jordan", "COSRX Jordan",
    "Laneige Jordan", "Innisfree Jordan", "GlowReaJo", "K-beauty Jordan",
  ],
  authors: [{ name: "GlowReaJo" }],
  creator: "GlowReaJo",
  openGraph: {
    title: "GlowReaJo | Korean Skincare in Jordan",
    description: "Authentic K-beauty products delivered to your door in Jordan.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "GlowReaJo",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "GlowReaJo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GlowReaJo | Korean Skincare in Jordan",
    description: "Authentic K-beauty products delivered to your door in Jordan.",
    images: ["/og-image.png"],
  },
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
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
    <html lang={locale} dir={dir} className={`${plusJakarta.variable} ${outfit.variable} ${notoArabic.variable}`}>
      <body className="min-h-screen bg-background antialiased">
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
