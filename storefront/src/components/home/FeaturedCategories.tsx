"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Droplets, Pipette, Sun, Sparkles as SparklesIcon, FlaskConical, Gift, Layers } from "lucide-react"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { SectionTitle } from "@/components/shared/SectionTitle"
import { stagger, fadeInUp } from "@/lib/animations"

const categories = [
  { name: "Cleansers", icon: Droplets, color: "from-blue-100 to-blue-50", href: "/shop?category=cleansers" },
  { name: "Toners", icon: FlaskConical, color: "from-purple-100 to-purple-50", href: "/shop?category=toners" },
  { name: "Serums", icon: Pipette, color: "from-pink-100 to-pink-50", href: "/shop?category=serums" },
  { name: "Moisturizers", icon: Layers, color: "from-green-100 to-green-50", href: "/shop?category=moisturizers" },
  { name: "Sunscreens", icon: Sun, color: "from-yellow-100 to-yellow-50", href: "/shop?category=sunscreens" },
  { name: "Masks", icon: SparklesIcon, color: "from-rose-100 to-rose-50", href: "/shop?category=masks" },
  { name: "Sets", icon: Gift, color: "from-amber-100 to-amber-50", href: "/shop?category=sets" },
]

export function FeaturedCategories() {
  return (
    <section className="py-20">
      <div className="container-app">
        <AnimatedSection>
          <SectionTitle
            title="Shop by Category"
            subtitle="Find the perfect products for your skincare routine"
            icon={SparklesIcon}
          />
        </AnimatedSection>

        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4"
        >
          {categories.map((cat) => (
            <motion.div key={cat.name} variants={fadeInUp}>
              <Link
                href={cat.href}
                className="group flex flex-col items-center gap-3 rounded-2xl bg-surface p-6 shadow-soft transition-all hover:shadow-card hover:-translate-y-1"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.color}`}>
                  <cat.icon className="h-7 w-7 text-text-primary" />
                </div>
                <span className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
