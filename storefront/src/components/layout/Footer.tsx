"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sparkles, Instagram, MessageCircle, Mail, Phone } from "lucide-react"

interface FooterCategory {
  id: string
  name: string
  handle: string
}

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
const API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

export function Footer() {
  const [categories, setCategories] = useState<FooterCategory[]>([])

  useEffect(() => {
    fetch(`${BACKEND_URL}/store/product-categories?limit=5`, {
      headers: { "x-publishable-api-key": API_KEY },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data.product_categories || []))
      .catch(() => {})
  }, [])

  return (
    <footer className="mt-20 rounded-t-3xl bg-text-primary text-white">
      <div className="container-app py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl font-bold">GlowReaJo</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              Your trusted Korean skincare destination in Jordan. Authentic
              K-beauty products delivered to your door.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/shop" className="hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/shop/${cat.handle}`}
                    className="hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+96277261248" className="hover:text-white transition-colors">+962 7 7726 1248</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@glowreajo.com" className="hover:text-white transition-colors">info@glowreajo.com</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <a href="https://wa.me/96277261248" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                <a href="https://instagram.com/glowreajo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@glowreajo</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          &copy; 2026 GlowReaJo. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
