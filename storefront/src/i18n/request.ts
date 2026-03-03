import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"
import deepmerge from "deepmerge"

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  const localeMessages = (await import(`./messages/${locale}.json`)).default

  // For non-default locales, merge with English as fallback
  // so missing Arabic keys gracefully show English text
  if (locale !== routing.defaultLocale) {
    const defaultMessages = (await import(`./messages/${routing.defaultLocale}.json`)).default
    return {
      locale,
      messages: deepmerge(defaultMessages, localeMessages),
    }
  }

  return {
    locale,
    messages: localeMessages,
  }
})
