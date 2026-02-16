import {
  createProductCategoriesWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingProfilesWorkflow,
} from "@medusajs/core-flows"
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { remoteQueryObjectFromString } from "@medusajs/framework/utils"

export default async function seed({ container }: { container: any }) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  logger.info("Seeding GlowReaJo data...")

  // 1. Create Sales Channel
  logger.info("Creating sales channel...")
  const { result: salesChannels } = await createSalesChannelsWorkflow(container).run({
    input: {
      salesChannelsData: [
        {
          name: "GlowReaJo Webshop",
          description: "GlowReaJo online storefront",
          is_disabled: false,
        },
      ],
    },
  })
  const salesChannel = salesChannels[0]

  // 2. Create Shipping Profile
  logger.info("Creating shipping profile...")
  const shippingProfileModule = container.resolve(Modules.FULFILLMENT)
  let shippingProfile: any

  // Check if default profile exists
  const existingProfiles = await shippingProfileModule.listShippingProfiles()
  if (existingProfiles.length > 0) {
    shippingProfile = existingProfiles[0]
  } else {
    const { result: profiles } = await createShippingProfilesWorkflow(container).run({
      input: {
        data: [
          {
            name: "Default Shipping Profile",
            type: "default",
          },
        ],
      },
    })
    shippingProfile = profiles[0]
  }

  // 3. Create Region (Jordan)
  logger.info("Creating Jordan region...")
  const { result: regions } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "Jordan",
          currency_code: "jod",
          countries: ["jo"],
          payment_providers: ["pp_system_default"],
        },
      ],
    },
  })

  // 4. Create Product Categories
  logger.info("Creating product categories...")
  const categoryNames = [
    "Cleansers",
    "Toners",
    "Serums & Essences",
    "Moisturizers",
    "Sunscreens",
    "Masks & Treatments",
    "Sets & Bundles",
  ]

  const { result: categories } = await createProductCategoriesWorkflow(container).run({
    input: {
      product_categories: categoryNames.map((name, i) => ({
        name,
        is_active: true,
        rank: i,
      })),
    },
  })

  // 5. Create Promotions
  logger.info("Creating promotions...")
  const promotionModule = container.resolve(Modules.PROMOTION)

  await promotionModule.createPromotions([
    {
      code: "GLOW20",
      type: "standard",
      is_automatic: false,
      campaign_identifier: "GLOW20",
      application_method: {
        type: "percentage",
        value: 20,
        target_type: "order",
      },
    },
    {
      code: "WELCOME10",
      type: "standard",
      is_automatic: false,
      campaign_identifier: "WELCOME10",
      application_method: {
        type: "percentage",
        value: 10,
        target_type: "order",
      },
    },
  ])

  // 6. Create Stock Location
  logger.info("Creating stock location...")
  const stockLocationModule = container.resolve(Modules.STOCK_LOCATION)
  const stockLocation = await stockLocationModule.createStockLocations({
    name: "GlowReaJo Warehouse",
    address: {
      address_1: "Amman",
      city: "Amman",
      country_code: "jo",
    },
  })

  // 7. Create Fulfillment Set + Service Zone + Shipping Option
  logger.info("Creating fulfillment set and shipping option...")
  const fulfillmentModule = container.resolve(Modules.FULFILLMENT)

  const fulfillmentSet = await fulfillmentModule.createFulfillmentSets({
    name: "GlowReaJo Delivery",
    type: "shipping",
    service_zones: [
      {
        name: "Jordan",
        geo_zones: [{ type: "country", country_code: "jo" }],
      },
    ],
  })

  const serviceZone = fulfillmentSet.service_zones[0]

  await fulfillmentModule.createShippingOptions({
    name: "Free Delivery",
    price_type: "flat",
    service_zone_id: serviceZone.id,
    shipping_profile_id: shippingProfile.id,
    provider_id: "manual_manual",
    type: { label: "Standard", description: "Free delivery in Jordan", code: "standard" },
    rules: [],
    prices: [
      { currency_code: "jod", amount: 0 },
    ],
  })

  // 8. Link stock location to sales channel and fulfillment set
  logger.info("Linking stock location to sales channel and fulfillment...")
  const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK)

  await remoteLink.create([
    {
      [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
      [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id },
    },
    {
      [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
      [Modules.SALES_CHANNEL]: { sales_channel_id: salesChannel.id },
    },
  ])

  logger.info("Seeding complete!")
  logger.info(`Created ${categories.length} categories`)
  logger.info(`Created 2 promotions (GLOW20, WELCOME10)`)
  logger.info(`Created fulfillment set with shipping option`)
  logger.info(`Sales channel: ${salesChannel.name}`)
  logger.info(`Region: Jordan (JOD)`)
}
