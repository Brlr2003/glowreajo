"use client"

import { useTranslations, useLocale } from "next-intl"
import { Accordion } from "@/components/ui/Accordion"
import { Truck } from "lucide-react"

interface ProductAccordionProps {
  product: any
}

export function ProductAccordion({ product }: ProductAccordionProps) {
  const metadata = product.metadata as any
  const t = useTranslations("product")
  const locale = useLocale()
  const description = locale === "ar" && metadata?.description_ar ? metadata.description_ar : product.description
  const howToUse = locale === "ar" && metadata?.how_to_use_ar ? metadata.how_to_use_ar : metadata?.how_to_use
  const ingredients = locale === "ar" && metadata?.ingredients_ar ? metadata.ingredients_ar : metadata?.ingredients

  return (
    <div className="mt-8">
      <Accordion title={t("details")} defaultOpen>
        <p className="text-sm leading-relaxed">{description}</p>
      </Accordion>

      {howToUse && (
        <Accordion title={t("howToUse")}>
          <p className="text-sm leading-relaxed">{howToUse}</p>
        </Accordion>
      )}

      {ingredients && (
        <Accordion title={t("ingredients")}>
          <p className="text-sm leading-relaxed">{ingredients}</p>
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
