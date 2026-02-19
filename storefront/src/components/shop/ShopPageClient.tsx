"use client"

import { useState, useMemo } from "react"
import { SlidersHorizontal } from "lucide-react"
import { FilterSidebar } from "@/components/shop/FilterSidebar"
import { SortDropdown } from "@/components/shop/SortDropdown"
import { ProductGrid } from "@/components/shop/ProductGrid"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import type { MedusaCategory } from "@/lib/categories"

interface Filters {
  category: string
  skinType: string
  concern: string
  priceRange: string
}

interface ShopPageClientProps {
  initialProducts: any[]
  categories?: MedusaCategory[]
  title?: string
  subtitle?: string
  breadcrumbItems?: { label: string; href?: string }[]
  initialCategory?: string
}

export function ShopPageClient({
  initialProducts,
  categories = [],
  title = "Shop",
  subtitle = "Discover our curated collection of Korean skincare",
  breadcrumbItems,
  initialCategory = "",
}: ShopPageClientProps) {
  const [products] = useState<any[]>(initialProducts)
  const [filters, setFilters] = useState<Filters>({
    category: initialCategory,
    skinType: "",
    concern: "",
    priceRange: "",
  })
  const [sort, setSort] = useState("featured")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let result = [...products]

    if (filters.category) {
      result = result.filter((p: any) =>
        p.categories?.some((c: any) =>
          c.name.toLowerCase().includes(filters.category.toLowerCase())
        )
      )
    }

    if (filters.skinType) {
      result = result.filter((p: any) => {
        const meta = p.metadata as any
        return meta?.skin_type?.toLowerCase().includes(filters.skinType.toLowerCase())
      })
    }

    if (filters.concern) {
      result = result.filter((p: any) => {
        const meta = p.metadata as any
        return meta?.concerns?.toLowerCase().includes(filters.concern.toLowerCase())
      })
    }

    if (filters.priceRange) {
      result = result.filter((p: any) => {
        const variant = p.variants?.[0]
        const calculatedPrice = variant?.calculated_price?.calculated_amount
        const fallbackPrice = variant?.prices?.find((pr: any) => pr.currency_code === "jod")?.amount
        const price = calculatedPrice ?? fallbackPrice
        if (price == null) return true
        const parts = filters.priceRange.replace("+", "").split("-").map(Number)
        const min = parts[0]
        const max = parts[1]
        if (filters.priceRange.endsWith("+")) return price >= min
        return price >= min && price <= max
      })
    }

    const getPrice = (p: any) => {
      const v = p.variants?.[0]
      return v?.calculated_price?.calculated_amount ?? v?.prices?.[0]?.amount ?? 0
    }

    switch (sort) {
      case "price-asc":
        result.sort((a: any, b: any) => getPrice(a) - getPrice(b))
        break
      case "price-desc":
        result.sort((a: any, b: any) => getPrice(b) - getPrice(a))
        break
      case "name-asc":
        result.sort((a: any, b: any) => a.title.localeCompare(b.title))
        break
      case "name-desc":
        result.sort((a: any, b: any) => b.title.localeCompare(a.title))
        break
    }

    return result
  }, [products, filters, sort])

  const defaultBreadcrumb = [
    { label: "Home", href: "/" },
    { label: "Shop" },
  ]

  return (
    <div className="container-app py-8">
      <AnimatedSection>
        <Breadcrumb items={breadcrumbItems || defaultBreadcrumb} />
        <div className="mb-8 text-center">
          <h1 className="font-heading text-4xl font-bold text-text-primary">{title}</h1>
          <p className="mt-2 text-text-secondary">{subtitle}</p>
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
        <FilterSidebar filters={filters} onChange={setFilters} products={products} categories={categories} />
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          products={products}
          categories={categories}
          isMobile
          isOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
        />

        <div className="flex-1">
          <div className="hidden lg:flex items-center justify-between mb-6">
            <p className="text-sm text-text-muted">{filtered.length} products</p>
            <SortDropdown value={sort} onChange={setSort} />
          </div>
          <ProductGrid products={filtered} loading={false} />
        </div>
      </div>
    </div>
  )
}
