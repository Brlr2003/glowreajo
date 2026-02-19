import { SITE_SETTINGS_MODULE } from "../../../modules/site-settings"

export async function GET(req: any, res: any) {
  try {
    const service = req.scope.resolve(SITE_SETTINGS_MODULE) as any
    const [testimonials, count] = await service.listAndCountTestimonials(
      {},
      { order: { sort_order: "ASC" }, take: 100 }
    )
    res.json({ testimonials, count })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export async function POST(req: any, res: any) {
  try {
    const service = req.scope.resolve(SITE_SETTINGS_MODULE) as any
    const body = req.body as any

    if (!body.name || !body.text) {
      return res.status(400).json({ message: "Name and text are required" })
    }

    const testimonial = await service.createTestimonials(body)
    res.status(201).json({ testimonial })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
