import { SITE_SETTINGS_MODULE } from "../../../modules/site-settings"
import { localize } from "../../helpers/localize"

const SETTINGS_FIELDS = ["announcement_content", "about_intro", "about_story", "about_values", "about_kbeauty"]

export async function GET(req: any, res: any) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const locale = url.searchParams.get("locale") || "en"
    const service = req.scope.resolve(SITE_SETTINGS_MODULE) as any
    const [settings] = await service.listSiteSettings({ key: "main" }, { take: 1 })
    res.json({ site_setting: settings ? localize(settings, locale, SETTINGS_FIELDS) : null })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
