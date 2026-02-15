"use client"

import { memo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Check } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useToast } from "@/context/ToastContext"
import { Badge } from "@/components/ui/Badge"
import { formatPrice } from "@/lib/formatPrice"
import { getProductImage } from "@/lib/demo-images"

interface ProductCardProps {
  product: any
}

export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const { addToast } = useToast()

  const variant = product.variants?.[0]
  const price = variant?.prices?.find((p: any) => p.currency_code === "jod")
  const brand = (product.metadata as any)?.brand || ""

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addItem({
      id: variant?.id || product.id,
      variantId: variant?.id || product.id,
      productId: product.id,
      title: product.title,
      variant: variant?.title || "",
      price: price?.amount || 0,
      quantity: 1,
      brand,
    })

    addToast({
      message: `${product.title} added to cart`,
      type: "success",
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link href={`/product/${product.handle}`}>
      <motion.div
        className="group rounded-2xl bg-surface shadow-soft overflow-hidden transition-shadow hover:shadow-card"
        whileHover={{ y: -4 }}
      >
        <div className="relative aspect-square bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden">
          <Image
            src={product.thumbnail || getProductImage(product.handle)}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          />
          {product.tags?.length > 0 && (
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge variant="bestseller">Best Seller</Badge>
            </div>
          )}
        </div>

        <div className="p-4">
          {brand && (
            <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1">{brand}</p>
          )}
          <h3 className="font-medium text-text-primary text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-heading text-lg font-bold text-primary">
              {price ? formatPrice(price.amount) : "N/A"}
            </span>
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.9 }}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                added
                  ? "bg-success text-white"
                  : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
              }`}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Check className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div key="bag" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <ShoppingBag className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  )
})
