"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, Check, Minus, Plus, MessageCircle } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useToast } from "@/context/ToastContext"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { formatPrice } from "@/lib/formatPrice"
import { getCompareAtPrice } from "@/lib/compareAtPrice"
import { getProductImage } from "@/lib/demo-images"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
const API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

interface ProductInfoProps {
  product: any
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [whatsapp, setWhatsapp] = useState<string | null>(null)
  const { addItem, setDrawerOpen } = useCart()
  const { addToast } = useToast()

  const variant = product.variants?.[0]
  const calculatedPrice = variant?.calculated_price
  const fallbackPrice = variant?.prices?.find((p: any) => p.currency_code === "jod")
  const priceAmount = calculatedPrice?.calculated_amount ?? fallbackPrice?.amount ?? 0
  const compareAtPrice = getCompareAtPrice(priceAmount, product.metadata)
  const brand = (product.metadata as any)?.brand || ""
  const imgSrc = product.thumbnail || product.images?.[0]?.url || getProductImage(product.handle)
  const skinType = (product.metadata as any)?.skin_type || ""
  const concerns = (product.metadata as any)?.concerns || ""
  const inventoryQty = variant?.inventory_quantity
  const managesInventory = variant?.manage_inventory !== false
  const isOutOfStock = managesInventory && (inventoryQty === 0 || inventoryQty === null)
  const maxQuantity = managesInventory && typeof inventoryQty === "number" ? inventoryQty : 99

  useEffect(() => {
    fetch(`${BACKEND_URL}/store/site-settings`, {
      headers: { "x-publishable-api-key": API_KEY },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.site_setting?.whatsapp) setWhatsapp(data.site_setting.whatsapp)
      })
      .catch(() => {})
  }, [])

  const handleAdd = () => {
    if (isOutOfStock) return
    addItem({
      id: variant?.id || product.id,
      variantId: variant?.id || product.id,
      productId: product.id,
      handle: product.handle,
      title: product.title,
      variant: variant?.title || "",
      price: priceAmount,
      quantity,
      image: imgSrc,
      brand,
      compareAtPrice: compareAtPrice ?? undefined,
      inventoryQuantity: inventoryQty ?? undefined,
    })

    addToast({
      message: `${product.title} added to cart`,
      type: "success",
    })

    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      setDrawerOpen(true)
    }, 800)
  }

  const whatsappUrl = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi! I'd like to pre-order ${product.title} from GlowReaJo.`)}`
    : null

  return (
    <div>
      {brand && (
        <p className="text-sm font-medium text-primary uppercase tracking-wide mb-2">{brand}</p>
      )}
      <h1 className="font-heading text-3xl font-bold text-text-primary md:text-4xl">
        {product.title}
      </h1>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="font-heading text-3xl font-bold text-primary">
          {priceAmount ? formatPrice(priceAmount) : "N/A"}
        </span>
        {compareAtPrice && (
          <span className="text-lg text-text-muted line-through">
            {formatPrice(compareAtPrice)}
          </span>
        )}
      </div>

      {(skinType || concerns) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {skinType && <Badge variant="new">{skinType}</Badge>}
          {concerns?.split(",").map((c: string) => (
            <Badge key={c.trim()} variant="bestseller">{c.trim()}</Badge>
          ))}
        </div>
      )}

      {managesInventory && (
        <p className={`mt-4 text-sm font-medium ${isOutOfStock ? "text-error" : "text-success"}`}>
          {isOutOfStock ? "Out of Stock" : `In Stock (${inventoryQty} available)`}
        </p>
      )}

      <p className="mt-6 text-text-secondary leading-relaxed">{product.description}</p>

      <div className="mt-8 flex items-center gap-4">
        <div className="flex items-center rounded-full border border-border">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex h-12 w-12 items-center justify-center text-text-secondary hover:text-primary transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
            disabled={quantity >= maxQuantity}
            className={`flex h-12 w-12 items-center justify-center transition-colors ${
              quantity >= maxQuantity ? "text-text-muted cursor-not-allowed" : "text-text-secondary hover:text-primary"
            }`}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <Button onClick={handleAdd} size="lg" disabled={isOutOfStock} className="flex-1 flex items-center justify-center gap-2">
          <AnimatePresence mode="wait">
            {added ? (
              <motion.span key="added" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                <Check className="h-5 w-5" /> Added!
              </motion.span>
            ) : (
              <motion.span key="add" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" /> Add to Cart
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>

      {isOutOfStock && whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-white font-medium hover:bg-[#20bd5a] transition-colors"
        >
          <MessageCircle className="h-5 w-5" />
          Pre-Order via WhatsApp
        </a>
      )}
    </div>
  )
}
