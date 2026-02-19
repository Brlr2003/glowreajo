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
  },
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children
}
