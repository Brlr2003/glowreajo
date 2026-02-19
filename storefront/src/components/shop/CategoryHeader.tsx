import { getCategoryIcon, getCategoryColor } from "@/lib/category-icons"
import type { MedusaCategory } from "@/lib/categories"

interface CategoryHeaderProps {
  category: MedusaCategory
  productCount: number
}

export function CategoryHeader({ category, productCount }: CategoryHeaderProps) {
  const Icon = getCategoryIcon(category.metadata?.icon)
  const color = getCategoryColor(category.metadata?.color)
  const description = category.metadata?.description || category.description

  return (
    <div className="mb-8 text-center">
      <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${color} mb-4`}>
        <Icon className="h-7 w-7" />
      </div>
      <h1 className="font-heading text-4xl font-bold text-text-primary">{category.name}</h1>
      {description && (
        <p className="mt-2 text-text-secondary max-w-lg mx-auto">{description}</p>
      )}
      <p className="mt-1 text-sm text-text-muted">{productCount} products</p>
    </div>
  )
}
