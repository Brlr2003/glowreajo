import { SITE_SETTINGS_MODULE } from "../modules/site-settings"

type TestimonialSeed = {
  name: string
  text: string
  text_ar: string
  product?: string
  product_ar?: string
  sort_order: number
}

const SEED_TESTIMONIALS: TestimonialSeed[] = [
  {
    name: "IG Story 1",
    text:
      "Thank you so much, everything you sell is original and that means the world to me. Inshallah I'll always be a customer.",
    text_ar:
      "حبيبتي جد يسلمو كتير ع المصداقية لأنهم أصليين، إن شاء الله ع طول راح أضل أتعامل معك.",
    sort_order: 1,
  },
  {
    name: "IG Story 2",
    text:
      "I really loved the sunscreen, light texture and absorbs into the skin so fast. The moisturizer arrived yesterday too, lightweight just the way I like it.",
    text_ar:
      "والله عجبني كتير خفيف وبيمتص بالبشرة بسرعة، ومبارح وصلني المرطب برضو حبيتو خفيف.",
    product: "Sunscreen + Moisturizer",
    product_ar: "واقي الشمس والمرطب",
    sort_order: 2,
  },
  {
    name: "IG Story 3",
    text: "Honestly, I'm in love with them. Really lovely products.",
    text_ar: "والله بجنوووو كتير حلوين.",
    sort_order: 3,
  },
  {
    name: "IG Story 4",
    text:
      "I felt my dark circles became lighter, and for the first time my face has a real glow. Good news, the forehead breakouts calmed down too.",
    text_ar:
      "حسيت الهالات صارت أخف، وأول مرة أحس في لمعة بوجهي، وأبشرك حبوب الجبهة خفّت.",
    product: "Eye Cream + Routine",
    product_ar: "كريم الهالات والروتين",
    sort_order: 4,
  },
  {
    name: "IG Story 5",
    text:
      "Pigmentation was my biggest concern, and I can already feel them lightening. Thank you for actually following up with me.",
    text_ar:
      "أنا أهم إشي عندي التصبغات حاسيتهم بفتحوا، شكراً إنك بتابعي.",
    sort_order: 5,
  },
  {
    name: "IG Story 6",
    text:
      "Light texture, gorgeous on the skin, and works for every skin type. I love that you give honest advice, not just to make a sale.",
    text_ar:
      "قوامه خفيف وبجنن على البشرة، ومناسب لكل أنواع البشرة. حبيتكم والله لأنكم بتعطو النصيحة مو ع أساس الواحد بس يشتري.",
    sort_order: 6,
  },
  {
    name: "IG Story 7",
    text:
      "I was searching for a trustworthy page and I found you. My skin really benefits from the products, thank you.",
    text_ar:
      "كنت بدور على صفحة موثوقة ولقيتكم، الحمدلله بشرتي بتستفيد كتير من المنتجات.",
    sort_order: 7,
  },
  {
    name: "IG Story 8",
    text:
      "It arrived, thank you so much. I was worried it wouldn't be authentic but alhamdulillah your service is wonderful. Next time I want Vitamin C.",
    text_ar:
      "وصلني ويسلمو كتير، كنت خايفة ما يكون أصلي بس الحمدلله خدمتكم رائعة. المرة الجاي إن شاء الله بدي فيتامين سي.",
    product: "Skincare Bundle",
    product_ar: "باكج العناية",
    sort_order: 8,
  },
  {
    name: "IG Story 9",
    text:
      "Bless your hands, just tried them and they're incredible on the skin. Thank you, your way with customers is so kind.",
    text_ar:
      "يسلمو إديكي، هلا جربتهم خرافين ع البشرة. شكرا كتير وأسلوبك بجنن جد.",
    sort_order: 9,
  },
]

export default async function seedTestimonials({ container }: { container: any }) {
  const logger = container.resolve("logger")
  const service = container.resolve(SITE_SETTINGS_MODULE) as any

  logger.info(
    `Seeding ${SEED_TESTIMONIALS.length} testimonials (idempotent by name)...`
  )

  let created = 0
  let skipped = 0

  for (const t of SEED_TESTIMONIALS) {
    const existing = await service.listTestimonials({ name: t.name }, { take: 1 })
    if (existing.length > 0) {
      skipped++
      continue
    }
    await service.createTestimonials({
      name: t.name,
      text: t.text,
      text_ar: t.text_ar,
      product: t.product || null,
      product_ar: t.product_ar || null,
      rating: 5,
      sort_order: t.sort_order,
      is_active: true,
    })
    created++
    logger.info(`  ✓ Created testimonial: ${t.name}`)
  }

  logger.info(
    `Testimonial seed complete. Created: ${created}, Skipped (already existed): ${skipped}`
  )
}
