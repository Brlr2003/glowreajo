import {
  Droplets,
  FlaskConical,
  Pipette,
  Layers,
  Sun,
  Leaf,
  Package,
  Sparkles,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  droplets: Droplets,
  flask: FlaskConical,
  pipette: Pipette,
  layers: Layers,
  sun: Sun,
  leaf: Leaf,
  package: Package,
  sparkles: Sparkles,
}

const colorMap: Record<string, string> = {
  blue: "text-blue-500 bg-blue-50",
  purple: "text-purple-500 bg-purple-50",
  pink: "text-pink-500 bg-pink-50",
  green: "text-green-500 bg-green-50",
  yellow: "text-yellow-500 bg-yellow-50",
  teal: "text-teal-500 bg-teal-50",
  rose: "text-rose-500 bg-rose-50",
  orange: "text-orange-500 bg-orange-50",
}

const DEFAULT_ICON: LucideIcon = Sparkles
const DEFAULT_COLOR = "text-primary bg-primary/10"

export function getCategoryIcon(key?: string): LucideIcon {
  if (!key) return DEFAULT_ICON
  return iconMap[key.toLowerCase()] || DEFAULT_ICON
}

export function getCategoryColor(key?: string): string {
  if (!key) return DEFAULT_COLOR
  return colorMap[key.toLowerCase()] || DEFAULT_COLOR
}
