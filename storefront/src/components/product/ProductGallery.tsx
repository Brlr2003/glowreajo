"use client"

import { ShoppingBag } from "lucide-react"

export function ProductGallery() {
  return (
    <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
      <ShoppingBag className="h-24 w-24 text-border" />
    </div>
  )
}
