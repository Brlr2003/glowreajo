import {
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingProfilesWorkflow,
  linkProductsToSalesChannelWorkflow,
  createPromotionsWorkflow,
} from "@medusajs/core-flows"
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils"

export default async function seed({ container }: { container: any }) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

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

  const categoryMap = Object.fromEntries(categories.map((c: any) => [c.name, c.id]))

  // 5. Create Products
  logger.info("Creating products...")
  const productsData = [
    {
      title: "COSRX Low pH Good Morning Gel Cleanser",
      handle: "cosrx-low-ph-cleanser",
      description:
        "A mildly acidic gel cleanser with BHA that gently removes impurities while maintaining the skin's natural pH balance. Formulated with tea tree oil to soothe and refresh the skin every morning.",
      status: "published" as const,
      categories: [{ id: categoryMap["Cleansers"] }],
      metadata: {
        brand: "COSRX",
        skin_type: "All Skin Types",
        concerns: "Acne, Oily Skin, Pores",
        how_to_use: "Apply a small amount onto wet hands and lather. Gently massage onto face in circular motions. Rinse thoroughly with lukewarm water.",
        ingredients: "Water, Cocamidopropyl Betaine, Sodium Lauroyl Methyl Isethionate, Polysorbate 20, Styrax Japonicus Branch/Fruit/Leaf Extract, Butylene Glycol, Saccharomyces Ferment, Cryptomeria Japonica Leaf Extract, Nelumbo Nucifera Leaf Extract, Pinus Palustris Leaf Extract, Ulmus Davidiana Root Extract, Oenothera Biennis (Evening Primrose) Flower Extract, Pueraria Lobata Root Extract",
      },
      shipping_profile_id: shippingProfile.id,
      options: [{ title: "Size", values: ["150ml"] }],
      variants: [
        {
          title: "150ml",
          sku: "COSRX-GEL-150",
          options: { Size: "150ml" },
          manage_inventory: false,
          prices: [{ amount: 8.5, currency_code: "jod" }],
        },
      ],
    },
    {
      title: "Some By Mi AHA BHA PHA 30 Days Miracle Toner",
      handle: "some-by-mi-miracle-toner",
      description:
        "A gentle exfoliating toner featuring AHA, BHA, and PHA to remove dead skin cells, unclog pores, and improve skin texture in just 30 days. Infused with tea tree extract for clearer, healthier skin.",
      status: "published" as const,
      categories: [{ id: categoryMap["Toners"] }],
      metadata: {
        brand: "Some By Mi",
        skin_type: "Oily, Combination",
        concerns: "Acne, Texture, Pores",
        how_to_use: "After cleansing, apply an appropriate amount onto a cotton pad and gently wipe across the face. Pat gently for absorption.",
        ingredients: "Water, Butylene Glycol, Dipropylene Glycol, Glycerin, Niacinamide, Melaleuca Alternifolia (Tea Tree) Leaf Water, Polyglyceryl-4 Caprate, Carica Papaya (Papaya) Fruit Extract, Lens Esculenta (Lentil) Seed Extract, Hamamelis Virginiana (Witch Hazel) Extract",
      },
      shipping_profile_id: shippingProfile.id,
      options: [{ title: "Size", values: ["150ml"] }],
      variants: [
        {
          title: "150ml",
          sku: "SBM-TONER-150",
          options: { Size: "150ml" },
          manage_inventory: false,
          prices: [{ amount: 12.0, currency_code: "jod" }],
        },
      ],
    },
    {
      title: "Beauty of Joseon Glow Serum: Propolis + Niacinamide",
      handle: "beauty-of-joseon-glow-serum",
      description:
        "A lightweight serum combining propolis extract and niacinamide to brighten skin tone, reduce blemishes, and deliver a healthy glow. The honey-like texture absorbs quickly without stickiness.",
      status: "published" as const,
      categories: [{ id: categoryMap["Serums & Essences"] }],
      metadata: {
        brand: "Beauty of Joseon",
        skin_type: "All Skin Types",
        concerns: "Dullness, Hyperpigmentation, Uneven Tone",
        how_to_use: "After toner, dispense 2-3 drops onto fingertips and gently press into the skin. Follow with moisturizer.",
        ingredients: "Propolis Extract (60%), Niacinamide (2%), Glycerin, Butylene Glycol, 1,2-Hexanediol, Water, Sodium Hyaluronate, Cassia Obtusifolia Seed Extract, Panthenol",
      },
      shipping_profile_id: shippingProfile.id,
      options: [{ title: "Size", values: ["30ml"] }],
      variants: [
        {
          title: "30ml",
          sku: "BOJ-GLOW-30",
          options: { Size: "30ml" },
          manage_inventory: false,
          prices: [{ amount: 14.0, currency_code: "jod" }],
        },
      ],
    },
    {
      title: "Laneige Water Sleeping Mask",
      handle: "laneige-water-sleeping-mask",
      description:
        "An overnight mask that deeply hydrates and revitalizes tired, dull skin while you sleep. Formulated with SLEEP-TOX™ purifying technology and hydro ionized mineral water for a refreshed complexion.",
      status: "published" as const,
      categories: [{ id: categoryMap["Masks & Treatments"] }],
      metadata: {
        brand: "Laneige",
        skin_type: "All Skin Types",
        concerns: "Dryness, Dullness, Dehydration",
        how_to_use: "As the last step in your nighttime routine, apply an even layer across the face. Leave on overnight and rinse off in the morning.",
        ingredients: "Water, Butylene Glycol, Cyclopentasiloxane, Glycerin, Cyclohexasiloxane, Trehalose, Sodium Hyaluronate, Oenothera Biennis (Evening Primrose) Root Extract, Prunus Armeniaca (Apricot) Fruit Extract",
      },
      shipping_profile_id: shippingProfile.id,
      options: [{ title: "Size", values: ["70ml"] }],
      variants: [
        {
          title: "70ml",
          sku: "LAN-SLEEP-70",
          options: { Size: "70ml" },
          manage_inventory: false,
          prices: [{ amount: 22.0, currency_code: "jod" }],
        },
      ],
    },
    {
      title: "Innisfree Daily UV Defense Sunscreen SPF36",
      handle: "innisfree-daily-uv-defense",
      description:
        "A lightweight, non-greasy daily sunscreen that provides reliable UV protection. Enriched with sunflower oil and green tea extract for antioxidant benefits.",
      status: "published" as const,
      categories: [{ id: categoryMap["Sunscreens"] }],
      metadata: {
        brand: "Innisfree",
        skin_type: "All Skin Types",
        concerns: "Sun Protection, Anti-aging",
        how_to_use: "Apply generously to face and neck as the last step of your morning skincare routine. Reapply every 2 hours when outdoors.",
        ingredients: "Water, Homosalate, Ethylhexyl Salicylate, Butyl Methoxydibenzoylmethane, Octocrylene, Glycerin, Camellia Sinensis Leaf Extract, Helianthus Annuus (Sunflower) Seed Oil",
      },
      shipping_profile_id: shippingProfile.id,
      options: [{ title: "Size", values: ["50ml"] }],
      variants: [
        {
          title: "50ml",
          sku: "INN-UV-50",
          options: { Size: "50ml" },
          manage_inventory: false,
          prices: [{ amount: 15.0, currency_code: "jod" }],
        },
      ],
    },
    {
      title: "COSRX Advanced Snail 96 Mucin Power Essence",
      handle: "cosrx-snail-96-essence",
      description:
        "A lightweight essence formulated with 96% snail secretion filtrate to repair and hydrate damaged skin. Helps reduce fine lines, acne scars, and dullness for a smoother complexion.",
      status: "published" as const,
      categories: [{ id: categoryMap["Serums & Essences"] }],
      metadata: {
        brand: "COSRX",
        skin_type: "All Skin Types",
        concerns: "Dryness, Aging, Scarring",
        how_to_use: "After cleansing and toning, apply a small amount to the face using gentle patting motions. Use morning and night.",
        ingredients: "Snail Secretion Filtrate (96%), Betaine, Butylene Glycol, 1,2-Hexanediol, Sodium Hyaluronate, Panthenol, Arginine, Allantoin, Ethyl Hexanediol, Sodium Polyacrylate, Carbomer",
      },
      shipping_profile_id: shippingProfile.id,
      options: [{ title: "Size", values: ["100ml"] }],
      variants: [
        {
          title: "100ml",
          sku: "COSRX-SNAIL-100",
          options: { Size: "100ml" },
          manage_inventory: false,
          prices: [{ amount: 16.0, currency_code: "jod" }],
        },
      ],
    },
    {
      title: "Beauty of Joseon Relief Sun: Rice + Probiotics SPF50+",
      handle: "beauty-of-joseon-relief-sun",
      description:
        "An organic sunscreen with SPF50+ PA++++ featuring rice bran extract and probiotics. Lightweight, no white cast, and doubles as a moisturizing primer.",
      status: "published" as const,
      categories: [{ id: categoryMap["Sunscreens"] }],
      metadata: {
        brand: "Beauty of Joseon",
        skin_type: "All Skin Types",
        concerns: "Sun Protection, Hydration",
        how_to_use: "Apply evenly as the final step of your skincare routine. Reapply throughout the day as needed.",
        ingredients: "Oryza Sativa (Rice) Bran Extract, Dibutyl Adipate, Propanediol, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Polymethylsilsesquioxane, Lactobacillus/Rice Ferment Filtrate",
      },
      shipping_profile_id: shippingProfile.id,
      options: [{ title: "Size", values: ["50ml"] }],
      variants: [
        {
          title: "50ml",
          sku: "BOJ-SUN-50",
          options: { Size: "50ml" },
          manage_inventory: false,
          prices: [{ amount: 13.0, currency_code: "jod" }],
        },
      ],
    },
    {
      title: "Laneige Lip Sleeping Mask Berry",
      handle: "laneige-lip-sleeping-mask",
      description:
        "A leave-on lip mask that gently melts away dead skin and delivers intense moisture while you sleep. Wake up to soft, supple lips with a sweet berry fragrance.",
      status: "published" as const,
      categories: [{ id: categoryMap["Masks & Treatments"] }],
      metadata: {
        brand: "Laneige",
        skin_type: "All Skin Types",
        concerns: "Dry Lips, Chapped Lips",
        how_to_use: "Apply a generous layer on lips before bedtime using the spatula. Leave on overnight and wipe off residue in the morning.",
        ingredients: "Diisostearyl Malate, Hydrogenated Polyisobutene, Phytosteryl/Isostearyl/Cetyl/Stearyl/Behenyl Dimer Dilinoleate, Shea Butter, Murumuru Seed Butter, Coconut Oil, Vitamin C, Berry Extract",
      },
      shipping_profile_id: shippingProfile.id,
      options: [{ title: "Size", values: ["20g"] }],
      variants: [
        {
          title: "20g",
          sku: "LAN-LIP-20",
          options: { Size: "20g" },
          manage_inventory: false,
          prices: [{ amount: 18.0, currency_code: "jod" }],
        },
      ],
    },
    {
      title: "COSRX BHA Blackhead Power Liquid",
      handle: "cosrx-bha-blackhead-power-liquid",
      description:
        "A gentle exfoliating treatment with natural BHA (Betaine Salicylate) that dissolves excess sebum and clears blackheads without irritation. Perfect for oily and acne-prone skin.",
      status: "published" as const,
      categories: [{ id: categoryMap["Serums & Essences"] }],
      metadata: {
        brand: "COSRX",
        skin_type: "Oily, Combination",
        concerns: "Blackheads, Pores, Acne",
        how_to_use: "After cleansing and toning, apply to a cotton pad and gently wipe over the face. Start with 2-3 times per week, gradually increasing use.",
        ingredients: "Salix Alba (Willow) Bark Water (4%), Butylene Glycol, Betaine Salicylate (4%), Niacinamide, 1,2-Hexanediol, Arginine, Panthenol, Sodium Hyaluronate, Xanthan Gum",
      },
      shipping_profile_id: shippingProfile.id,
      options: [{ title: "Size", values: ["100ml"] }],
      variants: [
        {
          title: "100ml",
          sku: "COSRX-BHA-100",
          options: { Size: "100ml" },
          manage_inventory: false,
          prices: [{ amount: 14.0, currency_code: "jod" }],
        },
      ],
    },
    {
      title: "Innisfree Green Tea Seed Moisturizer",
      handle: "innisfree-green-tea-moisturizer",
      description:
        "A hydrating moisturizer enriched with organic Jeju green tea seed oil that provides long-lasting moisture. Creates a protective barrier while keeping skin fresh and balanced.",
      status: "published" as const,
      categories: [{ id: categoryMap["Moisturizers"] }],
      metadata: {
        brand: "Innisfree",
        skin_type: "Normal, Combination",
        concerns: "Dryness, Hydration",
        how_to_use: "After serum, apply an appropriate amount and gently spread across the face. Use morning and night.",
        ingredients: "Water, Glycerin, Camellia Sinensis Seed Oil, Cyclomethicone, Cetearyl Alcohol, Niacinamide, Butylene Glycol, Panthenol, Sodium Hyaluronate, Green Tea Extract",
      },
      shipping_profile_id: shippingProfile.id,
      options: [{ title: "Size", values: ["80ml"] }],
      variants: [
        {
          title: "80ml",
          sku: "INN-GT-80",
          options: { Size: "80ml" },
          manage_inventory: false,
          prices: [{ amount: 19.0, currency_code: "jod" }],
        },
      ],
    },
    {
      title: "Some By Mi Snail Truecica Miracle Repair Cream",
      handle: "some-by-mi-snail-truecica-cream",
      description:
        "A powerful repair cream combining snail mucin and Centella Asiatica (CICA) to heal damaged, acne-prone skin. Reduces redness, repairs the skin barrier, and provides deep moisture.",
      status: "published" as const,
      categories: [{ id: categoryMap["Moisturizers"] }],
      metadata: {
        brand: "Some By Mi",
        skin_type: "Sensitive, Acne-prone",
        concerns: "Acne Scars, Redness, Barrier Repair",
        how_to_use: "Apply evenly to face after serum. For targeted repair, apply a thicker layer to areas of concern.",
        ingredients: "Water, Snail Secretion Filtrate, Butylene Glycol, Glycerin, Centella Asiatica Extract (Truecica), Niacinamide, Tea Tree Leaf Water, Madecassoside, Asiaticoside",
      },
      shipping_profile_id: shippingProfile.id,
      options: [{ title: "Size", values: ["60g"] }],
      variants: [
        {
          title: "60g",
          sku: "SBM-TRUECICA-60",
          options: { Size: "60g" },
          manage_inventory: false,
          prices: [{ amount: 17.0, currency_code: "jod" }],
        },
      ],
    },
    {
      title: "Beauty of Joseon Ginseng Cleansing Oil",
      handle: "beauty-of-joseon-ginseng-cleansing-oil",
      description:
        "A gentle cleansing oil infused with ginseng and soybean oil that effortlessly dissolves makeup, sunscreen, and impurities. Leaves skin soft and moisturized without a greasy residue.",
      status: "published" as const,
      categories: [{ id: categoryMap["Cleansers"] }],
      metadata: {
        brand: "Beauty of Joseon",
        skin_type: "All Skin Types",
        concerns: "Makeup Removal, Cleansing",
        how_to_use: "Apply 2-3 pumps onto dry face. Gently massage in circular motions to dissolve makeup. Add water to emulsify, then rinse thoroughly.",
        ingredients: "Soybean Oil, Cetyl Ethylhexanoate, Grape Seed Oil, Ginseng Seed Oil, Jojoba Seed Oil, Tocopherol, Camellia Sinensis Leaf Extract",
      },
      shipping_profile_id: shippingProfile.id,
      options: [{ title: "Size", values: ["210ml"] }],
      variants: [
        {
          title: "210ml",
          sku: "BOJ-OIL-210",
          options: { Size: "210ml" },
          manage_inventory: false,
          prices: [{ amount: 15.0, currency_code: "jod" }],
        },
      ],
    },
    {
      title: "COSRX Acne Pimple Master Patch",
      handle: "cosrx-pimple-patch",
      description:
        "Hydrocolloid patches that absorb fluid from blemishes overnight, protecting them from bacteria and external irritants. Comes in 3 sizes for different pimple sizes.",
      status: "published" as const,
      categories: [{ id: categoryMap["Masks & Treatments"] }],
      metadata: {
        brand: "COSRX",
        skin_type: "All Skin Types",
        concerns: "Acne, Blemishes",
        how_to_use: "Cleanse and dry the affected area. Choose the appropriate patch size and apply directly onto the blemish. Leave on for 6-8 hours or overnight.",
        ingredients: "Cellulose Gum, Styrene Isoprene Styrene Block Copolymer, Polyisobutylene, Petroleum Resin, Polyurethane Film",
      },
      shipping_profile_id: shippingProfile.id,
      options: [{ title: "Size", values: ["24 patches"] }],
      variants: [
        {
          title: "24 patches",
          sku: "COSRX-PATCH-24",
          options: { Size: "24 patches" },
          manage_inventory: false,
          prices: [{ amount: 5.0, currency_code: "jod" }],
        },
      ],
    },
    {
      title: "Innisfree Jeju Volcanic Pore Cleansing Foam",
      handle: "innisfree-volcanic-cleansing-foam",
      description:
        "A deep cleansing foam made with Jeju volcanic scoria that effectively absorbs excess sebum and removes impurities from pores. Leaves skin clean and refreshed.",
      status: "published" as const,
      categories: [{ id: categoryMap["Cleansers"] }],
      metadata: {
        brand: "Innisfree",
        skin_type: "Oily, Combination",
        concerns: "Pores, Oily Skin, Deep Cleansing",
        how_to_use: "Dispense a small amount, lather with water, and massage gently onto damp face. Rinse off with lukewarm water.",
        ingredients: "Water, Glycerin, Myristic Acid, Stearic Acid, Potassium Hydroxide, Lauric Acid, Butylene Glycol, Jeju Volcanic Cluster Extract, Camellia Sinensis Leaf Extract, Citrus Unshiu Peel Extract",
      },
      shipping_profile_id: shippingProfile.id,
      options: [{ title: "Size", values: ["150ml"] }],
      variants: [
        {
          title: "150ml",
          sku: "INN-VOLC-150",
          options: { Size: "150ml" },
          manage_inventory: false,
          prices: [{ amount: 9.5, currency_code: "jod" }],
        },
      ],
    },
    {
      title: "GlowReaJo K-Beauty Starter Set",
      handle: "glowreajo-starter-set",
      description:
        "The perfect introduction to Korean skincare! Includes travel-size versions of our best-selling cleanser, toner, serum, moisturizer, and sunscreen. Everything you need for a complete K-beauty routine.",
      status: "published" as const,
      categories: [{ id: categoryMap["Sets & Bundles"] }],
      metadata: {
        brand: "GlowReaJo",
        skin_type: "All Skin Types",
        concerns: "Complete Routine, Gift Set",
        how_to_use: "Use products in order: Cleanser → Toner → Serum → Moisturizer → Sunscreen (AM only).",
        ingredients: "See individual product listings for full ingredient lists.",
      },
      shipping_profile_id: shippingProfile.id,
      options: [{ title: "Size", values: ["5-piece set"] }],
      variants: [
        {
          title: "5-piece set",
          sku: "GRJ-STARTER-5",
          options: { Size: "5-piece set" },
          manage_inventory: false,
          prices: [{ amount: 35.0, currency_code: "jod" }],
        },
      ],
    },
  ]

  const { result: products } = await createProductsWorkflow(container).run({
    input: { products: productsData },
  })

  // 6. Link products to sales channel
  logger.info("Linking products to sales channel...")
  await linkProductsToSalesChannelWorkflow(container).run({
    input: {
      id: salesChannel.id,
      add: products.map((p: any) => p.id),
    },
  })

  // 7. Create Promotions
  logger.info("Creating promotions...")
  await createPromotionsWorkflow(container).run({
    input: {
      promotionsData: [
        {
          code: "WELCOME10",
          type: "standard",
          status: "active",
          is_automatic: false,
          application_method: {
            type: "percentage",
            target_type: "order",
            allocation: "across",
            value: 10,
            currency_code: "jod",
          },
        },
        {
          code: "GLOW20",
          type: "standard",
          status: "active",
          is_automatic: false,
          campaign: {
            name: "GLOW20 Campaign",
            campaign_identifier: "GLOW20",
            budget: {
              type: "usage",
              limit: 50,
            },
            starts_at: new Date(),
            ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
          application_method: {
            type: "percentage",
            target_type: "order",
            allocation: "across",
            value: 20,
            currency_code: "jod",
          },
        },
      ],
    },
  })

  logger.info("Seeding complete!")
  logger.info(`Created ${products.length} products in ${categories.length} categories`)
  logger.info(`Sales channel: ${salesChannel.name}`)
  logger.info(`Region: Jordan (JOD)`)
  logger.info(`Promotions: WELCOME10 (10%), GLOW20 (20%)`)
}
