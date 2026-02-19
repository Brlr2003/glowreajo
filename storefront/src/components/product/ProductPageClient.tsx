"use client"

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
  const categoryId = product.categories?.[0]?.id
  const categoryName = product.categories?.[0]?.name

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    ...(categoryName ? [{ label: categoryName, href: `/shop/${product.categories[0]?.handle || categoryName.toLowerCase()}` }] : []),
    { label: product.title },
  ]

  return (
    <div className="container-app py-8">
      <Breadcrumb items={breadcrumbItems} />
      <article>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ProductGallery product={product} />
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
