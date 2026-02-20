import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Skincare Tips & K-Beauty Guides",
  description:
    "Read our latest skincare tips, K-beauty routines, product guides, and expert advice. Learn how to build the perfect Korean skincare routine.",
  alternates: { canonical: "https://glowreajo.com/blog" },
  openGraph: {
    title: "Blog | GlowReaJo",
    description: "Skincare tips, K-beauty routines, and product guides from GlowReaJo.",
    url: "https://glowreajo.com/blog",
    siteName: "GlowReaJo",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "GlowReaJo - Korean Skincare in Jordan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | GlowReaJo",
    description: "Skincare tips, K-beauty routines, and product guides from GlowReaJo.",
    images: ["/og-image.png"],
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
