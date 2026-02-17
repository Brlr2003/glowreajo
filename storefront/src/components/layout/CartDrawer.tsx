"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/Button"
import { PromoCodeInput } from "@/components/ui/PromoCodeInput"
import { formatPrice } from "@/lib/formatPrice"
import { validatePromoCode } from "@/lib/promo"
import { slideInRight } from "@/lib/animations"

function CartImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false)
  if (error) return <ShoppingBag className="h-8 w-8 text-border" />
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="rounded-lg object-cover"
      sizes="80px"
      unoptimized
      onError={() => setError(true)}
    />
  )
}

export function CartDrawer() {
  const {
    items, isDrawerOpen, setDrawerOpen, updateQuantity,
    removeItem, totalPrice, totalItems, promo, applyPromo, removePromo,
  } = useCart()

  const handleApplyPromo = async (code: string) => {
    const result = await validatePromoCode(code, totalPrice)
    if (result.valid && result.discount !== undefined) {
      applyPromo({
        code,
        discount: result.discount,
        type: result.type || "percentage",
        value: result.value || 0,
      })
    }
    return { valid: result.valid, message: result.message }
  }

  const finalTotal = totalPrice - (promo?.discount || 0)

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-surface shadow-elevated flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="font-heading text-lg font-bold">Your Cart ({totalItems})</h2>
              </div>
              <button onClick={() => setDrawerOpen(false)} aria-label="Close cart">
                <X className="h-6 w-6 text-text-secondary" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="h-16 w-16 text-border mb-4" />
                  <p className="font-heading text-lg font-semibold text-text-primary mb-2">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-text-muted mb-6">
                    Start your K-beauty journey today!
                  </p>
                  <Link href="/shop" onClick={() => setDrawerOpen(false)}>
                    <Button>Browse Products</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const productUrl = item.handle ? `/product/${item.handle}` : null
                    const Wrapper = productUrl
                      ? (p: { className?: string; children: React.ReactNode }) => (
                          <Link href={productUrl} onClick={() => setDrawerOpen(false)} className={p.className}>{p.children}</Link>
                        )
                      : (p: { className?: string; children: React.ReactNode }) => (
                          <div className={p.className}>{p.children}</div>
                        )
                    return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 rounded-xl border border-border p-3"
                    >
                      <Wrapper className="relative h-20 w-20 shrink-0 rounded-lg bg-background flex items-center justify-center">
                        {item.image ? (
                          <CartImage src={item.image} alt={item.title} />
                        ) : (
                          <ShoppingBag className="h-8 w-8 text-border" />
                        )}
                      </Wrapper>
                      <div className="flex-1 min-w-0">
                        <Wrapper className={`text-sm font-medium text-text-primary truncate block${productUrl ? " hover:text-primary transition-colors" : ""}`}>
                          {item.title}
                        </Wrapper>
                        {item.brand && (
                          <p className="text-xs text-text-muted">{item.brand}</p>
                        )}
                        <p className="text-sm font-semibold text-primary mt-1">
                          {formatPrice(item.price)}{" "}
                          <span className="text-xs text-text-muted line-through font-normal">
                            {formatPrice(item.price + 2)}
                          </span>
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-border hover:bg-background transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-border hover:bg-background transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-text-muted hover:text-error transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )})}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <PromoCodeInput
                  onApply={handleApplyPromo}
                  appliedCode={promo?.code}
                  onRemove={removePromo}
                />
                <div className="flex items-center justify-between">
                  <span className="font-medium text-text-secondary">Subtotal</span>
                  <span className="font-heading text-lg font-bold">{formatPrice(totalPrice)}</span>
                </div>
                {promo && (
                  <div className="flex items-center justify-between text-sm text-success">
                    <span>Discount ({promo.code})</span>
                    <span>-{formatPrice(promo.discount)}</span>
                  </div>
                )}
                {promo && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-text-secondary">Total</span>
                    <span className="font-heading text-lg font-bold text-primary">{formatPrice(finalTotal)}</span>
                  </div>
                )}
                <div className="rounded-xl bg-success/10 px-4 py-2 text-center text-xs text-success font-medium">
                  Free delivery on orders over 50 JOD
                </div>
                <Link href="/checkout" onClick={() => setDrawerOpen(false)} className="block">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
