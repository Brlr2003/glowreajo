import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop K-Beauty Products",
  description:
    "Browse our collection of authentic Korean skincare products in Jordan. Cleansers, serums, moisturizers, sunscreens & more from top K-beauty brands. Buy Korean beauty products in Amman.",
  alternates: { canonical: "https://glowreajo.com/shop" },
  openGraph: {
    title: "Shop K-Beauty Products | GlowReaJo",
    description:
      "Browse authentic Korean skincare products in Jordan. Cleansers, serums, moisturizers & more from top K-beauty brands.",
    url: "https://glowreajo.com/shop",
    siteName: "GlowReaJo",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "GlowReaJo - Korean Skincare in Jordan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop K-Beauty Products | GlowReaJo",
    description:
      "Browse authentic Korean skincare products in Jordan. Cleansers, serums, moisturizers & more from top K-beauty brands.",
    images: ["/og-image.png"],
  },
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children
}
