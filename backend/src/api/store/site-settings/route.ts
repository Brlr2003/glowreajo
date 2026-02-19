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
