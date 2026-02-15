"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MessageCircle, Instagram, Send, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { stagger, fadeInUp } from "@/lib/animations"

const contacts = [
  { icon: Phone, label: "Phone", value: "+962 79 123 4567", href: "tel:+962791234567" },
  { icon: Mail, label: "Email", value: "hello@glowreajo.com", href: "mailto:hello@glowreajo.com" },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/962791234567" },
  { icon: Instagram, label: "Instagram", value: "@glowreajo", href: "https://instagram.com/glowreajo" },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.name && form.email && form.message) {
      setSubmitted(true)
    }
  }

  return (
    <div className="container-app py-12">
      <AnimatedSection>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="font-heading text-4xl font-bold text-text-primary md:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-text-secondary">
            Have questions about a product? Need skincare advice? We&apos;re here to help!
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-bold text-text-primary">Contact Info</h2>
            <motion.div
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {contacts.map((contact) => (
                <motion.a
                  key={contact.label}
                  variants={fadeInUp}
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 rounded-2xl bg-surface p-5 shadow-soft hover:shadow-card transition-shadow"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 shrink-0">
                    <contact.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">{contact.label}</p>
                    <p className="font-medium text-text-primary">{contact.value}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="rounded-2xl bg-surface p-8 shadow-soft">
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">Send a Message</h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                <h3 className="font-heading text-lg font-semibold">Message Sent!</h3>
                <p className="text-sm text-text-muted mt-2">We&apos;ll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                <div>
                  <textarea
                    placeholder="Your message..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none resize-none focus:border-primary transition-colors"
                  />
                </div>
                <Button type="submit" className="w-full flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
