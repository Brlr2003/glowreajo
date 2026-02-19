import { medusaFetch } from "./medusa-fetch"

export interface Testimonial {
  id: string
  name: string
  location: string | null
  text: string
  product: string | null
  rating: number
  sort_order: number
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const data = await medusaFetch<{ testimonials: Testimonial[] }>(
      "/store/testimonials",
      { revalidate: 60 }
    )
    return data.testimonials || []
  } catch {
    return []
  }
}
