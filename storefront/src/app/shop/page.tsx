"use client"

import { useEffect, useState, useMemo } from "react"
import { SlidersHorizontal } from "lucide-react"
import { medusa, getRegionId } from "@/lib/medusa-client"
import { FilterSidebar } from "@/components/shop/FilterSidebar"
import { SortDropdown } from "@/components/shop/SortDropdown"
import { ProductGrid } from "@/components/shop/ProductGrid"
import { AnimatedSection } from "@/components/ui/AnimatedSection"

interface Filters {
  category: string
  skinType: string
  concern: string
  priceRange: string
}

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<Filters>({
    category: "",
    skinType: "",
    concern: "",
    priceRange: "",
  })
  const [sort, setSort] = useState("featured")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const region_id = await getRegionId()
        const { products } = await medusa.store.product.list({ limit: 50, region_id, fields: "*categories,*images" } as any)
        setProducts(products)
      } catch {
        // Backend may not be running
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    let result = [...products]

    if (filters.category) {
      result = result.filter((p) =>
        p.categories?.some((c: any) =>
          c.name.toLowerCase().includes(filters.category.toLowerCase())
        )
      )
    }

    if (filters.skinType) {
      result = result.filter((p) => {
        const meta = p.metadata as any
        return meta?.skin_type?.toLowerCase().includes(filters.skinType.toLowerCase())
      })
    }

    if (filters.concern) {
      result = result.filter((p) => {
        const meta = p.metadata as any
        return meta?.concerns?.toLowerCase().includes(filters.concern.toLowerCase())
      })
    }

    if (filters.priceRange) {
      result = result.filter((p) => {
        const price = p.variants?.[0]?.prices?.find((pr: any) => pr.currency_code === "jod")?.amount
        if (!price) return true
        const [min, max] = filters.priceRange.split("-").map(Number)
        if (filters.priceRange.endsWith("+")) return price >= min
        return price >= min && price <= max
      })
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => {
          const aP = a.variants?.[0]?.prices?.[0]?.amount || 0
          const bP = b.variants?.[0]?.prices?.[0]?.amount || 0
          return aP - bP
        })
        break
      case "price-desc":
        result.sort((a, b) => {
          const aP = a.variants?.[0]?.prices?.[0]?.amount || 0
          const bP = b.variants?.[0]?.prices?.[0]?.amount || 0
          return bP - aP
        })
        break
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "name-desc":
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
    }

    return result
  }, [products, filters, sort])

  return (
    <div className="container-app py-8">
      <AnimatedSection>
        <div className="mb-8 text-center">
          <h1 className="font-heading text-4xl font-bold text-text-primary">Shop</h1>
          <p className="mt-2 text-text-secondary">Discover our curated collection of Korean skincare</p>
        </div>
      </AnimatedSection>

      <div className="flex items-center justify-between mb-6 lg:hidden">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm text-text-secondary hover:border-primary transition-colors"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <div className="flex gap-8">
        <FilterSidebar filters={filters} onChange={setFilters} />
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          isMobile
          isOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
        />

        <div className="flex-1">
          <div className="hidden lg:flex items-center justify-between mb-6">
            <p className="text-sm text-text-muted">{filtered.length} products</p>
            <SortDropdown value={sort} onChange={setSort} />
          </div>
          <ProductGrid products={filtered} loading={loading} />
        </div>
      </div>
    </div>
  )
}
