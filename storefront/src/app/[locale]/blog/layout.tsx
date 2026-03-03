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
    title: t("blogTitle"),
    description: t("blogDescription"),
    alternates: { canonical: `${siteUrl}/${locale}/blog` },
    openGraph: {
      title: t("blogTitle"),
      description: t("blogDescription"),
      url: `${siteUrl}/${locale}/blog`,
      siteName: t("siteName"),
      locale: locale === "ar" ? "ar_JO" : "en_US",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: t("title") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("blogTitle"),
      description: t("blogDescription"),
      images: ["/og-image.png"],
    },
  }
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
