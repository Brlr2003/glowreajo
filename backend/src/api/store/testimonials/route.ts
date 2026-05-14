import { SITE_SETTINGS_MODULE } from "../../../modules/site-settings"
import { localizeArray } from "../../helpers/localize"

const TESTIMONIAL_FIELDS = ["name", "location", "text", "product"]
const TESTIMONIAL_PUBLIC_KEYS = [
  "id",
  "name",
  "location",
  "text",
  "product",
  "instagram_url",
  "rating",
  "sort_order",
]

export async function GET(req: any, res: any) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const locale = url.searchParams.get("locale") || "en"
    const service = req.scope.resolve(SITE_SETTINGS_MODULE) as any
    const testimonials = await service.listTestimonials(
      { is_active: true },
      { order: { sort_order: "ASC" }, take: 50 }
    )
    const localized = localizeArray(testimonials, locale, TESTIMONIAL_FIELDS)
    const trimmed = localized.map((t: any) => {
      const out: any = {}
      for (const k of TESTIMONIAL_PUBLIC_KEYS) out[k] = t[k] ?? null
      return out
    })
    res.json({ testimonials: trimmed })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
