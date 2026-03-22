import type { SubscriberConfig } from "@medusajs/framework"
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils"

export default async function productCreatedHandler({
  event,
  container,
}: any) {
  const logger = container.resolve("logger")
  const productId = event.data?.id

  if (!productId) {
    logger.warn("[ProductCreated] No product ID in event")
    return
  }

  try {
    const fulfillmentModule = container.resolve(Modules.FULFILLMENT)
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK)

    const profiles = await fulfillmentModule.listShippingProfiles()
    if (profiles.length === 0) {
      logger.warn("[ProductCreated] No shipping profiles found")
      return
    }

    const defaultProfile = profiles[0]

    await remoteLink.create({
      [Modules.PRODUCT]: { product_id: productId },
      [Modules.FULFILLMENT]: { shipping_profile_id: defaultProfile.id },
    })

    logger.info(`[ProductCreated] Assigned shipping profile "${defaultProfile.name}" to product ${productId}`)
  } catch (err: any) {
    if (err?.message?.includes("already exists") || err?.message?.includes("unique")) {
      logger.info(`[ProductCreated] Product ${productId} already has a shipping profile`)
    } else {
      logger.error(`[ProductCreated] Failed to assign shipping profile: ${err?.message}`)
    }
  }
}

export const config: SubscriberConfig = {
  event: "product.created",
}
