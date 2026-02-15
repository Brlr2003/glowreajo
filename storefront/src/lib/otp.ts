const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
const API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

const headers: Record<string, string> = {
  "Content-Type": "application/json",
  "x-publishable-api-key": API_KEY,
}

export async function sendOtp(type: "sms" | "email", destination: string) {
  const res = await fetch(`${BACKEND_URL}/store/otp/send`, {
    method: "POST",
    headers,
    body: JSON.stringify({ type, destination }),
  })
  return res.json()
}

export async function verifyOtp(destination: string, code: string) {
  const res = await fetch(`${BACKEND_URL}/store/otp/verify`, {
    method: "POST",
    headers,
    body: JSON.stringify({ destination, code }),
  })
  return res.json()
}
