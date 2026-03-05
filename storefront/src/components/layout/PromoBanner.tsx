"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useLocale } from "next-intl"
import { X } from "lucide-react"

const STORAGE_KEY = "glowreajo-promo-dismissed"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
const API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

function hashContent(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0
  }
  return String(hash)
}

export function PromoBanner() {
  const locale = useLocale()
  const [dismissed, setDismissed] = useState(true)
  const [content, setContent] = useState("")
  const bannerRef = useRef<HTMLDivElement>(null)

  const updateHeight = useCallback(() => {
    const h = dismissed || !content ? 0 : bannerRef.current?.offsetHeight || 0
    document.documentElement.style.setProperty("--promo-banner-height", `${h}px`)
  }, [dismissed, content])

  useEffect(() => {
    fetch(`${BACKEND_URL}/store/site-settings?locale=${locale}`, {
      headers: { "x-publishable-api-key": API_KEY },
    })
      .then((res) => res.json())
      .then((data) => {
        const s = data.site_setting
        if (!s?.announcement_enabled || !s.announcement_content) return
        setContent(s.announcement_content)
        const contentHash = hashContent(s.announcement_content)
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored !== contentHash) {
          setDismissed(false)
        }
      })
      .catch(() => {})
  }, [locale])

  useEffect(() => {
    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [updateHeight])

  if (dismissed || !content) return null

  const handleDismiss = () => {
    setDismissed(true)
    localStorage.setItem(STORAGE_KEY, hashContent(content))
  }

  return (
    <>
      <div
        ref={bannerRef}
        className="fixed top-0 left-0 right-0 z-60 bg-linear-to-r from-primary to-secondary text-white text-center text-xs sm:text-sm py-2 px-8"
      >
        <span
          className="font-medium [&_p]:inline [&_p]:m-0"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <button
          onClick={handleDismiss}
          aria-label="Dismiss promo banner"
          className="absolute end-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div ref={(el) => { if (el && bannerRef.current) el.style.height = `${bannerRef.current.offsetHeight}px` }} />
    </>
  )
}
