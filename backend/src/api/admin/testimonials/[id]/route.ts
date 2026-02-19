import { SITE_SETTINGS_MODULE } from "../../../../modules/site-settings"

export async function GET(req: any, res: any) {
  try {
    const service = req.scope.resolve(SITE_SETTINGS_MODULE) as any
    const { id } = req.params
    const testimonial = await service.retrieveTestimonial(id)
    res.json({ testimonial })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export async function POST(req: any, res: any) {
  try {
    const service = req.scope.resolve(SITE_SETTINGS_MODULE) as any
    const { id } = req.params
    const body = req.body as any
    const testimonial = await service.updateTestimonials({ id, ...body })
    res.json({ testimonial })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export async function DELETE(req: any, res: any) {
  try {
    const service = req.scope.resolve(SITE_SETTINGS_MODULE) as any
    const { id } = req.params
    await service.deleteTestimonials(id)
    res.json({ id, deleted: true })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
