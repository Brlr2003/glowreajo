"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/cn"
import type { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  children: ReactNode
}

const variants = {
  primary: "bg-gradient-to-r from-primary to-secondary text-white hover:from-primary-dark hover:to-primary",
  secondary: "bg-accent text-text-primary hover:bg-accent/80",
  outline: "border-2 border-primary text-primary hover:bg-primary/10",
  ghost: "text-text-secondary hover:bg-border/50",
}

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "rounded-full font-semibold transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.button>
  )
}
