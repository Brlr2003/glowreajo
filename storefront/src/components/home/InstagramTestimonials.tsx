"use client"

import { motion } from "framer-motion"
import { Heart, Instagram, ArrowUpRight } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { stagger, fadeInUp } from "@/lib/animations"
import { INSTAGRAM_HIGHLIGHT_URL } from "@/lib/instagram-testimonials"
import type { Testimonial } from "@/lib/testimonials"

interface Props {
  reviews?: Testimonial[]
}

export function InstagramTestimonials({ reviews = [] }: Props) {
  const locale = useLocale()
  const t = useTranslations("instagramTestimonials")
  const isArabic = locale === "ar"

  if (reviews.length === 0) return null

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdf2f8] via-background to-[#f5f3ff]/40" />
      <div
        className="absolute top-20 -end-20 h-72 w-72 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute bottom-20 -start-16 h-64 w-64 rounded-full bg-gradient-to-tr from-secondary/15 to-accent/15 blur-3xl"
        aria-hidden
      />

      <div className="container-app relative">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-sm border border-primary/20 px-4 py-1.5 mb-4 shadow-soft">
              <Instagram className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium tracking-wide text-text-secondary">
                {t("badge")}
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
              {t("title")}
            </h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </AnimatedSection>

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {reviews.map((review, idx) => (
            <motion.a
              key={review.id}
              href={INSTAGRAM_HIGHLIGHT_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("viewOnInstagram")}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative flex flex-col rounded-3xl bg-white/80 backdrop-blur-sm border border-border/60 p-5 md:p-6 shadow-soft hover:shadow-elevated transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] via-50% to-[#d62976] p-[2px]">
                    <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                      <Heart className="h-4 w-4 text-primary fill-primary" />
                    </div>
                  </div>
                  <div className="leading-tight">
                    <p className="text-xs font-semibold text-text-primary">
                      {t("verifiedCustomer")}
                    </p>
                    <p className="text-[11px] text-text-muted">
                      {t("viaInstagram")}
                    </p>
                  </div>
                </div>
                <div className="opacity-60 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                </div>
              </div>

              <div
                className={`relative rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 px-4 py-3.5 md:px-5 md:py-4 mb-4 ${
                  isArabic ? "rounded-tr-sm" : "rounded-tl-sm"
                }`}
              >
                <p
                  className={`text-[15px] leading-relaxed text-text-primary ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                  dir={isArabic ? "rtl" : "ltr"}
                >
                  {review.text}
                </p>
              </div>

              <div className="mt-auto flex items-center justify-between pt-1">
                {review.product ? (
                  <span className="inline-flex items-center text-[11px] font-medium text-primary bg-primary/10 rounded-full px-2.5 py-1">
                    {review.product}
                  </span>
                ) : (
                  <span className="text-[11px] text-text-muted">
                    {t("viaInstagram")}
                  </span>
                )}
                <span className="text-[11px] text-text-secondary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {t("openOnInstagram")}
                </span>
              </div>

              <div
                className="absolute inset-0 rounded-3xl ring-1 ring-primary/0 group-hover:ring-primary/30 transition-all pointer-events-none"
                aria-hidden
              />
              <div
                className={`absolute top-3 ${isArabic ? "left-3" : "right-3"} h-2 w-2 rounded-full bg-primary/40`}
                style={{ animationDelay: `${idx * 0.2}s` }}
                aria-hidden
              />
            </motion.a>
          ))}
        </motion.div>

        <AnimatedSection className="mt-10 text-center">
          <a
            href={INSTAGRAM_HIGHLIGHT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#fa7e1e] via-[#d62976] to-[#962fbf] text-white px-5 py-2.5 text-sm font-semibold shadow-soft hover:shadow-elevated transition-shadow"
          >
            <Instagram className="h-4 w-4" />
            {t("seeAll")}
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}
