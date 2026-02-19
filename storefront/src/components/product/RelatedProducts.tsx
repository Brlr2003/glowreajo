"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { medusa, getRegionId } from "@/lib/medusa-client"
import { ProductCard } from "./ProductCard"
import { SectionTitle } from "@/components/shared/SectionTitle"

interface RelatedProductsProps {
  currentProductId: string
  categoryId?: string
}

export function RelatedProducts({ currentProductId, categoryId }: RelatedProductsProps) {
  const [products, setProducts] = useState<any[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function load() {
      try {
        const region_id = await getRegionId()
        const params: any = { limit: 8, region_id }
        if (categoryId) {
          params.category_id = [categoryId]
        }
        const { products } = await medusa.store.product.list({ ...params, fields: "*categories,*images,+metadata,+variants.inventory_quantity" })
        setProducts(products.filter((p: any) => p.id !== currentProductId))
      } catch {}
    }
    load()
  }, [currentProductId, categoryId])

  if (products.length === 0) return null

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" })
  }

  return (
    <section className="mt-16">
      <SectionTitle title="You May Also Like" />
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 h-10 w-10 rounded-full bg-surface shadow-card items-center justify-center text-text-primary hover:text-primary transition-colors hidden md:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((product) => (
            <div key={product.id} className="w-64 shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 h-10 w-10 rounded-full bg-surface shadow-card items-center justify-center text-text-primary hover:text-primary transition-colors hidden md:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  )
}
