"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { SectionTitle } from "@/components/shared/SectionTitle"
import { Sparkles, Droplets, FlaskConical, Pipette, Layers, Sun, Leaf, Package } from "lucide-react"
import { stagger, fadeInUp } from "@/lib/animations"
import type { LucideIcon } from "lucide-react"

const categories: { name: string; href: string; icon: LucideIcon; color: string }[] = [
  { name: "Cleansers", href: "/shop?category=cleansers", icon: Droplets, color: "text-blue-500 bg-blue-50" },
  { name: "Toners", href: "/shop?category=toners", icon: FlaskConical, color: "text-purple-500 bg-purple-50" },
  { name: "Serums", href: "/shop?category=serums", icon: Pipette, color: "text-pink-500 bg-pink-50" },
  { name: "Moisturizers", href: "/shop?category=moisturizers", icon: Layers, color: "text-green-500 bg-green-50" },
  { name: "Sunscreens", href: "/shop?category=sunscreens", icon: Sun, color: "text-yellow-500 bg-yellow-50" },
  { name: "Masks", href: "/shop?category=masks", icon: Leaf, color: "text-teal-500 bg-teal-50" },
  { name: "Sets", href: "/shop?category=sets", icon: Package, color: "text-rose-500 bg-rose-50" },
]

export function FeaturedCategories() {
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
          {categories.map((cat) => (
            <motion.div key={cat.name} variants={fadeInUp}>
              <Link
                href={cat.href}
                className="group flex flex-col items-center gap-3 rounded-2xl bg-surface p-4 shadow-soft transition-all hover:shadow-card hover:-translate-y-1"
              >
                <div className={`flex h-20 w-20 items-center justify-center rounded-2xl ${cat.color} transition-transform duration-500 group-hover:scale-110`}>
                  <cat.icon className="h-8 w-8" />
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
