import type { Metadata } from "next"
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

export const metadata: Metadata = {
  alternates: { canonical: "https://glowreajo.com" },
  openGraph: {
    title: "GlowReaJo | Korean Skincare in Jordan",
    description:
      "Authentic K-beauty products delivered to your door in Jordan. Shop COSRX, Laneige, Innisfree & more.",
    url: "https://glowreajo.com",
    siteName: "GlowReaJo",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "GlowReaJo - Korean Skincare in Jordan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GlowReaJo | Korean Skincare in Jordan",
    description:
      "Authentic K-beauty products delivered to your door in Jordan. Shop COSRX, Laneige, Innisfree & more.",
    images: ["/og-image.png"],
  },
}

async function getBrands(): Promise<string[]> {
  try {
    const data = await medusaFetch<{ brands: string[] }>("/store/brands")
    return data.brands || []
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [categories, brands, testimonials] = await Promise.all([
    getCategories(),
    getBrands(),
    getTestimonials(),
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
