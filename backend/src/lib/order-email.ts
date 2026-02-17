import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "info@glowreajo.com"

interface OrderItem {
  title: string
  quantity: number
  price: number
}

interface OrderEmailData {
  email: string
  name: string
  orderId: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  address: string
  city: string
  promoCode?: string
}

function formatJOD(amount: number): string {
  return `${amount.toFixed(2)} JOD`
}

function buildItemRows(items: OrderItem[]): string {
  return items
    .map(
      (item: OrderItem) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f0ebe8; color: #333; font-size: 14px;">
          ${item.title}
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #f0ebe8; color: #666; font-size: 14px; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #f0ebe8; color: #333; font-size: 14px; text-align: right;">
          ${formatJOD(item.price * item.quantity)}
        </td>
      </tr>`
    )
    .join("")
}

function buildDiscountRow(discount: number, promoCode?: string): string {
  if (discount <= 0) return ""
  const label = promoCode ? `Discount (${promoCode})` : "Discount"
  return `
    <tr>
      <td style="padding: 6px 0; color: #e8998d; font-size: 14px;">${label}</td>
      <td style="padding: 6px 0; color: #e8998d; font-size: 14px; text-align: right;">-${formatJOD(discount)}</td>
    </tr>`
}

export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #e8998d; font-size: 24px; margin: 0;">GlowReaJo</h1>
        <p style="color: #888; font-size: 14px; margin-top: 4px;">Your K-Beauty Destination</p>
      </div>

      <div style="background: #faf7f5; border-radius: 16px; padding: 32px;">
        <h2 style="color: #333; font-size: 20px; margin: 0 0 4px; text-align: center;">Order Confirmed!</h2>
        <p style="color: #888; font-size: 14px; text-align: center; margin: 0 0 24px;">
          Order #${data.orderId}
        </p>

        <p style="color: #333; font-size: 15px; margin: 0 0 20px;">
          Hi ${data.name}, thank you for your order! Here's a summary:
        </p>

        <!-- Items table -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr>
              <th style="padding: 8px 0; border-bottom: 2px solid #e8998d; color: #666; font-size: 12px; text-transform: uppercase; text-align: left;">Item</th>
              <th style="padding: 8px 0; border-bottom: 2px solid #e8998d; color: #666; font-size: 12px; text-transform: uppercase; text-align: center;">Qty</th>
              <th style="padding: 8px 0; border-bottom: 2px solid #e8998d; color: #666; font-size: 12px; text-transform: uppercase; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${buildItemRows(data.items)}
          </tbody>
        </table>

        <!-- Price breakdown -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 6px 0; color: #666; font-size: 14px;">Subtotal</td>
            <td style="padding: 6px 0; color: #333; font-size: 14px; text-align: right;">${formatJOD(data.subtotal)}</td>
          </tr>
          ${buildDiscountRow(data.discount, data.promoCode)}
          <tr>
            <td style="padding: 6px 0; color: #666; font-size: 14px;">Shipping</td>
            <td style="padding: 6px 0; color: #333; font-size: 14px; text-align: right;">${data.shipping > 0 ? formatJOD(data.shipping) : "Free"}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0 0; color: #333; font-size: 16px; font-weight: bold; border-top: 2px solid #e8998d;">Total</td>
            <td style="padding: 12px 0 0; color: #e8998d; font-size: 16px; font-weight: bold; text-align: right; border-top: 2px solid #e8998d;">${formatJOD(data.total)}</td>
          </tr>
        </table>

        <!-- Delivery address -->
        <div style="background: #fff; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
          <p style="color: #666; font-size: 12px; text-transform: uppercase; margin: 0 0 8px;">Delivery Address</p>
          <p style="color: #333; font-size: 14px; margin: 0;">${data.address}, ${data.city}</p>
        </div>

        <!-- COD note -->
        <div style="background: #fff3e8; border-radius: 12px; padding: 16px; text-align: center;">
          <p style="color: #b07a4f; font-size: 14px; margin: 0;">
            💵 Payment upon delivery (Cash on Delivery)
          </p>
        </div>
      </div>

      <p style="color: #aaa; font-size: 12px; text-align: center; margin-top: 24px;">
        Questions? Reach us at info@glowreajo.com
      </p>
    </div>
  `

  const { error } = await resend.emails.send({
    from: `GlowReaJo <${FROM_EMAIL}>`,
    to: data.email,
    subject: `Order Confirmed — #${data.orderId} 🎉`,
    html,
  })

  if (error) {
    throw new Error(`Failed to send order confirmation email: ${error.message}`)
  }
}
