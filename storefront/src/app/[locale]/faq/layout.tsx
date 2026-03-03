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
    title: t("faqTitle"),
    description: t("faqDescription"),
    alternates: { canonical: `${siteUrl}/${locale}/faq` },
    openGraph: {
      title: t("faqTitle"),
      description: t("faqDescription"),
      url: `${siteUrl}/${locale}/faq`,
      siteName: t("siteName"),
      locale: locale === "ar" ? "ar_JO" : "en_US",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: t("title") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("faqTitle"),
      description: t("faqDescription"),
      images: ["/og-image.png"],
    },
  }
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children
}
