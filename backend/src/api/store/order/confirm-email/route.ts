import { z } from "zod"
import { sendOrderConfirmationEmail } from "../../../../lib/order-email"
import { getLogger } from "../../../../lib/logger"

const OrderEmailSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  orderId: z.string().min(1),
  items: z.array(
    z.object({
      title: z.string(),
      quantity: z.number().int().positive(),
      price: z.number(),
    })
  ),
  subtotal: z.number(),
  shipping: z.number(),
  discount: z.number(),
  total: z.number(),
  address: z.string().min(1),
  city: z.string().min(1),
  promoCode: z.string().optional().default(""),
  notes: z.string().optional().default(""),
})

export async function POST(req: any, res: any): Promise<void> {
  const parsed = OrderEmailSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Invalid request",
      errors: parsed.error.flatten().fieldErrors,
    })
    return
  }

  try {
    await sendOrderConfirmationEmail(parsed.data as any)
    res.status(200).json({ success: true })
  } catch (err: any) {
    // Log but don't fail — email is non-critical
    getLogger(req).error("[OrderEmail] Send failed:", err?.message)
    res.status(200).json({ success: true, emailSent: false })
  }
}
