import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { HeroSection } from "@/components/home/HeroSection"
import { BrandsBar } from "@/components/home/BrandsBar"
import { FeaturedCategories } from "@/components/home/FeaturedCategories"
import { BestSellers } from "@/components/home/BestSellers"
import { ValueProps } from "@/components/home/ValueProps"
import { Testimonials } from "@/components/home/Testimonials"
import { RoutineBuilder } from "@/components/home/RoutineBuilder"
import { SocialProof } from "@/components/home/SocialProof"
import { JsonLd } from "@/components/seo/JsonLd"
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo/schemas"
import { getCategories } from "@/lib/categories"
import { getTestimonials } from "@/lib/testimonials"
import { medusaFetch } from "@/lib/medusa-fetch"

const siteUrl = "https://glowreajo.com"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    alternates: {
      canonical: siteUrl,
      languages: { en: `${siteUrl}/en`, ar: `${siteUrl}/ar` },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${siteUrl}/${locale}`,
      siteName: t("siteName"),
      locale: locale === "ar" ? "ar_JO" : "en_US",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: t("title") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-image.png"],
    },
  }
}

async function getBrands(): Promise<string[]> {
  try {
    const data = await medusaFetch<{ brands: string[] }>("/store/brands")
    return data.brands || []
  } catch {
    return []
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [categories, brands, testimonials] = await Promise.all([
    getCategories(locale),
    getBrands(),
    getTestimonials(locale),
  ])

  return (
    <>
      <JsonLd data={[buildOrganizationJsonLd(), buildWebSiteJsonLd()]} />
      <HeroSection />
      <BrandsBar brands={brands} />
      <FeaturedCategories categories={categories} />
      <BestSellers />
      <ValueProps />
      <Testimonials reviews={testimonials} />
      <RoutineBuilder />
      <SocialProof />
    </>
  )
}
