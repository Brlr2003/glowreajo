"use client"

import { motion } from "framer-motion"
import { Heart, Sparkles, Globe, Leaf, Shield, Star, Zap, Sun } from "lucide-react"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { stagger, fadeInUp } from "@/lib/animations"
import { getSiteSettings } from "@/lib/site-settings"
import { useEffect, useState } from "react"
import type { LucideIcon } from "lucide-react"

const ICON_MAP: Record<string, LucideIcon> = {
  heart: Heart, sparkles: Sparkles, globe: Globe, leaf: Leaf,
  shield: Shield, star: Star, zap: Zap, sun: Sun,
}

interface ValueCard {
  icon: string
  title: string
  description: string
}

const DEFAULT_INTRO = "GlowReaJo was born from a simple idea: bring the magic of Korean skincare to Jordan. We started as K-beauty enthusiasts and grew into Jordan\u2019s trusted destination for authentic Korean skincare products."

const DEFAULT_STORY = `<p>It all started with a love for glass skin and the Korean beauty philosophy of caring for your skin gently and consistently. After struggling to find authentic K-beauty products in Jordan, we decided to become the solution.</p><p>Today, GlowReaJo offers a carefully curated selection of Korean skincare from beloved brands like COSRX, Some By Mi, Beauty of Joseon, Laneige, and Innisfree. Every product is hand-picked for its quality, effectiveness, and value.</p><p>We\u2019re more than a store \u2014 we\u2019re a community of skincare lovers who believe that great skin is a journey, not a destination. Join us and discover your own glow.</p>`

const DEFAULT_VALUES: ValueCard[] = [
  { icon: "heart", title: "Passion for Skincare", description: "We believe everyone deserves to feel confident in their skin. Our curated selection brings the best of Korean skincare innovation to Jordan." },
  { icon: "sparkles", title: "100% Authentic", description: "Every product is sourced directly from Korean brands and verified for authenticity. No counterfeits, ever." },
  { icon: "globe", title: "K-Beauty for Jordan", description: "We bridge the gap between Seoul\u2019s skincare innovation and Jordan\u2019s beauty community, making premium products accessible and affordable." },
  { icon: "leaf", title: "Clean & Effective", description: "Korean skincare is known for gentle, effective formulations. We prioritize products with clean ingredients that deliver real results." },
]

const DEFAULT_KBEAUTY = `<p>Korean skincare (K-beauty) is renowned worldwide for its innovative formulations, gentle ingredients, and results-driven approach. The Korean beauty philosophy emphasizes prevention, hydration, and layering products for maximum effectiveness.</p><p>From snail mucin to rice extracts, Korean brands harness the power of nature combined with cutting-edge science to create products that truly transform your skin.</p>`

export default function AboutPage() {
  const [intro, setIntro] = useState(DEFAULT_INTRO)
  const [story, setStory] = useState(DEFAULT_STORY)
  const [values, setValues] = useState<ValueCard[]>(DEFAULT_VALUES)
  const [kbeauty, setKbeauty] = useState(DEFAULT_KBEAUTY)

  useEffect(() => {
    getSiteSettings().then((s) => {
      if (!s) return
      if (s.about_intro) setIntro(s.about_intro)
      if (s.about_story) setStory(s.about_story)
      if (s.about_kbeauty) setKbeauty(s.about_kbeauty)
      if (s.about_values) {
        try {
          const parsed = JSON.parse(s.about_values)
          if (Array.isArray(parsed) && parsed.length > 0) setValues(parsed)
        } catch {}
      }
    })
  }, [])

  return (
    <div className="container-app py-12">
      <AnimatedSection>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-heading text-4xl font-bold text-text-primary md:text-5xl">
            About{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              GlowReaJo
            </span>
          </h1>
          <p className="mt-6 text-lg text-text-secondary leading-relaxed">{intro}</p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl font-bold text-text-primary mb-6">Our Story</h2>
          <div
            className="prose prose-neutral max-w-none text-text-secondary leading-relaxed"
            dangerouslySetInnerHTML={{ __html: story }}
          />
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="font-heading text-3xl font-bold text-text-primary text-center mb-10">
          Our Values
        </h2>
      </AnimatedSection>

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {values.map((value: ValueCard) => {
          const Icon = ICON_MAP[value.icon] || Heart
          return (
            <motion.div
              key={value.title}
              variants={fadeInUp}
              className="rounded-2xl bg-surface p-8 shadow-soft"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-text-primary">{value.title}</h3>
              <p className="mt-2 text-text-secondary">{value.description}</p>
            </motion.div>
          )
        })}
      </motion.div>

      <AnimatedSection>
        <div className="mt-16 text-center">
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">
            Why Korean Skincare?
          </h2>
          <div
            className="prose prose-neutral max-w-2xl mx-auto text-text-secondary leading-relaxed"
            dangerouslySetInnerHTML={{ __html: kbeauty }}
          />
        </div>
      </AnimatedSection>
    </div>
  )
}
