"use client"

import { useTranslations } from "next-intl"
import { extractVariantSize } from "@/lib/variantSize"

interface VariantSelectorProps {
  product: any
  selectedId: string | undefined
  onSelect: (variantId: string) => void
}

export function VariantSelector({ product, selectedId, onSelect }: VariantSelectorProps) {
  const t = useTranslations("product")
  const variants: any[] = product?.variants || []
  if (variants.length <= 1) return null

  return (
    <div className="mt-6">
      <p className="text-sm font-medium text-text-primary mb-2">{t("size")}</p>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => {
          const label = extractVariantSize(product, v) || v.title
          const variantQty = v?.inventory_quantity
          const variantManaged = v?.manage_inventory !== false
          const variantOOS = variantManaged && (variantQty === 0 || variantQty === null)
          const isSelected = v.id === selectedId
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelect(v.id)}
              className={`relative rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                isSelected
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-surface text-text-secondary hover:border-primary hover:text-primary"
              } ${variantOOS ? "opacity-60" : ""}`}
            >
              {label}
              {variantOOS && (
                <span className="ms-2 text-[10px] uppercase tracking-wide opacity-80">
                  {t("outOfStock")}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
