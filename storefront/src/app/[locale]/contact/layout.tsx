import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

const siteUrl = "https://glowreajo.com"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
    alternates: { canonical: `${siteUrl}/${locale}/contact` },
    openGraph: {
      title: t("contactTitle"),
      description: t("contactDescription"),
      url: `${siteUrl}/${locale}/contact`,
      siteName: t("siteName"),
      locale: locale === "ar" ? "ar_JO" : "en_US",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: t("title") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("contactTitle"),
      description: t("contactDescription"),
      images: ["/og-image.png"],
    },
  }
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
