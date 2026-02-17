import type { SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import { sendShipmentNotificationEmail } from "../lib/order-email"

export default async function fulfillmentCreatedHandler({
  event,
  container,
}: any) {
  const logger = container.resolve("logger")
  const fulfillmentId = event.data?.id

  if (!fulfillmentId) {
    logger.warn("[FulfillmentSubscriber] No fulfillment ID in event")
    return
  }

  try {
    const orderModule = container.resolve(Modules.ORDER)
    const query = container.resolve("query")

    // Retrieve the fulfillment to get the order ID
    const { data: fulfillments } = await query.graph({
      entity: "fulfillment",
      fields: ["id", "order.id", "order.display_id", "order.email", "order.shipping_address.*"],
      filters: { id: fulfillmentId },
    })

    const fulfillment = fulfillments?.[0]
    if (!fulfillment?.order) {
      logger.warn("[FulfillmentSubscriber] Could not find order for fulfillment", fulfillmentId)
      return
    }

    const order = fulfillment.order
    const name = order.shipping_address
      ? `${order.shipping_address.first_name || ""} ${order.shipping_address.last_name || ""}`.trim()
      : "Customer"

    await sendShipmentNotificationEmail({
      email: order.email,
      name: name || "Customer",
      orderId: order.display_id?.toString() || order.id,
    })

    logger.info(`[FulfillmentSubscriber] Shipment email sent for order #${order.display_id}`)
  } catch (err: any) {
    logger.error(`[FulfillmentSubscriber] Failed to send shipment email: ${err?.message}`)
  }
}

export const config: SubscriberConfig = {
  event: "order.fulfillment_created",
}
