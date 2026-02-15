import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "zod"
import { otpStore } from "../send/route"

const VerifyOtpSchema = z.object({
  destination: z.string().min(1),
  code: z.string().length(6),
})

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const parsed = VerifyOtpSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json({
      verified: false,
      message: "Invalid request",
      errors: parsed.error.flatten().fieldErrors,
    })
    return
  }

  const { destination, code } = parsed.data
  const stored = otpStore.get(destination)

  if (!stored) {
    res.status(400).json({
      verified: false,
      message: "Invalid or expired code",
    })
    return
  }

  if (stored.expiresAt < Date.now()) {
    otpStore.delete(destination)
    res.status(400).json({
      verified: false,
      message: "Invalid or expired code",
    })
    return
  }

  if (stored.code !== code) {
    res.status(400).json({
      verified: false,
      message: "Invalid or expired code",
    })
    return
  }

  otpStore.delete(destination)
  res.status(200).json({ verified: true })
}
