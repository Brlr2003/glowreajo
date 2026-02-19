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
  },
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children
}
