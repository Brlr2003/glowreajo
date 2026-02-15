"use client"

import { cn } from "@/lib/cn"
import type { SelectHTMLAttributes } from "react"

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: { value: string; label: string }[]
  error?: string
}

export function Select({ label, options, error, className, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          "w-full appearance-none rounded-xl border bg-surface px-4 pt-6 pb-2 text-text-primary outline-none transition-all",
          error ? "border-error" : "border-border focus:border-primary",
          className
        )}
        {...props}
      >
        <option value="">{label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label className="absolute left-4 top-2 text-xs text-text-muted pointer-events-none">
        {label}
      </label>
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
        <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  )
}
