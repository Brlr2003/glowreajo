"use client"

import { motion } from "framer-motion"
import { Heart, Sparkles, Globe, Leaf } from "lucide-react"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { stagger, fadeInUp } from "@/lib/animations"

const values = [
  {
    icon: Heart,
    title: "Passion for Skincare",
    description: "We believe everyone deserves to feel confident in their skin. Our curated selection brings the best of Korean skincare innovation to Jordan.",
  },
  {
    icon: Sparkles,
    title: "100% Authentic",
    description: "Every product is sourced directly from Korean brands and verified for authenticity. No counterfeits, ever.",
  },
  {
    icon: Globe,
    title: "K-Beauty for Jordan",
    description: "We bridge the gap between Seoul's skincare innovation and Jordan's beauty community, making premium products accessible and affordable.",
  },
  {
    icon: Leaf,
    title: "Clean & Effective",
    description: "Korean skincare is known for gentle, effective formulations. We prioritize products with clean ingredients that deliver real results.",
  },
]

export default function AboutPage() {
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
          <p className="mt-6 text-lg text-text-secondary leading-relaxed">
            GlowReaJo was born from a simple idea: bring the magic of Korean skincare to Jordan.
            We started as K-beauty enthusiasts and grew into Jordan&apos;s trusted destination
            for authentic Korean skincare products.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl font-bold text-text-primary mb-6">
            Our Story
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              It all started with a love for glass skin and the Korean beauty philosophy of
              caring for your skin gently and consistently. After struggling to find authentic
              K-beauty products in Jordan, we decided to become the solution.
            </p>
            <p>
              Today, GlowReaJo offers a carefully curated selection of Korean skincare
              from beloved brands like COSRX, Some By Mi, Beauty of Joseon, Laneige, and
              Innisfree. Every product is hand-picked for its quality, effectiveness, and value.
            </p>
            <p>
              We&apos;re more than a store &mdash; we&apos;re a community of skincare lovers
              who believe that great skin is a journey, not a destination. Join us and discover
              your own glow.
            </p>
          </div>
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
        {values.map((value) => (
          <motion.div
            key={value.title}
            variants={fadeInUp}
            className="rounded-2xl bg-surface p-8 shadow-soft"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <value.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-text-primary">{value.title}</h3>
            <p className="mt-2 text-text-secondary">{value.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <AnimatedSection>
        <div className="mt-16 text-center">
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">
            Why Korean Skincare?
          </h2>
          <div className="max-w-2xl mx-auto text-text-secondary leading-relaxed space-y-4">
            <p>
              Korean skincare (K-beauty) is renowned worldwide for its innovative formulations,
              gentle ingredients, and results-driven approach. The Korean beauty philosophy
              emphasizes prevention, hydration, and layering products for maximum effectiveness.
            </p>
            <p>
              From snail mucin to rice extracts, Korean brands harness the power of nature
              combined with cutting-edge science to create products that truly transform your skin.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
