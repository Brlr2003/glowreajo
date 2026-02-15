"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shield, Mail, Phone } from "lucide-react"
import { OtpInput } from "@/components/ui/OtpInput"
import { Button } from "@/components/ui/Button"
import { sendOtp, verifyOtp } from "@/lib/otp"

interface OtpVerificationStepProps {
  phone: string
  email: string
  onVerified: () => void
  onBack: () => void
}

export function OtpVerificationStep({ phone, email, onVerified, onBack }: OtpVerificationStepProps) {
  const [method, setMethod] = useState<"sms" | "email">("sms")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const [timer, setTimer] = useState(0)
  const [loading, setLoading] = useState(false)

  const destination = method === "sms" ? phone : email

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const handleSend = async () => {
    setLoading(true)
    setError("")
    try {
      await sendOtp(method, destination)
      setSent(true)
      setTimer(60)
    } catch {
      setError("Failed to send verification code")
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (code: string) => {
    setLoading(true)
    setError("")
    try {
      const result = await verifyOtp(destination, code)
      if (result.verified) {
        onVerified()
      } else {
        setError(result.message || "Invalid code")
      }
    } catch {
      setError("Verification failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Shield className="h-7 w-7 text-primary" />
          </div>
        </div>
        <h2 className="font-heading text-xl font-bold">Verify Your Identity</h2>
        <p className="text-sm text-text-secondary mt-2">
          We&apos;ll send a 6-digit code to confirm your order
        </p>
      </div>

      {!sent ? (
        <div className="space-y-4">
          <p className="text-sm font-medium text-text-primary text-center">Choose verification method:</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setMethod("sms")}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 border transition-colors ${
                method === "sms"
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border text-text-secondary hover:border-primary/50"
              }`}
            >
              <Phone className="h-4 w-4" />
              SMS
            </button>
            <button
              onClick={() => setMethod("email")}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 border transition-colors ${
                method === "email"
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border text-text-secondary hover:border-primary/50"
              }`}
            >
              <Mail className="h-4 w-4" />
              Email
            </button>
          </div>
          <p className="text-xs text-text-muted text-center">
            Code will be sent to: {destination}
          </p>
          <div className="flex justify-center">
            <Button onClick={handleSend} disabled={loading}>
              {loading ? "Sending..." : "Send Code"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-sm text-text-secondary text-center">
            Enter the 6-digit code sent to <strong>{destination}</strong>
          </p>

          <OtpInput onComplete={handleVerify} error={error} />

          <div className="text-center">
            {timer > 0 ? (
              <p className="text-sm text-text-muted">Resend in {timer}s</p>
            ) : (
              <button
                onClick={handleSend}
                disabled={loading}
                className="text-sm text-primary hover:underline"
              >
                Resend Code
              </button>
            )}
          </div>
        </div>
      )}

      {error && !sent && <p className="text-center text-sm text-error">{error}</p>}

      <div className="flex justify-center pt-4">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  )
}
