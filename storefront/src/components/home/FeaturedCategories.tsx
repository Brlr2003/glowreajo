"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { SectionTitle } from "@/components/shared/SectionTitle"
import { Sparkles } from "lucide-react"
import { stagger, fadeInUp } from "@/lib/animations"

const categories = [
  {
    name: "Cleansers",
    href: "/shop?category=cleansers",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop",
  },
  {
    name: "Toners",
    href: "/shop?category=toners",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=300&h=300&fit=crop",
  },
  {
    name: "Serums",
    href: "/shop?category=serums",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop",
  },
  {
    name: "Moisturizers",
    href: "/shop?category=moisturizers",
    image: "https://images.unsplash.com/photo-1590393802688-ab3fd8c10a5e?w=300&h=300&fit=crop",
  },
  {
    name: "Sunscreens",
    href: "/shop?category=sunscreens",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
  },
  {
    name: "Masks",
    href: "/shop?category=masks",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4a38691?w=300&h=300&fit=crop",
  },
  {
    name: "Sets",
    href: "/shop?category=sets",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=300&h=300&fit=crop",
  },
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
                <div className="relative h-20 w-20 rounded-2xl overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="80px"
                  />
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
