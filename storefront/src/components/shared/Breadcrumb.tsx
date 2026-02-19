import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-sm text-text-muted">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-text-primary font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
