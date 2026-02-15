"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/962791234567"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(37, 211, 102, 0.4)",
          "0 0 0 12px rgba(37, 211, 102, 0)",
        ],
      }}
      transition={{
        boxShadow: { duration: 2, repeat: Infinity },
      }}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </motion.a>
  )
}
