"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

const STORAGE_KEY = "glowreajo-promo-dismissed"
const BANNER_HEIGHT = "36px"

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
  const [dismissed, setDismissed] = useState(true)
  const [content, setContent] = useState("")

  useEffect(() => {
    fetch(`${BACKEND_URL}/store/site-settings`, {
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
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--promo-banner-height",
      dismissed ? "0px" : BANNER_HEIGHT
    )
  }, [dismissed])

  if (dismissed || !content) return null

  const handleDismiss = () => {
    setDismissed(true)
    localStorage.setItem(STORAGE_KEY, hashContent(content))
  }

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-60 bg-linear-to-r from-primary to-secondary text-white text-center text-sm py-2 px-8"
        style={{ height: BANNER_HEIGHT }}
      >
        <span
          className="font-medium [&_p]:inline [&_p]:m-0"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <button
          onClick={handleDismiss}
          aria-label="Dismiss promo banner"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div style={{ height: BANNER_HEIGHT }} />
    </>
  )
}
