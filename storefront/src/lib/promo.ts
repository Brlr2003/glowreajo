const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
const API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

const headers: Record<string, string> = {
  "Content-Type": "application/json",
  "x-publishable-api-key": API_KEY,
}

export interface PromoResult {
  valid: boolean
  discount?: number
  type?: string
  value?: number
  message?: string
}

export async function validatePromoCode(code: string, cartTotal: number): Promise<PromoResult> {
  const res = await fetch(`${BACKEND_URL}/store/promo/validate`, {
    method: "POST",
    headers,
    body: JSON.stringify({ code, cart_total: cartTotal }),
  })
  return res.json()
}
