"use client"

import { useState } from "react"
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
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5 pointer-events-none">
        <motion.header
          variants={{
            visible: { y: 0, opacity: 1 },
            hidden: { y: -20, opacity: 0 },
          }}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="mx-auto max-w-6xl rounded-2xl border border-border/50 backdrop-blur-xl bg-surface/80 shadow-soft pointer-events-auto"
        >
          <div className="flex h-14 items-center justify-between px-5">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-heading text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GlowReaJo
              </span>
            </Link>

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

            <div className="flex items-center gap-2">
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
                    className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-text-primary hover:text-primary transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
