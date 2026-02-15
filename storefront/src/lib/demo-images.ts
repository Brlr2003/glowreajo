// Demo product images mapped by product handle
// Replace with real product photos in production
const productImages: Record<string, string> = {
  "cosrx-low-ph-cleanser":
    "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop",
  "some-by-mi-miracle-toner":
    "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop",
  "beauty-of-joseon-glow-serum":
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
  "laneige-water-sleeping-mask":
    "https://images.unsplash.com/photo-1570194065650-d99fb4a38691?w=600&h=600&fit=crop",
  "innisfree-daily-uv-defense":
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop",
  "cosrx-snail-96-essence":
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop",
  "beauty-of-joseon-relief-sun":
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
  "laneige-lip-sleeping-mask":
    "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600&h=600&fit=crop",
  "cosrx-bha-blackhead-power-liquid":
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop",
  "innisfree-green-tea-moisturizer":
    "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop",
  "some-by-mi-snail-truecica-cream":
    "https://images.unsplash.com/photo-1590393802688-ab3fd8c10a5e?w=600&h=600&fit=crop",
  "beauty-of-joseon-ginseng-cleansing-oil":
    "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&h=600&fit=crop",
  "cosrx-pimple-patch":
    "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop",
  "innisfree-volcanic-cleansing-foam":
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop",
  "glowreajo-starter-set":
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&h=600&fit=crop",
}

const fallback =
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop"

export function getProductImage(handle: string): string {
  return productImages[handle] || fallback
}

// Social proof / Instagram-style images
export const socialImages = [
  "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1570194065650-d99fb4a38691?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
]
