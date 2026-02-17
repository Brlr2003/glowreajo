"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ZoomIn } from "lucide-react"
import { getProductImage } from "@/lib/demo-images"
import { ImageZoomModal } from "./ImageZoomModal"

interface ProductGalleryProps {
  product?: any
}

function isLocal(url: string) {
  return url.startsWith("http://localhost")
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const mainImage = product?.thumbnail || product?.images?.[0]?.url || getProductImage(product?.handle || "")
  const images = product?.images?.length
    ? product.images.map((img: any) => img.url)
    : [mainImage]
  const [selected, setSelected] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)
  const [errorIndices, setErrorIndices] = useState<Set<number>>(new Set())
  const placeholder = getProductImage(product?.handle || "")
  const handleImgError = useCallback((i: number) => {
    setErrorIndices((prev) => new Set(prev).add(i))
  }, [])

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 cursor-zoom-in"
          onClick={() => setZoomOpen(true)}
        >
          <Image
            src={errorIndices.has(selected) ? placeholder : images[selected]}
            alt={product?.title || "Product"}
            fill
            className="object-cover"
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            unoptimized={isLocal(images[selected])}
            onError={() => handleImgError(selected)}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 group-hover:opacity-100 group-hover:bg-black/10 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-text-primary shadow-soft">
              <ZoomIn className="h-5 w-5" />
            </div>
          </div>
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
              <Image src={errorIndices.has(i) ? placeholder : img} alt="" fill className="object-cover" sizes="80px" unoptimized={isLocal(img)} onError={() => handleImgError(i)} />
            </button>
          ))}
        </div>
      )}

      <ImageZoomModal
        src={images[selected]}
        alt={product?.title || "Product"}
        open={zoomOpen}
        onClose={() => setZoomOpen(false)}
        unoptimized={isLocal(images[selected])}
      />
    </div>
  )
}
