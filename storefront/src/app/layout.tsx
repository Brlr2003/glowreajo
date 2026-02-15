import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Outfit } from "next/font/google"
import "@/styles/globals.css"
import { Providers } from "./providers"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "GlowReaJo | Korean Skincare in Jordan",
    template: "%s | GlowReaJo",
  },
  description:
    "Your trusted Korean skincare destination in Jordan. Authentic K-beauty products from COSRX, Laneige, Innisfree & more. Delivered to your door.",
  openGraph: {
    title: "GlowReaJo | Korean Skincare in Jordan",
    description: "Authentic K-beauty products delivered to your door in Jordan.",
    type: "website",
    locale: "en_US",
    siteName: "GlowReaJo",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-background antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
