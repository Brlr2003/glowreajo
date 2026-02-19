import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GlowReaJo — Korean Skincare in Jordan",
    short_name: "GlowReaJo",
    description: "Your trusted Korean skincare destination in Jordan. Authentic K-beauty products delivered to your door.",
    start_url: "/",
    display: "standalone",
    background_color: "#fefcfb",
    theme_color: "#d97aa6",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  }
}
