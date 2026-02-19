import { SITE_SETTINGS_MODULE } from "../../../modules/site-settings"

export async function GET(req: any, res: any) {
  try {
    const service = req.scope.resolve(SITE_SETTINGS_MODULE) as any
    const [settings] = await service.listSiteSettings({ key: "main" }, { take: 1 })
    res.json({ site_setting: settings || null })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export async function POST(req: any, res: any) {
  try {
    const service = req.scope.resolve(SITE_SETTINGS_MODULE) as any
    const body = req.body as any

    const [existing] = await service.listSiteSettings({ key: "main" }, { take: 1 })

    let setting
    if (existing) {
      setting = await service.updateSiteSettings({ id: existing.id, ...body })
    } else {
      setting = await service.createSiteSettings({ key: "main", ...body })
    }

    res.json({ site_setting: setting })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
