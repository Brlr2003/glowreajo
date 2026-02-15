export function validatePhone(phone: string): boolean {
  // Jordanian phone: +962 7X XXX XXXX
  const jordanRegex = /^\+962\s?7[789]\d{7}$/
  // International format
  const intlRegex = /^\+\d{10,15}$/
  const cleaned = phone.replace(/[\s-()]/g, "")
  return jordanRegex.test(cleaned) || intlRegex.test(cleaned)
}

export function formatPhoneForSubmission(phone: string): string {
  const cleaned = phone.replace(/[\s-()]/g, "")
  if (cleaned.startsWith("07")) {
    return "+962" + cleaned.slice(1)
  }
  if (!cleaned.startsWith("+")) {
    return "+962" + cleaned
  }
  return cleaned
}
