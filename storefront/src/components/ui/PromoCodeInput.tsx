"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tag, ChevronDown } from "lucide-react"
import { Button } from "./Button"

interface PromoCodeInputProps {
  onApply: (code: string) => Promise<boolean>
}

export function PromoCodeInput({ onApply }: PromoCodeInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [applied, setApplied] = useState(false)

  const handleApply = async () => {
    if (!code.trim()) return
    setLoading(true)
    setError("")
    try {
      const success = await onApply(code.trim().toUpperCase())
      if (success) {
        setApplied(true)
      } else {
        setError("Invalid or expired promo code")
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
            <div className="flex gap-2 pt-3">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Enter code"
                disabled={applied}
                className="flex-1 rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none focus:border-primary disabled:opacity-50"
              />
              <Button
                size="sm"
                onClick={handleApply}
                disabled={loading || applied || !code.trim()}
              >
                {applied ? "Applied!" : loading ? "..." : "Apply"}
              </Button>
            </div>
            {error && <p className="mt-1 text-xs text-error">{error}</p>}
            {applied && (
              <p className="mt-1 text-xs text-success">Promo code applied successfully!</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
