const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
const API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

interface MedusaFetchOptions {
  revalidate?: number
}

export async function medusaFetch<T = any>(
  path: string,
  options: MedusaFetchOptions = {}
): Promise<T> {
  const { revalidate = 300 } = options
  const res = await fetch(`${BACKEND_URL}${path}`, {
    headers: {
      "x-publishable-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    next: { revalidate },
  })

  if (!res.ok) {
    throw new Error(`Medusa API error: ${res.status} ${res.statusText}`)
  }

  return res.json()
}
