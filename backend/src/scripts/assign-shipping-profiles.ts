import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils"

export default async function assignShippingProfiles({ container }: { container: any }) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  logger.info("Assigning default shipping profile to all products...")

  const fulfillmentModule = container.resolve(Modules.FULFILLMENT)
  const productModule = container.resolve(Modules.PRODUCT)
  const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK)

  // Get the default shipping profile
  const profiles = await fulfillmentModule.listShippingProfiles()
  if (profiles.length === 0) {
    logger.error("No shipping profiles found. Run seed first.")
    return
  }
  const defaultProfile = profiles[0]
  logger.info(`Using shipping profile: ${defaultProfile.name} (${defaultProfile.id})`)

  // Get all products
  const [products] = await productModule.listAndCountProducts({}, { take: 1000 })
  logger.info(`Found ${products.length} products`)

  let updated = 0
  let skipped = 0

  for (const product of products) {
    try {
      await remoteLink.create({
        [Modules.PRODUCT]: { product_id: product.id },
        [Modules.FULFILLMENT]: { shipping_profile_id: defaultProfile.id },
      })
      updated++
      logger.info(`Assigned shipping profile to: ${product.title}`)
    } catch (err: any) {
      if (err?.message?.includes("already exists") || err?.message?.includes("unique")) {
        skipped++
        logger.info(`Already linked: ${product.title}`)
      } else {
        logger.warn(`Failed for ${product.title}: ${err?.message}`)
      }
    }
  }

  logger.info(`Done! Updated: ${updated}, Already linked: ${skipped}`)
}
