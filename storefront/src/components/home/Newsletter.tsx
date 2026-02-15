"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Gift, Mail, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { AnimatedSection } from "@/components/ui/AnimatedSection"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section className="py-20">
      <div className="container-app">
        <AnimatedSection>
          <div className="rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-10 md:p-16 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20">
                <Gift className="h-7 w-7 text-primary" />
              </div>
            </div>
            <h2 className="font-heading text-3xl font-bold text-text-primary md:text-4xl">
              Get 10% Off Your First Order
            </h2>
            <p className="mt-3 text-text-secondary max-w-md mx-auto">
              Subscribe to our newsletter for exclusive deals, skincare tips, and new arrivals.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 flex items-center justify-center gap-2 text-success"
              >
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Thank you! Check your inbox for your code.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-full border border-border bg-surface py-3 pl-12 pr-4 outline-none focus:border-primary transition-colors"
                  />
                </div>
                <Button type="submit">Subscribe</Button>
              </form>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
