"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Sparkles } from "lucide-react"

const heroImages = [
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=500&fit=crop",
]

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

      <div className="container-app grid lg:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <div className="flex justify-center lg:justify-start mb-6">
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

          <h1 className="font-heading text-5xl font-bold leading-tight text-text-primary md:text-7xl">
            Your Glow{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Starts Here
            </span>
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-lg text-text-secondary md:text-xl mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Discover premium K-beauty products curated for your skin. From COSRX to Laneige,
            we bring Seoul&apos;s best skincare to Amman.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
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

        {/* Hero images grid */}
        <motion.div
          className="hidden lg:grid grid-cols-2 gap-4"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="space-y-4">
            <motion.div
              className="relative h-64 rounded-2xl overflow-hidden shadow-card"
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={heroImages[0]}
                alt="Korean skincare products"
                fill
                className="object-cover"
                priority
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
            </motion.div>
            <motion.div
              className="relative h-48 rounded-2xl overflow-hidden shadow-card"
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={heroImages[2]}
                alt="Skincare routine"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
            </motion.div>
          </div>
          <motion.div
            className="relative h-full min-h-[340px] rounded-2xl overflow-hidden shadow-card mt-8"
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={heroImages[1]}
              alt="K-beauty essentials"
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
