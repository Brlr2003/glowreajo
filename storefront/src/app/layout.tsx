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

const siteUrl = "https://glowreajo.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GlowReaJo | Korean Skincare in Jordan",
    template: "%s | GlowReaJo",
  },
  description:
    "Your trusted Korean skincare destination in Jordan. Authentic K-beauty products from COSRX, Laneige, Innisfree & more. Delivered to your door.",
  keywords: [
    "Korean skincare",
    "K-beauty",
    "skincare Jordan",
    "COSRX Jordan",
    "Laneige Jordan",
    "Innisfree Jordan",
    "Korean beauty products",
    "GlowReaJo",
    "skincare Amman",
    "K-beauty Jordan",
  ],
  authors: [{ name: "GlowReaJo" }],
  creator: "GlowReaJo",
  openGraph: {
    title: "GlowReaJo | Korean Skincare in Jordan",
    description:
      "Authentic K-beauty products delivered to your door in Jordan. Shop COSRX, Laneige, Innisfree & more.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "GlowReaJo",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "GlowReaJo - Korean Skincare in Jordan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GlowReaJo | Korean Skincare in Jordan",
    description:
      "Authentic K-beauty products delivered to your door in Jordan.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
