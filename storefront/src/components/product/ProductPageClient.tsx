"use client"

import { useTranslations } from "next-intl"
import { ProductGallery } from "@/components/product/ProductGallery"
import { ProductInfo } from "@/components/product/ProductInfo"
import { ProductAccordion } from "@/components/product/ProductAccordion"
import { ProductFaq } from "@/components/product/ProductFaq"
import { RelatedProducts } from "@/components/product/RelatedProducts"
import { Breadcrumb } from "@/components/shared/Breadcrumb"

interface ProductPageClientProps {
  product: any
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  const tc = useTranslations("common")
  const t = useTranslations("product")
  const categoryId = product.categories?.[0]?.id
  const categoryName = product.categories?.[0]?.name

  const variant = product.variants?.[0]
  const managesInventory = variant?.manage_inventory !== false
  const inventoryQty = variant?.inventory_quantity
  const isOutOfStock = managesInventory && (inventoryQty === 0 || inventoryQty === null)
  const galleryBadges: Array<{ label: string; variant: "bestseller" | "new" | "sale" }> = []
  if (isOutOfStock) {
    galleryBadges.push({ label: t("outOfStock"), variant: "sale" })
  } else if (managesInventory) {
    galleryBadges.push({ label: t("inStock"), variant: "new" })
  }
  if (!isOutOfStock && product.tags?.length > 0) {
    product.tags.forEach((tag: any) => {
      galleryBadges.push({ label: tag.value, variant: "bestseller" })
    })
  }

  const breadcrumbItems = [
    { label: tc("home"), href: "/" },
    { label: tc("shop"), href: "/shop" },
    ...(categoryName ? [{ label: categoryName, href: `/shop/${product.categories[0]?.handle || categoryName.toLowerCase()}` }] : []),
    { label: product.title },
  ]

  return (
    <div className="container-app py-8">
      <Breadcrumb items={breadcrumbItems} />
      <article>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ProductGallery product={product} badges={galleryBadges} />
          <div>
            <ProductInfo product={product} />
            <ProductAccordion product={product} />
          </div>
        </div>
        <ProductFaq product={product} />
      </article>
      <RelatedProducts currentProductId={product.id} categoryId={categoryId} />
    </div>
  )
}
