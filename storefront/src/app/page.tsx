import type { Metadata } from "next"
import { HeroSection } from "@/components/home/HeroSection"
import { BrandsBar } from "@/components/home/BrandsBar"
import { FeaturedCategories } from "@/components/home/FeaturedCategories"
import { BestSellers } from "@/components/home/BestSellers"
import { ValueProps } from "@/components/home/ValueProps"
import { Testimonials } from "@/components/home/Testimonials"
import { RoutineBuilder } from "@/components/home/RoutineBuilder"
import { SocialProof } from "@/components/home/SocialProof"
import { Newsletter } from "@/components/home/Newsletter"
import { JsonLd } from "@/components/seo/JsonLd"
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo/schemas"
import { getCategories } from "@/lib/categories"
import { medusaFetch } from "@/lib/medusa-fetch"

export const metadata: Metadata = {
  alternates: { canonical: "https://glowreajo.com" },
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
  const [categories, brands] = await Promise.all([getCategories(), getBrands()])

  return (
    <>
      <JsonLd data={[buildOrganizationJsonLd(), buildWebSiteJsonLd()]} />
      <HeroSection />
      <BrandsBar brands={brands} />
      <FeaturedCategories categories={categories} />
      <BestSellers />
      <ValueProps />
      <Testimonials />
      <RoutineBuilder />
      <SocialProof />
      <Newsletter />
    </>
  )
}
