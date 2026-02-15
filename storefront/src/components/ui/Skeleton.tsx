import { cn } from "@/lib/cn"

interface SkeletonProps {
  variant?: "rect" | "circle" | "text"
  width?: string
  height?: string
  className?: string
}

export function Skeleton({ variant = "rect", width, height, className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-border/60",
        variant === "circle" && "rounded-full",
        variant === "rect" && "rounded-xl",
        variant === "text" && "rounded h-4",
        className
      )}
      style={{ width, height }}
    />
  )
}
