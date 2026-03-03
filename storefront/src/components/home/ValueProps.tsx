"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Banknote, Truck, MessageCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { stagger, fadeInUp } from "@/lib/animations"

const ICONS = [ShieldCheck, Banknote, Truck, MessageCircle]
const KEYS = ["authentic", "cod", "delivery", "support"] as const

export function ValueProps() {
  const t = useTranslations("valueProps")

  return (
    <section className="py-20">
      <div className="container-app">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {KEYS.map((key, i) => {
            const Icon = ICONS[i]
            return (
              <motion.div
                key={key}
                variants={fadeInUp}
                className="flex flex-col items-center rounded-2xl bg-surface p-8 text-center shadow-soft"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-text-primary">{t(key)}</h3>
                <p className="mt-2 text-sm text-text-secondary">{t(`${key}Desc`)}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
