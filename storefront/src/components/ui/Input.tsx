"use client"

import { cn } from "@/lib/cn"
import { useState, type InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const [focused, setFocused] = useState(false)
  const hasValue = props.value !== undefined && props.value !== ""
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-")

  return (
    <div className="relative">
      <input
        id={inputId}
        className={cn(
          "peer w-full rounded-xl border bg-surface px-4 pt-6 pb-2 text-text-primary outline-none transition-all",
          error ? "border-error" : focused ? "border-primary" : "border-border",
          className
        )}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      <label
        htmlFor={inputId}
        className={cn(
          "absolute left-4 transition-all pointer-events-none",
          focused || hasValue
            ? "top-2 text-xs text-text-muted"
            : "top-4 text-sm text-text-secondary"
        )}
      >
        {label}
      </label>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  )
}
