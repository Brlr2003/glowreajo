const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

export async function sendOtp(type: "sms" | "email", destination: string) {
  const res = await fetch(`${BACKEND_URL}/store/otp/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, destination }),
  })
  return res.json()
}

export async function verifyOtp(destination: string, code: string) {
  const res = await fetch(`${BACKEND_URL}/store/otp/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ destination, code }),
  })
  return res.json()
}
