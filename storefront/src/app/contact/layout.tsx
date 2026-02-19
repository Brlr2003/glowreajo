import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with GlowReaJo. Questions about Korean skincare products, orders, or shipping in Jordan? Contact us in Amman — we're here to help.",
  alternates: { canonical: "https://glowreajo.com/contact" },
  openGraph: {
    title: "Contact GlowReaJo",
    description:
      "Questions about Korean skincare products, orders, or shipping in Jordan? We're here to help.",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
