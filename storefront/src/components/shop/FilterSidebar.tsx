"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, SlidersHorizontal } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/Button"
import type { MedusaCategory } from "@/lib/categories"

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
  categories?: MedusaCategory[]
  isMobile?: boolean
  isOpen?: boolean
  onClose?: () => void
  hideCategoryFilter?: boolean
}

const DEFAULT_SKIN_TYPES = ["allSkinTypes", "oily", "dry", "combination", "sensitive"]
const DEFAULT_CONCERNS = ["acne", "hydration", "antiAging", "brightening", "pores", "sunProtection"]

function buildOptions(
  defaults: string[],
  products: any[],
  metaKey: string,
  t: (key: string) => string
): { label: string; value: string }[] {
  const extras = new Set<string>()
  for (const p of products) {
    const val = (p.metadata as any)?.[metaKey]
    if (val && typeof val === "string") {
      val.split(",").map((v: string) => v.trim()).filter(Boolean).forEach((v: string) => {
        if (!defaults.includes(v)) extras.add(v)
      })
    }
  }
  const known = ["all", ...defaults].map((key) => ({ label: t(key), value: key }))
  const dynamic = Array.from(extras).sort().map((v) => ({ label: v, value: v }))
  return [...known, ...dynamic]
}

const priceRanges = [
  { label: "allPrices", value: "all" },
  { label: "under10", value: "0-10" },
  { label: "10to20", value: "10-20" },
  { label: "20to30", value: "20-30" },
  { label: "over30", value: "30+" },
]

function FilterGroup({
  title,
  options,
  value,
  onChange,
  translationNamespace,
  rawLabels,
}: {
  title: string
  options: string[] | { label: string; value: string }[]
  value: string
  onChange: (val: string) => void
  translationNamespace?: string
  rawLabels?: boolean
}) {
  const t = useTranslations(translationNamespace || "shop")

  return (
    <div className="mb-6">
      <h3 className="font-heading font-semibold text-text-primary mb-3 text-sm">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const optValue = typeof opt === "string" ? opt : opt.value
          const optLabel = typeof opt === "string" ? opt : opt.label
          const isActive = value === optValue || (value === "" && optValue === "all")
          const displayLabel = rawLabels ? optLabel : t(optLabel)
          return (
            <button
              key={optValue}
              onClick={() => onChange(optValue === "all" ? "" : optValue)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-background text-text-secondary hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {displayLabel}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function FilterSidebar({ filters, onChange, products = [], categories = [], isMobile, isOpen, onClose, hideCategoryFilter }: FilterSidebarProps) {
  const t = useTranslations("shop")
  const locale = useLocale()
  const tSkinTypes = useTranslations("skinTypes")
  const tConcerns = useTranslations("concerns")
  const skinTypes = buildOptions(DEFAULT_SKIN_TYPES, products, "skin_type", tSkinTypes)
  const concerns = buildOptions(DEFAULT_CONCERNS, products, "concerns", tConcerns)
  const categoryOptions = [
    { label: t("all"), value: "all" },
    ...categories.map((c: MedusaCategory) => ({
      label: locale === "ar" && c.metadata?.name_ar ? c.metadata.name_ar : c.name,
      value: c.name,
    })),
  ]

  const content = (
    <div className="p-6">
      {isMobile && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-lg font-bold">{t("filters")}</h2>
          </div>
          <button onClick={onClose} aria-label={t("closeFilters")}>
            <X className="h-6 w-6 text-text-secondary" />
          </button>
        </div>
      )}

      {!hideCategoryFilter && (
        <FilterGroup
          title={t("category")}
          options={categoryOptions}
          value={filters.category}
          onChange={(v) => onChange({ ...filters, category: v })}
          rawLabels
        />
      )}
      <FilterGroup
        title={t("skinType")}
        options={skinTypes}
        value={filters.skinType}
        onChange={(v) => onChange({ ...filters, skinType: v })}
        rawLabels
      />
      <FilterGroup
        title={t("concerns")}
        options={concerns}
        value={filters.concern}
        onChange={(v) => onChange({ ...filters, concern: v })}
        rawLabels
      />
      <FilterGroup
        title={t("priceRange")}
        options={priceRanges}
        value={filters.priceRange}
        onChange={(v) => onChange({ ...filters, priceRange: v })}
        translationNamespace="priceRanges"
      />

      {isMobile && (
        <Button className="w-full mt-4" onClick={onClose}>
          {t("applyFilters")}
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
