"use client"

import { motion } from "framer-motion"
import { ProductCard } from "@/components/product/ProductCard"
import { Skeleton } from "@/components/ui/Skeleton"
import { stagger, fadeInUp } from "@/lib/animations"
import { PackageOpen } from "lucide-react"

interface ProductGridProps {
  products: any[]
  loading: boolean
}

export function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-80 w-full" />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <PackageOpen className="h-16 w-16 text-border mb-4" />
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
          No products found
        </h3>
        <p className="text-sm text-text-muted">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={stagger(0.05)}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={fadeInUp} layout>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  )
}
