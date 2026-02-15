"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X, Home, ShoppingBag, Info, MessageCircle, Store } from "lucide-react"
import { useCart } from "@/context/CartContext"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/shop", label: "Shop", icon: Store },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: MessageCircle },
]

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { totalItems, toggleDrawer } = useCart()

  const handleCartClick = () => {
    onClose()
    toggleDrawer()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-[5.5rem] left-4 right-4 z-50 mx-auto max-w-sm rounded-2xl bg-surface shadow-elevated border border-border/50 overflow-hidden"
          >
            <nav className="p-3">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-text-primary hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.04 }}
              >
                <button
                  onClick={handleCartClick}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-text-primary hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Cart
                  {totalItems > 0 && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </button>
              </motion.div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
