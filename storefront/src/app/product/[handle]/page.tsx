"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { medusa, getRegionId } from "@/lib/medusa-client"
import { getProductImage } from "@/lib/demo-images"
import { ProductGallery } from "@/components/product/ProductGallery"
import { ProductInfo } from "@/components/product/ProductInfo"
import { ProductAccordion } from "@/components/product/ProductAccordion"
import { RelatedProducts } from "@/components/product/RelatedProducts"
import { Skeleton } from "@/components/ui/Skeleton"

function useProductMeta(product: any) {
  useEffect(() => {
    if (!product) return
    const title = `${product.title} | GlowReaJo`
    const description = product.description || `Shop ${product.title} - authentic Korean skincare at GlowReaJo.`
    const image = product.thumbnail || product.images?.[0]?.url || getProductImage(product.handle)
    const url = `https://glowreajo.com/product/${product.handle}`

    document.title = title

    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
      if (!el) {
        el = document.createElement("meta")
        el.setAttribute("property", property)
        document.head.appendChild(el)
      }
      el.setAttribute("content", content)
    }

    setMeta("og:title", title)
    setMeta("og:description", description.slice(0, 200))
    setMeta("og:image", image)
    setMeta("og:url", url)
    setMeta("og:type", "product")
    setMeta("og:site_name", "GlowReaJo")
  }, [product])
}

export default function ProductPage() {
  const params = useParams()
  const handle = params.handle as string
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useProductMeta(product)

  useEffect(() => {
    async function load() {
      try {
        const region_id = await getRegionId()
        const { products } = await medusa.store.product.list({ handle, region_id, fields: "*categories,*images,+metadata" } as any)
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
      <div className="container-app py-20 text-center mx-auto">
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
