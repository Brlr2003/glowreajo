"use client"

import { HeroSection } from "@/components/home/HeroSection"
import { BrandsBar } from "@/components/home/BrandsBar"
import { FeaturedCategories } from "@/components/home/FeaturedCategories"
import { BestSellers } from "@/components/home/BestSellers"
import { ValueProps } from "@/components/home/ValueProps"
import { Testimonials } from "@/components/home/Testimonials"
import { RoutineBuilder } from "@/components/home/RoutineBuilder"
import { SocialProof } from "@/components/home/SocialProof"
import { Newsletter } from "@/components/home/Newsletter"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandsBar />
      <FeaturedCategories />
      <BestSellers />
      <ValueProps />
      <Testimonials />
      <RoutineBuilder />
      <SocialProof />
      <Newsletter />
    </>
  )
}
