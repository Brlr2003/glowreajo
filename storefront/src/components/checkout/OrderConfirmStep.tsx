"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { placeOrder } from "@/lib/checkout-actions"
import { formatPrice } from "@/lib/formatPrice"
import { Button } from "@/components/ui/Button"
import { OrderSummary } from "./OrderSummary"
import type { PersonalInfo } from "./PersonalInfoStep"
import { MapPin, Phone, Mail, FileText } from "lucide-react"

interface OrderConfirmStepProps {
  personalInfo: PersonalInfo
  onBack: () => void
}

export function OrderConfirmStep({ personalInfo, onBack }: OrderConfirmStepProps) {
  const [placing, setPlacing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { items, clearCart, totalPrice, promo } = useCart()

  const subtotalAfterDiscount = totalPrice - (promo?.discount || 0)
  const shipping = subtotalAfterDiscount >= 50 ? 0 : personalInfo.city === "amman" ? 2 : 3
  const finalTotal = subtotalAfterDiscount + shipping

  const handlePlaceOrder = async () => {
    setPlacing(true)
    setError(null)

    try {
      const order = await placeOrder(items, personalInfo, promo?.code, promo?.discount)
      sessionStorage.setItem("glowreajo-order", JSON.stringify(order))
      clearCart()
      router.push("/order/success")
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.")
      setPlacing(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-xl font-bold">Confirm Your Order</h2>

      <div className="rounded-2xl border border-border p-6 space-y-4">
        <h3 className="font-heading font-semibold">Delivery Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">{personalInfo.firstName} {personalInfo.lastName}</p>
              <p className="text-text-muted">{personalInfo.address}</p>
              <p className="text-text-muted capitalize">{personalInfo.city}, Jordan</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-text-secondary">+962 {personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-text-secondary">{personalInfo.email}</span>
            </div>
            {personalInfo.notes && (
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-text-muted">{personalInfo.notes}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <OrderSummary city={personalInfo.city} />

      <div className="rounded-2xl bg-warm-accent/30 p-4 text-center text-sm">
        <p className="font-medium text-text-primary">Payment: Cash on Delivery</p>
        <p className="text-text-muted mt-1">Pay {formatPrice(finalTotal)} when your order arrives</p>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack} disabled={placing}>
          Back
        </Button>
        <Button onClick={handlePlaceOrder} size="lg" disabled={placing}>
          {placing ? "Placing Order..." : "Place Order"}
        </Button>
      </div>
    </div>
  )
}
