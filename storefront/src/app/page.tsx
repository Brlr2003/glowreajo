"use client"

import { HeroSection } from "@/components/home/HeroSection"
import { MarqueeBanner } from "@/components/home/MarqueeBanner"
import { FeaturedCategories } from "@/components/home/FeaturedCategories"
import { BestSellers } from "@/components/home/BestSellers"
import { ValueProps } from "@/components/home/ValueProps"
import { RoutineBuilder } from "@/components/home/RoutineBuilder"
import { SocialProof } from "@/components/home/SocialProof"
import { Newsletter } from "@/components/home/Newsletter"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeBanner />
      <FeaturedCategories />
      <BestSellers />
      <ValueProps />
      <RoutineBuilder />
      <SocialProof />
      <Newsletter />
    </>
  )
}
