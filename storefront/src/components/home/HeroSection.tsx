"use client"

import { motion } from "framer-motion"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/Button"
import { Sparkles, Star, Truck, ShieldCheck } from "lucide-react"

export function HeroSection() {
  const t = useTranslations("hero")

  const trustBadges = [
    { icon: Star, label: t("authentic") },
    { icon: Truck, label: t("fastDelivery") },
    { icon: ShieldCheck, label: t("trustedBrands") },
  ]
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden -mt-20 pb-16">
      {/* Vibrant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdf2f8] via-[#fce7f3] to-[#e0e7ff]" />

      {/* Animated floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -end-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -start-32 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-accent/30 to-primary/20 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 start-1/2 h-[300px] w-[300px] rounded-full bg-gradient-to-bl from-secondary/20 to-accent/15 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Decorative floating product shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-32 end-[15%] h-20 w-20 rounded-2xl bg-white/60 backdrop-blur-sm shadow-lg border border-white/80 rotate-12"
          animate={{ y: [0, -15, 0], rotate: [12, 6, 12] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 end-[25%] h-16 w-16 rounded-full bg-white/50 backdrop-blur-sm shadow-lg border border-white/80"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-48 start-[12%] h-14 w-14 rounded-xl bg-white/40 backdrop-blur-sm shadow-lg border border-white/80 -rotate-6"
          animate={{ y: [0, -10, 0], rotate: [-6, -12, -6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-52 start-[18%] h-10 w-10 rounded-lg bg-primary/20 backdrop-blur-sm shadow-md border border-primary/30"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Content */}
      <div className="container-app relative z-10 text-center pt-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl"
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-primary shadow-sm border border-primary/20 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Sparkles className="h-4 w-4" />
            <span>{t("badge")}</span>
          </motion.div>

          <h1 className="font-heading text-5xl font-extrabold leading-[1.08] text-text-primary md:text-7xl lg:text-[5.5rem]">
            {t("title")}
          </h1>

          <motion.p
            className="mx-auto mt-7 max-w-xl text-lg text-text-secondary md:text-xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/shop">
              <Button size="lg" className="text-base px-10 py-4 shadow-lg shadow-primary/25">
                {t("shopCollection")}
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="text-base px-10 py-4 bg-white/60 backdrop-blur-sm">
                {t("ourStory")}
              </Button>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2.5 text-text-secondary">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow-sm">
                  <badge.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
