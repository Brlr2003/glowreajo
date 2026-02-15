"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { getProductImage } from "@/lib/demo-images"

interface ProductGalleryProps {
  product?: any
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const mainImage = product?.thumbnail || getProductImage(product?.handle || "")
  const images = product?.images?.length
    ? product.images.map((img: any) => img.url)
    : [mainImage]
  const [selected, setSelected] = useState(0)

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5"
        >
          <Image
            src={images[selected]}
            alt={product?.title || "Product"}
            fill
            className="object-cover"
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img: string, i: number) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative h-20 w-20 rounded-xl overflow-hidden border-2 transition-colors ${
                selected === i ? "border-primary" : "border-transparent"
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
