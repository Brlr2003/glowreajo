"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { SectionTitle } from "@/components/shared/SectionTitle"
import { Sparkles } from "lucide-react"
import { stagger, fadeInUp } from "@/lib/animations"
import { getCategoryIcon, getCategoryColor } from "@/lib/category-icons"
import type { MedusaCategory } from "@/lib/categories"

interface FeaturedCategoriesProps {
  categories?: MedusaCategory[]
}

export function FeaturedCategories({ categories = [] }: FeaturedCategoriesProps) {
  if (categories.length === 0) return null

  return (
    <section className="py-20">
      <div className="container-app">
        <AnimatedSection>
          <SectionTitle
            title="Shop by Category"
            subtitle="Find the perfect products for your skincare routine"
            icon={Sparkles}
          />
        </AnimatedSection>

        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4"
        >
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.metadata?.icon)
            const color = getCategoryColor(cat.metadata?.color)

            return (
              <motion.div key={cat.id} variants={fadeInUp}>
                <Link
                  href={`/shop/${cat.handle}`}
                  className="group flex h-full flex-col items-center justify-center gap-3 rounded-2xl bg-surface p-4 shadow-soft transition-all hover:shadow-card hover:-translate-y-1"
                >
                  <div className={`flex h-20 w-20 items-center justify-center rounded-2xl ${color} transition-transform duration-500 group-hover:scale-110`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <span className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors text-center">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
