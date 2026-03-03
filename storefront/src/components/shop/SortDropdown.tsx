"use client"

import { useTranslations } from "next-intl"

interface SortDropdownProps {
  value: string
  onChange: (value: string) => void
}

const options = [
  { value: "featured", label: "featured" },
  { value: "price-asc", label: "priceLow" },
  { value: "price-desc", label: "priceHigh" },
  { value: "name-asc", label: "nameAsc" },
  { value: "name-desc", label: "nameDesc" },
]

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const t = useTranslations("shop")

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl border border-border bg-surface px-4 py-2 text-sm text-text-primary outline-none focus:border-primary transition-colors"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {t(opt.label)}
        </option>
      ))}
    </select>
  )
}
