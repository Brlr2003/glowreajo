"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { CheckCircle, Truck, Clock, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { formatPrice } from "@/lib/formatPrice"

interface OrderData {
  id: string
  displayId: string
  total: number
}

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<OrderData | null>(null)

  useEffect(() => {
    const raw = sessionStorage.getItem("glowreajo-order")
    if (raw) {
      try {
        setOrder(JSON.parse(raw))
      } catch {}
      sessionStorage.removeItem("glowreajo-order")
    }
  }, [])

  return (
    <div className="container-app py-20 max-w-lg mx-auto text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        className="flex justify-center mb-6"
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-success/10">
          <CheckCircle className="h-12 w-12 text-success" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="font-heading text-3xl font-bold text-text-primary">Order Placed!</h1>
        {order ? (
          <p className="mt-3 text-text-secondary">
            Order #{order.displayId} confirmed — total {formatPrice(order.total)}
          </p>
        ) : (
          <p className="mt-3 text-text-secondary">
            Thank you for your order. We&apos;ll prepare it right away.
          </p>
        )}

        <div className="mt-8 rounded-2xl bg-surface p-6 shadow-soft space-y-4">
          <div className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 shrink-0">
              <ShoppingBag className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-text-primary">Order Confirmed</p>
              <p className="text-xs text-text-muted">You&apos;ll receive a confirmation via SMS</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 shrink-0">
              <Clock className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="font-medium text-text-primary">Preparing Your Order</p>
              <p className="text-xs text-text-muted">We&apos;re carefully packing your K-beauty goodies</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/30 shrink-0">
              <Truck className="h-5 w-5 text-text-secondary" />
            </div>
            <div>
              <p className="font-medium text-text-primary">Delivery</p>
              <p className="text-xs text-text-muted">1-2 business days in Amman, 2-4 days for other cities</p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <Link href="/shop">
            <Button size="lg" className="w-full">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/" className="block">
            <Button variant="ghost" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
