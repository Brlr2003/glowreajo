"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tag, ChevronDown, X } from "lucide-react"
import { Button } from "./Button"

interface PromoCodeInputProps {
  onApply: (code: string) => Promise<{ valid: boolean; message?: string }>
  appliedCode?: string | null
  onRemove?: () => void
}

export function PromoCodeInput({ onApply, appliedCode, onRemove }: PromoCodeInputProps) {
  const [isOpen, setIsOpen] = useState(!!appliedCode)
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleApply = async () => {
    if (!code.trim()) return
    setLoading(true)
    setError("")
    try {
      const result = await onApply(code.trim().toUpperCase())
      if (result.valid) {
        setCode("")
      } else {
        setError(result.message || "Invalid or expired promo code")
      }
    } catch {
      setError("Failed to apply promo code")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-t border-border pt-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
      >
        <Tag className="h-4 w-4" />
        <span>Have a promo code?</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="ml-auto">
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {appliedCode ? (
              <div className="flex items-center justify-between pt-3">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium text-success">{appliedCode}</span>
                  <span className="text-xs text-text-muted">applied</span>
                </div>
                <button
                  onClick={onRemove}
                  className="text-text-muted hover:text-error transition-colors"
                  aria-label="Remove promo code"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2 pt-3">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="Enter code"
                  className="flex-1 rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none focus:border-primary"
                />
                <Button
                  size="sm"
                  onClick={handleApply}
                  disabled={loading || !code.trim()}
                >
                  {loading ? "..." : "Apply"}
                </Button>
              </div>
            )}
            {error && <p className="mt-1 text-xs text-error">{error}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
