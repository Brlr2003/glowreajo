"use client"

import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container-app py-20 text-center">
      <div className="flex justify-center mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-error/10">
          <AlertCircle className="h-10 w-10 text-error" />
        </div>
      </div>
      <h2 className="font-heading text-2xl font-bold text-text-primary mb-3">
        Something went wrong
      </h2>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        We&apos;re sorry, something unexpected happened. Please try again.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  )
}
