"use client"

import { useState, useEffect } from "react"
import { Shield, Mail } from "lucide-react"
import { useTranslations } from "next-intl"
import { OtpInput } from "@/components/ui/OtpInput"
import { Button } from "@/components/ui/Button"
import { sendOtp, verifyOtp } from "@/lib/otp"

interface OtpVerificationStepProps {
  email: string
  onVerified: () => void
  onBack: () => void
}

export function OtpVerificationStep({ email, onVerified, onBack }: OtpVerificationStepProps) {
  const t = useTranslations("otp")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const [timer, setTimer] = useState(0)
  const [loading, setLoading] = useState(false)

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
      await sendOtp(email)
      setSent(true)
      setTimer(60)
    } catch (err: any) {
      setError(err.message || t("sendFailed"))
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (code: string) => {
    setLoading(true)
    setError("")
    try {
      const result = await verifyOtp(email, code)
      if (result.verified) {
        onVerified()
      } else {
        setError(result.message || t("invalidCode"))
      }
    } catch {
      setError(t("verifyFailed"))
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
        <h2 className="font-heading text-xl font-bold">{t("title")}</h2>
        <p className="text-sm text-text-secondary mt-2">
          {t("subtitle")}
        </p>
      </div>

      {!sent ? (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-text-secondary">
            <Mail className="h-4 w-4 text-primary" />
            <span>{t("sentTo")} <strong>{email}</strong></span>
          </div>
          <div className="flex justify-center">
            <Button onClick={handleSend} disabled={loading}>
              {loading ? t("sending") : t("sendCode")}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-sm text-text-secondary text-center">
            {t("enterCode")} <strong>{email}</strong>
          </p>

          <OtpInput onComplete={handleVerify} error={error} />

          <div className="text-center">
            {timer > 0 ? (
              <p className="text-sm text-text-muted">{t("resendTimer", { seconds: timer })}</p>
            ) : (
              <button
                onClick={handleSend}
                disabled={loading}
                className="text-sm text-primary hover:underline"
              >
                {t("resendCode")}
              </button>
            )}
          </div>
        </div>
      )}

      {error && !sent && <p className="text-center text-sm text-error">{error}</p>}

      <div className="flex justify-center pt-4">
        <Button variant="ghost" onClick={onBack}>
          {t("back")}
        </Button>
      </div>
    </div>
  )
}
