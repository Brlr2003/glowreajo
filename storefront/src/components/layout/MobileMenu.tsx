"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X, Sparkles } from "lucide-react"
import { slideInRight } from "@/lib/animations"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-surface shadow-elevated"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-heading text-lg font-bold">GlowReaJo</span>
              </div>
              <button onClick={onClose} aria-label="Close menu">
                <X className="h-6 w-6 text-text-secondary" />
              </button>
            </div>
            <nav className="p-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-4 text-lg font-medium text-text-primary hover:text-primary border-b border-border/50 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
