"use client"

import { useState, useMemo, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
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
  hideCategoryFilter?: boolean
}

export function ShopPageClient({
  initialProducts,
  categories = [],
  title,
  subtitle,
  breadcrumbItems,
  initialCategory = "",
  hideCategoryFilter,
}: ShopPageClientProps) {
  const t = useTranslations("shop")
  const searchParams = useSearchParams()
  const router = useRouter()
  const displayTitle = title || t("title")
  const displaySubtitle = subtitle || t("subtitle")
  const [products] = useState<any[]>(initialProducts)
  const [filters, setFilters] = useState<Filters>({
    category: initialCategory,
    skinType: "",
    concern: "",
    priceRange: "",
  })
  const [sort, setSort] = useState("featured")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const pageFromUrl = Number(searchParams.get("page")) || 1
  const [currentPage, setCurrentPage] = useState(pageFromUrl)
  const PRODUCTS_PER_PAGE = 12

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page)
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) params.delete("page")
    else params.set("page", String(page))
    const query = params.toString()
    router.replace(query ? `?${query}` : window.location.pathname, { scroll: false })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [searchParams, router])

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
      case "featured":
        result.sort((a: any, b: any) => {
          const orderA = a.metadata?.sort_order ?? 999999
          const orderB = b.metadata?.sort_order ?? 999999
          return orderA - orderB
        })
        break
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

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters)
    goToPage(1)
  }

  const handleSortChange = (newSort: string) => {
    setSort(newSort)
    goToPage(1)
  }

  const defaultBreadcrumb = [
    { label: t("home"), href: "/" },
    { label: t("shop") },
  ]

  return (
    <div className="container-app py-8">
      <AnimatedSection>
        <Breadcrumb items={breadcrumbItems || defaultBreadcrumb} />
        <div className="mb-8 text-center">
          <h1 className="font-heading text-4xl font-bold text-text-primary">{displayTitle}</h1>
          <p className="mt-2 text-text-secondary">{displaySubtitle}</p>
        </div>
      </AnimatedSection>

      <div className="flex items-center justify-between mb-6 lg:hidden">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm text-text-secondary hover:border-primary transition-colors"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {t("filters")}
        </button>
        <SortDropdown value={sort} onChange={handleSortChange} />
      </div>

      <div className="flex gap-8">
        <FilterSidebar filters={filters} onChange={handleFiltersChange} products={products} categories={categories} hideCategoryFilter={hideCategoryFilter} />
        <FilterSidebar
          filters={filters}
          onChange={handleFiltersChange}
          products={products}
          categories={categories}
          isMobile
          isOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          hideCategoryFilter={hideCategoryFilter}
        />

        <div className="flex-1">
          <div className="hidden lg:flex items-center justify-between mb-6">
            <p className="text-sm text-text-muted">{t("productCount", { count: filtered.length })}</p>
            <SortDropdown value={sort} onChange={handleSortChange} />
          </div>
          <ProductGrid products={paginatedProducts} loading={false} />

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => goToPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-surface text-text-secondary hover:bg-primary/10 hover:text-primary"
              >
                <ChevronLeft className="h-4 w-4" />
                {t("previous")}
              </button>
              <span className="text-sm text-text-muted px-3">
                {t("page", { page: currentPage, total: totalPages })}
              </span>
              <button
                onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-surface text-text-secondary hover:bg-primary/10 hover:text-primary"
              >
                {t("next")}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
