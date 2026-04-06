"use client"

import { memo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "@/i18n/routing"
import Image from "next/image"
import { ShoppingBag, Check, ZoomIn } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { useCart } from "@/context/CartContext"
import { useToast } from "@/context/ToastContext"
import { Badge } from "@/components/ui/Badge"
import { formatPrice } from "@/lib/formatPrice"
import { getCompareAtPrice } from "@/lib/compareAtPrice"
import { getProductImage } from "@/lib/demo-images"
import { ImageZoomModal } from "./ImageZoomModal"

const BLUR_PLACEHOLDER = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjVmMGViIi8+PC9zdmc+"

interface ProductCardProps {
  product: any
}

export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false)
  const [zoomOpen, setZoomOpen] = useState(false)
  const [imgError, setImgError] = useState(false)
  const tc = useTranslations("common")
  const t = useTranslations("product")
  const locale = useLocale()
  const { addItem } = useCart()
  const { addToast } = useToast()

  const variant = product.variants?.[0]
  const calculatedPrice = variant?.calculated_price
  const fallbackPrice = variant?.prices?.find((p: any) => p.currency_code === "jod")
  const priceAmount = calculatedPrice?.calculated_amount ?? fallbackPrice?.amount ?? 0
  const compareAtPrice = getCompareAtPrice(priceAmount, product.metadata)
  const title = locale === "ar" && (product.metadata as any)?.title_ar ? (product.metadata as any).title_ar : product.title
  const brand = (product.metadata as any)?.brand || ""
  const rawImgSrc = product.thumbnail || product.images?.[0]?.url || getProductImage(product.handle)
  const imgSrc = imgError ? getProductImage(product.handle) : rawImgSrc
  const unoptimized = imgSrc.startsWith("http://localhost")
  const inventoryQty = variant?.inventory_quantity
  const isOutOfStock = variant?.manage_inventory !== false && (inventoryQty === 0 || inventoryQty === null)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isOutOfStock) return

    addItem({
      id: variant?.id || product.id,
      variantId: variant?.id || product.id,
      productId: product.id,
      handle: product.handle,
      title: product.title,
      variant: variant?.title || "",
      price: priceAmount,
      quantity: 1,
      image: imgSrc,
      brand,
      compareAtPrice: compareAtPrice ?? undefined,
      inventoryQuantity: inventoryQty ?? undefined,
    })

    addToast({
      message: t("addedToCart", { product: product.title }),
      type: "success",
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link href={`/product/${product.handle}`}>
      <motion.div
        className="group flex flex-col h-full rounded-2xl bg-surface shadow-soft overflow-hidden transition-shadow hover:shadow-card"
        whileHover={{ y: -4 }}
      >
        <div className="relative aspect-square bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden">
          <Image
            src={imgSrc}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            unoptimized={unoptimized}
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            onError={() => setImgError(true)}
          />
          <div className="absolute top-3 start-3 flex flex-wrap gap-1.5">
            {isOutOfStock && <Badge variant="sale">{tc("outOfStock")}</Badge>}
            {!isOutOfStock && product.tags?.map((tag: any) => (
              <Badge key={tag.id} variant="bestseller">{tag.value}</Badge>
            ))}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setZoomOpen(true) }}
            className="absolute top-3 end-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-text-primary opacity-0 group-hover:opacity-100 transition-opacity shadow-soft hover:bg-white"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col flex-1 p-4">
          {brand && (
            <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1">{brand}</p>
          )}
          <h3 className="font-medium text-text-primary text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="mt-auto pt-3 flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading text-lg font-bold text-primary">
                {priceAmount ? formatPrice(priceAmount, locale) : "N/A"}
              </span>
              {compareAtPrice && (
                <span className="text-xs text-text-muted line-through">
                  {formatPrice(compareAtPrice, locale)}
                </span>
              )}
            </div>
            <motion.button
              onClick={handleAddToCart}
              whileTap={isOutOfStock ? undefined : { scale: 0.9 }}
              disabled={isOutOfStock}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                isOutOfStock
                  ? "bg-border/30 text-text-muted cursor-not-allowed"
                  : added
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
      <ImageZoomModal
        src={imgSrc}
        alt={product.title}
        open={zoomOpen}
        onClose={() => setZoomOpen(false)}
        unoptimized={unoptimized}
      />
    </Link>
  )
})
