"use client"

import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/formatPrice"
import { validatePromoCode } from "@/lib/promo"
import { Button } from "@/components/ui/Button"
import { PromoCodeInput } from "@/components/ui/PromoCodeInput"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

interface CartReviewStepProps {
  onNext: () => void
}

export function CartReviewStep({ onNext }: CartReviewStepProps) {
  const { items, updateQuantity, removeItem, totalPrice, promo, applyPromo, removePromo } = useCart()

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

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="h-16 w-16 text-border mx-auto mb-4" />
        <h3 className="font-heading text-lg font-semibold">Your cart is empty</h3>
        <p className="text-sm text-text-muted mt-2">Add some products to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-xl font-bold">Review Your Cart</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 rounded-xl border border-border p-4">
            <div className="h-20 w-20 shrink-0 rounded-lg bg-background flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-border" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-text-primary">{item.title}</p>
              {item.brand && <p className="text-xs text-text-muted">{item.brand}</p>}
              <p className="text-sm font-semibold text-primary mt-1">{formatPrice(item.price)}</p>
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-background"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-background"
                >
                  <Plus className="h-3 w-3" />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-auto text-text-muted hover:text-error"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="text-right">
              <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
            </div>
          </div>
        ))}
      </div>

      <PromoCodeInput
        onApply={handleApplyPromo}
        appliedCode={promo?.code}
        onRemove={removePromo}
      />

      <div className="pt-4 border-t border-border space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Subtotal</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        {promo && (
          <div className="flex justify-between text-sm text-success">
            <span>Discount ({promo.code})</span>
            <span>-{formatPrice(promo.discount)}</span>
          </div>
        )}
        <div className="flex justify-between items-center pt-2">
          <span className="font-heading text-lg font-bold">Total: {formatPrice(finalTotal)}</span>
          <Button onClick={onNext} size="lg">
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
