import { z } from "zod"
import { sendOtpEmail } from "../../../../lib/resend"

const SendOtpSchema = z.object({
  type: z.literal("email"),
  destination: z.string().email(),
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

export async function POST(req: any, res: any): Promise<void> {
  const parsed = SendOtpSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Invalid request. Provide a valid email address.",
      errors: parsed.error.flatten().fieldErrors,
    })
    return
  }

  const { destination } = parsed.data
  const code = String(Math.floor(100000 + Math.random() * 900000))

  otpStore.set(destination, {
    code,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
  })

  try {
    await sendOtpEmail(destination, code)
    res.status(200).json({ success: true })
  } catch (err: any) {
    // Cleanup OTP on send failure
    otpStore.delete(destination)
    console.error("[OTP] Email send failed:", err?.message)
    res.status(500).json({
      success: false,
      message: "Failed to send verification email. Please try again.",
    })
  }
}
