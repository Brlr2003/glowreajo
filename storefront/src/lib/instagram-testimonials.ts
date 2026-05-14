export const INSTAGRAM_HIGHLIGHT_URL =
  "https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MDU4OTk0MjUyNDAyODk4?story_media_id=3852849053633907547_80695363381&igsh=MW1tOXBzNmVlaGl0Yw=="

export interface InstagramTestimonial {
  id: string
  text_en: string
  text_ar: string
  product_en?: string
  product_ar?: string
}

export const instagramTestimonials: InstagramTestimonial[] = [
  {
    id: "authenticity",
    text_en:
      "Thank you so much, everything you sell is original and that means the world to me. Inshallah I'll always be a customer ♥",
    text_ar:
      "حبيبتي جد يسلمو كتير ع المصداقية لأنهم أصليين، إن شاء الله ع طول راح أضل أتعامل معك ♥",
  },
  {
    id: "sunscreen-moisturizer",
    text_en:
      "I really loved the sunscreen, light texture and absorbs into the skin so fast. The moisturizer arrived yesterday too, lightweight just the way I like it.",
    text_ar:
      "والله عجبني كتير خفيف وبيمتص بالبشرة بسرعة، ومبارح وصلني المرطب برضو حبيتو خفيف 😍",
    product_en: "Sunscreen + Moisturizer",
    product_ar: "واقي الشمس والمرطب",
  },
  {
    id: "loving-everything",
    text_en: "Honestly, I'm in love with them. Really lovely products ♥",
    text_ar: "والله بجنوووو ♥ كتير حلوين",
  },
  {
    id: "dark-circles",
    text_en:
      "I felt my dark circles became lighter, and for the first time my face has a real glow. Good news, the forehead breakouts calmed down too ♥",
    text_ar:
      "حسيت الهالات صارت أخف، وأول مرة أحس في لمعة بوجهي، وأبشرك حبوب الجبهة خفّت ♥",
    product_en: "Eye Cream + Routine",
    product_ar: "كريم الهالات والروتين",
  },
  {
    id: "pigmentation",
    text_en:
      "Pigmentation was my biggest concern, and I can already feel them lightening. Thank you for actually following up with me ♥",
    text_ar:
      "أنا أهم إشي عندي التصبغات حاسيتهم بفتحوا، شكراً إنك بتابعي ♥",
  },
  {
    id: "real-advice",
    text_en:
      "Light texture, gorgeous on the skin, and works for every skin type. I love that you give honest advice, not just to make a sale.",
    text_ar:
      "قوامه خفيف وبجنن على البشرة، ومناسب لكل أنواع البشرة. حبيتكم والله لأنكم بتعطو النصيحة مو ع أساس الواحد بس يشتري 🥹",
  },
  {
    id: "trusted-page",
    text_en:
      "I was searching for a trustworthy page and I found you. My skin really benefits from the products, thank you ♥",
    text_ar:
      "كنت بدور على صفحة موثوقة ولقيتكم، الحمدلله بشرتي بتستفيد كتير من المنتجات ♥",
  },
  {
    id: "original-products",
    text_en:
      "It arrived, thank you so much. I was worried it wouldn't be authentic but alhamdulillah your service is wonderful. Next time I want Vitamin C ♥",
    text_ar:
      "وصلني ويسلمو كتير، كنت خايفة ما يكون أصلي بس الحمدلله خدمتكم رائعة. المرة الجاي إن شاء الله بدي فيتامين سي ♥",
    product_en: "Skincare Bundle",
    product_ar: "باكج العناية",
  },
  {
    id: "amazing-feel",
    text_en:
      "Bless your hands, just tried them and they're incredible on the skin. Thank you, your way with customers is so kind ♥",
    text_ar:
      "يسلمو إديكي، هلا جربتهم خرافين ع البشرة. شكرا كتير وأسلوبك بجنن جد 🥺♥",
  },
]
