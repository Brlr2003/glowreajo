"use client"

import { motion } from "framer-motion"
import { Heart, Sparkles, Globe, Leaf, Shield, Star, Zap, Sun } from "lucide-react"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { stagger, fadeInUp } from "@/lib/animations"
import { getSiteSettings } from "@/lib/site-settings"
import { useEffect, useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import type { LucideIcon } from "lucide-react"

const ICON_MAP: Record<string, LucideIcon> = {
  heart: Heart, sparkles: Sparkles, globe: Globe, leaf: Leaf,
  shield: Shield, star: Star, zap: Zap, sun: Sun,
}

interface ValueCard {
  icon: string
  title: string
  description: string
}

const DEFAULT_INTRO = ""
const DEFAULT_STORY = ""
const DEFAULT_VALUES: ValueCard[] = []
const DEFAULT_KBEAUTY = ""

function getGridCols(count: number): string {
  if (count <= 1) return "grid-cols-1"
  if (count === 2) return "grid-cols-1 md:grid-cols-2"
  if (count === 3) return "grid-cols-1 md:grid-cols-3"
  return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
}

export default function AboutPage() {
  const t = useTranslations("about")
  const locale = useLocale()
  const [intro, setIntro] = useState(DEFAULT_INTRO)
  const [story, setStory] = useState(DEFAULT_STORY)
  const [values, setValues] = useState<ValueCard[]>(DEFAULT_VALUES)
  const [kbeauty, setKbeauty] = useState(DEFAULT_KBEAUTY)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getSiteSettings(locale).then((s) => {
      if (!s) return
      if (s.about_intro) setIntro(s.about_intro)
      if (s.about_story) setStory(s.about_story)
      if (s.about_kbeauty) setKbeauty(s.about_kbeauty)
      if (s.about_values) {
        try {
          const parsed = JSON.parse(s.about_values)
          if (Array.isArray(parsed) && parsed.length > 0) setValues(parsed)
        } catch {}
      }
      setLoaded(true)
    })
  }, [locale])

  if (!loaded) {
    return (
      <div className="container-app py-12">
        <div className="text-center">
          <div className="h-10 w-48 mx-auto bg-surface rounded-2xl animate-pulse" />
          <div className="h-6 w-96 max-w-full mx-auto bg-surface rounded-2xl animate-pulse mt-4" />
        </div>
      </div>
    )
  }

  return (
    <div className="container-app py-12">
      <AnimatedSection>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-heading text-4xl font-bold text-text-primary md:text-5xl">
            {t("title")}
          </h1>
          {intro && <p className="mt-6 text-lg text-text-secondary leading-relaxed">{intro}</p>}
        </div>
      </AnimatedSection>

      {story && (
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl font-bold text-text-primary mb-6">{t("ourStory")}</h2>
            <div
              className="prose prose-neutral max-w-none text-text-secondary leading-relaxed"
              dangerouslySetInnerHTML={{ __html: story }}
            />
          </div>
        </AnimatedSection>
      )}

      {values.length > 0 && (
        <>
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-text-primary text-center mb-10">
              {t("ourValues")}
            </h2>
          </AnimatedSection>

          <motion.div
            key={values.map((v: ValueCard) => v.title).join(",")}
            variants={stagger(0.1)}
            initial="hidden"
            animate="visible"
            className={`grid ${getGridCols(values.length)} gap-6`}
          >
            {values.map((value: ValueCard) => {
              const Icon = ICON_MAP[value.icon] || Heart
              return (
                <motion.div key={value.title} variants={fadeInUp} className="rounded-2xl bg-surface p-8 shadow-soft">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-text-primary">{value.title}</h3>
                  <p className="mt-2 text-text-secondary">{value.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </>
      )}

      {kbeauty && (
        <AnimatedSection>
          <div className="mt-16 text-center">
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">{t("whyKbeauty")}</h2>
            <div
              className="prose prose-neutral max-w-2xl mx-auto text-text-secondary leading-relaxed"
              dangerouslySetInnerHTML={{ __html: kbeauty }}
            />
          </div>
        </AnimatedSection>
      )}
    </div>
  )
}
