import { z } from "zod"
import { Modules } from "@medusajs/framework/utils"
import { getLogger } from "../../../../lib/logger"

const ValidatePromoSchema = z.object({
  code: z.string().min(1),
  cart_total: z.number().min(0),
})

export async function POST(req: any, res: any): Promise<void> {
  const parsed = ValidatePromoSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json({
      valid: false,
      message: "Invalid request",
    })
    return
  }

  const { code, cart_total } = parsed.data

  try {
    const promotionModule = req.scope.resolve(Modules.PROMOTION)
    const promotions = await promotionModule.listPromotions(
      { code: code.toUpperCase(), is_automatic: false },
      { relations: ["rules", "application_method"] }
    )

    const promo = promotions.find((p: any) => {
      if (p.status && p.status !== "active") return false
      if (p.starts_at && new Date(p.starts_at) > new Date()) return false
      if (p.ends_at && new Date(p.ends_at) < new Date()) return false
      return true
    })

    if (!promo) {
      res.status(200).json({
        valid: false,
        message: "Invalid or expired promo code",
      })
      return
    }

    // Calculate discount from application_method
    const method = promo.application_method
    let discount = 0
    let type = "percentage"
    let value = 0

    if (method) {
      type = method.type || "percentage"
      value = Number(method.value) || 0

      if (type === "percentage") {
        discount = Math.round(cart_total * (value / 100) * 100) / 100
      } else {
        discount = Math.min(value, cart_total)
      }
    }

    res.status(200).json({
      valid: true,
      discount,
      type,
      value,
      message: type === "percentage" ? `${value}% off applied!` : `${value} JOD off applied!`,
    })
  } catch (err: any) {
    getLogger(req).error("[Promo] Validation error:", err?.message)
    res.status(500).json({
      valid: false,
      message: "Failed to validate promo code",
    })
  }
}
