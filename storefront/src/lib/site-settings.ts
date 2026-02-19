import { medusaFetch } from "./medusa-fetch"

export interface SiteSettings {
  announcement_enabled: boolean
  announcement_content: string | null
  phone: string | null
  email: string | null
  whatsapp: string | null
  instagram_handle: string | null
  instagram_url: string | null
  tiktok_url: string | null
  facebook_url: string | null
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const data = await medusaFetch<{ site_setting: SiteSettings | null }>(
      "/store/site-settings",
      { revalidate: 60 }
    )
    return data.site_setting
  } catch {
    return null
  }
}
