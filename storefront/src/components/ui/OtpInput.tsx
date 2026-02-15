"use client"

import { useRef, useState, useCallback, type KeyboardEvent } from "react"
import { cn } from "@/lib/cn"

interface OtpInputProps {
  length?: number
  onComplete: (code: string) => void
  error?: string
}

export function OtpInput({ length = 6, onComplete, error }: OtpInputProps) {
  const [values, setValues] = useState<string[]>(new Array(length).fill(""))
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = useCallback(
    (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return

      const newValues = [...values]
      newValues[index] = value.slice(-1)
      setValues(newValues)

      if (value && index < length - 1) {
        refs.current[index + 1]?.focus()
      }

      const code = newValues.join("")
      if (code.length === length && !code.includes("")) {
        onComplete(code)
      }
    },
    [values, length, onComplete]
  )

  const handleKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !values[index] && index > 0) {
        refs.current[index - 1]?.focus()
      }
    },
    [values]
  )

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault()
      const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length)
      const newValues = [...values]
      for (let i = 0; i < text.length; i++) {
        newValues[i] = text[i]
      }
      setValues(newValues)
      if (text.length === length) {
        onComplete(text)
      } else {
        refs.current[text.length]?.focus()
      }
    },
    [values, length, onComplete]
  )

  return (
    <div>
      <div className="flex justify-center gap-3" dir="ltr">
        {values.map((value, index) => (
          <input
            key={index}
            ref={(el) => { refs.current[index] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={cn(
              "h-14 w-12 rounded-xl border bg-surface text-center text-xl font-semibold text-text-primary outline-none transition-all",
              error ? "border-error" : "border-border focus:border-primary"
            )}
          />
        ))}
      </div>
      {error && <p className="mt-2 text-center text-xs text-error">{error}</p>}
    </div>
  )
}
