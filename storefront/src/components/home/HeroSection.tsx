"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Gradient blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-secondary/20 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="container-app text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Authentic Korean Skincare in Jordan</span>
            </motion.div>
          </div>

          <h1 className="font-heading text-5xl font-bold leading-tight text-text-primary md:text-7xl lg:text-8xl">
            Your Glow{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Starts Here
            </span>
          </h1>

          <motion.p
            className="mx-auto mt-6 max-w-xl text-lg text-text-secondary md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Discover premium K-beauty products curated for your skin. From COSRX to Laneige,
            we bring Seoul&apos;s best skincare to Amman.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/shop">
              <Button size="lg">Shop Now</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
