"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/context/ToastContext"
import { CheckCircle, XCircle, Info, X } from "lucide-react"

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
}

const colors = {
  success: "text-success",
  error: "text-error",
  info: "text-primary",
}

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type]
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              className="flex items-center gap-3 rounded-xl bg-surface p-4 shadow-elevated min-w-[300px] max-w-[400px]"
            >
              {toast.image && (
                <img src={toast.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
              )}
              <Icon className={`h-5 w-5 shrink-0 ${colors[toast.type]}`} />
              <p className="flex-1 text-sm text-text-primary">{toast.message}</p>
              <button onClick={() => removeToast(toast.id)} className="text-text-muted hover:text-text-primary">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
