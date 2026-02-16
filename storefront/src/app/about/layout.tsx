import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "GlowReaJo brings authentic Korean skincare to Jordan. Learn about our mission to make K-beauty accessible to everyone.",
  openGraph: {
    title: "About GlowReaJo",
    description:
      "GlowReaJo brings authentic Korean skincare to Jordan. Learn about our mission to make K-beauty accessible.",
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
