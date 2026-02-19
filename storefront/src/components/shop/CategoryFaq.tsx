"use client"

import { FaqAccordion } from "@/components/shared/FaqAccordion"
import { JsonLd } from "@/components/seo/JsonLd"
import { buildFaqJsonLd } from "@/lib/seo/schemas"
import type { MedusaCategory } from "@/lib/categories"

interface CategoryFaqProps {
  category: MedusaCategory
}

export function CategoryFaq({ category }: CategoryFaqProps) {
  let faq: { q: string; a: string }[] = []
  try {
    const raw = category.metadata?.faq
    if (raw && typeof raw === "string") {
      faq = JSON.parse(raw)
    }
  } catch {
    return null
  }

  if (faq.length === 0) return null

  return (
    <section className="mt-12 container-app">
      <JsonLd data={buildFaqJsonLd(faq)} />
      <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
        Frequently Asked Questions
      </h2>
      <FaqAccordion items={faq} />
    </section>
  )
}
