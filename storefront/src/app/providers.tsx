"use client"

import { CartProvider } from "@/context/CartContext"
import { ToastProvider } from "@/context/ToastContext"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { CartDrawer } from "@/components/layout/CartDrawer"
import { WhatsAppButton } from "@/components/ui/WhatsAppButton"
import { ToastContainer } from "@/components/ui/Toast"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ToastProvider>
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
        <CartDrawer />
        <WhatsAppButton />
        <ToastContainer />
      </ToastProvider>
    </CartProvider>
  )
}
