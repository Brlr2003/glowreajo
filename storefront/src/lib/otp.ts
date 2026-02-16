const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
const API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

const headers: Record<string, string> = {
  "Content-Type": "application/json",
  "x-publishable-api-key": API_KEY,
}

export async function sendOtp(destination: string) {
  const res = await fetch(`${BACKEND_URL}/store/otp/send`, {
    method: "POST",
    headers,
    body: JSON.stringify({ type: "email", destination }),
  })
  const data = await res.json()
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to send verification code")
  }
  return data
}

export async function verifyOtp(destination: string, code: string) {
  const res = await fetch(`${BACKEND_URL}/store/otp/verify`, {
    method: "POST",
    headers,
    body: JSON.stringify({ destination, code }),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || "Verification failed")
  }
  return data
}
