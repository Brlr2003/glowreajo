"use client"

import { cn } from "@/lib/cn"
import type { InputHTMLAttributes } from "react"

interface PhoneInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  error?: string
  countryCode?: string
}

export function PhoneInput({
  error,
  countryCode = "+962",
  className,
  ...props
}: PhoneInputProps) {
  return (
    <div>
      <div className="flex">
        <div className="flex items-center rounded-l-xl border border-r-0 border-border bg-background px-3 text-sm text-text-secondary">
          {countryCode}
        </div>
        <input
          type="tel"
          className={cn(
            "w-full rounded-r-xl border bg-surface px-4 py-3 text-text-primary outline-none transition-all",
            error ? "border-error" : "border-border focus:border-primary",
            className
          )}
          placeholder="7X XXX XXXX"
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  )
}
