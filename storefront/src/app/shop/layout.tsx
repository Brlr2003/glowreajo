import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop K-Beauty Products",
  description:
    "Browse our collection of authentic Korean skincare products. Cleansers, serums, moisturizers, sunscreens & more from top K-beauty brands.",
  openGraph: {
    title: "Shop K-Beauty Products | GlowReaJo",
    description:
      "Browse our collection of authentic Korean skincare products. Cleansers, serums, moisturizers & more.",
  },
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children
}
