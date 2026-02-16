"use client"

import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/formatPrice"
import { ShoppingBag } from "lucide-react"

export function OrderSummary() {
  const { items, totalPrice, promo } = useCart()
  const discount = promo?.discount || 0
  const shipping = 0 // Free for Amman
  const total = totalPrice - discount + shipping

  return (
    <div className="rounded-2xl bg-surface p-6 shadow-soft">
      <h3 className="font-heading text-lg font-bold text-text-primary mb-4">Order Summary</h3>

      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background shrink-0">
              <ShoppingBag className="h-5 w-5 text-border" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{item.title}</p>
              <p className="text-xs text-text-muted">Qty: {item.quantity}</p>
            </div>
            <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Subtotal</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        {discount > 0 && promo && (
          <div className="flex justify-between text-sm text-success">
            <span>Discount ({promo.code})</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Shipping</span>
          <span className="text-success">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between font-heading text-lg font-bold border-t border-border pt-3 mt-3">
          <span>Total</span>
          <span className="text-primary">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  )
}
