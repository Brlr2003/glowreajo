"use client"

import { useTranslations, useLocale } from "next-intl"
import { Accordion } from "@/components/ui/Accordion"
import { Truck } from "lucide-react"
import { RichText } from "@/components/product/RichText"

interface ProductAccordionProps {
  product: any
}

export function ProductAccordion({ product }: ProductAccordionProps) {
  const metadata = (product.metadata as any) || {}
  const t = useTranslations("product")
  const locale = useLocale()
  const description = locale === "ar"
    ? (metadata.description_html_ar || metadata.description_ar || product.description)
    : (metadata.description_html || product.description)
  const howToUse = locale === "ar"
    ? (metadata.how_to_use_html_ar || metadata.how_to_use_ar || metadata.how_to_use_html || metadata.how_to_use)
    : (metadata.how_to_use_html || metadata.how_to_use)
  const ingredients = locale === "ar"
    ? (metadata.ingredients_html_ar || metadata.ingredients_ar || metadata.ingredients_html || metadata.ingredients)
    : (metadata.ingredients_html || metadata.ingredients)

  return (
    <div className="mt-8">
      <Accordion title={t("details")} defaultOpen>
        <RichText text={description} className="text-sm leading-relaxed" />
      </Accordion>

      <Accordion title={t("howToUse")}>
        <RichText
          text={howToUse || t("howToUseFallback")}
          className="text-sm leading-relaxed"
        />
      </Accordion>

      {ingredients && (
        <Accordion title={t("ingredients")}>
          <RichText text={ingredients} className="text-sm leading-relaxed" />
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
