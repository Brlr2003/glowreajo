"use client"

import { useTranslations } from "next-intl"
import { Accordion } from "@/components/ui/Accordion"
import { Truck } from "lucide-react"

interface ProductAccordionProps {
  product: any
}

export function ProductAccordion({ product }: ProductAccordionProps) {
  const metadata = product.metadata as any
  const t = useTranslations("product")

  return (
    <div className="mt-8">
      <Accordion title={t("details")} defaultOpen>
        <p className="text-sm leading-relaxed">{product.description}</p>
      </Accordion>

      {metadata?.how_to_use && (
        <Accordion title={t("howToUse")}>
          <p className="text-sm leading-relaxed">{metadata.how_to_use}</p>
        </Accordion>
      )}

      {metadata?.ingredients && (
        <Accordion title={t("ingredients")}>
          <p className="text-sm leading-relaxed">{metadata.ingredients}</p>
        </Accordion>
      )}

      <Accordion title={t("shippingInfo")}>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <Truck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-text-primary">{t("ammanShipping")}</p>
              <p className="text-text-muted">{t("ammanDays")}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Truck className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-text-primary">{t("otherShipping")}</p>
              <p className="text-text-muted">{t("otherDays")}</p>
            </div>
          </div>
        </div>
      </Accordion>
    </div>
  )
}
