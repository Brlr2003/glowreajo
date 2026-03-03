"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { FaqAccordion } from "@/components/shared/FaqAccordion"

type FaqType = "category" | "product" | "general"

interface FaqGroup {
  label: string
  type: FaqType
  items: { q: string; a: string }[]
}

interface FaqPageClientProps {
  groups: FaqGroup[]
}

const TYPE_LABEL_MAP: Record<FaqType, string> = {
  all: "filterAll",
  general: "filterGeneral",
  category: "filterCategories",
  product: "filterProducts",
} as any

export function FaqPageClient({ groups }: FaqPageClientProps) {
  const t = useTranslations("faqPage")
  const types = Array.from(new Set(groups.map((g: FaqGroup) => g.type)))
  const hasMultipleTypes = types.length > 1
  const [activeType, setActiveType] = useState<"all" | FaqType>("all")

  const filtered = activeType === "all" ? groups : groups.filter((g: FaqGroup) => g.type === activeType)
  const filterTabs: ("all" | FaqType)[] = ["all", ...types]

  return (
    <div className="max-w-3xl mx-auto">
      {hasMultipleTypes && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filterTabs.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeType === type
                  ? "bg-primary text-white"
                  : "bg-surface text-text-secondary hover:bg-primary/10"
              }`}
            >
              {type === "all" ? t("filterAll") : t(TYPE_LABEL_MAP[type] || type)}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-10">
        {filtered.map((group: FaqGroup) => (
          <section key={`${group.type}-${group.label}`}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-heading text-xl font-bold text-text-primary">
                {group.label}
              </h2>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {t(TYPE_LABEL_MAP[group.type] || group.type)}
              </span>
            </div>
            <FaqAccordion items={group.items} />
          </section>
        ))}
      </div>
    </div>
  )
}
