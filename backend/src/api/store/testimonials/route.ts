import { SITE_SETTINGS_MODULE } from "../../../modules/site-settings"
import { localizeArray } from "../../helpers/localize"

const TESTIMONIAL_FIELDS = ["name", "location", "text", "product"]

export async function GET(req: any, res: any) {
  try {
    const locale = req.query.locale || "en"
    const service = req.scope.resolve(SITE_SETTINGS_MODULE) as any
    const testimonials = await service.listTestimonials(
      { is_active: true },
      { order: { sort_order: "ASC" }, take: 50 }
    )
    res.json({ testimonials: localizeArray(testimonials, locale, TESTIMONIAL_FIELDS) })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
