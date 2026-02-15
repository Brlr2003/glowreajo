"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { SectionTitle } from "@/components/shared/SectionTitle"
import { stagger, fadeInUp } from "@/lib/animations"

const reviews = [
  {
    name: "Rania A.",
    location: "Amman",
    text: "Finally, authentic Korean skincare without the hassle of international shipping! My skin has never looked better.",
    product: "COSRX Snail Mucin",
    rating: 5,
  },
  {
    name: "Lina M.",
    location: "Irbid",
    text: "The Beauty of Joseon sunscreen is a game changer. Lightweight, no white cast, and it arrived so fast!",
    product: "Relief Sun SPF50+",
    rating: 5,
  },
  {
    name: "Sara K.",
    location: "Amman",
    text: "I ordered the starter set for my sister's birthday. She absolutely loved it. The packaging was beautiful too!",
    product: "K-Beauty Starter Set",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-[#fdf2f8]/50">
      <div className="container-app">
        <AnimatedSection>
          <SectionTitle
            title="Loved by Jordanians"
            subtitle="See what our customers are saying"
            icon={Star}
          />
        </AnimatedSection>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.name}
              variants={fadeInUp}
              className="relative rounded-2xl bg-surface p-6 shadow-soft border border-border/50"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-text-primary leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center justify-between border-t border-border/50 pt-4">
                <div>
                  <p className="font-semibold text-sm text-text-primary">{review.name}</p>
                  <p className="text-xs text-text-muted">{review.location}</p>
                </div>
                <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">
                  {review.product}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
