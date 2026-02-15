"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/cn"

interface CheckoutProgressProps {
  currentStep: number
  steps: string[]
}

export function CheckoutProgress({ currentStep, steps }: CheckoutProgressProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <motion.div
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              i <= currentStep
                ? "bg-gradient-to-r from-primary to-secondary text-white"
                : "bg-background text-text-muted"
            )}
            animate={i === currentStep ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
              {i + 1}
            </span>
            <span className="hidden sm:inline">{step}</span>
          </motion.div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                "h-0.5 w-8 rounded-full",
                i < currentStep ? "bg-primary" : "bg-border"
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
