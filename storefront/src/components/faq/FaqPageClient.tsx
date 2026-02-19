"use client"

import { useState } from "react"
import { FaqAccordion } from "@/components/shared/FaqAccordion"

interface FaqGroup {
  label: string
  type: "category" | "product"
  items: { q: string; a: string }[]
}

interface FaqPageClientProps {
  groups: FaqGroup[]
}

export function FaqPageClient({ groups }: FaqPageClientProps) {
  const types = Array.from(new Set(groups.map((g) => g.type)))
  const hasMultipleTypes = types.length > 1
  const [activeType, setActiveType] = useState<"all" | "category" | "product">("all")

  const filtered = activeType === "all" ? groups : groups.filter((g) => g.type === activeType)

  return (
    <div className="max-w-3xl mx-auto">
      {hasMultipleTypes && (
        <div className="flex justify-center gap-2 mb-8">
          {(["all", "category", "product"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeType === t
                  ? "bg-primary text-white"
                  : "bg-surface text-text-secondary hover:bg-primary/10"
              }`}
            >
              {t === "all" ? "All" : t === "category" ? "Categories" : "Products"}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-10">
        {filtered.map((group) => (
          <section key={`${group.type}-${group.label}`}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-heading text-xl font-bold text-text-primary">
                {group.label}
              </h2>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary capitalize">
                {group.type}
              </span>
            </div>
            <FaqAccordion items={group.items} />
          </section>
        ))}
      </div>
    </div>
  )
}
