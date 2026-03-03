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
    url: "https://glowreajo.com/contact",
    siteName: "GlowReaJo",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "GlowReaJo - Korean Skincare in Jordan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact GlowReaJo",
    description:
      "Questions about Korean skincare products, orders, or shipping in Jordan? We're here to help.",
    images: ["/og-image.png"],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
