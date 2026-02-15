import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "zod"

const SendOtpSchema = z.object({
  type: z.enum(["sms", "email"]),
  destination: z.string().min(1),
})

// In-memory OTP store with TTL
const otpStore = new Map<string, { code: string; expiresAt: number }>()

// Clean expired OTPs periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of otpStore) {
    if (value.expiresAt < now) {
      otpStore.delete(key)
    }
  }
}, 60_000)

export { otpStore }

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const parsed = SendOtpSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Invalid request",
      errors: parsed.error.flatten().fieldErrors,
    })
    return
  }

  const { type, destination } = parsed.data
  const code = String(Math.floor(100000 + Math.random() * 900000))

  otpStore.set(destination, {
    code,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
  })

  // Placeholder: log OTP (replace with Twilio/SendGrid in production)
  console.log(`[OTP] ${type.toUpperCase()} to ${destination}: ${code}`)

  res.status(200).json({ success: true })
}
