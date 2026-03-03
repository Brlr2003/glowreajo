import { model } from "@medusajs/framework/utils"

const SiteSetting = model.define("site_setting", {
  id: model.id().primaryKey(),
  key: model.text().default("main"),
  announcement_enabled: model.boolean().default(false),
  announcement_content: model.text().nullable(),
  phone: model.text().nullable(),
  email: model.text().nullable(),
  whatsapp: model.text().nullable(),
  instagram_handle: model.text().nullable(),
  instagram_url: model.text().nullable(),
  tiktok_url: model.text().nullable(),
  facebook_url: model.text().nullable(),
  about_intro: model.text().nullable(),
  about_story: model.text().nullable(),
  about_values: model.text().nullable(),
  about_kbeauty: model.text().nullable(),
  announcement_content_ar: model.text().nullable(),
  about_intro_ar: model.text().nullable(),
  about_story_ar: model.text().nullable(),
  about_values_ar: model.text().nullable(),
  about_kbeauty_ar: model.text().nullable(),
})

export default SiteSetting
