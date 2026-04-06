"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { medusa, getRegionId } from "@/lib/medusa-client"
import { ProductCard } from "@/components/product/ProductCard"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { SectionTitle } from "@/components/shared/SectionTitle"
import { Skeleton } from "@/components/ui/Skeleton"

export function BestSellers() {
  const t = useTranslations("home")
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function load() {
      try {
        const region_id = await getRegionId()
        const { products: fetched } = await medusa.store.product.list({ limit: 8, region_id, fields: "*categories,*images,*tags,+metadata" } as any)
        const sorted = [...fetched].sort((a: any, b: any) => {
          const orderA = Number(a.metadata?.sort_order ?? 999999)
          const orderB = Number(b.metadata?.sort_order ?? 999999)
          return orderA - orderB
        })
        setProducts(sorted)
      } catch {
        // Backend may not be running
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    const amount = dir === "left" ? -300 : 300
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" })
  }

  return (
    <section className="py-20 bg-background">
      <div className="container-app">
        <AnimatedSection>
          <SectionTitle
            title={t("bestSellers")}
            icon={Star}
          />
        </AnimatedSection>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-surface shadow-card text-text-primary hover:text-primary transition-colors hidden md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-72 shrink-0 snap-start">
                    <Skeleton className="h-80 w-full" />
                  </div>
                ))
              : products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    className="w-72 shrink-0 snap-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-surface shadow-card text-text-primary hover:text-primary transition-colors hidden md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
