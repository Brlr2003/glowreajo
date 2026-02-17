"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface Filters {
  category: string
  skinType: string
  concern: string
  priceRange: string
}

interface FilterSidebarProps {
  filters: Filters
  onChange: (filters: Filters) => void
  products?: any[]
  isMobile?: boolean
  isOpen?: boolean
  onClose?: () => void
}

const categories = [
  "All", "Cleansers", "Toners", "Serums & Essences", "Moisturizers", "Sunscreens", "Masks & Treatments", "Sets & Bundles"
]

const DEFAULT_SKIN_TYPES = ["All Skin Types", "Oily", "Dry", "Combination", "Sensitive"]
const DEFAULT_CONCERNS = ["Acne", "Hydration", "Anti-aging", "Brightening", "Pores", "Sun Protection"]

function buildOptions(defaults: string[], products: any[], metaKey: string): string[] {
  const extras = new Set<string>()
  for (const p of products) {
    const val = (p.metadata as any)?.[metaKey]
    if (val && typeof val === "string") {
      val.split(",").map((v: string) => v.trim()).filter(Boolean).forEach((v: string) => {
        if (!defaults.includes(v)) extras.add(v)
      })
    }
  }
  return ["All", ...defaults, ...Array.from(extras).sort()]
}
const priceRanges = [
  { label: "All Prices", value: "all" },
  { label: "Under 10 JOD", value: "0-10" },
  { label: "10 - 20 JOD", value: "10-20" },
  { label: "20 - 30 JOD", value: "20-30" },
  { label: "Over 30 JOD", value: "30+" },
]

function FilterGroup({
  title,
  options,
  value,
  onChange,
}: {
  title: string
  options: string[] | { label: string; value: string }[]
  value: string
  onChange: (val: string) => void
}) {
  return (
    <div className="mb-6">
      <h3 className="font-heading font-semibold text-text-primary mb-3 text-sm">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const optValue = typeof opt === "string" ? opt : opt.value
          const optLabel = typeof opt === "string" ? opt : opt.label
          const isActive = value === optValue || (value === "" && optValue === "All") || (value === "" && optValue === "all")
          return (
            <button
              key={optValue}
              onClick={() => onChange(optValue === "All" || optValue === "all" ? "" : optValue)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-background text-text-secondary hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {optLabel}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function FilterSidebar({ filters, onChange, products = [], isMobile, isOpen, onClose }: FilterSidebarProps) {
  const skinTypes = buildOptions(DEFAULT_SKIN_TYPES, products, "skin_type")
  const concerns = buildOptions(DEFAULT_CONCERNS, products, "concerns")

  const content = (
    <div className="p-6">
      {isMobile && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-lg font-bold">Filters</h2>
          </div>
          <button onClick={onClose} aria-label="Close filters">
            <X className="h-6 w-6 text-text-secondary" />
          </button>
        </div>
      )}

      <FilterGroup
        title="Category"
        options={categories}
        value={filters.category}
        onChange={(v) => onChange({ ...filters, category: v })}
      />
      <FilterGroup
        title="Skin Type"
        options={skinTypes}
        value={filters.skinType}
        onChange={(v) => onChange({ ...filters, skinType: v })}
      />
      <FilterGroup
        title="Concern"
        options={concerns}
        value={filters.concern}
        onChange={(v) => onChange({ ...filters, concern: v })}
      />
      <FilterGroup
        title="Price Range"
        options={priceRanges}
        value={filters.priceRange}
        onChange={(v) => onChange({ ...filters, priceRange: v })}
      />

      {isMobile && (
        <Button className="w-full mt-4" onClick={onClose}>
          Apply Filters
        </Button>
      )}
    </div>
  )

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-surface shadow-elevated"
            >
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }

  return (
    <div className="hidden lg:block w-64 shrink-0 rounded-2xl bg-surface shadow-soft">
      {content}
    </div>
  )
}
