"use client"

import { motion } from "framer-motion"

const brands = [
  "COSRX",
  "Laneige",
  "Beauty of Joseon",
  "Innisfree",
  "Some By Mi",
]

export function BrandsBar() {
  return (
    <section className="py-10 border-y border-border/50 bg-surface/50">
      <div className="container-app">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-text-muted mb-6">
          Trusted Korean Brands
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {brands.map((brand, i) => (
            <motion.span
              key={brand}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="font-heading text-xl md:text-2xl font-bold text-text-muted/40 hover:text-primary transition-colors cursor-default"
            >
              {brand}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
