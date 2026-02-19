import { MedusaService } from "@medusajs/framework/utils"
import SiteSetting from "./models/site-setting"
import Testimonial from "./models/testimonial"

class SiteSettingsService extends MedusaService({ SiteSetting, Testimonial }) {}

export default SiteSettingsService
