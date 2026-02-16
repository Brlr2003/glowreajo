import {
  createProductCategoriesWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingProfilesWorkflow,
} from "@medusajs/core-flows"
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils"

export default async function seed({ container }: { container: any }) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  logger.info("Seeding GlowReaJo data...")

  // 1. Sales Channel (idempotent)
  logger.info("Setting up sales channel...")
  const salesChannelModule = container.resolve(Modules.SALES_CHANNEL)
  const existingSC = await salesChannelModule.listSalesChannels({ name: "GlowReaJo Webshop" })
  let salesChannel: any

  if (existingSC.length > 0) {
    salesChannel = existingSC[0]
    logger.info("Sales channel already exists, skipping")
  } else {
    const { result: salesChannels } = await createSalesChannelsWorkflow(container).run({
      input: {
        salesChannelsData: [{
          name: "GlowReaJo Webshop",
          description: "GlowReaJo online storefront",
          is_disabled: false,
        }],
      },
    })
    salesChannel = salesChannels[0]
  }

  // 2. Shipping Profile (idempotent)
  logger.info("Setting up shipping profile...")
  const fulfillmentModule = container.resolve(Modules.FULFILLMENT)
  let shippingProfile: any

  const existingProfiles = await fulfillmentModule.listShippingProfiles()
  if (existingProfiles.length > 0) {
    shippingProfile = existingProfiles[0]
    logger.info("Shipping profile already exists, skipping")
  } else {
    const { result: profiles } = await createShippingProfilesWorkflow(container).run({
      input: { data: [{ name: "Default Shipping Profile", type: "default" }] },
    })
    shippingProfile = profiles[0]
  }

  // 3. Region — Jordan (idempotent)
  logger.info("Setting up Jordan region...")
  const regionModule = container.resolve(Modules.REGION)
  const existingRegions = await regionModule.listRegions({ currency_code: "jod" })
  let region: any

  if (existingRegions.length > 0) {
    region = existingRegions[0]
    logger.info("Jordan region already exists, skipping")
  } else {
    const { result: regions } = await createRegionsWorkflow(container).run({
      input: {
        regions: [{
          name: "Jordan",
          currency_code: "jod",
          countries: ["jo"],
          payment_providers: ["pp_system_default"],
        }],
      },
    })
    region = regions[0]
  }

  // 4. Product Categories (idempotent)
  logger.info("Setting up product categories...")
  const categoryModule = container.resolve(Modules.PRODUCT)
  const existingCats = await categoryModule.listProductCategories()

  if (existingCats.length > 0) {
    logger.info(`${existingCats.length} categories already exist, skipping`)
  } else {
    const categoryNames = [
      "Cleansers", "Toners", "Serums & Essences", "Moisturizers",
      "Sunscreens", "Masks & Treatments", "Sets & Bundles",
    ]
    await createProductCategoriesWorkflow(container).run({
      input: {
        product_categories: categoryNames.map((name, i) => ({
          name, is_active: true, rank: i,
        })),
      },
    })
  }

  // 5. Promotions (idempotent)
  logger.info("Setting up promotions...")
  const promotionModule = container.resolve(Modules.PROMOTION)
  const existingPromos = await promotionModule.listPromotions({ code: ["GLOW20", "WELCOME10"] })

  if (existingPromos.length >= 2) {
    logger.info("Promotions already exist, skipping")
  } else {
    const existingCodes = existingPromos.map((p: any) => p.code)
    const promosToCreate = [
      {
        code: "GLOW20", type: "standard", is_automatic: false,
        campaign_identifier: "GLOW20",
        application_method: { type: "percentage", value: 20, target_type: "order" },
      },
      {
        code: "WELCOME10", type: "standard", is_automatic: false,
        campaign_identifier: "WELCOME10",
        application_method: { type: "percentage", value: 10, target_type: "order" },
      },
    ].filter((p) => !existingCodes.includes(p.code))

    if (promosToCreate.length > 0) {
      await promotionModule.createPromotions(promosToCreate)
    }
  }

  // 6. Stock Location (idempotent)
  logger.info("Setting up stock location...")
  const stockLocationModule = container.resolve(Modules.STOCK_LOCATION)
  const existingLocs = await stockLocationModule.listStockLocations({ name: "GlowReaJo Warehouse" })
  let stockLocation: any

  if (existingLocs.length > 0) {
    stockLocation = existingLocs[0]
    logger.info("Stock location already exists, skipping")
  } else {
    stockLocation = await stockLocationModule.createStockLocations({
      name: "GlowReaJo Warehouse",
      address: { address_1: "Amman", city: "Amman", country_code: "jo" },
    })
  }

  // 7. Fulfillment Set + Service Zone + Shipping Option (idempotent)
  logger.info("Setting up fulfillment set and shipping option...")
  const existingSets = await fulfillmentModule.listFulfillmentSets({ name: "GlowReaJo Delivery" })

  const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK)

  if (existingSets.length > 0) {
    logger.info("Fulfillment set already exists, ensuring links...")
    try {
      await remoteLink.create({
        [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
        [Modules.FULFILLMENT]: { fulfillment_set_id: existingSets[0].id },
      })
    } catch {
      logger.info("Fulfillment set link already exists")
    }
  } else {
    const fulfillmentSet = await fulfillmentModule.createFulfillmentSets({
      name: "GlowReaJo Delivery",
      type: "shipping",
      service_zones: [{
        name: "Jordan",
        geo_zones: [{ type: "country", country_code: "jo" }],
      }],
    })

    const serviceZone = fulfillmentSet.service_zones[0]

    // 8. Link stock location to fulfillment set
    logger.info("Linking stock location to fulfillment set...")
    await remoteLink.create({
      [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
      [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id },
    })

    // 9. Link fulfillment provider to stock location
    logger.info("Linking fulfillment provider to stock location...")
    await remoteLink.create({
      [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
      [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
    })

    // 10. Create shipping option
    const shippingOption = await fulfillmentModule.createShippingOptions({
      name: "Free Delivery",
      price_type: "flat",
      service_zone_id: serviceZone.id,
      shipping_profile_id: shippingProfile.id,
      provider_id: "manual_manual",
      type: { label: "Standard", description: "Free delivery in Jordan", code: "standard" },
      rules: [],
    })

    // 11. Create price set and link to shipping option
    logger.info("Setting up shipping option price...")
    const pricingModule = container.resolve(Modules.PRICING)
    const priceSet = await pricingModule.createPriceSets({
      prices: [{ amount: 0, currency_code: "jod" }],
    })
    await remoteLink.create({
      [Modules.FULFILLMENT]: { shipping_option_id: shippingOption.id },
      [Modules.PRICING]: { price_set_id: priceSet.id },
    })
  }

  logger.info("Seeding complete!")
  logger.info(`Sales channel: ${salesChannel.name}`)
  logger.info(`Region: Jordan (JOD)`)
}
