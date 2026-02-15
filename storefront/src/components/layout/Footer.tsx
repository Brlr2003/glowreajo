import Link from "next/link";
import { Sparkles, Instagram, MessageCircle, Mail, Phone } from "lucide-react";

export function Footer() {
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
                <Link
                  href="/shop"
                  className="hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=cleansers"
                  className="hover:text-primary transition-colors">
                  Cleansers
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=serums"
                  className="hover:text-primary transition-colors">
                  Serums & Essences
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=moisturizers"
                  className="hover:text-primary transition-colors">
                  Moisturizers
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=sunscreens"
                  className="hover:text-primary transition-colors">
                  Sunscreens
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="hover:text-primary transition-colors">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+962 7 7726 1248</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@glowreajo.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                <span>@glowreajo</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          &copy; 2026 GlowReaJo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
