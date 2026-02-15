"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Banknote, Truck, MessageCircle } from "lucide-react"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { stagger, fadeInUp } from "@/lib/animations"

const props = [
  {
    icon: ShieldCheck,
    title: "100% Authentic",
    description: "All products are sourced directly from Korean brands",
  },
  {
    icon: Banknote,
    title: "Cash on Delivery",
    description: "Pay when your order arrives at your doorstep",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Free shipping on all orders within Amman",
  },
  {
    icon: MessageCircle,
    title: "Expert Support",
    description: "Skincare advice via WhatsApp anytime",
  },
]

export function ValueProps() {
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
          {props.map((prop) => (
            <motion.div
              key={prop.title}
              variants={fadeInUp}
              className="flex flex-col items-center rounded-2xl bg-surface p-8 text-center shadow-soft"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <prop.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-text-primary">{prop.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{prop.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
