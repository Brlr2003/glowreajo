"use client"

import { motion } from "framer-motion"
import { Droplets, FlaskConical, Pipette, Layers, Sun, ArrowRight } from "lucide-react"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { SectionTitle } from "@/components/shared/SectionTitle"
import { stagger, fadeInUp } from "@/lib/animations"
import { useTranslations } from "next-intl"

const STEP_ICONS = [
  { icon: Droplets, key: "cleanser", color: "bg-blue-50 text-blue-500" },
  { icon: FlaskConical, key: "toner", color: "bg-purple-50 text-purple-500" },
  { icon: Pipette, key: "serum", color: "bg-pink-50 text-pink-500" },
  { icon: Layers, key: "moisturizer", color: "bg-green-50 text-green-500" },
  { icon: Sun, key: "sunscreen", color: "bg-yellow-50 text-yellow-500" },
]

export function RoutineBuilder() {
  const t = useTranslations("home")
  const tr = useTranslations("routine")

  return (
    <section className="py-20 bg-gradient-to-b from-background to-surface">
      <div className="container-app">
        <AnimatedSection>
          <SectionTitle
            title={t("routineTitle")}
            subtitle={t("routineSubtitle")}
          />
        </AnimatedSection>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2"
        >
          {STEP_ICONS.map((step: any, i: number) => (
            <motion.div key={step.key} variants={fadeInUp} className="flex items-center gap-2 w-full md:w-auto">
              <div className="flex flex-col items-center gap-3 rounded-2xl bg-surface p-6 shadow-soft w-full md:w-40">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${step.color}`}>
                  <step.icon className="h-7 w-7" />
                </div>
                <div className="text-center">
                  <p className="text-xs text-text-muted mb-1">{t("step")} {i + 1}</p>
                  <p className="font-heading font-semibold text-text-primary">{tr(step.key)}</p>
                  <p className="text-xs text-text-secondary mt-1">{tr(`${step.key}Desc`)}</p>
                </div>
              </div>
              {i < STEP_ICONS.length - 1 && (
                <ArrowRight className="h-5 w-5 text-primary hidden md:block shrink-0" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
