import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils"

const DEFAULT_STOCK = Number(process.env.DEFAULT_STOCK_QUANTITY) || 100

export default async function setInventory({ container }: { container: any }) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const productModule = container.resolve(Modules.PRODUCT)
  const inventoryModule = container.resolve(Modules.INVENTORY)
  const stockLocationModule = container.resolve(Modules.STOCK_LOCATION)
  const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK)

  logger.info("Setting inventory levels...")

  // Get warehouse location
  const locations = await stockLocationModule.listStockLocations({ name: "GlowReaJo Warehouse" })
  if (locations.length === 0) {
    logger.error("No stock location found. Run the seed script first.")
    return
  }
  const locationId = locations[0].id

  // Get all product variants
  const products = await productModule.listProducts({}, { relations: ["variants"] })
  let created = 0
  let updated = 0

  for (const product of products) {
    for (const variant of product.variants || []) {
      // Check if variant already has an inventory item linked
      const existingLinks = await remoteLink.query({
        entity: "product_variant_inventory_item",
        fields: ["inventory_item_id"],
        filters: { variant_id: variant.id },
      })

      let inventoryItemId: string

      if (existingLinks.length > 0) {
        inventoryItemId = existingLinks[0].inventory_item_id
        updated++
      } else {
        // Create inventory item
        const inventoryItem = await inventoryModule.createInventoryItems({
          sku: variant.sku || `${product.handle}-${variant.id}`,
          title: `${product.title} - ${variant.title}`,
        })
        inventoryItemId = inventoryItem.id

        // Link inventory item to variant
        await remoteLink.create({
          [Modules.PRODUCT]: { variant_id: variant.id },
          [Modules.INVENTORY]: { inventory_item_id: inventoryItemId },
        })
        created++
      }

      // Ensure stock level exists at our location
      const existingLevels = await inventoryModule.listInventoryLevels({
        inventory_item_id: inventoryItemId,
        location_id: locationId,
      })

      if (existingLevels.length === 0) {
        await inventoryModule.createInventoryLevels({
          inventory_item_id: inventoryItemId,
          location_id: locationId,
          stocked_quantity: DEFAULT_STOCK,
        })
      } else if (existingLevels[0].stocked_quantity === 0) {
        await inventoryModule.updateInventoryLevels(existingLevels[0].id, {
          stocked_quantity: DEFAULT_STOCK,
        })
      }
    }
  }

  logger.info(`Inventory setup complete: ${created} created, ${updated} already linked`)
  logger.info(`Stock set to ${DEFAULT_STOCK} units per variant at ${locations[0].name}`)
}
