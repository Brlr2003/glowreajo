"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Search, X } from "lucide-react"
import { medusa } from "@/lib/medusa-client"
import { formatPrice } from "@/lib/formatPrice"

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

interface SearchResult {
  id: string
  title: string
  handle: string
  description: string | null
  variants: { prices: { amount: number; currency_code: string }[] }[]
  metadata: Record<string, any> | null
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery("")
      setResults([])
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const searchProducts = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([])
      return
    }
    setLoading(true)
    try {
      const { products } = await medusa.store.product.list({ q, limit: 8 })
      setResults(products as unknown as SearchResult[])
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleChange = (value: string) => {
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => searchProducts(value), 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 backdrop-blur-sm pt-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl mx-4 bg-surface rounded-2xl shadow-elevated overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <Search className="h-5 w-5 text-text-muted shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Search Korean skincare..."
                className="flex-1 text-lg outline-none bg-transparent text-text-primary placeholder:text-text-muted"
              />
              <button onClick={onClose} className="text-text-muted hover:text-text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>

            {(loading || results.length > 0 || (query && !loading)) && (
              <div className="max-h-96 overflow-y-auto p-2">
                {loading && (
                  <div className="p-4 text-center text-text-muted text-sm">Searching...</div>
                )}
                {!loading && query && results.length === 0 && (
                  <div className="p-8 text-center text-text-muted text-sm">
                    No products found for &ldquo;{query}&rdquo;
                  </div>
                )}
                {results.map((product) => {
                  const price = product.variants?.[0]?.prices?.find(
                    (p) => p.currency_code === "jod"
                  )
                  return (
                    <Link
                      key={product.id}
                      href={`/product/${product.handle}`}
                      onClick={onClose}
                      className="flex items-center gap-4 rounded-xl p-3 hover:bg-background transition-colors"
                    >
                      <div className="h-12 w-12 rounded-lg bg-background shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">
                          {product.title}
                        </p>
                        <p className="text-xs text-text-muted">
                          {(product.metadata as any)?.brand || ""}
                        </p>
                      </div>
                      {price && (
                        <span className="text-sm font-semibold text-primary">
                          {formatPrice(price.amount)}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
