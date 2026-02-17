"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

const STORAGE_KEY = "glowreajo-promo-dismissed"

export function PromoBanner() {
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) setDismissed(false)
  }, [])

  if (dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    localStorage.setItem(STORAGE_KEY, "1")
  }

  return (
    <div className="relative bg-gradient-to-r from-primary to-secondary text-white text-center text-sm py-2 px-4">
      <span className="font-medium">
        Use code <strong>WELCOME10</strong> for 10% off your first order!
      </span>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss promo banner"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
