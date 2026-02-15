import type { LucideIcon } from "lucide-react"

interface SectionTitleProps {
  title: string
  subtitle?: string
  icon?: LucideIcon
  className?: string
}

export function SectionTitle({ title, subtitle, icon: Icon, className }: SectionTitleProps) {
  return (
    <div className={`text-center mb-10 ${className || ""}`}>
      {Icon && (
        <div className="flex justify-center mb-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      )}
      <h2 className="font-heading text-3xl font-bold text-text-primary md:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-text-secondary max-w-lg mx-auto">{subtitle}</p>
      )}
    </div>
  )
}
