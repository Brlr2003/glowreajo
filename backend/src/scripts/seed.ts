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

  logger.info("Seeding complete!")
  logger.info(`Created ${categories.length} categories`)
  logger.info(`Created 2 promotions (GLOW20, WELCOME10)`)
  logger.info(`Sales channel: ${salesChannel.name}`)
  logger.info(`Region: Jordan (JOD)`)
}
