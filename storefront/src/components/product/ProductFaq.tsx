"use client"

import { FaqAccordion } from "@/components/shared/FaqAccordion"
import { JsonLd } from "@/components/seo/JsonLd"
import { buildFaqJsonLd } from "@/lib/seo/schemas"

interface ProductFaqProps {
  product: any
}

export function ProductFaq({ product }: ProductFaqProps) {
  let faq: { q: string; a: string }[] = []
  try {
    const raw = product.metadata?.faq
    if (raw && typeof raw === "string") {
      faq = JSON.parse(raw)
    }
  } catch {
    return null
  }

  if (faq.length === 0) return null

  return (
    <section className="mt-12">
      <JsonLd data={buildFaqJsonLd(faq)} />
      <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
        Frequently Asked Questions
      </h2>
      <FaqAccordion items={faq} />
    </section>
  )
}
