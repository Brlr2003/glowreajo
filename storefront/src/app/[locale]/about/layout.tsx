import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "GlowReaJo brings authentic Korean skincare to Jordan. Learn about our mission to make K-beauty accessible to everyone in Amman and across Jordan.",
  alternates: { canonical: "https://glowreajo.com/about" },
  openGraph: {
    title: "About GlowReaJo",
    description:
      "GlowReaJo brings authentic Korean skincare to Jordan. Learn about our mission to make K-beauty accessible.",
    url: "https://glowreajo.com/about",
    siteName: "GlowReaJo",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "GlowReaJo - Korean Skincare in Jordan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About GlowReaJo",
    description:
      "GlowReaJo brings authentic Korean skincare to Jordan. Learn about our mission to make K-beauty accessible.",
    images: ["/og-image.png"],
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
