"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

interface ImageZoomModalProps {
  src: string
  alt: string
  open: boolean
  onClose: () => void
  unoptimized?: boolean
}

const MIN_SCALE = 1
const MAX_SCALE = 4
const ZOOM_STEP = 0.5

export function ImageZoomModal({ src, alt, open, onClose, unoptimized }: ImageZoomModalProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const lastPos = useRef({ x: 0, y: 0 })
  const startPos = useRef({ x: 0, y: 0 })

  const reset = useCallback(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [])

  const handleClose = useCallback(() => {
    reset()
    onClose()
  }, [reset, onClose])

  const zoomIn = useCallback(() => {
    setScale((s) => Math.min(s + ZOOM_STEP, MAX_SCALE))
  }, [])

  const zoomOut = useCallback(() => {
    setScale((s) => {
      const next = Math.max(s - ZOOM_STEP, MIN_SCALE)
      if (next === 1) setPosition({ x: 0, y: 0 })
      return next
    })
  }, [])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
    setScale((s) => {
      const next = Math.max(MIN_SCALE, Math.min(s + delta, MAX_SCALE))
      if (next === 1) setPosition({ x: 0, y: 0 })
      return next
    })
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (scale <= 1) return
    setDragging(true)
    startPos.current = { x: e.clientX, y: e.clientY }
    lastPos.current = { ...position }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [scale, position])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return
    const dx = e.clientX - startPos.current.x
    const dy = e.clientY - startPos.current.y
    setPosition({ x: lastPos.current.x + dx, y: lastPos.current.y + dy })
  }, [dragging])

  const handlePointerUp = useCallback(() => {
    setDragging(false)
  }, [])

  const handleDoubleClick = useCallback(() => {
    if (scale > 1) {
      reset()
    } else {
      setScale(2.5)
    }
  }, [scale, reset])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={handleClose}
        >
          {/* Controls */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button onClick={(e) => { e.stopPropagation(); zoomIn() }} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors">
              <ZoomIn className="h-5 w-5" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); zoomOut() }} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors">
              <ZoomOut className="h-5 w-5" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); reset() }} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors">
              <RotateCcw className="h-5 w-5" />
            </button>
            <button onClick={handleClose} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Zoom level indicator */}
          {scale > 1 && (
            <div className="absolute top-4 left-4 z-10 rounded-full bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm">
              {Math.round(scale * 100)}%
            </div>
          )}

          {/* Image */}
          <div
            className="relative h-[85vh] w-[85vw] select-none"
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onDoubleClick={handleDoubleClick}
            style={{ cursor: scale > 1 ? (dragging ? "grabbing" : "grab") : "zoom-in", touchAction: "none" }}
          >
            <div
              className="relative h-full w-full transition-transform"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transitionDuration: dragging ? "0ms" : "200ms",
              }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
                sizes="85vw"
                unoptimized={unoptimized}
                draggable={false}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
