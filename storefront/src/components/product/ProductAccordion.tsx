"use client"

import { Accordion } from "@/components/ui/Accordion"
import { Truck } from "lucide-react"

interface ProductAccordionProps {
  product: any
}

export function ProductAccordion({ product }: ProductAccordionProps) {
  const metadata = product.metadata as any

  return (
    <div className="mt-8">
      <Accordion title="Description" defaultOpen>
        <p className="text-sm leading-relaxed">{product.description}</p>
      </Accordion>

      {metadata?.how_to_use && (
        <Accordion title="How to Use">
          <p className="text-sm leading-relaxed">{metadata.how_to_use}</p>
        </Accordion>
      )}

      {metadata?.ingredients && (
        <Accordion title="Ingredients">
          <p className="text-sm leading-relaxed">{metadata.ingredients}</p>
        </Accordion>
      )}

      <Accordion title="Shipping Info">
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <Truck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-text-primary">Amman: 2.00 JOD</p>
              <p className="text-text-muted">1-2 business days</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Truck className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-text-primary">Other Cities: 3.00 JOD</p>
              <p className="text-text-muted">2-4 business days</p>
            </div>
          </div>
        </div>
      </Accordion>
    </div>
  )
}
