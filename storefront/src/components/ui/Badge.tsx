import { cn } from "@/lib/cn"

interface BadgeProps {
  variant?: "bestseller" | "new" | "sale"
  children: React.ReactNode
  className?: string
}

const variants = {
  bestseller: "bg-warm-accent text-text-primary",
  new: "bg-accent text-text-primary",
  sale: "bg-error/90 text-white",
}

export function Badge({ variant = "bestseller", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
