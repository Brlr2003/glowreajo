"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { medusa } from "@/lib/medusa-client"
import { ProductGallery } from "@/components/product/ProductGallery"
import { ProductInfo } from "@/components/product/ProductInfo"
import { ProductAccordion } from "@/components/product/ProductAccordion"
import { RelatedProducts } from "@/components/product/RelatedProducts"
import { Skeleton } from "@/components/ui/Skeleton"

export default function ProductPage() {
  const params = useParams()
  const handle = params.handle as string
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const { products } = await medusa.store.product.list({ handle })
        if (products.length > 0) {
          setProduct(products[0])
        }
      } catch {}
      setLoading(false)
    }
    if (handle) load()
  }, [handle])

  if (loading) {
    return (
      <div className="container-app py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-4">
            <Skeleton variant="text" className="h-6 w-1/3" />
            <Skeleton variant="text" className="h-10 w-full" />
            <Skeleton variant="text" className="h-8 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container-app py-20 text-center">
        <h1 className="font-heading text-2xl font-bold text-text-primary">Product not found</h1>
        <p className="mt-2 text-text-muted">The product you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    )
  }

  const categoryId = product.categories?.[0]?.id

  return (
    <div className="container-app py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ProductGallery product={product} />
        <div>
          <ProductInfo product={product} />
          <ProductAccordion product={product} />
        </div>
      </div>
      <RelatedProducts currentProductId={product.id} categoryId={categoryId} />
    </div>
  )
}
