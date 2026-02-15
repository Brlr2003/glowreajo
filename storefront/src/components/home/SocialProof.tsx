"use client"

import { motion } from "framer-motion"
import { Instagram } from "lucide-react"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { SectionTitle } from "@/components/shared/SectionTitle"
import { stagger, fadeInUp } from "@/lib/animations"

const placeholders = Array.from({ length: 6 }, (_, i) => i)

export function SocialProof() {
  return (
    <section className="py-20">
      <div className="container-app">
        <AnimatedSection>
          <SectionTitle
            title="#GlowReaJo"
            subtitle="Join our community of K-beauty lovers in Jordan"
            icon={Instagram}
          />
        </AnimatedSection>

        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {placeholders.map((i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden group cursor-pointer"
            >
              <div className="flex flex-col items-center gap-2 text-text-muted group-hover:text-primary transition-colors">
                <Instagram className="h-8 w-8" />
                <span className="text-xs font-medium">@glowreajo</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
