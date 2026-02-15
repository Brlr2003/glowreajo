"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { ShoppingBag, Search, Menu, Sparkles } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { MobileMenu } from "./MobileMenu"
import { SearchOverlay } from "./SearchOverlay"

export function Header() {
  const [hidden, setHidden] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { scrollY } = useScroll()
  const { totalItems, toggleDrawer } = useCart()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 100) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-surface/80"
      >
        <div className="container-app flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-text-primary"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GlowReaJo
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-text-secondary hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={toggleDrawer}
              className="relative p-2 text-text-secondary hover:text-primary transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
