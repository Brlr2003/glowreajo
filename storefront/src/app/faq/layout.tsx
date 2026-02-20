import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions",
  description:
    "Find answers to common questions about GlowReaJo's Korean skincare products, categories, shipping, and more.",
  alternates: { canonical: "https://glowreajo.com/faq" },
  openGraph: {
    title: "FAQ | GlowReaJo",
    description:
      "Find answers to common questions about GlowReaJo's Korean skincare products and services.",
    url: "https://glowreajo.com/faq",
    siteName: "GlowReaJo",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "GlowReaJo - Korean Skincare in Jordan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | GlowReaJo",
    description:
      "Find answers to common questions about GlowReaJo's Korean skincare products and services.",
    images: ["/og-image.png"],
  },
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children
}
