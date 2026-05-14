// Data file for the bilingual blog seed. Each entry maps 1:1 to the
// blog_post model. Slugs are the upsert key.

export type BlogSeed = {
  slug: string
  title: string
  excerpt: string
  content: string
  seo_title: string
  seo_description: string
  tags: string[]
  title_ar: string
  excerpt_ar: string
  content_ar: string
  seo_title_ar: string
  seo_description_ar: string
  tags_ar: string[]
  cover_image: string
  published_at: string
}

const AUTHOR = "GlowReaJo Team"
const AUTHOR_AR = "فريق غلو ريجو"

// Face-free Unsplash cover photos reused from existing posts.
const COVERS = {
  bottles1: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&q=80",
  bottles2: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80",
  bottles3: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&q=80",
  bottles4: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&q=80",
  flatlay1: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80",
  flatlay2: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=1200&q=80",
  flatlay3: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1200&q=80",
  flatlay4: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&q=80",
  green1: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=1200&q=80",
  green2: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=1200&q=80",
  pink1: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=1200&q=80",
  pink2: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=80",
  cream1: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1200&q=80",
  cream2: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200&q=80",
  serum1: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1200&q=80",
  serum2: "https://images.unsplash.com/photo-1617897903246-719242758050?w=1200&q=80",
  spa1: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&q=80",
  spa2: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=1200&q=80",
  spa3: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1200&q=80",
  spa4: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=1200&q=80",
}

export const NEW_BLOGS: BlogSeed[] = [
  {
    slug: "korean-skincare-dry-skin-hydration-routine",
    title: "Korean Skincare for Dry Skin: A Hydration-First Routine",
    excerpt:
      "Dry skin needs more than a thick moisturizer. Here's the layered Korean approach that actually works — plus the exact ingredients to look for in Jordan's dry climate.",
    seo_title: "Korean Skincare for Dry Skin: Hydration Routine 2026 | GlowReaJo",
    seo_description:
      "A complete K-beauty routine for dry skin. Layer hydration with the 7-skin method, ceramides, and Korean sleeping masks. Adapted for Jordan's climate.",
    tags: ["dry skin", "korean skincare", "hydration", "skincare routine", "ceramides"],
    cover_image: COVERS.bottles1,
    title_ar: "العناية الكورية للبشرة الجافة: روتين الترطيب أولاً",
    excerpt_ar:
      "البشرة الجافة بدّها أكثر من مرطّب ثقيل. هاد هو النهج الكوري المتعدّد الطبقات اللي بشتغل فعلاً — والمكوّنات المضبوطة اللي تدوّري عليها بمناخ الأردن الجاف.",
    seo_title_ar: "العناية الكورية للبشرة الجافة 2026 | غلو ريجو",
    seo_description_ar:
      "روتين K-beauty كامل للبشرة الجافة. طبّقي الترطيب بطريقة 7-skin، السيراميدات، وماسكات النوم الكورية. مكيّف لمناخ الأردن.",
    tags_ar: ["بشرة جافة", "عناية كورية", "ترطيب", "روتين عناية", "سيراميدات"],
    content: `<h2>Why Korean Skincare Works So Well for Dry Skin</h2>
<p>Dry skin in Jordan deals with a lot — long hot summers, cold dry winters, and air-conditioned offices that drink up moisture. The Korean approach to skincare answers all of that, because it's built around <strong>hydration in layers</strong> rather than a single thick cream.</p>
<p>If you've been using one heavy moisturizer and still feel tight by mid-morning, this routine is for you.</p>

<h2>The Hydration-First Philosophy</h2>
<p>In K-beauty, hydration isn't one product — it's the whole game. Korean dermatologists talk about the <em>7-skin method</em>: applying multiple thin layers of toner or essence to deeply quench the skin. Thin layers absorb better than one thick one.</p>

<h2>Your Step-By-Step Dry Skin Routine</h2>

<h3>1. Oil Cleanser (Evening Only)</h3>
<p>Dry skin shouldn't touch foaming or stripping cleansers. Start your evening with an oil cleanser to dissolve sunscreen and makeup without taking your natural oils with it. Rice oil and camellia oil are gentle Korean classics.</p>

<h3>2. Cream or Milk Cleanser</h3>
<p>For your second cleanse — and your morning wash — use a low-pH cream or milk cleanser. Skip foaming face washes; they often contain sulfates that dry skin can't afford.</p>

<h3>3. Hydrating Toner (Apply 3-4 Times)</h3>
<p>This is where the magic happens. Pour a coin-size of hydrating toner into your palm, press it into damp skin, and repeat 3-4 times. Look for toners with <strong>hyaluronic acid, beta-glucan, or panthenol</strong>.</p>

<h3>4. Essence</h3>
<p>An essence delivers a concentrated burst of hydration. For dry skin, look for fermented yeast (galactomyces or saccharomyces) or snail mucin — both have been studied for their barrier-repair effects.</p>

<h3>5. Hydrating Serum</h3>
<p>Choose a serum with <strong>hyaluronic acid + ceramides</strong>. Hyaluronic acid pulls water in; ceramides lock it down. This combination is non-negotiable for dry skin.</p>

<h3>6. Sleeping Mask or Rich Cream</h3>
<p>For very dry skin, cap your night routine with a Korean sleeping mask. These thick, occlusive treatments work overnight. Laneige Water Sleeping Mask and CosRX Ceramide Cream are popular for a reason.</p>

<h3>7. Sunscreen (Morning, Always)</h3>
<p>Pick a moisturizing Korean sunscreen — many are formulated with ceramides and hyaluronic acid, so they double as hydration. SPF 50+ PA++++ is the gold standard.</p>

<h2>Ingredients to Look For</h2>
<ul>
<li><strong>Hyaluronic acid</strong> — pulls water into the skin</li>
<li><strong>Ceramides</strong> — rebuild the skin barrier</li>
<li><strong>Squalane</strong> — non-greasy hydration</li>
<li><strong>Centella asiatica</strong> — soothes irritation</li>
<li><strong>Panthenol (Vitamin B5)</strong> — deep moisture and healing</li>
</ul>

<h2>Ingredients to Avoid</h2>
<ul>
<li>Strong AHAs daily (1-2 times weekly is enough)</li>
<li>Sulfate-based foaming cleansers</li>
<li>High-percentage Vitamin C (use buffered or sap forms)</li>
<li>Alcohol-heavy toners</li>
</ul>

<h2>The Jordan Climate Adjustment</h2>
<p>If you're in Amman during winter, when the air drops to 5°C and humidity collapses, add a humidifier to your bedroom. No skincare can compete with a 20% humidity room.</p>
<p>In summer, switch your sleeping mask to a lighter gel cream — the layered hydration approach still applies, just with lighter textures.</p>

<h2>How Long Until You See Results?</h2>
<p>Most people notice softer, plumper skin within <strong>two weeks</strong>. Real barrier repair takes 6-8 weeks. Don't change products every week — give your skin time to respond.</p>`,
    content_ar: `<h2>ليش العناية الكورية بتنجح كتير مع البشرة الجافة؟</h2>
<p>البشرة الجافة بالأردن بتعاني من كتير اشي — صيف حار طويل، شتا بارد جاف، ومكاتب مكيّفة بتسحب الرطوبة. النهج الكوري بالعناية بيرد على هاد كلّه، لأنّه مبني على <strong>الترطيب بطبقات</strong> مو على كريم سميك واحد.</p>
<p>إذا كنتِ بتستعملي مرطّب واحد ثقيل ولسا بتحسّي بالشدّ بنص اليوم، هاد الروتين إلِك.</p>

<h2>فلسفة الترطيب أولاً</h2>
<p>بالـ K-beauty، الترطيب مو منتج واحد — هو اللعبة كلّها. أطبّاء الجلد الكوريين بحكوا عن <em>طريقة الـ 7-skin</em>: تطبيق طبقات رفيعة من التونر أو الإسنس عشان البشرة ترتوي بعمق. الطبقات الرفيعة بتمتص أحسن من الطبقة الواحدة الثقيلة.</p>

<h2>روتينك خطوة خطوة للبشرة الجافة</h2>

<h3>1. منظّف زيتي (مسائي فقط)</h3>
<p>البشرة الجافة ما لازم تشوف منظّفات رغوية. ابدي مساءك بمنظّف زيتي يذيب الواقي والمكياج بدون ما ياخد زيوتك الطبيعية. زيت الأرز وزيت الكاميليا كلاسيكيات كورية لطيفة.</p>

<h3>2. منظّف كريمي أو حليبي</h3>
<p>للتنظيف الثاني — وغسلة الصبح — استعملي منظّف كريمي أو حليبي بدرجة حموضة منخفضة. تجنّبي الغسولات الرغوية؛ كتير منها فيه سلفات ما بتقدر تتحمّلها البشرة الجافة.</p>

<h3>3. تونر مرطّب (طبّقي 3-4 مرّات)</h3>
<p>هون يصير السحر. صبّي كميّة بحجم قطعة نقد على راحة يدك، اضغطيها بالبشرة الرطبة، وكرّري 3-4 مرّات. دوّري على تونرات فيها <strong>حمض الهيالورونيك، بيتا-جلوكان، أو بانثينول</strong>.</p>

<h3>4. الإسنس</h3>
<p>الإسنس بيوصل دفعة مركّزة من الترطيب. للبشرة الجافة، دوّري على الخميرة المتخمّرة (جالاكتوميسس أو ساكاروميسس) أو مخاط الحلزون — كلاهما تمّت دراسة تأثيره الإصلاحي للحاجز.</p>

<h3>5. سيروم مرطّب</h3>
<p>اختاري سيروم فيه <strong>حمض الهيالورونيك + سيراميدات</strong>. الهيالورونيك بيشدّ المي؛ السيراميدات بتقفلها جوّا. هاي التركيبة أساسية للبشرة الجافة.</p>

<h3>6. ماسك نوم أو كريم غني</h3>
<p>للبشرة الجافة جداً، اختمي روتين الليل بماسك نوم كوري. هدول علاجات سميكة بتشتغل طول الليل. Laneige Water Sleeping Mask و CosRX Ceramide Cream من الأشهر لسبب وجيه.</p>

<h3>7. واقي شمس (صباحاً، دايماً)</h3>
<p>اختاري واقي شمس كوري مرطّب — كتير منها مصمّمة بالسيراميدات والهيالورونيك، يعني بتعمل ترطيب كمان. SPF 50+ PA++++ هو المعيار.</p>

<h2>مكوّنات دوّري عليها</h2>
<ul>
<li><strong>حمض الهيالورونيك</strong> — مغناطيس الماي</li>
<li><strong>السيراميدات</strong> — إعادة بناء حاجز البشرة</li>
<li><strong>السكوالين</strong> — ترطيب بدون لزوجة</li>
<li><strong>السنتيلا أسياتيكا</strong> — يهدّئ الالتهاب</li>
<li><strong>البانثينول (فيتامين B5)</strong> — ترطيب عميق ومداواة</li>
</ul>

<h2>مكوّنات تجنّبيها</h2>
<ul>
<li>AHA قوي يومياً (1-2 مرّة بالأسبوع كفاية)</li>
<li>منظّفات رغوية فيها سلفات</li>
<li>فيتامين C بنسبة عالية (استعملي صيغ مخفّفة)</li>
<li>تونرات فيها كحول كتير</li>
</ul>

<h2>التعديل لمناخ الأردن</h2>
<p>إذا كنتي بعمّان بالشتا، لما الهوا بينزل لخمس درجات والرطوبة بتنهار، ضيفي مرطّب هوا لغرفة نومك. ولا روتين عناية رح يقدر يتنافس مع غرفة نوم رطوبتها 20%.</p>
<p>بالصيف، بدّلي ماسك النوم بكريم جل أخفّ — نهج الترطيب بطبقات لسا بشتغل، بس بقوامات أخفّ.</p>

<h2>متى رح تشوفي النتائج؟</h2>
<p>أغلب الناس بيلاحظوا بشرة أنعم وأكثر امتلاء خلال <strong>أسبوعين</strong>. إصلاح الحاجز الحقيقي بياخد 6-8 أسابيع. ما تبدّلي منتجاتك كل أسبوع — أعطي بشرتك وقت.</p>`,
    published_at: "2026-05-14T08:00:00Z",
  },
  {
    slug: "korean-skincare-acne-prone-skin-gentle-routine",
    title: "Korean Skincare for Acne-Prone Skin: A Gentle Anti-Breakout Plan",
    excerpt:
      "Acne in Jordan's climate is often a mix of clogged pores, sweat, and over-stripped skin. Here's the Korean way to clear it — without nuking your barrier.",
    seo_title: "Korean Skincare for Acne-Prone Skin | Anti-Breakout Routine 2026",
    seo_description:
      "A gentle K-beauty routine that calms acne without destroying your skin barrier. Best ingredients, BHA, centella, and a complete daily plan for Jordan.",
    tags: ["acne", "breakouts", "korean skincare", "BHA", "centella", "oily skin"],
    cover_image: COVERS.green1,
    title_ar: "العناية الكورية للبشرة المعرّضة لحب الشباب: خطة لطيفة ضد الحبوب",
    excerpt_ar:
      "حب الشباب بمناخ الأردن غالباً خليط من مسامات مسدودة، عرق، وبشرة فقدت زيوتها. هاد هو النهج الكوري لتنظيفها — بدون ما تدمّري حاجز بشرتك.",
    seo_title_ar: "العناية الكورية لحب الشباب | روتين لطيف ضد الحبوب 2026",
    seo_description_ar:
      "روتين K-beauty لطيف بيهدّي حب الشباب بدون ما يدمّر حاجز بشرتك. أحسن المكوّنات، BHA، السنتيلا، وخطة يومية كاملة للأردن.",
    tags_ar: ["حب الشباب", "حبوب", "عناية كورية", "BHA", "سنتيلا", "بشرة دهنية"],
    content: `<h2>The Mistake Most Acne-Prone Skin Makes</h2>
<p>Almost everyone with breakouts in their twenties has done it: scrub the skin raw, double-dose salicylic acid, then layer on benzoyl peroxide. A week later, the skin is red, flaking, and breaking out even more.</p>
<p>The Korean philosophy goes the other way. Acne, more often than not, is inflammation. And inflammation gets worse when you strip the barrier.</p>

<h2>Why Korean Routines Work for Acne</h2>
<p>K-beauty's gentle, layered approach calms the skin while clearing it. Korean acne lines use <strong>BHA at lower percentages</strong>, fermented soothing ingredients like centella asiatica, and oil-free hydrators that don't clog pores.</p>

<h2>Your Acne-Prone Skin Routine</h2>

<h3>Morning</h3>
<p><strong>1. Gentle low-pH cleanser.</strong> Hada Labo, CosRX, and Etude House make options at pH 5.5 that clean without stripping.</p>
<p><strong>2. Centella toner.</strong> Centella asiatica calms active breakouts. SKIN1004 Madagascar Centella Toning Toner is a classic.</p>
<p><strong>3. Niacinamide serum (5-10%).</strong> Regulates sebum, fades post-acne marks, and shrinks pore appearance over time.</p>
<p><strong>4. Lightweight gel moisturizer.</strong> Look for "non-comedogenic" or "oil-free" on the label.</p>
<p><strong>5. Sunscreen.</strong> Post-acne marks darken in the sun. SPF 50+ PA++++, every single morning.</p>

<h3>Evening</h3>
<p><strong>1. Oil cleanser.</strong> Yes, even with acne. Oil dissolves sunscreen and sebum plugs better than foam alone.</p>
<p><strong>2. Low-pH foam cleanser.</strong> Double cleansing is the K-beauty standard.</p>
<p><strong>3. BHA (2-3 nights a week).</strong> Salicylic acid 2% (CosRX BHA Blackhead Power Liquid) goes deep into pores.</p>
<p><strong>4. Centella ampoule.</strong> Soothes after exfoliating.</p>
<p><strong>5. Spot treatment.</strong> Hydrocolloid patches (CosRX Acne Pimple Master Patches) on active spots overnight.</p>
<p><strong>6. Light moisturizer.</strong> Same as morning.</p>

<h2>Key Ingredients for Acne</h2>
<ul>
<li><strong>Salicylic acid (BHA)</strong> — exfoliates inside the pore</li>
<li><strong>Centella asiatica</strong> — anti-inflammatory</li>
<li><strong>Niacinamide</strong> — reduces redness and oil</li>
<li><strong>Tea tree oil</strong> — natural antibacterial</li>
<li><strong>Zinc PCA</strong> — sebum regulator</li>
<li><strong>Hyaluronic acid</strong> — hydrates without clogging</li>
</ul>

<h2>What to Avoid</h2>
<ul>
<li>Heavy creams with coconut oil or shea butter</li>
<li>Physical scrubs (they tear the skin)</li>
<li>Daily benzoyl peroxide (it's too harsh for most)</li>
<li>Mineral oil heavy products</li>
<li>Fragranced products on broken skin</li>
</ul>

<h2>The Hidden Acne Trigger in Jordan</h2>
<p>Sunscreen + sweat is a real combo in Amman summers. If you're breaking out only along the hairline and jaw, the culprit is often your sunscreen pooling there. Switch to a non-comedogenic Korean sunscreen (Beauty of Joseon Relief Sun is famously light), and always cleanse thoroughly at night.</p>

<h2>How Long Until Acne Clears?</h2>
<p>Skin cells turn over every 28-40 days. Most people see calmer skin in <strong>4 weeks</strong> and clearer skin in <strong>8-12 weeks</strong> of consistent gentle care. Cystic or hormonal acne needs a dermatologist — skincare supports the treatment, it doesn't replace it.</p>`,
    content_ar: `<h2>الغلطة اللي بتعملها أغلب البشرة المعرّضة لحب الشباب</h2>
<p>تقريباً كل واحد عنده حبوب بالعشرينات عمل الغلطة نفسها: يفرك البشرة لحد ما تحمر، يستعمل ساليسيليك بجرعة مضاعفة، ويضيف عليه بنزويل بيروكسايد. وبعد أسبوع، البشرة بتصير حمرا، بتقشّر، وفيها حبوب أكثر.</p>
<p>الفلسفة الكورية بتذهب العكس. حب الشباب، أكثر مرّة، هو التهاب. والالتهاب بيزيد سوء لما تدمّري الحاجز.</p>

<h2>ليش الروتينات الكورية بتشتغل لحب الشباب</h2>
<p>النهج اللطيف المتعدّد الطبقات للـ K-beauty بيهدّي البشرة وهو بينظّفها. خطوط حب الشباب الكورية بتستعمل <strong>BHA بنسب أقل</strong>، مكوّنات مخمّرة مهدّئة زي السنتيلا، ومرطّبات خالية من الزيوت.</p>

<h2>روتينك لحب الشباب</h2>

<h3>الصبح</h3>
<p><strong>1. منظّف لطيف بدرجة حموضة منخفضة.</strong> Hada Labo, CosRX, و Etude House عندهم خيارات بدرجة 5.5 بتنظّف بدون ما تشدّ.</p>
<p><strong>2. تونر سنتيلا.</strong> السنتيلا أسياتيكا بتهدّي الحبوب النشطة. SKIN1004 Madagascar Centella Toning Toner كلاسيك.</p>
<p><strong>3. سيروم نياسيناميد (5-10%).</strong> بينظّم الزيوت، يفتّح آثار الحبوب، ويصغّر المسامات مع الوقت.</p>
<p><strong>4. مرطّب جل خفيف.</strong> دوّري على "غير كوميدوجينيك" أو "خالي من الزيوت" على الملصق.</p>
<p><strong>5. واقي شمس.</strong> آثار الحبوب بتصير أغمق بالشمس. SPF 50+ PA++++، كل صبح بدون استثناء.</p>

<h3>المساء</h3>
<p><strong>1. منظّف زيتي.</strong> أيوا، حتى مع حب الشباب. الزيت بيذيب الواقي والسدادات الدهنية أحسن من الرغوة بحالها.</p>
<p><strong>2. منظّف رغوي بدرجة حموضة منخفضة.</strong> التنظيف المزدوج هو معيار الـ K-beauty.</p>
<p><strong>3. BHA (2-3 ليالي بالأسبوع).</strong> ساليسيليك 2% (CosRX BHA Blackhead Power Liquid) بيدخل جوّا المسامات.</p>
<p><strong>4. أمبول سنتيلا.</strong> بيهدّي بعد التقشير.</p>
<p><strong>5. علاج موضعي.</strong> لاصقات هيدروكولويد (CosRX Acne Pimple Master Patches) على البقع النشطة بالليل.</p>
<p><strong>6. مرطّب خفيف.</strong> زي الصبح.</p>

<h2>المكوّنات الأساسية لحب الشباب</h2>
<ul>
<li><strong>حمض الساليسيليك (BHA)</strong> — يقشّر جوّا المسامات</li>
<li><strong>السنتيلا أسياتيكا</strong> — مضاد للالتهاب</li>
<li><strong>النياسيناميد</strong> — يقلّل الاحمرار والزيوت</li>
<li><strong>زيت شجرة الشاي</strong> — مضاد بكتيري طبيعي</li>
<li><strong>زنك PCA</strong> — منظّم للزيوت</li>
<li><strong>حمض الهيالورونيك</strong> — يرطّب بدون انسداد</li>
</ul>

<h2>إيش تتجنّبي</h2>
<ul>
<li>كريمات ثقيلة فيها زيت جوز الهند أو زبدة الشيا</li>
<li>المقشّرات الفيزيائية (بتمزّق البشرة)</li>
<li>بنزويل بيروكسايد يومياً (قاسي على أغلب الناس)</li>
<li>منتجات فيها زيت معدني ثقيل</li>
<li>منتجات معطّرة على بشرة متضرّرة</li>
</ul>

<h2>المحفّز الخفي لحب الشباب بالأردن</h2>
<p>واقي الشمس + العرق تركيبة حقيقية بصيف عمّان. إذا الحبوب طالعة بس على خط الشعر والفك، المسبّب غالباً واقي الشمس اللي بيتجمّع هناك. بدّلي لواقي شمس كوري غير كوميدوجينيك (Beauty of Joseon Relief Sun خفيف بشكل مشهور)، ودايماً نظّفي بشرتك منيح بالليل.</p>

<h2>قدّيش وقت لحد ما حب الشباب يختفي؟</h2>
<p>خلايا البشرة بتتجدّد كل 28-40 يوم. أغلب الناس بيشوفوا بشرة أهدا خلال <strong>4 أسابيع</strong> وبشرة أنظف خلال <strong>8-12 أسبوع</strong> من العناية اللطيفة المنتظمة. الحبوب الكيسية أو الهرمونية بدّها طبيب جلدية — العناية بتدعم العلاج، ما بتعوّضه.</p>`,
    published_at: "2026-05-13T08:00:00Z",
  },
  {
    slug: "korean-skincare-combination-skin-balanced-routine",
    title: "Korean Skincare for Combination Skin: Balancing Oil and Dryness",
    excerpt:
      "Oily in the T-zone, dry on the cheeks? Combination skin is the most common skin type in Jordan. Here's how K-beauty balances both with one smart routine.",
    seo_title: "Korean Skincare for Combination Skin | Balanced Routine 2026",
    seo_description:
      "Build a K-beauty routine for combination skin. Targeted product layering, multi-masking, and the best Korean ingredients for an oily T-zone and dry cheeks.",
    tags: ["combination skin", "korean skincare", "T-zone", "routine", "balanced"],
    cover_image: COVERS.flatlay1,
    title_ar: "العناية الكورية للبشرة المختلطة: توازن بين الدهون والجفاف",
    excerpt_ar:
      "دهنية بمنطقة T وجافة بالخدود؟ البشرة المختلطة أكثر نوع شائع بالأردن. هاد كيف الـ K-beauty بتوازن بين الإثنين بروتين واحد ذكي.",
    seo_title_ar: "العناية الكورية للبشرة المختلطة | روتين متوازن 2026",
    seo_description_ar:
      "ابني روتين K-beauty للبشرة المختلطة. طبقات منتجات مستهدفة، ماسكات متعدّدة، وأحسن مكوّنات كورية لمنطقة T دهنية وخدود جافة.",
    tags_ar: ["بشرة مختلطة", "عناية كورية", "منطقة T", "روتين", "متوازن"],
    content: `<h2>What "Combination Skin" Actually Means</h2>
<p>Combination skin shines in the T-zone (forehead, nose, chin) but feels tight or flaky on the cheeks. About 60% of adults have it, and the percentage is even higher in Jordan because the climate swings hard — humid commutes, then dry AC offices.</p>
<p>The trick isn't to fight one side and ignore the other. K-beauty handles combination skin with <strong>strategic layering and multi-masking</strong>.</p>

<h2>The Combination Skin Routine</h2>

<h3>Morning</h3>
<ol>
<li><strong>Low-pH gel cleanser.</strong> Foam dries the cheeks; cream leaves the T-zone heavy. Gel is the sweet spot.</li>
<li><strong>Hydrating toner</strong> pressed into the cheeks; lighter swipe through the T-zone.</li>
<li><strong>Niacinamide serum</strong> all over — regulates oil and brightens evenly.</li>
<li><strong>Lightweight gel-cream moisturizer.</strong> Slightly more on the cheeks if they feel dry.</li>
<li><strong>Sunscreen.</strong> Look for "matte finish" or "fresh" formulas.</li>
</ol>

<h3>Evening</h3>
<ol>
<li><strong>Oil cleanser</strong> — yes, even on the oily T-zone.</li>
<li><strong>Low-pH gel/foam cleanser</strong> — second cleanse.</li>
<li><strong>BHA 2-3x per week</strong> on the T-zone only.</li>
<li><strong>Essence</strong> — full face.</li>
<li><strong>Hydrating serum + barrier serum.</strong> Cheeks get more.</li>
<li><strong>Gel-cream moisturizer.</strong></li>
</ol>

<h2>Multi-Masking: A K-Beauty Power Move</h2>
<p>Apply a <strong>clay mask</strong> on the T-zone and a <strong>hydrating sheet mask</strong> on the cheeks at the same time. This treats each zone for what it needs without compromising. Do this 1-2 times a week.</p>

<h2>Ingredients That Balance</h2>
<ul>
<li><strong>Niacinamide</strong> — normalizes oil production</li>
<li><strong>Green tea (Centella)</strong> — soothes redness</li>
<li><strong>Hyaluronic acid</strong> — adds water without grease</li>
<li><strong>BHA</strong> — clears T-zone pores</li>
<li><strong>Squalane</strong> — moisturizes cheeks without breakouts</li>
</ul>

<h2>Common Mistakes</h2>
<p><strong>Using oily-skin products everywhere.</strong> Your cheeks aren't oily — they'll get drier and start flaking.</p>
<p><strong>Skipping moisturizer because the T-zone shines.</strong> Skipping moisturizer triggers more oil production. Hydrate, but with a light texture.</p>
<p><strong>Over-exfoliating.</strong> BHA 2-3 times a week is plenty. Daily exfoliation will damage the cheeks.</p>

<h2>Jordan Climate Tweaks</h2>
<p>In summer Amman, swap heavier night creams for gel sleeping packs. In winter, layer an extra hydrating toner on the cheeks. Combination skin needs the routine adjusted by season more than other skin types.</p>

<h2>When to See a Difference</h2>
<p>Combination skin balances out fastest of all the skin types because you're not fighting an extreme. Expect <strong>visible balance within 2-3 weeks</strong>.</p>`,
    content_ar: `<h2>إيش يعني فعلاً "بشرة مختلطة"</h2>
<p>البشرة المختلطة بتلمع بمنطقة T (الجبهة، الأنف، الذقن) بس بتحسّي بشدّ أو تقشّر على الخدود. حوالي 60% من البالغين عندهم هاد النوع، والنسبة أعلى بالأردن لأنّ المناخ بيتأرجح كتير — تنقّلات رطبة، بعدها مكاتب مكيّفة جافّة.</p>
<p>الحيلة مو إنّك تحاربي جهة وتهملي التانية. الـ K-beauty بتتعامل مع البشرة المختلطة بـ<strong>طبقات استراتيجية وماسكات متعدّدة</strong>.</p>

<h2>روتين البشرة المختلطة</h2>

<h3>الصبح</h3>
<ol>
<li><strong>منظّف جل بدرجة حموضة منخفضة.</strong> الرغوة بتجفّف الخدود؛ الكريم بيخلّي منطقة T ثقيلة. الجل هو الحلّ الوسط.</li>
<li><strong>تونر مرطّب</strong> اضغطيه على الخدود؛ مسحة أخف على منطقة T.</li>
<li><strong>سيروم نياسيناميد</strong> على كل الوجه — بينظّم الزيوت ويوحّد التفتيح.</li>
<li><strong>مرطّب جل-كريم خفيف.</strong> شويّة أكثر على الخدود إذا حاسّة فيهم جفاف.</li>
<li><strong>واقي شمس.</strong> دوّري على صيغ "مات" أو "fresh".</li>
</ol>

<h3>المساء</h3>
<ol>
<li><strong>منظّف زيتي</strong> — أيوا، حتى على منطقة T الدهنية.</li>
<li><strong>منظّف جل/رغوة بحموضة منخفضة</strong> — التنظيف الثاني.</li>
<li><strong>BHA مرّتين-ثلاث بالأسبوع</strong> على منطقة T فقط.</li>
<li><strong>إسنس</strong> — كل الوجه.</li>
<li><strong>سيروم مرطّب + سيروم حاجز.</strong> الخدود تاخد أكثر.</li>
<li><strong>مرطّب جل-كريم.</strong></li>
</ol>

<h2>Multi-Masking: حركة قوّة كورية</h2>
<p>طبّقي <strong>ماسك طين</strong> على منطقة T و<strong>ماسك ورقي مرطّب</strong> على الخدود بنفس الوقت. هاي بتعالج كل منطقة بإيش بتحتاجه بدون مساس. اعمليها 1-2 مرة بالأسبوع.</p>

<h2>مكوّنات بتوازن</h2>
<ul>
<li><strong>النياسيناميد</strong> — بينظّم إنتاج الزيوت</li>
<li><strong>الشاي الأخضر (السنتيلا)</strong> — يهدّي الاحمرار</li>
<li><strong>حمض الهيالورونيك</strong> — يضيف ماي بدون لزوجة</li>
<li><strong>BHA</strong> — ينظّف مسامات منطقة T</li>
<li><strong>السكوالين</strong> — يرطّب الخدود بدون حبوب</li>
</ul>

<h2>أخطاء شائعة</h2>
<p><strong>استعمال منتجات البشرة الدهنية بكل مكان.</strong> خدودك مو دهنية — رح يصيروا أكثر جفاف ويبدوا يتقشّروا.</p>
<p><strong>إهمال المرطّب لأنّ منطقة T بتلمع.</strong> إهمال المرطّب بيحفّز إنتاج زيوت أكثر. رطّبي، بس بقوام خفيف.</p>
<p><strong>الإفراط بالتقشير.</strong> BHA 2-3 مرات بالأسبوع كفاية. التقشير اليومي رح يضرّ الخدود.</p>

<h2>تعديلات لمناخ الأردن</h2>
<p>بصيف عمّان، بدّلي كريمات الليل الثقيلة بـ gel sleeping packs. بالشتا، طبّقي تونر مرطّب إضافي على الخدود. البشرة المختلطة بدّها تعديل الروتين حسب الفصل أكثر من باقي الأنواع.</p>

<h2>متى رح تشوفي فرق</h2>
<p>البشرة المختلطة بتتوازن أسرع من باقي الأنواع لأنّك مو بتحاربي تطرّف. توقّعي <strong>توازن واضح خلال 2-3 أسابيع</strong>.</p>`,
    published_at: "2026-05-12T08:00:00Z",
  },
  {
    slug: "how-to-layer-korean-skincare-products-correct-order",
    title: "How to Layer Korean Skincare Products: The Right Order Matters",
    excerpt:
      "Toner first, then essence, then serum… or is it? Here's the K-beauty layering order, explained simply, plus what happens when you do it wrong.",
    seo_title: "How to Layer Korean Skincare Products: The Right Order | 2026 Guide",
    seo_description:
      "Master the order of Korean skincare layers. From toner to sunscreen, learn why the sequence matters, plus a printable cheat sheet for AM and PM routines.",
    tags: ["layering", "korean skincare", "routine order", "K-beauty", "guide"],
    cover_image: COVERS.bottles2,
    title_ar: "كيف تطبّقي منتجات العناية الكورية بالترتيب الصحيح",
    excerpt_ar:
      "التونر أوّل، بعدها الإسنس، بعدها السيروم… أو لأ؟ هاد ترتيب طبقات الـ K-beauty مشروح ببساطة، وإيش بيصير لو طبّقتيه غلط.",
    seo_title_ar: "كيف تطبّقي منتجات العناية الكورية بالترتيب الصحيح | دليل 2026",
    seo_description_ar:
      "اتقني ترتيب طبقات العناية الكورية. من التونر للواقي، اعرفي ليش الترتيب مهم، مع ورقة مرجعية للصبح والمساء.",
    tags_ar: ["طبقات", "عناية كورية", "ترتيب الروتين", "K-beauty", "دليل"],
    content: `<h2>The Golden Rule of Layering</h2>
<p>The K-beauty rule of layering is simple: <strong>thinnest texture first, thickest last</strong>. Water-based products before oil-based. If you flip this, the thicker product blocks the next from absorbing.</p>

<h2>The Full Order (and What Each Does)</h2>

<h3>1. Cleanser (or Double Cleanse)</h3>
<p>Removes dirt, sebum, sunscreen, and makeup. Always start here.</p>

<h3>2. Exfoliant (AHA/BHA/PHA) — 2-3 times weekly</h3>
<p>Goes right after cleansing because it works on clean skin. Wait 1 minute before the next step.</p>

<h3>3. Toner</h3>
<p>Hydrating, prepping the skin to absorb everything that follows. Press in with palms, don't wipe.</p>

<h3>4. Essence</h3>
<p>The most "Korean" step. A watery, conditioning liquid that boosts hydration and cell turnover.</p>

<h3>5. Treatments (Ampoules, Serums)</h3>
<p>Target-specific actives — Vitamin C in the morning, retinol or peptides at night, niacinamide either time.</p>

<h3>6. Sheet Mask — 1-2 times weekly</h3>
<p>Slip this in after serums. Sheet masks deliver concentrated essence into already-prepped skin.</p>

<h3>7. Eye Cream</h3>
<p>Apply before moisturizer so the lighter eye texture isn't blocked by face cream.</p>

<h3>8. Moisturizer</h3>
<p>Locks in all the previous layers.</p>

<h3>9. Face Oil (optional, evening)</h3>
<p>If you use one, it goes after moisturizer because oil seals everything underneath.</p>

<h3>10. Sunscreen (Morning Only)</h3>
<p>Always the last step in the AM. Nothing goes on top — not even powder, until sunscreen has set for 2 minutes.</p>

<h2>What Happens If You Do It Wrong</h2>
<ul>
<li><strong>Cream before serum:</strong> The serum can't penetrate. You wasted money.</li>
<li><strong>Sunscreen before moisturizer:</strong> SPF film is broken, less protection.</li>
<li><strong>Vitamin C and retinol together:</strong> Causes irritation. Vitamin C in AM, retinol in PM.</li>
<li><strong>BHA and AHA on the same night:</strong> Too much exfoliation. Alternate them.</li>
</ul>

<h2>Wait Times Between Layers</h2>
<p>You don't need to wait 5 minutes between every product. The general rule:</p>
<ul>
<li><strong>30 seconds</strong> between watery layers (toner, essence, hydrating serum).</li>
<li><strong>1-2 minutes</strong> between actives (Vitamin C → niacinamide → retinol).</li>
<li><strong>2-3 minutes</strong> before sunscreen so moisturizer settles.</li>
</ul>

<h2>The Simplest Possible Korean Routine</h2>
<p>If 10 steps feel overwhelming, this 5-step version covers everything essential:</p>
<ol>
<li>Cleanser</li>
<li>Hydrating toner</li>
<li>Treatment serum (Vitamin C AM, retinol PM)</li>
<li>Moisturizer</li>
<li>Sunscreen (AM)</li>
</ol>
<p>Once this becomes habit, layer in the others.</p>

<h2>The Quick Cheat Sheet</h2>
<p><strong>AM:</strong> Cleanse → Toner → Vitamin C → Eye Cream → Moisturizer → Sunscreen</p>
<p><strong>PM:</strong> Oil Cleanse → Water Cleanse → BHA (or AHA) → Toner → Essence → Serum → Sheet Mask → Eye Cream → Moisturizer → Sleeping Mask</p>`,
    content_ar: `<h2>القاعدة الذهبية للطبقات</h2>
<p>قاعدة الـ K-beauty للطبقات بسيطة: <strong>القوام الأخف أولاً، الأثقل آخر</strong>. المنتجات المائية قبل الزيتية. لو عكستي، المنتج الأثقل بيقفل الجاي ما يقدر يمتص.</p>

<h2>الترتيب الكامل (وإيش يعمل كل واحد)</h2>

<h3>1. المنظّف (أو التنظيف المزدوج)</h3>
<p>بيشيل الوسخ، الزيوت، الواقي، والمكياج. دايماً ابدي هون.</p>

<h3>2. مقشّر (AHA/BHA/PHA) — 2-3 مرات بالأسبوع</h3>
<p>بيجي بعد التنظيف مباشرة لأنه بيشتغل على بشرة نضيفة. استنّي دقيقة قبل الخطوة التالية.</p>

<h3>3. التونر</h3>
<p>مرطّب، بيحضّر البشرة لتمتص كل اللي رح يجي. اضغطيه براحة يدك، ما تمسحيه.</p>

<h3>4. الإسنس</h3>
<p>الخطوة الأكثر "كورية". سائل مائي مغذّي بيعزّز الترطيب وتجدّد الخلايا.</p>

<h3>5. العلاجات (الأمبولات، السيرومات)</h3>
<p>مكوّنات نشطة مستهدفة — فيتامين C بالصبح، ريتينول أو ببتيدات بالليل، نياسيناميد بأي وقت.</p>

<h3>6. الماسك الورقي — 1-2 مرة بالأسبوع</h3>
<p>حطّيه بعد السيرومات. الماسكات الورقية بتوصل إسنس مركّز لبشرة محضّرة.</p>

<h3>7. كريم العين</h3>
<p>طبّقيه قبل المرطّب عشان قوام العين الخفيف ما يتقفل بكريم الوجه.</p>

<h3>8. المرطّب</h3>
<p>بيقفل كل الطبقات السابقة.</p>

<h3>9. زيت الوجه (اختياري، مسائي)</h3>
<p>لو بتستعملي واحد، يجي بعد المرطّب لأنّ الزيت بيقفل كل اللي تحته.</p>

<h3>10. واقي الشمس (صباحاً فقط)</h3>
<p>دايماً آخر خطوة بالصبح. ما حدا بيجي فوقه — ولا حتى البودرة، إلا بعد ما يستقرّ الواقي بدقيقتين.</p>

<h2>إيش بيصير لو طبّقتيه غلط</h2>
<ul>
<li><strong>كريم قبل السيروم:</strong> السيروم ما يقدر يخترق. ضيّعتي فلوس.</li>
<li><strong>واقي شمس قبل المرطّب:</strong> طبقة الـ SPF بتتكسّر، حماية أقل.</li>
<li><strong>فيتامين C وريتينول مع بعض:</strong> بيسبّب تهيّج. فيتامين C بالصبح، ريتينول بالمساء.</li>
<li><strong>BHA و AHA بنفس الليلة:</strong> تقشير زيادة. بدّليهم.</li>
</ul>

<h2>أوقات الانتظار بين الطبقات</h2>
<p>مو ضروري تستنّي 5 دقايق بين كل منتج. القاعدة العامة:</p>
<ul>
<li><strong>30 ثانية</strong> بين الطبقات المائية (تونر، إسنس، سيروم مرطّب).</li>
<li><strong>1-2 دقيقة</strong> بين المكوّنات النشطة (فيتامين C ← نياسيناميد ← ريتينول).</li>
<li><strong>2-3 دقايق</strong> قبل واقي الشمس عشان المرطّب يثبت.</li>
</ul>

<h2>أبسط روتين كوري ممكن</h2>
<p>إذا 10 خطوات بتحسّيها كتير، هاد إصدار الـ 5 خطوات بيغطّي كل الأساسيات:</p>
<ol>
<li>منظّف</li>
<li>تونر مرطّب</li>
<li>سيروم علاج (فيتامين C صبح، ريتينول مساء)</li>
<li>مرطّب</li>
<li>واقي شمس (صبح)</li>
</ol>
<p>لمّا هاد يصير عادة، ضيفي الباقيات.</p>

<h2>ورقة المراجعة السريعة</h2>
<p><strong>الصبح:</strong> منظّف ← تونر ← فيتامين C ← كريم عين ← مرطّب ← واقي شمس</p>
<p><strong>المساء:</strong> تنظيف زيتي ← تنظيف مائي ← BHA (أو AHA) ← تونر ← إسنس ← سيروم ← ماسك ورقي ← كريم عين ← مرطّب ← ماسك نوم</p>`,
    published_at: "2026-05-11T08:00:00Z",
  },
  {
    slug: "k-beauty-for-men-simple-skincare-routine-jordan",
    title: "K-Beauty for Men: A Simple Skincare Routine for Guys in Jordan",
    excerpt:
      "Korean skincare for men isn't complicated. Five products, ten minutes a day, and skin that doesn't look tired. Here's the no-fuss men's K-beauty guide.",
    seo_title: "K-Beauty for Men: Simple Korean Skincare Routine for Guys 2026",
    seo_description:
      "A practical Korean skincare routine for men in Jordan. 5 products, no overwhelm. Beard-friendly cleansers, oil control, and unscented sunscreens.",
    tags: ["men's skincare", "k-beauty", "routine", "jordan", "guys"],
    cover_image: COVERS.bottles3,
    title_ar: "K-Beauty للرجال: روتين عناية بسيط للشباب بالأردن",
    excerpt_ar:
      "العناية الكورية للرجال مو معقّدة. خمس منتجات، عشر دقايق باليوم، وبشرة ما بتبيّن تعبانة. هاد دليل K-beauty للرجال بلا تعقيد.",
    seo_title_ar: "K-Beauty للرجال: روتين عناية كوري بسيط 2026",
    seo_description_ar:
      "روتين عناية كوري عملي للرجال بالأردن. 5 منتجات، بلا إرباك. منظّفات صديقة للحية، تحكّم بالزيوت، وواقيات بدون رائحة.",
    tags_ar: ["عناية رجالية", "K-beauty", "روتين", "الأردن", "شباب"],
    content: `<h2>Why Men's Skin Needs a Routine Too</h2>
<p>Men's skin produces about <strong>20-30% more sebum</strong> than women's and has slightly thicker dermis. That means: more oil, larger pores, and a faster recovery from active ingredients. The downside? Shaving irritates the skin barrier almost daily.</p>
<p>You don't need 10 products. Five is plenty.</p>

<h2>The 5-Product Men's Routine</h2>

<h3>1. Gel Cleanser (Morning + Night)</h3>
<p>Skip the cheap bar soap. Use a low-pH gel cleanser that removes sweat and sebum without stripping. <strong>CosRX Salicylic Acid Cleanser</strong> handles oil and prevents razor bumps.</p>

<h3>2. Hydrating Toner</h3>
<p>One press into the palms, swipe across the face. Korean toners aren't astringent — they hydrate. <strong>Hada Labo Gokujyun Toner</strong> is a cheap classic.</p>

<h3>3. Niacinamide Serum</h3>
<p>The single most useful active for men. Niacinamide controls oil, reduces redness, and fades dark spots over time.</p>

<h3>4. Lightweight Moisturizer</h3>
<p>Gel-cream texture. Skip anything labeled "rich" or "anti-aging cream" if you're under 35 with normal/oily skin. <strong>Beauty of Joseon Dynasty Cream</strong> is light and unscented.</p>

<h3>5. Sunscreen (Morning Only)</h3>
<p>The biggest skin upgrade you'll ever make. Korean sunscreens don't leave a white cast. <strong>Beauty of Joseon Relief Sun SPF 50+ PA++++</strong> is the most popular for guys because it's invisible and a touch matte.</p>

<h2>Bonus Products (Optional)</h2>
<ul>
<li><strong>BHA exfoliant</strong> 2x/week if you have blackheads or oily skin.</li>
<li><strong>Eye cream</strong> if you have visible dark circles or under-eye fatigue.</li>
<li><strong>Aftershave balm</strong> with centella or panthenol — calms shaving irritation.</li>
</ul>

<h2>The Shaving Problem</h2>
<p>Shaving removes the top layer of skin and pulls hairs. The result is micro-cuts that get inflamed easily, especially in summer heat. To minimize damage:</p>
<ul>
<li>Always shave with a sharp blade — a dull one drags.</li>
<li>Pre-shave with a hydrating cleanser, not foam.</li>
<li>Post-shave, apply a centella toner before moisturizer.</li>
<li>Never apply alcohol-based aftershave — it kills the barrier.</li>
</ul>

<h2>What to Skip</h2>
<p><strong>Heavily scented products.</strong> Fragrance is the #1 cause of contact dermatitis. Most Korean lines have fragrance-free options.</p>
<p><strong>Cheap drugstore "men's face wash."</strong> They're usually high pH and stripping. Pay 5-7 JOD more for a proper Korean cleanser — your skin will recover faster.</p>

<h2>Honest Expectations</h2>
<p>You'll see less oily shine by <strong>week 2</strong>, smoother skin by <strong>week 4</strong>, and visibly evener tone by <strong>week 8</strong>. Sunscreen is the difference-maker long-term.</p>

<h2>One Last Thing About the Beard</h2>
<p>If you have a beard, work product into the skin underneath, not just on top. Beard skin gets dry and flaky, which leads to itching. A small drop of squalane oil under the beard at night fixes 90% of beardruff complaints.</p>`,
    content_ar: `<h2>ليش بشرة الرجال كمان بدّها روتين</h2>
<p>بشرة الرجال بتنتج حوالي <strong>20-30% زيوت أكثر</strong> من النساء، وأدمتها أسمك شويّ. يعني: زيوت أكثر، مسامات أكبر، وتعافي أسرع من المكوّنات النشطة. السلبية؟ الحلاقة بتهيّج حاجز البشرة كل يوم تقريباً.</p>
<p>ما بدّك 10 منتجات. خمسة كفاية.</p>

<h2>الروتين الرجالي بـ 5 منتجات</h2>

<h3>1. منظّف جل (صبح ومساء)</h3>
<p>تجاوزي صابون البار الرخيص. استعمل منظّف جل بحموضة منخفضة بيشيل العرق والزيوت بدون ما يجفّف. <strong>CosRX Salicylic Acid Cleanser</strong> بيتعامل مع الزيوت ويمنع نتوءات الحلاقة.</p>

<h3>2. تونر مرطّب</h3>
<p>اضغطه براحة يدك، امسحه على وجهك. التونرات الكورية مش قابضة — هي مرطّبة. <strong>Hada Labo Gokujyun Toner</strong> كلاسيك رخيص.</p>

<h3>3. سيروم نياسيناميد</h3>
<p>أكثر مكوّن نشط مفيد للرجال. النياسيناميد بيتحكّم بالزيوت، يقلّل الاحمرار، ويفتّح البقع الغامقة مع الوقت.</p>

<h3>4. مرطّب خفيف</h3>
<p>قوام جل-كريم. تجاوز أي اشي مكتوب عليه "غني" أو "كريم ضد التجاعيد" إذا تحت الـ 35 وعندك بشرة عادية/دهنية. <strong>Beauty of Joseon Dynasty Cream</strong> خفيف وبلا رائحة.</p>

<h3>5. واقي الشمس (صباحاً فقط)</h3>
<p>أكبر تطوير ممكن تعمله لبشرتك. الواقيات الكورية ما بتترك أثر أبيض. <strong>Beauty of Joseon Relief Sun SPF 50+ PA++++</strong> الأكثر شعبية بين الشباب لأنه غير مرئي وخفيف المات.</p>

<h2>منتجات إضافية (اختيارية)</h2>
<ul>
<li><strong>مقشّر BHA</strong> مرّتين بالأسبوع إذا عندك رؤوس سوداء أو بشرة دهنية.</li>
<li><strong>كريم عين</strong> إذا عندك هالات سوداء واضحة أو إرهاق تحت العين.</li>
<li><strong>بلسم ما بعد الحلاقة</strong> فيه سنتيلا أو بانثينول — بيهدّي تهيّج الحلاقة.</li>
</ul>

<h2>مشكلة الحلاقة</h2>
<p>الحلاقة بتشيل الطبقة العليا للبشرة وبتجرّ الشعر. النتيجة قطوع صغيرة بتلتهب بسهولة، خصوصاً بحر الصيف. عشان تقلّل الضرر:</p>
<ul>
<li>دايماً احلق بشفرة حادّة — المعدومة بتسحب.</li>
<li>قبل الحلاقة، استعمل منظّف مرطّب، مو رغوة.</li>
<li>بعد الحلاقة، طبّق تونر سنتيلا قبل المرطّب.</li>
<li>أبداً ما تستعمل لوشن بعد الحلاقة فيه كحول — بيقتل الحاجز.</li>
</ul>

<h2>إيش تتجاهل</h2>
<p><strong>المنتجات بروائح قوية.</strong> العطر السبب رقم 1 لالتهاب التماس. أغلب الخطوط الكورية عندها خيارات بدون عطر.</p>
<p><strong>غسولات الوجه "الرجالية" الرخيصة من الصيدلية.</strong> غالباً درجة حموضتها عالية ومجفّفة. ادفع 5-7 دنانير زيادة لمنظّف كوري لائق — بشرتك رح تتعافى أسرع.</p>

<h2>توقّعات صادقة</h2>
<p>رح تشوف لمعان دهني أقل بـ <strong>الأسبوع 2</strong>، بشرة أنعم بـ <strong>الأسبوع 4</strong>، ولون أكثر توحّد بـ <strong>الأسبوع 8</strong>. واقي الشمس هو الفرق على المدى الطويل.</p>

<h2>إشي أخير عن اللحية</h2>
<p>إذا عندك لحية، اشتغل المنتج بالبشرة تحتها، مو بس فوقها. بشرة اللحية بتصير جافّة وبتقشّر، اللي بيؤدّي لحكّة. قطرة سكوالين تحت اللحية بالليل بتحلّ 90% من شكاوى قشرة اللحية.</p>`,
    published_at: "2026-05-10T08:00:00Z",
  },
  {
    slug: "am-vs-pm-korean-skincare-routine-difference",
    title: "AM vs PM Routine: The Difference Between Day and Night K-Beauty",
    excerpt:
      "Same products morning and night? You're missing half the benefit. Here's exactly what should change between your sunrise and sunset routine.",
    seo_title: "AM vs PM Korean Skincare Routine: What Changes Day to Night",
    seo_description:
      "Your skin has different needs morning and night. Learn the AM vs PM K-beauty routine — which ingredients to use when, and why timing changes results.",
    tags: ["AM routine", "PM routine", "korean skincare", "skincare timing"],
    cover_image: COVERS.spa3,
    title_ar: "روتين الصبح مقابل المساء: الفرق بين الـ K-beauty نهاراً وليلاً",
    excerpt_ar:
      "نفس المنتجات صبح ومساء؟ فاقد نص الفايدة. هاد إيش لازم يتغيّر بين روتين شروقك وغروبك.",
    seo_title_ar: "روتين العناية الكوري صبح ومساء: إيش بيتغيّر",
    seo_description_ar:
      "بشرتك بحاجاتها مختلفة صبح ومساء. اعرفي روتين K-beauty للصبح والمساء — أي مكوّنات تستعملي ومتى.",
    tags_ar: ["روتين صباحي", "روتين مسائي", "عناية كورية", "توقيت العناية"],
    content: `<h2>The Two Jobs Your Skin Has</h2>
<p>Your skin does fundamentally different things during the day vs. night. <strong>During the day, it protects itself</strong> from UV, pollution, and free radicals. <strong>At night, it repairs</strong> — cell turnover spikes between 11 PM and 4 AM. A morning routine should defend; an evening routine should heal.</p>

<h2>The Morning Routine: Defense Mode</h2>

<h3>1. Gentle Cleanser</h3>
<p>You didn't get dirty in your sleep. A splash of water or a low-pH gentle cleanser is plenty. Over-cleansing in the morning damages the barrier.</p>

<h3>2. Hydrating Toner</h3>
<p>Wake the skin up. Korean morning toners often have a mild caffeine or ginseng extract for a brightening effect.</p>

<h3>3. Antioxidant Serum (Vitamin C)</h3>
<p>This is the AM star. Vitamin C neutralizes free radicals from UV and pollution. It also boosts SPF effectiveness. Use a stabilized form like <strong>ascorbic acid 10-15%</strong> or <strong>ethyl ascorbic acid</strong>.</p>

<h3>4. Light Moisturizer</h3>
<p>Gel-cream textures are ideal. You're prepping for sunscreen — heavy moisturizer + sunscreen + makeup is a recipe for pilling.</p>

<h3>5. SPF 50+ PA++++</h3>
<p>Non-negotiable. UV damage is cumulative. Reapply every 2-3 hours if you're outdoors.</p>

<h2>The Evening Routine: Repair Mode</h2>

<h3>1. Oil Cleanser</h3>
<p>Removes sunscreen and oil-based grime. Massage onto dry skin for 60 seconds.</p>

<h3>2. Water-Based Cleanser</h3>
<p>The second cleanse for a truly clean face.</p>

<h3>3. Exfoliant (2-3 nights/week)</h3>
<p>BHA for oily/acne-prone, AHA for dry/dull, PHA for sensitive skin.</p>

<h3>4. Toner + Essence</h3>
<p>Hydration pre-treatment.</p>

<h3>5. Treatment Serum</h3>
<p>This is where night shines. <strong>Retinol</strong> (boosts cell turnover), <strong>peptides</strong> (build collagen), or <strong>niacinamide</strong> (any time, but especially good at night for oil control).</p>

<h3>6. Eye Cream</h3>
<p>Peptide-rich eye creams work overnight on fine lines.</p>

<h3>7. Rich Moisturizer or Sleeping Mask</h3>
<p>Lock everything in. Ceramide-rich creams or occlusive sleeping packs are perfect.</p>

<h2>Ingredients That Belong to One Time Slot</h2>
<ul>
<li><strong>Vitamin C</strong> — Morning</li>
<li><strong>Retinol</strong> — Night only</li>
<li><strong>Sunscreen</strong> — Morning</li>
<li><strong>AHA/BHA</strong> — Night (sun sensitivity)</li>
<li><strong>Niacinamide</strong> — Either</li>
<li><strong>Hyaluronic acid</strong> — Either</li>
<li><strong>Peptides</strong> — Night ideally</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
<li><strong>Heavy moisturizer in the morning.</strong> Causes pilling under sunscreen and makeup.</li>
<li><strong>Retinol in the AM.</strong> Sun deactivates it and increases sensitivity.</li>
<li><strong>Skipping cleanse before bed.</strong> Sunscreen and pollution clog pores overnight.</li>
<li><strong>Same products day and night.</strong> Misses 50% of the routine's potential.</li>
</ul>

<h2>Sleep, Hydration, and the Routine</h2>
<p>Sleep is when your skin actually does the work. If you sleep 5 hours, no serum will save you. Aim for 7-9 hours, drink water through the day, and your routine will work twice as hard.</p>`,
    content_ar: `<h2>الوظيفتين اللي بتعملهم بشرتك</h2>
<p>بشرتك بتعمل اشياء مختلفة جذرياً نهاراً وليلاً. <strong>بالنهار، بتحمي حالها</strong> من الأشعة، التلوّث، والشوارد الحرّة. <strong>بالليل، بتصلح</strong> — تجدّد الخلايا بيوصل لذروته بين الـ 11 ليلاً والـ 4 صباحاً.</p>

<h2>روتين الصبح: وضع الدفاع</h2>

<h3>1. منظّف لطيف</h3>
<p>ما اتوسّختي وأنتي نايمة. رشّة ماي أو منظّف لطيف بحموضة منخفضة كفاية. الإفراط بالتنظيف بالصبح بيدمّر الحاجز.</p>

<h3>2. تونر مرطّب</h3>
<p>صحّي البشرة. التونرات الكورية الصباحية كتير مرات فيها كافيين أو خلاصة جينسنغ لتأثير مفتّح.</p>

<h3>3. سيروم مضاد أكسدة (فيتامين C)</h3>
<p>هاد نجم الصبح. فيتامين C بيعادل الشوارد الحرّة من الأشعة والتلوّث. كمان بيعزّز فعالية الـ SPF. استعملي صيغة مستقرّة زي <strong>حمض الأسكوربيك 10-15%</strong>.</p>

<h3>4. مرطّب خفيف</h3>
<p>قوامات جل-كريم مثاليّة. أنتي بتحضّري لواقي الشمس — مرطّب ثقيل + واقي + مكياج وصفة للتقشير.</p>

<h3>5. SPF 50+ PA++++</h3>
<p>غير قابل للتفاوض. ضرر الأشعة تراكمي. أعيدي التطبيق كل 2-3 ساعات لو طالعة برّا.</p>

<h2>روتين المساء: وضع الإصلاح</h2>

<h3>1. منظّف زيتي</h3>
<p>بيشيل واقي الشمس والأوساخ الزيتية. دلّكيه على بشرة جافة لـ 60 ثانية.</p>

<h3>2. منظّف مائي</h3>
<p>التنظيف الثاني لوجه نظيف فعلاً.</p>

<h3>3. مقشّر (2-3 ليالي بالأسبوع)</h3>
<p>BHA للبشرة الدهنية/معرّضة لحب الشباب، AHA للجافة/الباهتة، PHA للحسّاسة.</p>

<h3>4. تونر + إسنس</h3>
<p>ترطيب قبل العلاج.</p>

<h3>5. سيروم علاج</h3>
<p>هون الليل بيتألّق. <strong>الريتينول</strong> (يعزّز تجدّد الخلايا)، <strong>الببتيدات</strong> (تبني الكولاجين)، أو <strong>النياسيناميد</strong>.</p>

<h3>6. كريم العين</h3>
<p>كريمات العين الغنيّة بالببتيدات بتشتغل بالليل على الخطوط الدقيقة.</p>

<h3>7. مرطّب غني أو ماسك نوم</h3>
<p>اقفلي كل اشي. كريمات سيراميد غنيّة أو sleeping packs مغلقة مثاليّة.</p>

<h2>مكوّنات بتنتمي لوقت واحد</h2>
<ul>
<li><strong>فيتامين C</strong> — صبح</li>
<li><strong>ريتينول</strong> — مساء فقط</li>
<li><strong>واقي شمس</strong> — صبح</li>
<li><strong>AHA/BHA</strong> — مساء (حساسية للشمس)</li>
<li><strong>نياسيناميد</strong> — أي وقت</li>
<li><strong>حمض الهيالورونيك</strong> — أي وقت</li>
<li><strong>الببتيدات</strong> — مساء بشكل مثالي</li>
</ul>

<h2>أخطاء شائعة</h2>
<ul>
<li><strong>مرطّب ثقيل بالصبح.</strong> بيسبّب تقشير تحت واقي الشمس والمكياج.</li>
<li><strong>ريتينول بالصبح.</strong> الشمس بتعطّله وتزيد الحساسية.</li>
<li><strong>إهمال التنظيف قبل النوم.</strong> واقي الشمس والتلوّث بيسدّوا المسامات بالليل.</li>
<li><strong>نفس المنتجات نهار وليل.</strong> بتضيّع 50% من إمكانيّات الروتين.</li>
</ul>

<h2>النوم، الترطيب، والروتين</h2>
<p>النوم هو لمّا بشرتك بتعمل الشغل فعلاً. إذا نمتي 5 ساعات، ولا سيروم رح ينقذك. هدفي لـ 7-9 ساعات، اشربي ماي طول اليوم، وروتينك رح يشتغل ضعف.</p>`,
    published_at: "2026-05-09T08:00:00Z",
  },
  {
    slug: "korean-skincare-teen-skin-safe-products",
    title: "Korean Skincare for Teen Skin: Safe Products for Young Faces",
    excerpt:
      "Teens have specific skin needs — hormonal breakouts, oily T-zones, and a barrier that's still developing. Here's the gentle K-beauty routine that won't backfire.",
    seo_title: "Korean Skincare for Teens: Safe K-Beauty Routine 2026",
    seo_description:
      "A safe, gentle Korean skincare routine for teen skin. Hormonal acne, oil control, and what to avoid. Built for skin under 19 with affordable Korean picks.",
    tags: ["teen skincare", "young skin", "korean skincare", "acne", "gentle routine"],
    cover_image: COVERS.pink1,
    title_ar: "العناية الكورية لبشرة المراهقين: منتجات آمنة للوجوه الصغيرة",
    excerpt_ar:
      "المراهقين عندهم احتياجات بشرة محدّدة — حبوب هرمونية، منطقة T دهنية، وحاجز لسا بتطوّر. هاد روتين K-beauty لطيف ما رح يرتدّ.",
    seo_title_ar: "العناية الكورية للمراهقين: روتين آمن 2026",
    seo_description_ar:
      "روتين عناية كوري آمن ولطيف لبشرة المراهقين. حبوب هرمونية، التحكّم بالزيوت، وإيش تتجنّب. مصمّم للبشرة تحت الـ 19.",
    tags_ar: ["عناية للمراهقين", "بشرة صغيرة", "عناية كورية", "حب الشباب", "روتين لطيف"],
    content: `<h2>Why Teen Skin Is Different</h2>
<p>Teen skin produces 2-3x more sebum than adult skin due to puberty hormones (androgens). Pores enlarge, the T-zone shines, and acne shows up. But teen skin is also <strong>more resilient and heals faster</strong> than adult skin — which means the wrong harsh routine can damage a barrier that's still maturing.</p>
<p>The mistake most teens make: using everything they see on TikTok at once.</p>

<h2>The Teen-Safe 4-Step Routine</h2>

<h3>1. Gentle Foam Cleanser</h3>
<p>Twice a day. Look for "low-pH" and "for sensitive skin." Avoid anything with strong fragrance or sulfates. <strong>CosRX Low pH Good Morning Cleanser</strong> is a teen-favorite for a reason.</p>

<h3>2. Centella or Tea Tree Toner</h3>
<p>Calms breakouts without harsh alcohol. Press into skin after cleansing.</p>

<h3>3. Lightweight Gel Moisturizer</h3>
<p>Even oily teen skin needs moisture. Skipping moisturizer triggers <strong>more oil</strong> as your skin overcompensates.</p>

<h3>4. Sunscreen (AM Only)</h3>
<p>The single biggest favor you can do your future skin. Korean sunscreens are light, non-greasy, and won't break out a teen face.</p>

<h2>Add If Needed</h2>
<ul>
<li><strong>Hydrocolloid pimple patches</strong> — pull pus out and protect the spot from picking.</li>
<li><strong>BHA 1-2 nights/week</strong> for blackheads or oily T-zone (start gentle).</li>
<li><strong>Niacinamide serum</strong> for acne marks and oil control.</li>
</ul>

<h2>What Teens Should Absolutely Avoid</h2>
<ul>
<li><strong>Retinol</strong> under age 25 unless prescribed by a derm.</li>
<li><strong>Daily strong AHAs.</strong> Too much for a young barrier.</li>
<li><strong>Heavy anti-aging creams.</strong> Wasted money and pore-clogging.</li>
<li><strong>Layering 10 products.</strong> 4-5 is plenty.</li>
<li><strong>Picking pimples.</strong> Picking causes scars that take years to fade.</li>
</ul>

<h2>Common Teen Skincare Myths</h2>
<p><strong>"Toothpaste dries pimples."</strong> It also burns the skin. Use a pimple patch instead.</p>
<p><strong>"I have oily skin, I don't need moisturizer."</strong> You do — and skipping it makes oil worse.</p>
<p><strong>"Tanning hides acne."</strong> UV damages skin and makes post-acne marks last longer.</p>

<h2>Diet and Skin</h2>
<p>Dairy and high-glycemic foods (white bread, sugary drinks) are linked to teen acne in multiple studies. You don't have to give them up — but if you have stubborn acne, try cutting dairy for 6 weeks and see what happens.</p>

<h2>When to See a Dermatologist</h2>
<p>If breakouts are <strong>cystic</strong> (large painful bumps under the skin), <strong>scarring</strong>, or <strong>not responding to gentle care in 3 months</strong>, see a derm. Skincare supports treatment; it doesn't replace it.</p>

<h2>The Long-Term Plan</h2>
<p>Teen skincare is about building good habits and protecting the future. Sunscreen now means less hyperpigmentation at 30. Gentle care now means a healthy barrier at 40. You're investing in your skin's next decade.</p>`,
    content_ar: `<h2>ليش بشرة المراهقين مختلفة</h2>
<p>بشرة المراهقين بتنتج 2-3 أضعاف الزيوت اللي بتنتجها بشرة البالغين بسبب هرمونات البلوغ (الأندروجينات). المسامات بتكبر، منطقة T بتلمع، والحبوب بتطلع. بس بشرة المراهقين كمان <strong>أكثر مرونة وبتشفي أسرع</strong> من بشرة البالغين — يعني الروتين القاسي الخطأ ممكن يدمّر حاجز لسا بنضج.</p>
<p>الغلطة اللي بيعملها أغلب المراهقين: استعمال كل اشي بيشوفوه على TikTok بنفس الوقت.</p>

<h2>الروتين الآمن للمراهقين بـ 4 خطوات</h2>

<h3>1. منظّف رغوي لطيف</h3>
<p>مرّتين باليوم. دوّري على "حموضة منخفضة" و"للبشرة الحسّاسة". تجنّبي أي شي فيه عطر قوي أو سلفات. <strong>CosRX Low pH Good Morning Cleanser</strong> مفضّل عند المراهقين لسبب.</p>

<h3>2. تونر سنتيلا أو شجرة الشاي</h3>
<p>بيهدّي الحبوب بدون كحول قاسي. اضغطيه على البشرة بعد التنظيف.</p>

<h3>3. مرطّب جل خفيف</h3>
<p>حتى بشرة المراهقين الدهنية بدّها ترطيب. إهمال المرطّب بيحفّز <strong>زيوت أكثر</strong> لأنّ بشرتك بتعوّض زيادة.</p>

<h3>4. واقي شمس (صبح فقط)</h3>
<p>أكبر معروف ممكن تعمليه لبشرة مستقبلك. الواقيات الكورية خفيفة، غير دهنية، وما رح تطلّع حبوب على وجه مراهق.</p>

<h2>ضيفي إذا بدّك</h2>
<ul>
<li><strong>لاصقات حبوب هيدروكولويد</strong> — بتسحب الصديد وبتحمي البقعة من النكش.</li>
<li><strong>BHA 1-2 ليالي بالأسبوع</strong> للرؤوس السوداء أو منطقة T الدهنية (ابدي بلطف).</li>
<li><strong>سيروم نياسيناميد</strong> لآثار الحبوب والتحكّم بالزيوت.</li>
</ul>

<h2>إيش لازم المراهقين يتجنّبوا قطعاً</h2>
<ul>
<li><strong>الريتينول</strong> تحت الـ 25 إلا لو وصفه طبيب جلدية.</li>
<li><strong>AHA قوي يومياً.</strong> كتير على حاجز صغير.</li>
<li><strong>كريمات ضد التجاعيد الثقيلة.</strong> مصاري ضايعة وبتسدّ المسامات.</li>
<li><strong>تطبيق 10 منتجات.</strong> 4-5 كفاية.</li>
<li><strong>نكش الحبوب.</strong> النكش بيسبّب ندوب بتاخد سنين تختفي.</li>
</ul>

<h2>خرافات شائعة عن عناية المراهقين</h2>
<p><strong>"معجون الأسنان بيجفّف الحبوب."</strong> كمان بيحرق البشرة. استعملي لاصقة حبوب بدالها.</p>
<p><strong>"عندي بشرة دهنية، ما بدّي مرطّب."</strong> بدّك — وإهماله بيخلّي الزيوت أسوأ.</p>
<p><strong>"السمرة بتخفّي الحبوب."</strong> الأشعة بتضرّ البشرة وبتخلّي آثار الحبوب تطوّل.</p>

<h2>الأكل والبشرة</h2>
<p>الحليب ومنتجاته والمأكولات عالية الجلايسيمك (الخبز الأبيض، المشروبات السكّرية) مرتبطة بحب الشباب عند المراهقين بدراسات متعدّدة. ما بدّك توقفيها — بس إذا عندك حبوب عنيدة، جرّبي توقفي الحليب لـ 6 أسابيع وشوفي إيش بيصير.</p>

<h2>متى تشوفي طبيب جلدية</h2>
<p>إذا الحبوب <strong>كيسية</strong> (نتوءات كبيرة مؤلمة تحت الجلد)، <strong>بتترك ندوب</strong>، أو <strong>ما بتستجيب للعناية اللطيفة بعد 3 شهور</strong>، شوفي طبيب جلدية. العناية بتدعم العلاج؛ ما بتعوّضه.</p>

<h2>الخطة طويلة المدى</h2>
<p>عناية المراهقين بناء عادات منيحة وحماية المستقبل. واقي الشمس هلق يعني تصبّغات أقل بعمر 30. العناية اللطيفة هلق يعني حاجز سليم بعمر 40. أنتي بتستثمري بعقد بشرتك الجاي.</p>`,
    published_at: "2026-05-08T08:00:00Z",
  },
  {
    slug: "korean-eye-creams-dark-circles-puffiness-guide",
    title: "Korean Eye Creams: Targeting Dark Circles and Puffiness",
    excerpt:
      "Korean eye creams aren't just moisturizer for your under-eyes — they use specific actives that target dark circles, puffiness, and fine lines. Here's how to pick one.",
    seo_title: "Korean Eye Creams Guide: Dark Circles & Puffiness 2026",
    seo_description:
      "The best Korean eye creams for dark circles and puffy eyes. Learn caffeine, peptides, retinol, and how to apply for visible results in 4 weeks.",
    tags: ["eye cream", "dark circles", "puffiness", "korean skincare", "under-eye"],
    cover_image: COVERS.cream1,
    title_ar: "كريمات العين الكورية: استهداف الهالات والانتفاخ",
    excerpt_ar:
      "كريمات العين الكورية مش بس مرطّب لتحت العين — بتستعمل مكوّنات محدّدة تستهدف الهالات، الانتفاخ، والخطوط الدقيقة. هاد كيف تختاري واحد.",
    seo_title_ar: "كريمات العين الكورية: دليل الهالات والانتفاخ 2026",
    seo_description_ar:
      "أحسن كريمات العين الكورية للهالات والعيون المنتفخة. اعرفي عن الكافيين، الببتيدات، الريتينول، وكيف تطبّقيهم لنتائج خلال 4 أسابيع.",
    tags_ar: ["كريم عين", "هالات", "انتفاخ", "عناية كورية", "تحت العين"],
    content: `<h2>Why the Under-Eye Area Is Different</h2>
<p>The skin under your eyes is <strong>about 0.5 mm thick</strong> — five times thinner than the rest of your face. There are fewer oil glands, and the muscles under it move constantly. That's why this area shows tiredness, age, and dehydration first.</p>
<p>A regular face moisturizer is too thick. A dedicated eye cream uses lighter textures and targeted actives.</p>

<h2>The Three Under-Eye Problems</h2>

<h3>1. Dark Circles</h3>
<p>Caused by genetics, thin skin showing blood vessels, or pigmentation. Korean eye creams use <strong>niacinamide, vitamin C, and licorice root</strong> to lighten visible darkness. For pigmentation, give it 8-12 weeks.</p>

<h3>2. Puffiness</h3>
<p>Caused by fluid retention, salt, or lack of sleep. <strong>Caffeine</strong> in eye creams constricts blood vessels and de-puffs in minutes. Apply with a cold roller for amplified effect.</p>

<h3>3. Fine Lines</h3>
<p><strong>Peptides</strong> stimulate collagen. <strong>Retinol</strong> (low concentration only — 0.025% max for eye area) boosts cell turnover. Hyaluronic acid plumps up dehydration lines.</p>

<h2>Korean Eye Cream Picks</h2>
<ul>
<li><strong>Anua Heartleaf Eye Cream</strong> — niacinamide + heartleaf for calming and brightening.</li>
<li><strong>Goodal Green Tangerine Vita C Dark Spot Eye Cream</strong> — vitamin C derivative for dark circles.</li>
<li><strong>Beauty of Joseon Revive Eye Serum</strong> — ginseng + peptides for general anti-aging.</li>
<li><strong>Mizon Snail Repair Eye Cream</strong> — snail mucin for repair and hydration.</li>
</ul>

<h2>How to Apply Eye Cream Correctly</h2>
<ol>
<li>Use your <strong>ring finger</strong> — it has the lightest pressure.</li>
<li>Dab a rice-grain amount under each eye.</li>
<li>Tap gently from the outer corner inward, then up to the brow bone.</li>
<li>Do NOT rub or pull — that creates fine lines over time.</li>
<li>Wait 1 minute before applying moisturizer.</li>
</ol>

<h2>The Right Order in Your Routine</h2>
<p>Eye cream goes <strong>after serums, before moisturizer</strong>. If you use a sleeping mask, eye cream goes under it.</p>

<h2>What Eye Cream Can't Fix</h2>
<p>Genetics, lack of sleep, dehydration, and allergies all play a role. If your dark circles are mainly hereditary (you've had them since childhood), the eye cream will help but won't erase them.</p>
<p>For visible puffiness, also check your salt intake, sleep position (elevated head helps), and seasonal allergies.</p>

<h2>The Cold Spoon Trick</h2>
<p>Keep two metal spoons in the fridge. After applying eye cream, press the back of the cold spoons against the under-eye area for 30 seconds. The cold combined with caffeine in your eye cream visibly de-puffs.</p>

<h2>When to Start Eye Cream</h2>
<p>Late 20s is when most people see early changes. But hydration-focused eye creams (hyaluronic acid, snail mucin) are safe from your early 20s onward. Hold off on strong retinol eye creams until you're 30+.</p>`,
    content_ar: `<h2>ليش منطقة تحت العين مختلفة</h2>
<p>الجلد تحت عيونك <strong>سماكته حوالي 0.5 ملم</strong> — خمس أضعاف أرفع من باقي الوجه. عدد الغدد الزيتية أقل، والعضلات تحته بتتحرّك باستمرار. لهيك هاي المنطقة بتظهر التعب، العمر، والجفاف أوّل اشي.</p>
<p>مرطّب الوجه العادي ثقيل كتير. كريم عين مخصّص بستعمل قوامات أخفّ ومكوّنات مستهدفة.</p>

<h2>المشاكل التلاتة تحت العين</h2>

<h3>1. الهالات</h3>
<p>بتسبّبها الجينات، الجلد الرفيع اللي بيظهر الأوعية الدموية، أو التصبّغ. كريمات العين الكورية بتستعمل <strong>نياسيناميد، فيتامين C، وجذر العرقسوس</strong> لتفتيح الظلال المرئية. للتصبّغ، أعطيها 8-12 أسبوع.</p>

<h3>2. الانتفاخ</h3>
<p>بيسبّبه احتباس السوائل، الملح، أو قلّة النوم. <strong>الكافيين</strong> بكريمات العين بيضيّق الأوعية الدموية ويزيل الانتفاخ بدقايق. طبّقيه مع رولر بارد لتأثير مضاعف.</p>

<h3>3. الخطوط الدقيقة</h3>
<p><strong>الببتيدات</strong> بتحفّز الكولاجين. <strong>الريتينول</strong> (تركيز منخفض فقط — 0.025% كحد أقصى لمنطقة العين) بيعزّز تجدّد الخلايا. حمض الهيالورونيك بيملأ خطوط الجفاف.</p>

<h2>اختيارات كريمات عين كورية</h2>
<ul>
<li><strong>Anua Heartleaf Eye Cream</strong> — نياسيناميد + هارت ليف للتهدئة والتفتيح.</li>
<li><strong>Goodal Green Tangerine Vita C Dark Spot Eye Cream</strong> — مشتقّ فيتامين C للهالات.</li>
<li><strong>Beauty of Joseon Revive Eye Serum</strong> — جينسنغ + ببتيدات لمقاومة الشيخوخة العامة.</li>
<li><strong>Mizon Snail Repair Eye Cream</strong> — مخاط حلزون للإصلاح والترطيب.</li>
</ul>

<h2>كيف تطبّقي كريم العين صح</h2>
<ol>
<li>استعملي <strong>الإصبع الخنصر-البنصر</strong> — ضغطه أخفّ.</li>
<li>حطّي كمية بحجم حبّة الأرز تحت كل عين.</li>
<li>اضغطي بلطف من الزاوية الخارجية للداخل، وبعدها لعظمة الحاجب.</li>
<li>لا تفركي أو تشدّي — هاد بيخلق خطوط دقيقة مع الوقت.</li>
<li>استنّي دقيقة قبل ما تحطّي المرطّب.</li>
</ol>

<h2>الترتيب الصحيح بروتينك</h2>
<p>كريم العين بيجي <strong>بعد السيرومات، قبل المرطّب</strong>. إذا بتستعملي ماسك نوم، كريم العين بيجي تحته.</p>

<h2>إيش ما يقدر كريم العين يصلحه</h2>
<p>الجينات، قلّة النوم، الجفاف، والحساسية كلّهم بيلعبوا دور. إذا هالاتك أكثرها وراثية (موجودة من الطفولة)، كريم العين رح يساعد بس ما رح يمحيها.</p>
<p>للانتفاخ الواضح، كمان شيكي كميّة الملح، وضعية النوم (رفع الراس بساعد)، والحساسية الموسمية.</p>

<h2>حيلة الملعقة الباردة</h2>
<p>خلّي ملعقتين معدن بالثلّاجة. بعد ما تطبّقي كريم العين، اضغطي ظهر الملاعق الباردة تحت العين لـ 30 ثانية. البرودة مع الكافيين بكريم العين بتزيل الانتفاخ بشكل مرئي.</p>

<h2>متى تبدي بكريم العين</h2>
<p>أواخر العشرينات لمّا أغلب الناس بيشوفوا تغييرات مبكّرة. بس كريمات العين اللي بتركّز على الترطيب (حمض الهيالورونيك، مخاط الحلزون) آمنة من بداية العشرينات. أجّلي كريمات العين القوية بالريتينول لحد عمر 30+.</p>`,
    published_at: "2026-05-07T08:00:00Z",
  },
  {
    slug: "korean-toners-explained-hydration-not-astringent",
    title: "Korean Toners Explained: Hydration, Not Astringent",
    excerpt:
      "Forget the burning, alcohol-heavy toners of the 90s. Korean toners are hydrating, pH-balancing, and the secret to plumper skin. Here's how to use one.",
    seo_title: "Korean Toners Explained: How They're Different From Western Toners",
    seo_description:
      "Korean toners hydrate instead of strip. Learn the difference, the 7-skin method, and the best Korean toners for every skin type.",
    tags: ["korean toner", "hydrating toner", "7-skin method", "k-beauty basics"],
    cover_image: COVERS.bottles4,
    title_ar: "التونرات الكورية: ترطيب مش قبض",
    excerpt_ar:
      "انسي تونرات التسعينات الحارقة والمليانة كحول. التونرات الكورية مرطّبة، بتوازن الحموضة، وسرّ البشرة الممتلئة. هاد كيف تستعمليها.",
    seo_title_ar: "التونرات الكورية: شرح الفرق عن التونرات الغربية",
    seo_description_ar:
      "التونرات الكورية بترطّب مش بتجفّف. اعرفي الفرق، طريقة الـ 7-skin، وأحسن التونرات الكورية لكل نوع بشرة.",
    tags_ar: ["تونر كوري", "تونر مرطّب", "طريقة 7-skin", "أساسيات K-beauty"],
    content: `<h2>The Old Toner Was a Mistake</h2>
<p>If you grew up with toners that burned, smelled like alcohol, and left your skin tight — that wasn't doing you any favors. Western "astringent" toners were designed to strip oil. They worked, but they also damaged the skin barrier.</p>
<p>Korean toners are a completely different product. They're <strong>hydrating, pH-balancing essences in toner form</strong>.</p>

<h2>What a Korean Toner Actually Does</h2>
<ul>
<li>Rebalances pH after cleansing (cleansers leave skin slightly alkaline; toner brings it back to ~5.5).</li>
<li>Hydrates so the next steps absorb better.</li>
<li>Delivers actives like niacinamide, snail mucin, centella, or fermented yeast.</li>
<li>Acts as a base layer for the rest of your routine.</li>
</ul>

<h2>The 7-Skin Method</h2>
<p>The most famous Korean toner technique. Apply hydrating toner <strong>7 times</strong> in a row, each layer absorbed before the next. The result: skin that looks visibly plumper and glassier. Best for dry or dehydrated skin.</p>
<p>For most people, <strong>3-4 layers</strong> is enough.</p>

<h2>The Best Korean Toners by Skin Type</h2>

<h3>Dry Skin</h3>
<ul>
<li><strong>Hada Labo Gokujyun Toner</strong> — five types of hyaluronic acid.</li>
<li><strong>Beauty of Joseon Glow Replenishing Rice Milk</strong> — rice extract for soft hydration.</li>
</ul>

<h3>Oily / Acne-Prone</h3>
<ul>
<li><strong>SKIN1004 Madagascar Centella Toning Toner</strong> — centella for breakouts.</li>
<li><strong>Some By Mi AHA-BHA-PHA 30 Days Miracle Toner</strong> — gentle exfoliating toner.</li>
</ul>

<h3>Sensitive Skin</h3>
<ul>
<li><strong>Anua Heartleaf 77% Soothing Toner</strong> — calms redness.</li>
<li><strong>Pyunkang Yul Essence Toner</strong> — milk vetch, just five ingredients.</li>
</ul>

<h3>Mature / Brightening</h3>
<ul>
<li><strong>COSRX Galactomyces 95 Tone Balancing Essence</strong> — fermented yeast for glow.</li>
<li><strong>Beauty of Joseon Glow Replenishing Rice Milk</strong> — also brightens.</li>
</ul>

<h2>How to Apply</h2>
<p>Two methods, depending on your goal:</p>
<ul>
<li><strong>Hands (recommended):</strong> Pour into palms, press into damp skin. Pat gently. Don't rub.</li>
<li><strong>Cotton pad:</strong> Better for AHA/BHA toners. Wipe across the face.</li>
</ul>

<h2>What Korean Toner Is NOT</h2>
<p>A Korean toner is not the same as Western astringent. If a toner contains <strong>denatured alcohol or witch hazel as the second ingredient</strong>, it's an old-school stripping toner. Most Korean brands skip alcohol entirely.</p>

<h2>Signs Your Toner Is Working</h2>
<ul>
<li>Skin feels plumper within minutes of application.</li>
<li>Your other products absorb faster.</li>
<li>No tightness after cleansing.</li>
<li>Skin looks visibly more "bouncy" within 2 weeks.</li>
</ul>

<h2>Storage and Shelf Life</h2>
<p>Korean toners don't need refrigeration, but keeping them cool in summer feels great on skin and extends potency. Most have a 12-month shelf life once opened.</p>`,
    content_ar: `<h2>التونر القديم كان غلطة</h2>
<p>إذا تربيتي على تونرات كانت بتحرق، بتشمّي ريحة كحول، وبتترك بشرتك مشدودة — هاد ما كان بيعمل إلك معروف. التونرات الغربية "القابضة" كانت مصمّمة لتزيل الزيوت. اشتغلت، بس كمان دمّرت حاجز البشرة.</p>
<p>التونرات الكورية منتج مختلف تماماً. هي <strong>إسنسات مرطّبة وموازنة للحموضة بقوام تونر</strong>.</p>

<h2>إيش بيعمل التونر الكوري فعلاً</h2>
<ul>
<li>بيعيد توازن الحموضة بعد التنظيف (المنظّفات بتترك البشرة قلوية شويّ؛ التونر بيرجّعها لـ 5.5).</li>
<li>بيرطّب عشان الخطوات الجاي تمتص أحسن.</li>
<li>بيوصل مكوّنات نشطة زي النياسيناميد، مخاط الحلزون، السنتيلا، أو الخميرة المتخمّرة.</li>
<li>بيعمل طبقة أساس لباقي روتينك.</li>
</ul>

<h2>طريقة الـ 7-Skin</h2>
<p>أشهر تقنية للتونر الكوري. طبّقي تونر مرطّب <strong>7 مرّات</strong> ورا بعض، كل طبقة بتمتص قبل الجاي. النتيجة: بشرة بتبيّن أكثر امتلاء ولامعة. الأنسب للبشرة الجافة أو المجفّفة.</p>
<p>لأغلب الناس، <strong>3-4 طبقات</strong> كفاية.</p>

<h2>أحسن التونرات الكورية حسب نوع البشرة</h2>

<h3>بشرة جافة</h3>
<ul>
<li><strong>Hada Labo Gokujyun Toner</strong> — خمس أنواع هيالورونيك.</li>
<li><strong>Beauty of Joseon Glow Replenishing Rice Milk</strong> — خلاصة الأرز للترطيب الناعم.</li>
</ul>

<h3>دهنية / معرّضة لحب الشباب</h3>
<ul>
<li><strong>SKIN1004 Madagascar Centella Toning Toner</strong> — سنتيلا للحبوب.</li>
<li><strong>Some By Mi AHA-BHA-PHA 30 Days Miracle Toner</strong> — تونر تقشير لطيف.</li>
</ul>

<h3>بشرة حسّاسة</h3>
<ul>
<li><strong>Anua Heartleaf 77% Soothing Toner</strong> — يهدّي الاحمرار.</li>
<li><strong>Pyunkang Yul Essence Toner</strong> — milk vetch، خمس مكوّنات بس.</li>
</ul>

<h3>ناضجة / مفتّحة</h3>
<ul>
<li><strong>COSRX Galactomyces 95 Tone Balancing Essence</strong> — خميرة للوهج.</li>
<li><strong>Beauty of Joseon Glow Replenishing Rice Milk</strong> — كمان بيفتّح.</li>
</ul>

<h2>كيف تطبّقيه</h2>
<p>طريقتين، حسب هدفك:</p>
<ul>
<li><strong>اليدين (موصى):</strong> صبّيه براحة يدك، اضغطيه على بشرة رطبة. ربّتي بلطف. ما تفركي.</li>
<li><strong>قطنة:</strong> أحسن لتونرات AHA/BHA. امسحيها على الوجه.</li>
</ul>

<h2>إيش التونر الكوري مش</h2>
<p>التونر الكوري مش زي القابض الغربي. إذا التونر فيه <strong>كحول مغيّر طبيعته أو هاماميليس كثاني مكوّن</strong>، هو تونر قديم مجفّف. أغلب الماركات الكورية بتتجاوز الكحول تماماً.</p>

<h2>علامات إنّ تونرك بشتغل</h2>
<ul>
<li>البشرة بتحسّيها أكثر امتلاء خلال دقايق من التطبيق.</li>
<li>منتجاتك التانية بتمتص أسرع.</li>
<li>ما في شدّ بعد التنظيف.</li>
<li>البشرة بتبيّن أكثر "نفّاشة" خلال أسبوعين.</li>
</ul>

<h2>التخزين والصلاحية</h2>
<p>التونرات الكورية ما بدّها ثلّاجة، بس خليها بمكان بارد بالصيف بيحسّيك منيحة على البشرة وبيمدّ الفعالية. أغلبها مدّة 12 شهر بعد الفتح.</p>`,
    published_at: "2026-05-06T08:00:00Z",
  },
  {
    slug: "ultimate-guide-korean-essences",
    title: "The Ultimate Guide to Korean Essences",
    excerpt:
      "An essence is the heart of every Korean skincare routine — but most people skip it because they don't know what it does. Here's everything you need.",
    seo_title: "Korean Essences: The Complete Guide for 2026 | GlowReaJo",
    seo_description:
      "What is an essence, why it's different from toner and serum, and the best Korean essences for every skin type. The K-beauty step that changes your skin.",
    tags: ["essence", "korean skincare", "K-beauty", "skincare guide", "hydration"],
    cover_image: COVERS.serum1,
    title_ar: "الدليل الشامل للإسنسات الكورية",
    excerpt_ar:
      "الإسنس قلب كل روتين عناية كوري — بس أغلب الناس بتتخطّاه لأنّها ما بتعرف إيش بيعمل. هاد كل اللي بدّك تعرفيه.",
    seo_title_ar: "الإسنسات الكورية: الدليل الشامل 2026 | غلو ريجو",
    seo_description_ar:
      "إيش الإسنس، ليش مختلف عن التونر والسيروم، وأحسن الإسنسات الكورية لكل نوع بشرة. الخطوة الكورية اللي بتغيّر بشرتك.",
    tags_ar: ["إسنس", "عناية كورية", "K-beauty", "دليل عناية", "ترطيب"],
    content: `<h2>What Is an Essence?</h2>
<p>An essence is a lightweight, watery liquid that sits between toner and serum. It's the "soul" of Korean skincare — the step Korean dermatologists insist no routine should skip. Essences hydrate, condition, and deliver concentrated actives to skin that's already prepped.</p>
<p>Think of it like this: toner is a base layer, essence is the treatment, serum is the targeted fix.</p>

<h2>Essence vs Toner vs Serum</h2>
<ul>
<li><strong>Toner:</strong> Watery, focused on pH and basic hydration.</li>
<li><strong>Essence:</strong> Slightly thicker, focused on conditioning and overall skin health.</li>
<li><strong>Serum:</strong> Concentrated, targets specific problems (acne, pigmentation, lines).</li>
</ul>
<p>If you're choosing one to skip in a tight budget, skip serum first, not essence. Essence builds the foundation.</p>

<h2>The Hero Ingredients in Korean Essences</h2>

<h3>Galactomyces Ferment Filtrate</h3>
<p>The famous fermented yeast from <strong>SK-II Pitera</strong>. Brightens, refines texture, and boosts cell turnover. <strong>COSRX Galactomyces 95</strong> is the affordable version.</p>

<h3>Snail Mucin</h3>
<p>Snail secretion filtrate. Repairs the skin barrier, fades scars, and adds soft hydration. <strong>COSRX Advanced Snail 96 Mucin Power Essence</strong> is iconic.</p>

<h3>Bifida Ferment Lysate</h3>
<p>A probiotic that strengthens the skin barrier and is anti-aging. Found in <strong>Missha Time Revolution The First Treatment Essence</strong>.</p>

<h3>Propolis</h3>
<p>Bee-derived, with antibacterial and healing properties. <strong>Beauty of Joseon Propolis Synergy Toner</strong> straddles the line between toner and essence.</p>

<h2>Top Korean Essences</h2>
<ul>
<li><strong>SK-II Facial Treatment Essence</strong> — the original (and pricey) Pitera essence.</li>
<li><strong>COSRX Advanced Snail 96 Mucin Power Essence</strong> — affordable, cult-favorite.</li>
<li><strong>Missha Time Revolution The First Treatment Essence</strong> — barrier repair.</li>
<li><strong>I'm From Mugwort Essence</strong> — calming for sensitive skin.</li>
<li><strong>Beauty of Joseon Glow Replenishing Rice Milk</strong> — rice-based brightening.</li>
</ul>

<h2>How to Apply an Essence</h2>
<ol>
<li>After toner, while skin is still slightly damp.</li>
<li>Pour a coin-sized amount into your palms.</li>
<li>Press into face — don't rub.</li>
<li>Wait 30-60 seconds before the next step.</li>
</ol>

<h2>Can You Use Two Essences?</h2>
<p>Yes — this is the famous "essence + serum" Korean stack. A hydrating essence (like snail mucin) followed by a targeted serum (like vitamin C) is a power combination. Just make sure the textures go from thinnest to thickest.</p>

<h2>When You'll See Results</h2>
<p>Hydration improves <strong>immediately</strong>. Brightening shows in <strong>3-4 weeks</strong>. Texture refinement and visible glow take <strong>6-8 weeks</strong>. Korean essences are about consistency, not quick fixes.</p>

<h2>The Skip-an-Essence Mistake</h2>
<p>Many newcomers to K-beauty go straight from toner to serum, thinking essence is "just another step." But essence preps the skin to absorb serum at maximum efficiency. Without it, your serum is doing 60% of the work it could.</p>`,
    content_ar: `<h2>إيش هو الإسنس؟</h2>
<p>الإسنس سائل خفيف ومائي بيجي بين التونر والسيروم. هو "روح" العناية الكورية — الخطوة اللي أطبّاء الجلد الكوريين بصرّوا إنّ ولا روتين لازم يتخطّاها. الإسنسات بترطّب، تغذّي، وتوصل مكوّنات نشطة مركّزة لبشرة محضّرة.</p>
<p>فكّري فيها هيك: التونر طبقة أساس، الإسنس العلاج، السيروم الإصلاح المستهدف.</p>

<h2>إسنس مقابل تونر مقابل سيروم</h2>
<ul>
<li><strong>التونر:</strong> مائي، بيركّز على الحموضة والترطيب الأساسي.</li>
<li><strong>الإسنس:</strong> أسمك شويّ، بيركّز على التغذية وصحة البشرة العامة.</li>
<li><strong>السيروم:</strong> مركّز، بيستهدف مشاكل محدّدة (حب شباب، تصبّغات، خطوط).</li>
</ul>
<p>إذا بدّك تختاري واحد تتخطّيه بميزانية ضيّقة، تخطّي السيروم أوّل، مو الإسنس. الإسنس بيبني الأساس.</p>

<h2>المكوّنات البطلة بالإسنسات الكورية</h2>

<h3>غالاكتوميسس Ferment Filtrate</h3>
<p>الخميرة المتخمّرة الشهيرة من <strong>SK-II Pitera</strong>. بتفتّح، بتنعّم القوام، وتعزّز تجدّد الخلايا. <strong>COSRX Galactomyces 95</strong> هو النسخة الاقتصادية.</p>

<h3>مخاط الحلزون</h3>
<p>إفراز الحلزون المرشّح. بيصلح حاجز البشرة، يفتّح الندوب، ويضيف ترطيب ناعم. <strong>COSRX Advanced Snail 96 Mucin Power Essence</strong> أيقوني.</p>

<h3>Bifida Ferment Lysate</h3>
<p>بروبيوتيك بيقوّي حاجز البشرة وضد الشيخوخة. موجود بـ <strong>Missha Time Revolution The First Treatment Essence</strong>.</p>

<h3>البروبوليس</h3>
<p>من النحل، بخصائص مضادّة بكتيريا ومداواة. <strong>Beauty of Joseon Propolis Synergy Toner</strong> بيتنقّل بين التونر والإسنس.</p>

<h2>أحسن الإسنسات الكورية</h2>
<ul>
<li><strong>SK-II Facial Treatment Essence</strong> — الأصل (وغالي) Pitera.</li>
<li><strong>COSRX Advanced Snail 96 Mucin Power Essence</strong> — اقتصادي، مفضّل الجمهور.</li>
<li><strong>Missha Time Revolution The First Treatment Essence</strong> — إصلاح الحاجز.</li>
<li><strong>I'm From Mugwort Essence</strong> — مهدّي للبشرة الحسّاسة.</li>
<li><strong>Beauty of Joseon Glow Replenishing Rice Milk</strong> — تفتيح بالأرز.</li>
</ul>

<h2>كيف تطبّقي الإسنس</h2>
<ol>
<li>بعد التونر، والبشرة لسا رطبة شويّ.</li>
<li>صبّي كميّة بحجم قطعة نقد براحة يدك.</li>
<li>اضغطيها على الوجه — ما تفركي.</li>
<li>استنّي 30-60 ثانية قبل الخطوة الجاي.</li>
</ol>

<h2>هل ممكن تستعملي إسنسين؟</h2>
<p>أيوا — هاي تركيبة "الإسنس + السيروم" الكورية الشهيرة. إسنس مرطّب (زي مخاط الحلزون) بعدها سيروم مستهدف (زي فيتامين C) تركيبة قوية. بس تأكّدي إنّ القوامات بتمشي من الأخفّ للأسمك.</p>

<h2>متى رح تشوفي نتائج</h2>
<p>الترطيب بتحسّن <strong>فوراً</strong>. التفتيح بيبيّن خلال <strong>3-4 أسابيع</strong>. تنعيم القوام والوهج الواضح بياخدوا <strong>6-8 أسابيع</strong>. الإسنسات الكورية عن الاستمرارية، مش الحلول السريعة.</p>

<h2>غلطة تخطّي الإسنس</h2>
<p>كتير ناس جداد للـ K-beauty بيروحوا مباشرة من التونر للسيروم، بفكّروا إنّ الإسنس "مجرّد خطوة تانية". بس الإسنس بحضّر البشرة لتمتص السيروم بأقصى كفاءة. بدونه، سيرومك بعمل 60% من الشغل اللي ممكن يعمله.</p>`,
    published_at: "2026-05-05T08:00:00Z",
  },
  {
    slug: "skin-barrier-repair-k-beauty-damaged-skin",
    title: "Skin Barrier Repair: The K-Beauty Way to Heal Compromised Skin",
    excerpt:
      "Tightness, redness, stinging when you apply products? Your skin barrier is broken. Here's the gentle Korean routine that rebuilds it in 4 weeks.",
    seo_title: "Skin Barrier Repair: K-Beauty Routine for Damaged Skin 2026",
    seo_description:
      "Signs of a damaged skin barrier and how to repair it with ceramides, centella, and snail mucin. A 4-week Korean recovery routine for sensitized skin.",
    tags: ["skin barrier", "damaged skin", "ceramides", "korean skincare", "repair"],
    cover_image: COVERS.green2,
    title_ar: "إصلاح حاجز البشرة: طريقة K-beauty لشفاء البشرة المتضرّرة",
    excerpt_ar:
      "شدّ، احمرار، لسعة لمّا تطبّقي منتجات؟ حاجز بشرتك مكسور. هاد الروتين الكوري اللطيف اللي بيعيد بنائه خلال 4 أسابيع.",
    seo_title_ar: "إصلاح حاجز البشرة: روتين K-beauty للبشرة المتضرّرة 2026",
    seo_description_ar:
      "علامات حاجز بشرة متضرّر وكيف تصلحيه بالسيراميدات، السنتيلا، ومخاط الحلزون. روتين تعافي كوري 4 أسابيع.",
    tags_ar: ["حاجز البشرة", "بشرة متضرّرة", "سيراميدات", "عناية كورية", "إصلاح"],
    content: `<h2>What Is the Skin Barrier?</h2>
<p>Your skin barrier is the outermost layer — a wall of skin cells (corneocytes) held together by lipids (ceramides, cholesterol, fatty acids). Its job is to keep moisture in and irritants out. When it's healthy, your skin is smooth, hydrated, and resilient. When it's damaged, everything stings.</p>

<h2>Signs Your Barrier Is Damaged</h2>
<ul>
<li>Burning or stinging when you apply normally-tolerated products.</li>
<li>Constant tightness, even after moisturizer.</li>
<li>Redness that doesn't fade.</li>
<li>Tiny flakes or rough patches.</li>
<li>Breakouts that don't respond to acne treatments.</li>
<li>Skin looks dull or shiny in a wet/oily way.</li>
</ul>

<h2>Common Causes</h2>
<ol>
<li><strong>Over-exfoliating</strong> (daily acids, scrubbing).</li>
<li><strong>Retinol introduced too fast.</strong></li>
<li><strong>Harsh foaming cleansers</strong> with sulfates.</li>
<li><strong>Layering too many active ingredients.</strong></li>
<li><strong>Sunburn or windburn.</strong></li>
<li><strong>Stripping cosmetic procedures</strong> done at home (DIY peels).</li>
</ol>

<h2>The 4-Week Recovery Routine</h2>

<h3>Week 1: Stop Everything Active</h3>
<ul>
<li>Cream cleanser only — no foam, no acids.</li>
<li>Hydrating toner (no actives).</li>
<li>Ceramide moisturizer applied 2-3x daily.</li>
<li>Sunscreen.</li>
</ul>
<p>Skip: AHA, BHA, retinol, vitamin C, fragranced products, sheet masks.</p>

<h3>Week 2: Add Soothing Layers</h3>
<ul>
<li>Add a centella-based essence after toner.</li>
<li>Continue ceramide moisturizer.</li>
<li>If skin feels stable, add a snail mucin essence at night.</li>
</ul>

<h3>Week 3: Stable, Not Stripped</h3>
<ul>
<li>By now, redness should be fading.</li>
<li>You can introduce a panthenol or madecassoside serum.</li>
<li>Still no acids or retinol.</li>
</ul>

<h3>Week 4: Slowly Reintroduce Actives</h3>
<ul>
<li>If everything looks calm, you can use a low-dose niacinamide (5%).</li>
<li>Vitamin C can return — but use a buffered form like sodium ascorbyl phosphate.</li>
<li>Still skip retinol and strong acids for one more week.</li>
</ul>

<h2>Star Repair Ingredients</h2>
<ul>
<li><strong>Ceramides</strong> — rebuild the wall.</li>
<li><strong>Centella asiatica</strong> — anti-inflammatory.</li>
<li><strong>Madecassoside</strong> — extract of centella, deeply soothing.</li>
<li><strong>Panthenol (B5)</strong> — heals micro-damage.</li>
<li><strong>Snail mucin</strong> — repair and barrier strengthening.</li>
<li><strong>Beta-glucan</strong> — anti-inflammatory polysaccharide.</li>
</ul>

<h2>Top Korean Barrier-Repair Products</h2>
<ul>
<li><strong>Dr.Jart+ Ceramidin Cream</strong> — ceramides, holy-grail for damaged skin.</li>
<li><strong>SKIN1004 Centella Ampoule</strong> — concentrated soothing.</li>
<li><strong>COSRX Snail 96 Mucin</strong> — barrier repair essence.</li>
<li><strong>Pyunkang Yul Moisture Cream</strong> — minimalist, no fragrance.</li>
</ul>

<h2>What NOT to Do While Healing</h2>
<ul>
<li>Don't try a new product. You can't tell what's reacting.</li>
<li>Don't go to a spa for chemical peels.</li>
<li>Don't use cleansing brushes or konjac sponges.</li>
<li>Don't moisturize less to "let it dry out" — that's the worst advice.</li>
</ul>

<h2>How Long for Full Recovery</h2>
<p>Mild damage: <strong>2-4 weeks</strong>. Moderate: <strong>4-8 weeks</strong>. Severe (after a chemical burn or aggressive routine): <strong>3-6 months</strong>. The key is patience. Most people get impatient and reintroduce actives at week 2, then the damage returns.</p>`,
    content_ar: `<h2>إيش هو حاجز البشرة؟</h2>
<p>حاجز بشرتك هو الطبقة الخارجية — جدار من خلايا الجلد (الكوريوسايتس) ممسوكة ببعض بالليبيدات (سيراميدات، كوليسترول، أحماض دهنية). وظيفته يحبس الرطوبة جوا والمهيّجات برّا. لمّا يكون سليم، بشرتك ناعمة، مرطّبة، ومرنة. لمّا يتضرّر، كل اشي بيوخز.</p>

<h2>علامات إنّ حاجزك متضرّر</h2>
<ul>
<li>حرقة أو لسعة لمّا تطبّقي منتجات بشكل طبيعي بتتحمّليها.</li>
<li>شدّ مستمر، حتى بعد المرطّب.</li>
<li>احمرار ما بيختفي.</li>
<li>قشور صغيرة أو بقع خشنة.</li>
<li>حبوب ما بتستجيب لعلاجات حب الشباب.</li>
<li>البشرة بتبيّن باهتة أو لامعة بشكل رطب/زيتي.</li>
</ul>

<h2>الأسباب الشائعة</h2>
<ol>
<li><strong>الإفراط بالتقشير</strong> (أحماض يومية، فرك).</li>
<li><strong>إدخال الريتينول بسرعة كتير.</strong></li>
<li><strong>منظّفات رغوية قاسية</strong> بسلفات.</li>
<li><strong>تطبيق مكوّنات نشطة كتير.</strong></li>
<li><strong>حروق شمس أو رياح.</strong></li>
<li><strong>إجراءات تجميلية مجفّفة</strong> بالبيت (تقشير DIY).</li>
</ol>

<h2>روتين التعافي 4 أسابيع</h2>

<h3>الأسبوع 1: أوقفي كل شي نشط</h3>
<ul>
<li>منظّف كريمي فقط — لا رغوة، لا أحماض.</li>
<li>تونر مرطّب (بلا مكوّنات نشطة).</li>
<li>مرطّب سيراميد طبّقيه 2-3 مرات باليوم.</li>
<li>واقي شمس.</li>
</ul>
<p>تجاهلي: AHA، BHA، ريتينول، فيتامين C، منتجات معطّرة، ماسكات ورقية.</p>

<h3>الأسبوع 2: ضيفي طبقات مهدّية</h3>
<ul>
<li>ضيفي إسنس سنتيلا بعد التونر.</li>
<li>كمّلي مرطّب السيراميد.</li>
<li>إذا حسّيتي البشرة مستقرّة، ضيفي إسنس مخاط حلزون بالليل.</li>
</ul>

<h3>الأسبوع 3: مستقرّة، مش متجرّدة</h3>
<ul>
<li>هلق، الاحمرار لازم يبدا يختفي.</li>
<li>ممكن تدخّلي سيروم بانثينول أو ماديكاسوسايد.</li>
<li>لسا لا أحماض ولا ريتينول.</li>
</ul>

<h3>الأسبوع 4: ارجاع المكوّنات النشطة ببطء</h3>
<ul>
<li>إذا كل شي بيبيّن هادي، ممكن تستعملي نياسيناميد بجرعة منخفضة (5%).</li>
<li>فيتامين C ممكن يرجع — بس استعملي صيغة مخفّفة زي صوديوم أسكوربيل فوسفات.</li>
<li>لسا تجاهلي الريتينول والأحماض القوية لأسبوع إضافي.</li>
</ul>

<h2>المكوّنات نجوم الإصلاح</h2>
<ul>
<li><strong>السيراميدات</strong> — بتعيد بناء الجدار.</li>
<li><strong>السنتيلا أسياتيكا</strong> — مضاد للالتهاب.</li>
<li><strong>الماديكاسوسايد</strong> — خلاصة السنتيلا، مهدّي بعمق.</li>
<li><strong>البانثينول (B5)</strong> — يشفي الضرر الميكروي.</li>
<li><strong>مخاط الحلزون</strong> — إصلاح وتقوية الحاجز.</li>
<li><strong>بيتا-جلوكان</strong> — سكّر متعدّد مضاد للالتهاب.</li>
</ul>

<h2>أحسن منتجات إصلاح الحاجز الكورية</h2>
<ul>
<li><strong>Dr.Jart+ Ceramidin Cream</strong> — سيراميدات، الحلّ المقدّس للبشرة المتضرّرة.</li>
<li><strong>SKIN1004 Centella Ampoule</strong> — تهدئة مركّزة.</li>
<li><strong>COSRX Snail 96 Mucin</strong> — إسنس إصلاح الحاجز.</li>
<li><strong>Pyunkang Yul Moisture Cream</strong> — بسيط، بلا عطر.</li>
</ul>

<h2>إيش لا تعملي وأنتي بتشفي</h2>
<ul>
<li>ما تجرّبي منتج جديد. ما تقدري تعرفي إيش بيعمل ردّة فعل.</li>
<li>ما تروحي للسبا لتقشير كيميائي.</li>
<li>ما تستعملي فراشي تنظيف أو إسفنج كونجاك.</li>
<li>ما ترطّبي أقل عشان "تخلّيها تجفّ" — هاي أسوأ نصيحة.</li>
</ul>

<h2>قدّيش بياخد التعافي الكامل</h2>
<p>ضرر خفيف: <strong>2-4 أسابيع</strong>. متوسّط: <strong>4-8 أسابيع</strong>. حادّ (بعد حرق كيميائي أو روتين عدواني): <strong>3-6 شهور</strong>. المفتاح الصبر. أغلب الناس بفقدوا الصبر ويرجّعوا المكوّنات النشطة بالأسبوع 2، وبعدها الضرر بيرجع.</p>`,
    published_at: "2026-05-04T08:00:00Z",
  },
  {
    slug: "tranexamic-acid-korean-skincare-hyperpigmentation",
    title: "Tranexamic Acid and Korean Skincare: Lightening Hyperpigmentation",
    excerpt:
      "Tranexamic acid is the under-the-radar Korean ingredient that lightens stubborn dark spots faster than vitamin C. Here's how to use it safely.",
    seo_title: "Tranexamic Acid in Korean Skincare: The Best Hyperpigmentation Fix",
    seo_description:
      "Tranexamic acid lightens melasma, post-acne marks, and sun spots. Learn how to use it in your K-beauty routine, what to pair with, and what to avoid.",
    tags: ["tranexamic acid", "hyperpigmentation", "dark spots", "melasma", "korean skincare"],
    cover_image: COVERS.serum2,
    title_ar: "حمض الترانيكساميك والعناية الكورية: تفتيح التصبّغات",
    excerpt_ar:
      "حمض الترانيكساميك هو المكوّن الكوري المخفي اللي بفتّح البقع الغامقة العنيدة أسرع من فيتامين C. هاد كيف تستعمليه بأمان.",
    seo_title_ar: "حمض الترانيكساميك بالعناية الكورية: أحسن حل للتصبّغات",
    seo_description_ar:
      "حمض الترانيكساميك بفتّح الكلف، آثار حب الشباب، وبقع الشمس. اعرفي كيف تستعمليه بروتين K-beauty، مع إيش تجمعيه، وإيش تتجنّبي.",
    tags_ar: ["حمض ترانيكساميك", "تصبّغات", "بقع غامقة", "كلف", "عناية كورية"],
    content: `<h2>What Is Tranexamic Acid?</h2>
<p>Tranexamic acid (TXA) was originally a medication for heavy bleeding. Dermatologists noticed it lightened pigmentation in patients, and the cosmetics industry took notice. It's now one of the most effective topical brighteners available — and it works on melasma, which is notoriously hard to treat.</p>

<h2>How It Works</h2>
<p>TXA blocks plasmin (an enzyme) and reduces the signaling between UV-stressed cells and melanocytes. Less signaling = less melanin = lighter pigmentation. It also calms inflammation, so it works on post-acne marks too.</p>

<h2>Why Korean Skincare Loves It</h2>
<p>Korean dermatologists have used oral TXA for years. The topical formulations became mainstream in K-beauty around 2022. The advantage over vitamin C: <strong>tranexamic acid doesn't oxidize, doesn't sting, and works on melasma</strong> — the type of pigmentation vitamin C struggles with.</p>

<h2>What It Treats</h2>
<ul>
<li><strong>Melasma</strong> — the brown patches on cheeks, forehead, upper lip from hormones and sun.</li>
<li><strong>Post-inflammatory hyperpigmentation</strong> — dark marks left after acne or scratches.</li>
<li><strong>Sun spots</strong> — uneven brown freckling from years of UV.</li>
<li><strong>Overall uneven tone.</strong></li>
</ul>

<h2>Korean Tranexamic Acid Products</h2>
<ul>
<li><strong>SKINMISO Pore Beauty TXA Toner</strong> — TXA + niacinamide.</li>
<li><strong>Some By Mi V10 Vitamin Serum</strong> — TXA in a multi-vitamin blend.</li>
<li><strong>Goodal Green Tangerine Vita C Dark Spot Serum</strong> — vitamin C + TXA combo.</li>
<li><strong>Medicube AGE-R Booster Serum</strong> — TXA with peptides.</li>
</ul>

<h2>How to Use Tranexamic Acid</h2>
<ol>
<li>Cleanse and tone as usual.</li>
<li>Apply TXA serum to clean skin.</li>
<li>Wait 1 minute.</li>
<li>Continue with moisturizer.</li>
<li>Sunscreen in the morning is essential — TXA doesn't make you sun-sensitive, but UV will undo all the lightening you're working for.</li>
</ol>

<h2>What to Pair With</h2>
<ul>
<li><strong>Niacinamide</strong> — both lighten pigmentation through different paths. Use together morning or night.</li>
<li><strong>Hyaluronic acid</strong> — hydration always pairs well.</li>
<li><strong>Sunscreen</strong> — non-negotiable.</li>
</ul>

<h2>What to Avoid Pairing</h2>
<ul>
<li><strong>Strong AHA the same day</strong> — over-exfoliation cancels the benefit.</li>
<li><strong>Retinol on the same night</strong> — can irritate. Alternate evenings instead.</li>
</ul>

<h2>Expected Timeline</h2>
<ul>
<li><strong>Week 2-4:</strong> No visible change. The product is working under the surface.</li>
<li><strong>Week 6-8:</strong> Lighter post-acne marks. Skin looks more even.</li>
<li><strong>Week 12+:</strong> Melasma starts fading. Sun spots smaller.</li>
</ul>
<p>Consistency matters more than concentration. A 2% TXA used daily beats a 5% used sporadically.</p>

<h2>Why Jordan Climate Matters</h2>
<p>Jordan gets <strong>320+ days of sun per year</strong>. UV-driven pigmentation is the most common skin complaint here. TXA pairs perfectly with daily SPF 50+ Korean sunscreens. Without sunscreen, no brightener works.</p>

<h2>Side Effects</h2>
<p>TXA is one of the gentlest brighteners. Most users report no side effects. Sensitive skin may notice mild tingling at first; if so, start every other day for two weeks.</p>`,
    content_ar: `<h2>إيش هو حمض الترانيكساميك؟</h2>
<p>حمض الترانيكساميك (TXA) كان أصلاً دوا للنزيف الشديد. أطبّاء الجلد لاحظوا إنّه بيفتّح التصبّغات عند المرضى، وصناعة مستحضرات التجميل لقطت. هلق هو واحد من أكثر المفتّحات الموضعية فعالية متوفّرة — وبشتغل على الكلف، اللي مشهور صعب علاجه.</p>

<h2>كيف بشتغل</h2>
<p>TXA بيوقف البلازمين (إنزيم) ويقلّل الإشارة بين الخلايا المتضرّرة من الأشعة والميلانوسايتس. إشارة أقل = ميلانين أقل = تصبّغ أفتح. كمان بيهدّي الالتهاب، فبشتغل على آثار حب الشباب كمان.</p>

<h2>ليش العناية الكورية بتحبه</h2>
<p>أطبّاء الجلد الكوريين بستعملوا TXA الفموي من سنين. الصيغ الموضعية صارت رائجة بالـ K-beauty حوالي 2022. الميزة عن فيتامين C: <strong>حمض الترانيكساميك ما بتأكسد، ما بيوخز، وبشتغل على الكلف</strong> — نوع التصبّغ اللي فيتامين C بتعب معاه.</p>

<h2>إيش بعالج</h2>
<ul>
<li><strong>الكلف</strong> — البقع البنّية على الخدود، الجبهة، الشفة العليا من الهرمونات والشمس.</li>
<li><strong>التصبّغات ما بعد الالتهاب</strong> — العلامات الغامقة اللي بتظلّ بعد الحبوب أو الخدوش.</li>
<li><strong>بقع الشمس</strong> — نمش بنّي غير متساوي من سنين الأشعة.</li>
<li><strong>اللون غير المتساوي بشكل عام.</strong></li>
</ul>

<h2>منتجات حمض الترانيكساميك الكورية</h2>
<ul>
<li><strong>SKINMISO Pore Beauty TXA Toner</strong> — TXA + نياسيناميد.</li>
<li><strong>Some By Mi V10 Vitamin Serum</strong> — TXA بخليط متعدّد الفيتامينات.</li>
<li><strong>Goodal Green Tangerine Vita C Dark Spot Serum</strong> — فيتامين C + TXA.</li>
<li><strong>Medicube AGE-R Booster Serum</strong> — TXA مع ببتيدات.</li>
</ul>

<h2>كيف تستعملي حمض الترانيكساميك</h2>
<ol>
<li>نظّفي ووجي كالعادة.</li>
<li>طبّقي سيروم TXA على بشرة نظيفة.</li>
<li>استنّي دقيقة.</li>
<li>كمّلي بالمرطّب.</li>
<li>واقي الشمس بالصبح أساسي — TXA ما بخلّيك حسّاسة للشمس، بس الأشعة رح تلغي كل التفتيح اللي بتشتغلي عليه.</li>
</ol>

<h2>إيش تجمعي معاه</h2>
<ul>
<li><strong>نياسيناميد</strong> — كلاهما بفتّح التصبّغ بطرق مختلفة. استعمليهم سوا صبح أو مساء.</li>
<li><strong>حمض الهيالورونيك</strong> — الترطيب دايماً بناسب.</li>
<li><strong>واقي شمس</strong> — غير قابل للتفاوض.</li>
</ul>

<h2>إيش تتجنّبي تجمعي معاه</h2>
<ul>
<li><strong>AHA قوي بنفس اليوم</strong> — الإفراط بالتقشير بيلغي الفايدة.</li>
<li><strong>ريتينول بنفس الليلة</strong> — ممكن يهيّج. بدّلي الأمسيات بدالاً من ذلك.</li>
</ul>

<h2>الجدول الزمني المتوقّع</h2>
<ul>
<li><strong>الأسبوع 2-4:</strong> ما في تغيير ظاهر. المنتج بشتغل تحت السطح.</li>
<li><strong>الأسبوع 6-8:</strong> آثار حبوب أخفّ. البشرة بتبيّن أكثر تساوي.</li>
<li><strong>الأسبوع 12+:</strong> الكلف يبدا يختفي. بقع الشمس أصغر.</li>
</ul>
<p>الاستمرارية أهم من التركيز. 2% TXA يومياً بيغلب 5% بشكل متقطّع.</p>

<h2>ليش مناخ الأردن مهم</h2>
<p>الأردن بحصل على <strong>أكثر من 320 يوم شمس بالسنة</strong>. التصبّغات من الأشعة هي أكثر شكوى بشرة شائعة هون. TXA بناسب تماماً مع واقي شمس كوري SPF 50+ يومي. بدون واقي شمس، ولا مفتّح بشتغل.</p>

<h2>الآثار الجانبية</h2>
<p>TXA واحد من أنعم المفتّحات. أغلب المستخدمين ما بحكوا عن آثار جانبية. البشرة الحسّاسة ممكن تلاحظ وخز خفيف بالبداية؛ إذا حصل، ابدي يوم بيوم لأسبوعين.</p>`,
    published_at: "2026-05-03T08:00:00Z",
  },
  {
    slug: "slugging-overnight-korean-skincare-hack",
    title: "Slugging: The Overnight Korean Skincare Hack Explained",
    excerpt:
      "Slathering Vaseline on your face at night sounds wrong — until you try it. Here's why slugging works, who should do it, and the K-beauty alternatives.",
    seo_title: "Slugging: The Overnight Korean Skincare Trend Explained",
    seo_description:
      "What is slugging, why it works, and the best K-beauty products for it. A complete guide to the overnight occlusive that's transforming dry skin.",
    tags: ["slugging", "overnight skincare", "petrolatum", "korean skincare", "dry skin"],
    cover_image: COVERS.cream2,
    title_ar: "السلاغينغ: شرح الحيلة الكورية الليلية",
    excerpt_ar:
      "وضع الفازلين على وجهك بالليل بيبيّن غلط — لحدّ ما تجرّبيه. هاد ليش السلاغينغ بشتغل، مين لازم يعمله، وبدائل الـ K-beauty.",
    seo_title_ar: "السلاغينغ: شرح الترند الكوري الليلي",
    seo_description_ar:
      "إيش هو السلاغينغ، ليش بشتغل، وأحسن منتجات K-beauty له. دليل شامل للقفل الليلي اللي بيحوّل البشرة الجافة.",
    tags_ar: ["سلاغينغ", "عناية ليلية", "بترولاتوم", "عناية كورية", "بشرة جافة"],
    content: `<h2>What Is Slugging?</h2>
<p>Slugging is the K-beauty technique of finishing your nighttime routine with a thin layer of <strong>occlusive</strong> — usually petrolatum (Vaseline) or an equivalent. The occlusive seals everything underneath and prevents water loss overnight. You wake up with skin that looks glassy and feels deeply hydrated.</p>

<h2>Why It Works</h2>
<p>Your skin loses <strong>up to 25% of its water</strong> overnight through transepidermal water loss. Occlusives reduce this by 99%. When you lock in moisturizer with petrolatum, the active ingredients underneath have all night to work without evaporating.</p>

<h2>Who Should Try Slugging</h2>
<ul>
<li>Dry or very dry skin.</li>
<li>People with damaged barriers.</li>
<li>Anyone in dry, low-humidity climates (like Amman in winter).</li>
<li>Mature skin that needs extra retention.</li>
<li>People using retinol who experience flaking.</li>
</ul>

<h2>Who Should NOT Slug</h2>
<ul>
<li>Oily or acne-prone skin (it traps oil too).</li>
<li>Active breakouts (it can worsen them).</li>
<li>Anyone with fungal acne — petrolatum doesn't cause it but can trap fungi.</li>
</ul>

<h2>The K-Beauty Slugging Step-by-Step</h2>
<ol>
<li>Complete your full evening routine: cleanse, tone, essence, serum, moisturizer.</li>
<li>Wait 5 minutes for moisturizer to absorb.</li>
<li>Take a thin layer of petrolatum or occlusive — pea-sized for the whole face.</li>
<li>Warm between your fingers, then pat onto skin.</li>
<li>Sleep on a clean pillowcase.</li>
</ol>

<h2>What to Slug With</h2>
<ul>
<li><strong>Vaseline Original</strong> — the OG. Pure petrolatum.</li>
<li><strong>Aquaphor</strong> — petrolatum + lanolin + glycerin.</li>
<li><strong>Korean alternatives:</strong>
<ul>
<li>COSRX Advanced Snail 92 All-in-one Cream (less heavy, more skincare-y).</li>
<li>Laneige Cica Sleeping Mask.</li>
<li>Beauty of Joseon Dynasty Cream (a lighter occlusive alternative).</li>
</ul>
</li>
</ul>

<h2>What NOT to Slug Over</h2>
<ul>
<li><strong>Retinol or strong acids the same night.</strong> Occlusives intensify everything underneath — including irritation.</li>
<li><strong>A face still wet from toner.</strong> Wait for absorption.</li>
<li><strong>Active spot treatments.</strong> Slugging traps them and can sensitize the area.</li>
</ul>

<h2>How Often to Slug</h2>
<ul>
<li>Dry skin: 2-3 nights a week.</li>
<li>Very dry / winter: nightly is fine.</li>
<li>Combination: 1 night a week, focus on dry zones only.</li>
</ul>

<h2>What to Expect</h2>
<p>The first morning is the most dramatic — skin looks visibly plumper and feels velvet-soft. Long-term, slugging:</p>
<ul>
<li>Strengthens the skin barrier.</li>
<li>Reduces fine lines from dehydration.</li>
<li>Helps retinol users tolerate higher percentages.</li>
<li>Cuts down on flaking and tightness.</li>
</ul>

<h2>Common Slugging Mistakes</h2>
<ul>
<li>Using too much. A pea-sized amount is enough.</li>
<li>Slugging over uncleaned skin. The petrolatum traps the dirt too.</li>
<li>Skipping the moisturizer underneath. Petrolatum alone doesn't hydrate.</li>
<li>Not changing your pillowcase often.</li>
</ul>`,
    content_ar: `<h2>إيش هو السلاغينغ؟</h2>
<p>السلاغينغ تقنية K-beauty تختمي روتينك الليلي بطبقة رفيعة من <strong>مادة قافلة</strong> — غالباً البترولاتوم (فازلين) أو ما يعادله. القافل بيقفل كل اشي تحته ويمنع فقدان الماي بالليل. بتصحي ببشرة لامعة بتحسّيها مرطّبة بعمق.</p>

<h2>ليش بشتغل</h2>
<p>بشرتك بتفقد <strong>لحد 25% من ميّتها</strong> بالليل من خلال فقدان الماء عبر البشرة. القوافل بتقلّل هاد 99%. لمّا تقفلي المرطّب بالبترولاتوم، المكوّنات النشطة تحته عندها كل الليل لتشتغل بدون تبخّر.</p>

<h2>مين لازم يجرّب السلاغينغ</h2>
<ul>
<li>بشرة جافّة أو جافّة جداً.</li>
<li>ناس عندهم حواجز متضرّرة.</li>
<li>أيّ حدا بمناخات جافّة منخفضة الرطوبة (زي عمّان بالشتا).</li>
<li>بشرة ناضجة بتحتاج احتفاظ زيادة.</li>
<li>ناس بستعملوا ريتينول وبيواجهوا تقشّر.</li>
</ul>

<h2>مين لازم ما يعمل سلاغينغ</h2>
<ul>
<li>بشرة دهنية أو معرّضة لحب الشباب (بيحبس الزيوت كمان).</li>
<li>حبوب نشطة (ممكن يسوّيها أسوأ).</li>
<li>أيّ حدا عنده حب شباب فطري — البترولاتوم ما بسبّبه بس ممكن يحبس الفطريات.</li>
</ul>

<h2>خطوات السلاغينغ في K-beauty</h2>
<ol>
<li>كملّي روتينك المسائي الكامل: تنظيف، تونر، إسنس، سيروم، مرطّب.</li>
<li>استنّي 5 دقايق لما يمتص المرطّب.</li>
<li>خدي طبقة رفيعة من البترولاتوم أو القافل — بحجم حبّة البازيلا للوجه كلّه.</li>
<li>سخّنيه بين أصابعك، وبعدها ربّتيه على البشرة.</li>
<li>نامي على كيس مخدّة نظيف.</li>
</ol>

<h2>إيش تعملي سلاغينغ فيه</h2>
<ul>
<li><strong>Vaseline Original</strong> — الأصلي. بترولاتوم نقي.</li>
<li><strong>Aquaphor</strong> — بترولاتوم + لانولين + جلسرين.</li>
<li><strong>بدائل كورية:</strong>
<ul>
<li>COSRX Advanced Snail 92 All-in-one Cream (أقل ثقالة، أكثر اشي عناية).</li>
<li>Laneige Cica Sleeping Mask.</li>
<li>Beauty of Joseon Dynasty Cream (بديل قافل أخفّ).</li>
</ul>
</li>
</ul>

<h2>إيش ما تعملي سلاغينغ فوقه</h2>
<ul>
<li><strong>ريتينول أو أحماض قوية بنفس الليلة.</strong> القوافل بتكثّف كل اشي تحتها — بما فيه التهيّج.</li>
<li><strong>وجه لسا رطب من التونر.</strong> استنّي الامتصاص.</li>
<li><strong>علاجات بقع نشطة.</strong> السلاغينغ بيحبسهم وممكن يحسّس المنطقة.</li>
</ul>

<h2>كل قدّيش تعملي سلاغينغ</h2>
<ul>
<li>بشرة جافة: 2-3 ليالي بالأسبوع.</li>
<li>جافّة جداً / شتا: كل ليلة كمان كويس.</li>
<li>مختلطة: ليلة بالأسبوع، ركّزي على المناطق الجافّة بس.</li>
</ul>

<h2>إيش توقّعي</h2>
<p>الصباح الأوّل الأكثر دراماتيكية — البشرة بتبيّن أكثر امتلاء بشكل واضح وبتحسّيها ناعمة كالمخمل. على المدى الطويل، السلاغينغ:</p>
<ul>
<li>يقوّي حاجز البشرة.</li>
<li>يقلّل الخطوط الدقيقة من الجفاف.</li>
<li>يساعد مستخدمي الريتينول يتحمّلوا نسب أعلى.</li>
<li>يقلّل التقشّر والشدّ.</li>
</ul>

<h2>أخطاء سلاغينغ شائعة</h2>
<ul>
<li>استعمال كميّة كتيرة. حبّة بازيلا كفاية.</li>
<li>سلاغينغ على بشرة غير نظيفة. البترولاتوم بيحبس الأوساخ كمان.</li>
<li>إهمال المرطّب تحته. البترولاتوم لحاله ما بيرطّب.</li>
<li>عدم تغيير كيس المخدّة كل فترة.</li>
</ul>`,
    published_at: "2026-05-02T08:00:00Z",
  },
  {
    slug: "korean-sleeping-masks-overnight-treatments",
    title: "Korean Sleeping Masks: Overnight Treatments That Actually Work",
    excerpt:
      "Sleeping masks are the lazy genius of K-beauty — apply at night, wake up glowing. Here's why they work and the best Korean sleeping masks of 2026.",
    seo_title: "Korean Sleeping Masks: Best Overnight K-Beauty Treatments 2026",
    seo_description:
      "Korean sleeping masks are the overnight skin treatment that delivers visible results. Best picks for dry, oily, dull, and acne-prone skin.",
    tags: ["sleeping mask", "overnight treatment", "korean skincare", "K-beauty", "glow"],
    cover_image: COVERS.spa1,
    title_ar: "ماسكات النوم الكورية: علاجات ليلية بتشتغل فعلاً",
    excerpt_ar:
      "ماسكات النوم هي العبقري الكسلان للـ K-beauty — طبّقيها بالليل، صحّي مشعّة. هاد ليش بتشتغل وأحسن ماسكات النوم الكورية 2026.",
    seo_title_ar: "ماسكات النوم الكورية: أحسن علاجات K-beauty الليلية 2026",
    seo_description_ar:
      "ماسكات النوم الكورية هي العلاج الليلي للبشرة اللي بيعطي نتائج واضحة. أحسن الاختيارات للبشرة الجافة، الدهنية، الباهتة، ومعرّضة الحبوب.",
    tags_ar: ["ماسك نوم", "علاج ليلي", "عناية كورية", "K-beauty", "وهج"],
    content: `<h2>What Is a Sleeping Mask?</h2>
<p>A sleeping mask (also called overnight mask or sleeping pack) is a leave-on treatment you apply as the last step of your night routine. It's lighter than slugging with petrolatum but heavier than a regular moisturizer. The texture is usually a gel-cream or thick gel, and it works while you sleep — when your skin's regenerative activity peaks.</p>

<h2>Why Korean Sleeping Masks Are Different</h2>
<p>Western sleeping masks are usually heavy creams marketed as "night cream." Korean sleeping masks are <strong>treatment-focused</strong>: they have target actives (vitamin C, retinol alternatives, niacinamide, AHAs, peptides) plus an occlusive base that locks them in. The result: you wake up looking like you had a facial.</p>

<h2>How to Use a Sleeping Mask</h2>
<ol>
<li>Apply as the <strong>last step</strong> of your evening routine (after moisturizer).</li>
<li>Use the amount the brand recommends — usually a small dollop.</li>
<li>Spread evenly, avoiding the eyes.</li>
<li>Don't go to bed wet — let it absorb for 5 minutes first.</li>
<li>Wash off in the morning with a gentle cleanser.</li>
</ol>

<h2>Sleeping Masks by Skin Type</h2>

<h3>Dry Skin</h3>
<ul>
<li><strong>Laneige Water Sleeping Mask</strong> — the original Korean sleeping mask.</li>
<li><strong>Tatcha Indigo Overnight Repair</strong> (Korean-inspired) — for super-dry skin.</li>
</ul>

<h3>Dull / Tired Skin</h3>
<ul>
<li><strong>Laneige Vitamin C Sleeping Mask</strong> — brightens overnight.</li>
<li><strong>Mediheal Vita Lightbeam Brightening Sleeping Mask</strong>.</li>
</ul>

<h3>Acne-Prone / Oily</h3>
<ul>
<li><strong>Innisfree Volcanic Sleeping Mask</strong> — pore-clarifying, BHA-based.</li>
<li><strong>Some By Mi AHA-BHA-PHA 30 Days Miracle Sleeping Mask</strong>.</li>
</ul>

<h3>Mature / Anti-Aging</h3>
<ul>
<li><strong>Sulwhasoo Overnight Vitalizing Mask</strong> — luxury option with ginseng.</li>
<li><strong>The History of Whoo Bichup Sleeping Repair Mask</strong>.</li>
</ul>

<h3>Sensitive / Calming</h3>
<ul>
<li><strong>Laneige Cica Sleeping Mask</strong> — centella for redness.</li>
<li><strong>I'm From Mugwort Cream</strong> — soothing botanical.</li>
</ul>

<h2>How Often to Use</h2>
<ul>
<li><strong>Hydrating sleeping masks:</strong> 2-3 times a week.</li>
<li><strong>Brightening or AHA-based:</strong> 1-2 times a week.</li>
<li><strong>Heavy occlusive (for very dry skin):</strong> Nightly is OK.</li>
</ul>

<h2>Sleeping Mask Mistakes</h2>
<ul>
<li><strong>Skipping moisturizer underneath.</strong> The mask is a sealer, not a replacement.</li>
<li><strong>Applying to dirty skin.</strong> Whatever you trap under the mask sits there all night.</li>
<li><strong>Sleeping on a satin pillowcase.</strong> Save the mask for cotton pillowcases — satin doesn't absorb, and the mask transfers off your face.</li>
<li><strong>Not removing in the morning.</strong> Leftover residue can cause buildup or breakouts.</li>
</ul>

<h2>Sleeping Mask vs Night Cream</h2>
<p>A night cream is your standard moisturizer. A sleeping mask is a <strong>weekly or bi-weekly treatment</strong>. Think of the night cream as your daily multivitamin and the sleeping mask as a B12 shot — both useful, different purposes.</p>

<h2>When You'll See Results</h2>
<p>The morning after your first sleeping mask, your skin will look visibly plumper and more even. Long-term consistency (twice a week for 8 weeks) gives noticeable improvement in tone, texture, and hydration.</p>`,
    content_ar: `<h2>إيش هو ماسك النوم؟</h2>
<p>ماسك النوم (كمان اسمه ماسك ليلي أو sleeping pack) علاج تتركيه على الوجه تطبّقيه كآخر خطوة بروتينك الليلي. أخفّ من السلاغينغ بالبترولاتوم بس أثقل من المرطّب العادي. القوام عادةً جل-كريم أو جل سميك، وبشتغل وأنتي نايمة — لمّا نشاط بشرتك التجديدي بيوصل لذروته.</p>

<h2>ليش ماسكات النوم الكورية مختلفة</h2>
<p>ماسكات النوم الغربية غالباً كريمات ثقيلة بتسوّق كـ "كريم ليلي". ماسكات النوم الكورية <strong>بتركّز على العلاج</strong>: فيها مكوّنات نشطة مستهدفة (فيتامين C، بدائل ريتينول، نياسيناميد، AHA، ببتيدات) بالإضافة لقاعدة قافلة تقفلهم. النتيجة: بتصحي شكلك كأنّك عاملة فيشل.</p>

<h2>كيف تستعملي ماسك النوم</h2>
<ol>
<li>طبّقيه كـ <strong>آخر خطوة</strong> بروتينك المسائي (بعد المرطّب).</li>
<li>استعملي الكمّية اللي بنصح فيها الماركة — عادةً قطرة صغيرة.</li>
<li>وزّعيه بالتساوي، تجنّبي العيون.</li>
<li>ما تنامي وأنتي مبلولة — خلّيه يمتص لـ 5 دقايق أوّل.</li>
<li>اغسليه بالصبح بمنظّف لطيف.</li>
</ol>

<h2>ماسكات النوم حسب نوع البشرة</h2>

<h3>بشرة جافّة</h3>
<ul>
<li><strong>Laneige Water Sleeping Mask</strong> — ماسك النوم الكوري الأصلي.</li>
<li><strong>Tatcha Indigo Overnight Repair</strong> (بإلهام كوري) — للبشرة الجافة جداً.</li>
</ul>

<h3>بشرة باهتة / تعبانة</h3>
<ul>
<li><strong>Laneige Vitamin C Sleeping Mask</strong> — يفتّح بالليل.</li>
<li><strong>Mediheal Vita Lightbeam Brightening Sleeping Mask</strong>.</li>
</ul>

<h3>بشرة معرّضة لحب الشباب / دهنية</h3>
<ul>
<li><strong>Innisfree Volcanic Sleeping Mask</strong> — منظّف للمسامات، بـ BHA.</li>
<li><strong>Some By Mi AHA-BHA-PHA 30 Days Miracle Sleeping Mask</strong>.</li>
</ul>

<h3>بشرة ناضجة / ضد التقدّم بالعمر</h3>
<ul>
<li><strong>Sulwhasoo Overnight Vitalizing Mask</strong> — خيار فاخر بالجينسنغ.</li>
<li><strong>The History of Whoo Bichup Sleeping Repair Mask</strong>.</li>
</ul>

<h3>حسّاسة / مهدّية</h3>
<ul>
<li><strong>Laneige Cica Sleeping Mask</strong> — سنتيلا للاحمرار.</li>
<li><strong>I'm From Mugwort Cream</strong> — نباتي مهدّي.</li>
</ul>

<h2>كل قدّيش</h2>
<ul>
<li><strong>ماسكات نوم مرطّبة:</strong> 2-3 مرات بالأسبوع.</li>
<li><strong>مفتّحة أو بـ AHA:</strong> 1-2 مرة بالأسبوع.</li>
<li><strong>قافلة ثقيلة (للبشرة الجافة جداً):</strong> كل ليلة كمان ماشية.</li>
</ul>

<h2>أخطاء ماسك النوم</h2>
<ul>
<li><strong>إهمال المرطّب تحته.</strong> الماسك قافل، مش بديل.</li>
<li><strong>التطبيق على بشرة وسخة.</strong> أي اشي بتحبسيه تحت الماسك بيقعد طول الليل.</li>
<li><strong>النوم على كيس مخدّة ستان.</strong> احفظي الماسك لأكياس المخدّات القطنية — الستان ما بمتص، والماسك بنتقل من وجهك.</li>
<li><strong>عدم الإزالة بالصبح.</strong> البقايا ممكن تسبّب تراكم أو حبوب.</li>
</ul>

<h2>ماسك النوم مقابل كريم الليل</h2>
<p>كريم الليل هو مرطّبك القياسي. ماسك النوم <strong>علاج أسبوعي أو نص-أسبوعي</strong>. فكّري بكريم الليل كملتي-فيتامين يومي وماسك النوم كحقنة B12 — كلاهما مفيد، أغراض مختلفة.</p>

<h2>متى رح تشوفي نتائج</h2>
<p>الصباح بعد أوّل ماسك نوم، بشرتك رح تبيّن أكثر امتلاء وأكثر تساوي. الاستمرارية طويلة المدى (مرّتين بالأسبوع لـ 8 أسابيع) بتعطي تحسّن واضح بالنغمة، القوام، والترطيب.</p>`,
    published_at: "2026-05-01T08:00:00Z",
  },
  {
    slug: "korean-skincare-mature-skin-40-plus",
    title: "Korean Skincare for Mature Skin: A Routine for Skin Over 40",
    excerpt:
      "After 40, skin loses collagen, slows down cell turnover, and shows years of sun. Here's the Korean routine designed for visible firmness and glow at any age.",
    seo_title: "Korean Skincare for Mature Skin: Routine for 40+ Skin 2026",
    seo_description:
      "A targeted K-beauty routine for mature skin over 40. Peptides, retinol alternatives, ginseng, and the Korean approach to graceful, glowing aging.",
    tags: ["mature skin", "anti-aging", "korean skincare", "peptides", "ginseng"],
    cover_image: COVERS.cream2,
    title_ar: "العناية الكورية للبشرة الناضجة: روتين للبشرة فوق 40",
    excerpt_ar:
      "بعد الـ 40، البشرة بتخسر كولاجين، تجدّد خلاياها بيتباطأ، وبتظهر سنين الشمس. هاد الروتين الكوري المصمّم للنضارة والوهج المرئي بأي عمر.",
    seo_title_ar: "العناية الكورية للبشرة الناضجة: روتين فوق 40 سنة 2026",
    seo_description_ar:
      "روتين K-beauty مستهدف للبشرة الناضجة فوق 40. ببتيدات، بدائل ريتينول، جينسنغ، والنهج الكوري للتقدّم بالعمر بأناقة.",
    tags_ar: ["بشرة ناضجة", "مقاومة الشيخوخة", "عناية كورية", "ببتيدات", "جينسنغ"],
    content: `<h2>What Changes After 40</h2>
<p>After 40, skin produces <strong>30% less collagen</strong> than in your 20s. Cell turnover slows from every 28 days to every 45-50. Estrogen drops affect hydration. Years of sun exposure show up as uneven pigmentation. The barrier weakens, so skin gets drier and more sensitive.</p>
<p>The Korean approach to mature skin isn't to erase aging — it's to support skin's natural function so it ages gracefully.</p>

<h2>The Mature Skin Routine</h2>

<h3>Morning</h3>
<ol>
<li>Gentle cream cleanser.</li>
<li>Hydrating + brightening toner (look for ginseng or rice).</li>
<li>Vitamin C serum (15-20%) — antioxidant + brightening.</li>
<li>Peptide serum or eye cream.</li>
<li>Rich moisturizer with ceramides.</li>
<li>SPF 50+ PA++++ — non-negotiable.</li>
</ol>

<h3>Evening</h3>
<ol>
<li>Oil cleanser.</li>
<li>Cream cleanser.</li>
<li>AHA 1-2x weekly (gentle, not strong).</li>
<li>Toner (7-skin method recommended).</li>
<li>Snail mucin or fermented essence.</li>
<li>Retinol or bakuchiol serum (start 2x weekly).</li>
<li>Peptide ampoule.</li>
<li>Eye cream with peptides.</li>
<li>Rich moisturizer.</li>
<li>Sleeping mask 2-3 nights/week.</li>
</ol>

<h2>Hero Ingredients for Mature Skin</h2>
<ul>
<li><strong>Korean ginseng (Panax ginseng)</strong> — boosts circulation and skin energy.</li>
<li><strong>Peptides</strong> — signal collagen production.</li>
<li><strong>Retinol</strong> — gold-standard for cell turnover (start low).</li>
<li><strong>Bakuchiol</strong> — gentler retinol alternative.</li>
<li><strong>Niacinamide</strong> — brightens, strengthens barrier.</li>
<li><strong>Hyaluronic acid</strong> — plumps dehydration lines.</li>
<li><strong>Snail mucin</strong> — barrier repair.</li>
</ul>

<h2>Korean Lines for Mature Skin</h2>
<ul>
<li><strong>Sulwhasoo</strong> — luxury, ginseng-focused.</li>
<li><strong>The History of Whoo</strong> — premium herbal medicine inspired.</li>
<li><strong>Hera</strong> — modern luxury with peptides.</li>
<li><strong>Mizon Collagen Power Lifting Line</strong> — affordable, collagen-focused.</li>
<li><strong>SOME BY MI Retinol Intense</strong> — encapsulated retinol, mature skin friendly.</li>
</ul>

<h2>Common Mistakes After 40</h2>
<ul>
<li><strong>Using the same products you used at 25.</strong> Your skin's needs have changed.</li>
<li><strong>Skipping sunscreen.</strong> Most damage shows after 40 — and it accumulates daily.</li>
<li><strong>Stripping cleansers.</strong> Mature skin barriers are fragile.</li>
<li><strong>Over-treating.</strong> Multiple actives daily = inflammation, not results.</li>
<li><strong>Skipping the neck.</strong> The neck shows age fast. Extend everything down.</li>
</ul>

<h2>Lifestyle Factors That Matter More Now</h2>
<ul>
<li><strong>Sleep:</strong> Cortisol from poor sleep accelerates aging.</li>
<li><strong>Hydration:</strong> Drink 2-3L of water daily.</li>
<li><strong>Sugar intake:</strong> Glycation damages collagen.</li>
<li><strong>Sun:</strong> 80% of visible aging comes from UV.</li>
<li><strong>Stress:</strong> Cortisol breaks down collagen.</li>
</ul>

<h2>What Realistic Results Look Like</h2>
<p>After 8 weeks of consistent Korean skincare on mature skin, you should see:</p>
<ul>
<li>Softer, more hydrated skin.</li>
<li>Slight reduction in fine lines from hydration.</li>
<li>Brighter, more even tone.</li>
<li>Healthier-looking glow.</li>
</ul>
<p>Deep wrinkles and significant collagen loss aren't reversible with skincare alone. That's where in-clinic treatments (Botox, fillers, lasers) come in. Skincare maintains and supports; clinic treatments correct.</p>

<h2>The Korean Aging Philosophy</h2>
<p>Korean culture often celebrates "honey skin" — skin that looks dewy and well-cared-for at any age. The goal isn't to look 25 forever; it's to have healthy, hydrated, luminous skin that reflects how you live, not what year you were born.</p>`,
    content_ar: `<h2>إيش بتغيّر بعد الـ 40</h2>
<p>بعد الـ 40، البشرة بتنتج <strong>30% كولاجين أقل</strong> من العشرينات. تجدّد الخلايا بيتباطأ من كل 28 يوم لكل 45-50. انخفاض الإستروجين بيأثّر على الترطيب. سنين التعرّض للشمس بتظهر كتصبّغ غير متساوي. الحاجز بيضعف، فالبشرة بتصير أكثر جفاف وحساسية.</p>
<p>النهج الكوري للبشرة الناضجة مش لمحو الشيخوخة — هو لدعم الوظيفة الطبيعية للبشرة لتشيخ بأناقة.</p>

<h2>روتين البشرة الناضجة</h2>

<h3>الصبح</h3>
<ol>
<li>منظّف كريمي لطيف.</li>
<li>تونر مرطّب + مفتّح (دوّري على جينسنغ أو أرز).</li>
<li>سيروم فيتامين C (15-20%) — مضاد أكسدة + تفتيح.</li>
<li>سيروم ببتيدات أو كريم عين.</li>
<li>مرطّب غني بالسيراميدات.</li>
<li>SPF 50+ PA++++ — غير قابل للتفاوض.</li>
</ol>

<h3>المساء</h3>
<ol>
<li>منظّف زيتي.</li>
<li>منظّف كريمي.</li>
<li>AHA مرّة-مرّتين بالأسبوع (لطيف، مش قوي).</li>
<li>تونر (طريقة 7-skin موصى).</li>
<li>مخاط حلزون أو إسنس متخمّر.</li>
<li>سيروم ريتينول أو باكوشيول (ابدي مرّتين بالأسبوع).</li>
<li>أمبول ببتيدات.</li>
<li>كريم عين بالببتيدات.</li>
<li>مرطّب غني.</li>
<li>ماسك نوم 2-3 ليالي بالأسبوع.</li>
</ol>

<h2>المكوّنات البطلة للبشرة الناضجة</h2>
<ul>
<li><strong>الجينسنغ الكوري (Panax ginseng)</strong> — يعزّز الدورة الدموية وطاقة البشرة.</li>
<li><strong>الببتيدات</strong> — تشير لإنتاج الكولاجين.</li>
<li><strong>الريتينول</strong> — معيار ذهبي لتجدّد الخلايا (ابدي منخفض).</li>
<li><strong>الباكوشيول</strong> — بديل ريتينول ألطف.</li>
<li><strong>النياسيناميد</strong> — يفتّح، يقوّي الحاجز.</li>
<li><strong>حمض الهيالورونيك</strong> — يملأ خطوط الجفاف.</li>
<li><strong>مخاط الحلزون</strong> — إصلاح الحاجز.</li>
</ul>

<h2>خطوط كورية للبشرة الناضجة</h2>
<ul>
<li><strong>Sulwhasoo</strong> — فاخر، بتركيز على الجينسنغ.</li>
<li><strong>The History of Whoo</strong> — راقي بإلهام الطب العشبي.</li>
<li><strong>Hera</strong> — فخامة عصرية بالببتيدات.</li>
<li><strong>Mizon Collagen Power Lifting Line</strong> — اقتصادي، بتركيز على الكولاجين.</li>
<li><strong>SOME BY MI Retinol Intense</strong> — ريتينول مغلّف، صديق البشرة الناضجة.</li>
</ul>

<h2>أخطاء شائعة بعد الـ 40</h2>
<ul>
<li><strong>استعمال نفس المنتجات اللي كنتي بتستعمليها بعمر 25.</strong> احتياجات بشرتك تغيّرت.</li>
<li><strong>إهمال واقي الشمس.</strong> أغلب الضرر يظهر بعد 40 — وبيتراكم يومياً.</li>
<li><strong>منظّفات مجفّفة.</strong> حواجز البشرة الناضجة هشّة.</li>
<li><strong>الإفراط بالعلاج.</strong> مكوّنات نشطة متعدّدة يومياً = التهاب، مش نتائج.</li>
<li><strong>إهمال الرقبة.</strong> الرقبة بتظهر العمر بسرعة. مدّي كل اشي تحت.</li>
</ul>

<h2>عوامل أسلوب الحياة الأكثر أهمية الآن</h2>
<ul>
<li><strong>النوم:</strong> الكورتيزول من النوم السيّء يعجّل الشيخوخة.</li>
<li><strong>الترطيب:</strong> اشربي 2-3 لتر ماء يومياً.</li>
<li><strong>السكّر:</strong> الجلايكيشن يضرّ الكولاجين.</li>
<li><strong>الشمس:</strong> 80% من الشيخوخة المرئية من الأشعة.</li>
<li><strong>التوتّر:</strong> الكورتيزول بيكسر الكولاجين.</li>
</ul>

<h2>إيش شكل النتائج الواقعية</h2>
<p>بعد 8 أسابيع من العناية الكورية المستمرّة على البشرة الناضجة، لازم تشوفي:</p>
<ul>
<li>بشرة أنعم وأكثر ترطيباً.</li>
<li>تقليل بسيط للخطوط الدقيقة من الترطيب.</li>
<li>لون أكثر إشراقاً وتساوياً.</li>
<li>وهج صحّي.</li>
</ul>
<p>التجاعيد العميقة وفقدان الكولاجين الكبير غير قابلين للعكس بالعناية لحدها. هاد لمّا تدخل علاجات العيادة (بوتوكس، فيلر، ليزر). العناية بتحافظ وتدعم؛ علاجات العيادة بتصحّح.</p>

<h2>فلسفة الشيخوخة الكورية</h2>
<p>الثقافة الكورية كتير مرات بتحتفل بـ "بشرة العسل" — بشرة بتبيّن ندية ومعتنى بها بأي عمر. الهدف مش تبيني 25 للأبد؛ هو يكون عندك بشرة صحّية، مرطّبة، ومضيئة بتعكس كيف بتعيشي، مش بأي سنة ولدتي.</p>`,
    published_at: "2026-04-30T08:00:00Z",
  },
  {
    slug: "reading-korean-skincare-labels-glossary",
    title: "Reading Korean Skincare Labels: Your Practical Glossary",
    excerpt:
      "Korean skincare labels are full of unfamiliar names. Here's a cheat-sheet glossary that decodes the most common ingredients, marketing terms, and certifications.",
    seo_title: "Korean Skincare Label Glossary: Read Any K-Beauty Product",
    seo_description:
      "Decode Korean skincare labels. A practical glossary of ingredients, percentages, certifications, and marketing claims used in K-beauty products.",
    tags: ["skincare labels", "ingredients", "korean skincare", "K-beauty guide"],
    cover_image: COVERS.flatlay2,
    title_ar: "قراءة ملصقات العناية الكورية: دليلك العملي",
    excerpt_ar:
      "ملصقات العناية الكورية مليانة أسماء غريبة. هاد ورقة دليل بتفكّ شفرة أكثر المكوّنات شيوعاً، المصطلحات التسويقية، والشهادات.",
    seo_title_ar: "دليل ملصقات العناية الكورية: اقرئي أي منتج K-beauty",
    seo_description_ar:
      "فكّي شفرة ملصقات العناية الكورية. دليل عملي للمكوّنات، النسب، الشهادات، والادّعاءات التسويقية المستعملة بمنتجات K-beauty.",
    tags_ar: ["ملصقات عناية", "مكوّنات", "عناية كورية", "دليل K-beauty"],
    content: `<h2>How to Read a Korean Skincare Label</h2>
<p>Korean labels follow international INCI naming, but they often add marketing terms and Korean ingredient names that confuse newcomers. Here's a translation guide.</p>

<h2>Marketing Terms Decoded</h2>
<ul>
<li><strong>"Glow"</strong> — usually means brightening ingredients (niacinamide, vitamin C, fermented yeast).</li>
<li><strong>"Pure"</strong> — usually means fewer ingredients, not necessarily natural.</li>
<li><strong>"Snail / 92% / 96%"</strong> — the percentage of snail mucin in the formula.</li>
<li><strong>"Cica"</strong> — short for centella asiatica. Calming, anti-inflammatory.</li>
<li><strong>"Original"</strong> — the unscented or basic version of a line.</li>
<li><strong>"Revive / Power"</strong> — premium or anti-aging version of a line.</li>
<li><strong>"Bibimbap-like blend"</strong> — Korean way to describe a multi-extract formula.</li>
</ul>

<h2>Common Korean Ingredient Names</h2>
<ul>
<li><strong>Galactomyces / Saccharomyces</strong> — fermented yeast for glow.</li>
<li><strong>Propolis</strong> — bee-derived, antibacterial and healing.</li>
<li><strong>Mugwort (Artemisia)</strong> — herbal, calming, antioxidant.</li>
<li><strong>Heartleaf (Houttuynia cordata)</strong> — soothing, anti-inflammatory.</li>
<li><strong>Rice extract / rice water</strong> — brightening, softening.</li>
<li><strong>Ginseng (Panax)</strong> — anti-aging, circulation boost.</li>
<li><strong>Madecassoside</strong> — extract of centella, intensely calming.</li>
<li><strong>Snail Secretion Filtrate</strong> — snail mucin (yes, real snail).</li>
<li><strong>Niacinamide</strong> — vitamin B3, brightens and controls oil.</li>
<li><strong>Bifida Ferment Lysate</strong> — probiotic for the skin barrier.</li>
</ul>

<h2>Certifications to Look For</h2>
<ul>
<li><strong>CGMP (Korean GMP)</strong> — Korean Good Manufacturing Practice.</li>
<li><strong>Vegan / Cruelty-Free</strong> — common but not regulated; check independent certifications.</li>
<li><strong>EWG Verified</strong> — Environmental Working Group safe rating.</li>
<li><strong>Hypoallergenic</strong> — marketing claim, not strictly regulated.</li>
<li><strong>Non-comedogenic</strong> — formulated to not clog pores; not a guarantee.</li>
<li><strong>Dermatologist Tested</strong> — vague claim; tested doesn't mean approved.</li>
</ul>

<h2>Percentages You'll See</h2>
<ul>
<li><strong>Niacinamide 2-10%</strong> — sweet spot for most skins.</li>
<li><strong>Vitamin C 10-20%</strong> — 10-15% is effective with less irritation.</li>
<li><strong>Salicylic acid (BHA) 0.5-2%</strong> — 2% is standard.</li>
<li><strong>Glycolic acid (AHA) 5-10%</strong> — 5-8% for home use.</li>
<li><strong>Retinol 0.025-1%</strong> — start at 0.025%, work up.</li>
<li><strong>Hyaluronic acid</strong> — usually under 2%; higher means it's a marketing claim.</li>
</ul>

<h2>Red Flags on a Label</h2>
<ul>
<li><strong>Alcohol denat / SD alcohol in top 3 ingredients</strong> — drying.</li>
<li><strong>Heavy fragrance / parfum near the top</strong> — irritation risk.</li>
<li><strong>"Active ingredient" with no percentage listed</strong> — likely fairy dust.</li>
<li><strong>"Made with rice extract!" but rice is the last ingredient</strong> — marketing.</li>
<li><strong>Expiration date with no PAO (period after opening)</strong> — questionable manufacturing.</li>
</ul>

<h2>How to Compare Two Products</h2>
<p>Look at the <strong>first 5 ingredients</strong>. These make up 70-90% of the formula. After ingredient 5, concentrations drop below 1%. If two products both list "snail mucin" but one has it at position 2 and the other at position 12, the formulas are completely different.</p>

<h2>The "Free From" Trap</h2>
<p>"Paraben-free," "sulfate-free," "fragrance-free" are useful filters — but they don't equal effective. A bad formulation can still be paraben-free. Read the whole label, not just the marketing badges.</p>

<h2>How to Spot a Fake Korean Product</h2>
<ul>
<li>Check the batch code on the brand's official site.</li>
<li>Look for the Korean text on the back — fakes often have spelling errors.</li>
<li>Holographic stickers on premium lines (Sulwhasoo, Whoo) should be intact.</li>
<li>Buy from authorized retailers only.</li>
</ul>`,
    content_ar: `<h2>كيف تقرئي ملصق عناية كوري</h2>
<p>الملصقات الكورية بتتبع تسمية INCI الدولية، بس كتير مرات بضيفوا مصطلحات تسويقية وأسماء مكوّنات كورية بتلخبط الجداد. هاد دليل ترجمة.</p>

<h2>المصطلحات التسويقية مفكوكة</h2>
<ul>
<li><strong>"Glow"</strong> — عادةً يعني مكوّنات مفتّحة (نياسيناميد، فيتامين C، خميرة متخمّرة).</li>
<li><strong>"Pure"</strong> — عادةً يعني مكوّنات أقل، مش بالضرورة طبيعي.</li>
<li><strong>"Snail / 92% / 96%"</strong> — نسبة مخاط الحلزون بالتركيبة.</li>
<li><strong>"Cica"</strong> — اختصار لسنتيلا أسياتيكا. مهدّي، مضاد التهاب.</li>
<li><strong>"Original"</strong> — النسخة بدون عطر أو الأساسية من خط.</li>
<li><strong>"Revive / Power"</strong> — النسخة الراقية أو ضد التقدّم بالعمر.</li>
<li><strong>"Bibimbap-like blend"</strong> — طريقة كورية لوصف تركيبة متعدّدة الخلاصات.</li>
</ul>

<h2>أسماء مكوّنات كورية شائعة</h2>
<ul>
<li><strong>Galactomyces / Saccharomyces</strong> — خميرة متخمّرة للوهج.</li>
<li><strong>Propolis</strong> — من النحل، مضاد بكتيريا ومداواة.</li>
<li><strong>Mugwort (Artemisia)</strong> — عشبي، مهدّي، مضاد أكسدة.</li>
<li><strong>Heartleaf (Houttuynia cordata)</strong> — مهدّي، مضاد التهاب.</li>
<li><strong>Rice extract / rice water</strong> — مفتّح، منعّم.</li>
<li><strong>Ginseng (Panax)</strong> — ضد التقدّم بالعمر، يعزّز الدورة الدموية.</li>
<li><strong>Madecassoside</strong> — خلاصة السنتيلا، مهدّي بشدّة.</li>
<li><strong>Snail Secretion Filtrate</strong> — مخاط حلزون (أيوا، حلزون فعلي).</li>
<li><strong>Niacinamide</strong> — فيتامين B3، يفتّح ويتحكّم بالزيوت.</li>
<li><strong>Bifida Ferment Lysate</strong> — بروبيوتيك لحاجز البشرة.</li>
</ul>

<h2>شهادات دوّري عليها</h2>
<ul>
<li><strong>CGMP (Korean GMP)</strong> — ممارسات تصنيع جيّدة كورية.</li>
<li><strong>Vegan / Cruelty-Free</strong> — شائع بس مش منظّم؛ شيكي شهادات مستقلّة.</li>
<li><strong>EWG Verified</strong> — تقييم آمن من Environmental Working Group.</li>
<li><strong>Hypoallergenic</strong> — ادّعاء تسويقي، مش منظّم بصرامة.</li>
<li><strong>Non-comedogenic</strong> — مصمّم ما يسدّ المسامات؛ مش ضمانة.</li>
<li><strong>Dermatologist Tested</strong> — ادّعاء غامض؛ مفحوص ما يعني معتمد.</li>
</ul>

<h2>النسب اللي رح تشوفيها</h2>
<ul>
<li><strong>نياسيناميد 2-10%</strong> — النقطة المثالية لأغلب البشرات.</li>
<li><strong>فيتامين C 10-20%</strong> — 10-15% فعّال بتهيّج أقل.</li>
<li><strong>حمض الساليسيليك (BHA) 0.5-2%</strong> — 2% معيار.</li>
<li><strong>حمض الجلايكوليك (AHA) 5-10%</strong> — 5-8% للاستعمال بالبيت.</li>
<li><strong>ريتينول 0.025-1%</strong> — ابدي بـ 0.025%، اشتغلي للأعلى.</li>
<li><strong>حمض الهيالورونيك</strong> — عادةً تحت 2%; أعلى يعني ادّعاء تسويقي.</li>
</ul>

<h2>إشارات حمراء على الملصق</h2>
<ul>
<li><strong>Alcohol denat / SD alcohol بأول 3 مكوّنات</strong> — مجفّف.</li>
<li><strong>عطر ثقيل / parfum قريب من القمة</strong> — خطر التهيّج.</li>
<li><strong>"مكوّن نشط" بدون نسبة مذكورة</strong> — على الأرجح فايرى داست.</li>
<li><strong>"مع خلاصة الأرز!" بس الأرز آخر مكوّن</strong> — تسويق.</li>
<li><strong>تاريخ انتهاء بدون PAO (المدّة بعد الفتح)</strong> — تصنيع مشكوك فيه.</li>
</ul>

<h2>كيف تقارني منتجين</h2>
<p>اطّلعي على <strong>أول 5 مكوّنات</strong>. هدول بشكّلوا 70-90% من التركيبة. بعد المكوّن 5، النسب بتنخفض تحت 1%. لو منتجين كلاهما بدرج "مخاط الحلزون" بس واحد بالمركز 2 والتاني بالمركز 12، التركيبتين مختلفتين تماماً.</p>

<h2>فخّ "الخالي من"</h2>
<p>"خالي من البارابين"، "خالي من السلفات"، "خالي من العطر" فلاتر مفيدة — بس ما بساوي فعّال. ممكن تركيبة سيّئة تكون خالية من البارابين. اقرئي الملصق كامل، مش بس الشارات التسويقية.</p>

<h2>كيف تكتشفي منتج كوري مقلّد</h2>
<ul>
<li>شيكي رمز الدفعة على موقع الماركة الرسمي.</li>
<li>دوّري على النص الكوري على الظهر — المقلّدات كتير مرات فيها أخطاء إملائية.</li>
<li>ملصقات هولوغرام على الخطوط الراقية (Sulwhasoo, Whoo) لازم تكون سليمة.</li>
<li>اشتري من باعة معتمدين فقط.</li>
</ul>`,
    published_at: "2026-04-29T08:00:00Z",
  },
  {
    slug: "pha-polyhydroxy-acids-gentle-exfoliant-sensitive-skin",
    title: "PHA (Polyhydroxy Acids): The Gentle Exfoliant for Sensitive Skin",
    excerpt:
      "AHA and BHA too harsh? PHA is the gentler exfoliating cousin that even sensitive skin can use daily. Here's the K-beauty guide to PHA.",
    seo_title: "PHA Skincare Guide: The Gentle Exfoliant for Sensitive Skin",
    seo_description:
      "Polyhydroxy acids (PHA) gently exfoliate without irritation. Best for sensitive, rosacea-prone, or eczema-prone skin. K-beauty's gentlest acid explained.",
    tags: ["PHA", "polyhydroxy acid", "gentle exfoliant", "sensitive skin", "k-beauty"],
    cover_image: COVERS.spa2,
    title_ar: "PHA (الأحماض متعدّدة الهيدروكسي): المقشّر اللطيف للبشرة الحسّاسة",
    excerpt_ar:
      "AHA و BHA قاسيين كتير؟ PHA هو الابن عمّ المقشّر اللطيف اللي حتى البشرة الحسّاسة بتقدر تستعمله يومياً. هاد دليل K-beauty للـ PHA.",
    seo_title_ar: "دليل PHA للعناية: المقشّر اللطيف للبشرة الحسّاسة",
    seo_description_ar:
      "الأحماض متعدّدة الهيدروكسي (PHA) بتقشّر بلطف بدون تهيّج. الأنسب للبشرة الحسّاسة، الوردية، أو الإكزيمية. شرح ألطف حمض K-beauty.",
    tags_ar: ["PHA", "حمض متعدّد الهيدروكسي", "مقشّر لطيف", "بشرة حسّاسة", "K-beauty"],
    content: `<h2>What Is PHA?</h2>
<p>PHA stands for <strong>polyhydroxy acid</strong>. The most common forms are <strong>gluconolactone</strong> and <strong>lactobionic acid</strong>. PHAs are chemical exfoliants like AHA, but their molecular size is larger — meaning they don't penetrate as deeply and irritate less.</p>
<p>They were originally formulated for post-procedure skin: people recovering from chemical peels, lasers, or active rosacea. K-beauty adopted them for sensitive skin types who can't tolerate stronger acids.</p>

<h2>PHA vs AHA vs BHA</h2>
<ul>
<li><strong>AHA (glycolic, lactic):</strong> Water-soluble. Exfoliates the skin surface. Can sting.</li>
<li><strong>BHA (salicylic):</strong> Oil-soluble. Penetrates pores. Best for acne and oily skin.</li>
<li><strong>PHA (gluconolactone, lactobionic):</strong> Water-soluble. Surface-level exfoliation. Almost no sting. Adds hydration.</li>
</ul>

<h2>Who Should Use PHA</h2>
<ul>
<li>Sensitive skin or reactive skin.</li>
<li>People with rosacea or active flushing.</li>
<li>Eczema-prone skin (during quiet phases).</li>
<li>Anyone using retinol who wants gentle exfoliation.</li>
<li>People who get sun-sensitive on AHA.</li>
<li>Pregnant or breastfeeding (PHAs are generally considered safe — but always check with your doctor).</li>
</ul>

<h2>What PHA Does</h2>
<ul>
<li>Removes dead skin cells gently.</li>
<li>Refines texture and smooths skin.</li>
<li>Adds hydration (PHAs are humectants).</li>
<li>Reduces dullness over time.</li>
<li>Strengthens the barrier (some research suggests).</li>
<li>Does NOT increase sun sensitivity like AHA.</li>
</ul>

<h2>Korean PHA Products</h2>
<ul>
<li><strong>Some By Mi AHA-BHA-PHA 30 Days Miracle Toner</strong> — gentle daily exfoliating toner.</li>
<li><strong>By Wishtrend Mandelic Acid 5% PHA Skin Prep Water</strong> — mandelic acid (AHA) + PHA combo.</li>
<li><strong>The Lab by Blanc Doux Oligo Hyaluronic Acid + PHA Toner</strong>.</li>
<li><strong>Klairs Toner Mist</strong> — small amount of PHA for refreshing.</li>
</ul>

<h2>How to Add PHA to Your Routine</h2>
<ol>
<li>Cleanse and tone (if your toner doesn't already contain PHA).</li>
<li>Apply PHA serum or essence to clean, dry skin.</li>
<li>Wait 2-3 minutes.</li>
<li>Continue with the rest of your routine (essence, serum, moisturizer).</li>
</ol>

<h2>How Often?</h2>
<ul>
<li><strong>Daily</strong> if you're using a gentle (5-10%) PHA toner.</li>
<li><strong>3-4 times a week</strong> if you're using a higher concentration serum.</li>
<li><strong>Alternate with retinol</strong> nights if both are in your routine.</li>
</ul>

<h2>What to Expect</h2>
<ul>
<li><strong>Week 1:</strong> Skin feels smoother, possibly slightly tingling.</li>
<li><strong>Week 4:</strong> Visible reduction in dullness, texture refinement.</li>
<li><strong>Week 8+:</strong> Brighter, more even tone. Better product absorption.</li>
</ul>

<h2>The PHA + Hydrating Combination</h2>
<p>PHAs pair beautifully with hyaluronic acid because they're already humectants. The combination is particularly good for dehydrated mature skin that needs gentle resurfacing without harsh acids.</p>

<h2>Can You Use PHA With Retinol?</h2>
<p>Yes — PHAs are gentle enough to use with retinol on the same nights for most people. Apply PHA first, wait 5 minutes, then retinol. If your skin gets sensitive, alternate them.</p>

<h2>Common PHA Mistakes</h2>
<ul>
<li>Expecting AHA-level results overnight. PHAs work slower but build up.</li>
<li>Stacking PHA + AHA + BHA. Too much exfoliation, even gentle.</li>
<li>Skipping moisturizer. PHAs hydrate, but they still need a moisturizer on top.</li>
<li>Skipping sunscreen. Even gentle acids work better with daily SPF.</li>
</ul>`,
    content_ar: `<h2>إيش هو PHA؟</h2>
<p>PHA اختصار لـ <strong>حمض متعدّد الهيدروكسي</strong>. أكثر الأشكال شيوعاً <strong>غلوكونولاكتون</strong> و<strong>حمض اللاكتوبيونيك</strong>. الـ PHA مقشّرات كيميائية زي الـ AHA، بس حجمهم الجزيئي أكبر — يعني ما بدخلوا بعمق وبيهيّجوا أقل.</p>
<p>صُمّموا أصلاً للبشرة بعد الإجراءات: ناس بيشفوا من تقشير كيميائي، ليزر، أو وردية نشطة. الـ K-beauty اعتمدتهم لأنواع البشرة الحسّاسة اللي ما بتتحمّل الأحماض الأقوى.</p>

<h2>PHA مقابل AHA مقابل BHA</h2>
<ul>
<li><strong>AHA (جلايكوليك، لاكتيك):</strong> ذائب بالماء. بقشّر سطح البشرة. ممكن يوخز.</li>
<li><strong>BHA (ساليسيليك):</strong> ذائب بالزيت. بدخل المسامات. الأنسب لحب الشباب والبشرة الدهنية.</li>
<li><strong>PHA (غلوكونولاكتون، لاكتوبيونيك):</strong> ذائب بالماء. تقشير سطحي. تقريباً بلا وخز. بيضيف ترطيب.</li>
</ul>

<h2>مين لازم يستعمل PHA</h2>
<ul>
<li>بشرة حسّاسة أو متفاعلة.</li>
<li>ناس عندهم وردية أو احمرار نشط.</li>
<li>بشرة معرّضة للإكزيما (بفترات الهدوء).</li>
<li>أيّ حدا بستعمل ريتينول وبدّه تقشير لطيف.</li>
<li>ناس بصير عندهم حساسية للشمس مع AHA.</li>
<li>حوامل أو مرضعات (الـ PHA بشكل عام يعتبر آمن — بس دايماً شيكي مع دكتورك).</li>
</ul>

<h2>إيش بعمل PHA</h2>
<ul>
<li>بيشيل خلايا الجلد الميتة بلطف.</li>
<li>بنعّم القوام وبصقّل البشرة.</li>
<li>بيضيف ترطيب (الـ PHA مرطّبات).</li>
<li>بقلّل البهتان مع الوقت.</li>
<li>بقوّي الحاجز (بعض الأبحاث بتقترح).</li>
<li>ما بيزيد حساسية الشمس زي AHA.</li>
</ul>

<h2>منتجات PHA الكورية</h2>
<ul>
<li><strong>Some By Mi AHA-BHA-PHA 30 Days Miracle Toner</strong> — تونر تقشير لطيف يومي.</li>
<li><strong>By Wishtrend Mandelic Acid 5% PHA Skin Prep Water</strong> — حمض الماندليك (AHA) + PHA.</li>
<li><strong>The Lab by Blanc Doux Oligo Hyaluronic Acid + PHA Toner</strong>.</li>
<li><strong>Klairs Toner Mist</strong> — كمّية صغيرة من PHA للانتعاش.</li>
</ul>

<h2>كيف تضيفي PHA لروتينك</h2>
<ol>
<li>نظّفي ووجي (لو تونرك ما فيه PHA أصلاً).</li>
<li>طبّقي سيروم أو إسنس PHA على بشرة نظيفة وجافة.</li>
<li>استنّي 2-3 دقايق.</li>
<li>كمّلي باقي روتينك (إسنس، سيروم، مرطّب).</li>
</ol>

<h2>كل قدّيش؟</h2>
<ul>
<li><strong>يومياً</strong> إذا بتستعملي تونر PHA لطيف (5-10%).</li>
<li><strong>3-4 مرات بالأسبوع</strong> إذا بتستعملي سيروم بتركيز أعلى.</li>
<li><strong>بدّلي مع الريتينول</strong> بالليالي إذا كلاهما بروتينك.</li>
</ul>

<h2>إيش توقّعي</h2>
<ul>
<li><strong>الأسبوع 1:</strong> البشرة بتحسّيها أنعم، ممكن وخز خفيف.</li>
<li><strong>الأسبوع 4:</strong> تقليل مرئي بالبهتان، تنعيم القوام.</li>
<li><strong>الأسبوع 8+:</strong> أكثر إشراقاً، لون أكثر تساوي. امتصاص أحسن للمنتجات.</li>
</ul>

<h2>تركيبة PHA + الترطيب</h2>
<p>الـ PHA بتركيب جميل مع حمض الهيالورونيك لأنهم أصلاً مرطّبات. التركيبة مناسبة بشكل خاص للبشرة الناضجة المجفّفة اللي بدها تجديد لطيف بدون أحماض قاسية.</p>

<h2>ممكن تستعملي PHA مع الريتينول؟</h2>
<p>أيوا — الـ PHA لطيف كفاية ليستعمل مع الريتينول بنفس الليالي لأغلب الناس. طبّقي PHA أوّل، استنّي 5 دقايق، بعدها الريتينول. لو بشرتك حسّاسة، بدّليهم.</p>

<h2>أخطاء PHA شائعة</h2>
<ul>
<li>توقّع نتائج بمستوى AHA بليلة. الـ PHA بشتغل أبطأ بس بيتراكم.</li>
<li>تكديس PHA + AHA + BHA. تقشير زيادة، حتى لو لطيف.</li>
<li>إهمال المرطّب. الـ PHA بيرطّب، بس لسا بدّه مرطّب فوقه.</li>
<li>إهمال واقي الشمس. حتى الأحماض اللطيفة بتشتغل أحسن مع SPF يومي.</li>
</ul>`,
    published_at: "2026-04-28T08:00:00Z",
  },
  {
    slug: "korean-skincare-winter-jordan-routine",
    title: "Korean Skincare Routine for Winter in Jordan",
    excerpt:
      "Amman winter is no joke — dry, cold, indoor heating that sucks the moisture out. Here's how to adapt your K-beauty routine to keep skin glowing through December.",
    seo_title: "Korean Skincare Winter Routine for Jordan: Survive Cold + Dry",
    seo_description:
      "Amman winter dries out skin fast. Adapt your Korean skincare with richer textures, slugging, ceramides, and the right humidifier setup for cold months.",
    tags: ["winter skincare", "jordan climate", "korean skincare", "dry skin", "amman"],
    cover_image: COVERS.spa4,
    title_ar: "روتين العناية الكورية للشتا بالأردن",
    excerpt_ar:
      "شتا عمّان مش مزحة — جاف، بارد، وتدفئة داخلية بتسحب الرطوبة. هاد كيف تكيّفي روتين K-beauty عشان بشرتك تظلّ مشعّة طول كانون.",
    seo_title_ar: "روتين العناية الكورية للشتا بالأردن: انجي من البرد والجفاف",
    seo_description_ar:
      "شتا عمّان بجفّف البشرة بسرعة. كيّفي عنايتك الكورية بقوامات أغنى، سلاغينغ، سيراميدات، ومرطّب الهوا المناسب لأشهر البرد.",
    tags_ar: ["عناية شتوية", "مناخ الأردن", "عناية كورية", "بشرة جافة", "عمّان"],
    content: `<h2>What Winter Does to Your Skin in Jordan</h2>
<p>Amman winter is brutal for skin. Temperatures drop to 2-8°C at night. Indoor heating drops humidity to <strong>15-25%</strong> (healthy skin needs 40-60%). Cold wind on the walk from car to office strips moisture. Most people see flaking, tightness, and dull skin by mid-December.</p>
<p>You need to switch up your K-beauty routine for winter — not just add more product, but change textures.</p>

<h2>The Winter Adjustments</h2>

<h3>Cleansing: Go Creamier</h3>
<p>Foaming cleansers are too stripping in winter. Switch to:</p>
<ul>
<li><strong>Cream cleansers</strong> like Banila Co Clean It Zero.</li>
<li><strong>Oil cleansers</strong> stay, but use them more often (even AM if your skin tolerates).</li>
<li>Skip exfoliating cleansers more than 1x weekly.</li>
</ul>

<h3>Toner: Add a Layer</h3>
<p>Add an extra hydrating toner layer. The 7-skin method becomes especially useful in winter. Look for toners with:</p>
<ul>
<li>Hyaluronic acid (3-5 molecular sizes).</li>
<li>Beta-glucan.</li>
<li>Panthenol.</li>
<li>Rice extract.</li>
</ul>

<h3>Serum: Layer Two</h3>
<p>In summer, one serum is enough. In winter, layer two:</p>
<ol>
<li><strong>Hydrating serum</strong> (hyaluronic acid) — apply to damp skin.</li>
<li><strong>Treatment serum</strong> (niacinamide, vitamin C in AM, retinol in PM).</li>
</ol>

<h3>Moisturizer: Go Richer</h3>
<p>Your summer gel cream isn't enough. Switch to:</p>
<ul>
<li><strong>Cream-based moisturizers</strong> with ceramides.</li>
<li>For very dry skin: an oil-based moisturizer or balm.</li>
<li>Add a face oil (squalane, rosehip, or argan) at night.</li>
</ul>

<h3>Sunscreen: Don't Skip</h3>
<p>This is the biggest winter mistake. UV is still there in winter — sometimes stronger because of less cloud cover at higher altitudes. Use a moisturizing SPF 50+ PA++++.</p>

<h2>Add Slugging at Night</h2>
<p>2-3 nights a week, finish with a thin layer of petrolatum or a sleeping mask. The seal prevents overnight water loss when indoor heating is on.</p>

<h2>Environmental Hacks</h2>
<ul>
<li><strong>Humidifier in the bedroom.</strong> Aim for 50% humidity. The biggest winter skin upgrade.</li>
<li><strong>Lukewarm showers</strong>, not hot. Hot water strips lipids.</li>
<li><strong>Don't heat the bedroom above 22°C.</strong> Heat dries the air.</li>
<li><strong>Drink warm water with lemon</strong> through the day.</li>
</ul>

<h2>Common Winter Skin Problems</h2>

<h3>Flaky Patches Around the Nose</h3>
<p>Apply a centella ampoule, then a rich balm. Avoid foaming cleansers on the area for a week.</p>

<h3>Chapped Lips</h3>
<p>Korean lip masks like <strong>Laneige Lip Sleeping Mask</strong> at night. During the day, a lanolin-based balm.</p>

<h3>Dry Hands</h3>
<p>Apply hand cream every time after washing. Korean hand creams like <strong>Innisfree Jeju Hand Cream</strong> are inexpensive and effective.</p>

<h3>Dull, Tired-Looking Skin</h3>
<p>Add a vitamin C serum back in if you'd dropped it for retinol-only. Try a brightening sleeping mask 2x/week.</p>

<h2>Products to Add for Winter</h2>
<ul>
<li>A cream cleanser (Banila Co Clean It Zero).</li>
<li>A 7-skin compatible toner (Hada Labo Gokujyun).</li>
<li>A hydrating ampoule (Beauty of Joseon Calming Serum).</li>
<li>A ceramide-rich moisturizer (Dr.Jart+ Ceramidin).</li>
<li>A sleeping mask (Laneige Water Sleeping Mask).</li>
<li>A lip mask (Laneige Lip Sleeping Mask).</li>
<li>A hand cream.</li>
<li>A humidifier (not skincare, but essential).</li>
</ul>

<h2>Products to Pull Back</h2>
<ul>
<li>Strong AHA — reduce to once weekly.</li>
<li>BHA — keep but at lower frequency (2x weekly).</li>
<li>Foam cleansers.</li>
<li>Clay masks (use less often).</li>
<li>Toners with alcohol.</li>
</ul>

<h2>Transition Back to Summer</h2>
<p>In late March, gradually transition back. Pull back the sleeping mask first, then the cream cleanser. By mid-April you should be on a lighter, more summer-appropriate routine.</p>`,
    content_ar: `<h2>إيش بيعمل الشتا لبشرتك بالأردن</h2>
<p>شتا عمّان قاسي على البشرة. الحرارة بتنزل لـ 2-8 درجة بالليل. التدفئة الداخلية بتنزّل الرطوبة لـ <strong>15-25%</strong> (البشرة الصحّية بدّها 40-60%). الهوا البارد بمشوار السيارة للمكتب بيسحب الرطوبة. أغلب الناس بيشوفوا تقشّر، شدّ، وبهتان بمنتصف كانون.</p>
<p>لازم تبدّلي روتين K-beauty للشتا — مش بس إضافة منتجات أكثر، بدّلي القوامات.</p>

<h2>التعديلات الشتوية</h2>

<h3>التنظيف: روحي للكريمي</h3>
<p>المنظّفات الرغوية مجفّفة كتير بالشتا. بدّلي إلى:</p>
<ul>
<li><strong>منظّفات كريمية</strong> زي Banila Co Clean It Zero.</li>
<li><strong>المنظّفات الزيتية</strong> بتظلّ، بس استعمليها أكثر (حتى بالصبح لو بشرتك بتتحمّل).</li>
<li>تجاهلي المنظّفات المقشّرة أكثر من مرّة بالأسبوع.</li>
</ul>

<h3>التونر: ضيفي طبقة</h3>
<p>ضيفي طبقة تونر مرطّب إضافية. طريقة الـ 7-skin بتصير مفيدة بشكل خاص بالشتا. دوّري على تونرات فيها:</p>
<ul>
<li>حمض الهيالورونيك (3-5 أحجام جزيئية).</li>
<li>بيتا-جلوكان.</li>
<li>بانثينول.</li>
<li>خلاصة الأرز.</li>
</ul>

<h3>السيروم: طبّقي اتنين</h3>
<p>بالصيف، سيروم واحد كفاية. بالشتا، طبّقي اتنين:</p>
<ol>
<li><strong>سيروم مرطّب</strong> (حمض الهيالورونيك) — طبّقيه على بشرة رطبة.</li>
<li><strong>سيروم علاج</strong> (نياسيناميد، فيتامين C بالصبح، ريتينول بالمساء).</li>
</ol>

<h3>المرطّب: روحي للأغنى</h3>
<p>كريم الجل الصيفي مش كفاية. بدّلي إلى:</p>
<ul>
<li><strong>مرطّبات كريمية</strong> بالسيراميدات.</li>
<li>للبشرة الجافة جداً: مرطّب زيتي أو بلسم.</li>
<li>ضيفي زيت وجه (سكوالين، روزهيب، أو أرغان) بالليل.</li>
</ul>

<h3>واقي الشمس: لا تتجاهليه</h3>
<p>هاي أكبر غلطة شتا. الأشعة لسا موجودة بالشتا — أحياناً أقوى بسبب غطاء سحاب أقل بالارتفاعات العالية. استعملي SPF 50+ PA++++ مرطّب.</p>

<h2>ضيفي السلاغينغ بالليل</h2>
<p>2-3 ليالي بالأسبوع، اختمي بطبقة رفيعة بترولاتوم أو ماسك نوم. القفل بمنع فقدان الماي بالليل لمّا التدفئة شغّالة.</p>

<h2>حيل بيئية</h2>
<ul>
<li><strong>مرطّب هوا بغرفة النوم.</strong> هدفي 50% رطوبة. أكبر تطوير شتوي للبشرة.</li>
<li><strong>دوشات دافئة</strong>، مش حارّة. الماي الحار بسحب الليبيدات.</li>
<li><strong>ما تسخّني غرفة النوم فوق 22 درجة.</strong> الحرارة بتجفّف الهوا.</li>
<li><strong>اشربي ماي دافئ مع ليمون</strong> طول اليوم.</li>
</ul>

<h2>مشاكل بشرة شتوية شائعة</h2>

<h3>بقع متقشّرة حول الأنف</h3>
<p>طبّقي أمبول سنتيلا، بعدها بلسم غني. تجنّبي المنظّفات الرغوية على المنطقة لأسبوع.</p>

<h3>شفايف متشقّقة</h3>
<p>ماسكات شفايف كورية زي <strong>Laneige Lip Sleeping Mask</strong> بالليل. بالنهار، بلسم بأساس اللانولين.</p>

<h3>يدين جافّة</h3>
<p>طبّقي كريم يدين بعد كل غسلة. كريمات اليدين الكورية زي <strong>Innisfree Jeju Hand Cream</strong> رخيصة وفعّالة.</p>

<h3>بشرة باهتة وتعبانة</h3>
<p>رجّعي سيروم فيتامين C لو وقفتيه للريتينول فقط. جرّبي ماسك نوم مفتّح مرّتين بالأسبوع.</p>

<h2>منتجات تضيفيها للشتا</h2>
<ul>
<li>منظّف كريمي (Banila Co Clean It Zero).</li>
<li>تونر متوافق مع 7-skin (Hada Labo Gokujyun).</li>
<li>أمبول مرطّب (Beauty of Joseon Calming Serum).</li>
<li>مرطّب غني بالسيراميدات (Dr.Jart+ Ceramidin).</li>
<li>ماسك نوم (Laneige Water Sleeping Mask).</li>
<li>ماسك شفايف (Laneige Lip Sleeping Mask).</li>
<li>كريم يدين.</li>
<li>مرطّب هوا (مش عناية، بس أساسي).</li>
</ul>

<h2>منتجات قلّليها</h2>
<ul>
<li>AHA قوي — قلّليه لمرّة بالأسبوع.</li>
<li>BHA — احفظيه بس بتكرار أقل (مرّتين بالأسبوع).</li>
<li>المنظّفات الرغوية.</li>
<li>ماسكات الطين (استعمليها أقل).</li>
<li>تونرات بالكحول.</li>
</ul>

<h2>الانتقال للصيف</h2>
<p>بأواخر آذار، انتقلي تدريجياً. اسحبي ماسك النوم أوّل، بعدها المنظّف الكريمي. بمنتصف نيسان لازم تكوني على روتين أخفّ ومناسب أكثر للصيف.</p>`,
    published_at: "2026-04-27T08:00:00Z",
  },
  {
    slug: "skincare-after-sun-exposure-repair-korean-way",
    title: "Skincare After Sun Exposure: Repair the Damage the K-Beauty Way",
    excerpt:
      "Got too much Jordan sun? Don't panic. Korean skincare has a specific protocol to repair sun-stressed skin within 48 hours. Here's the full plan.",
    seo_title: "After-Sun Korean Skincare Routine: Repair Sun Damage Fast",
    seo_description:
      "A 48-hour K-beauty protocol for sun-stressed skin. Centella, aloe, panthenol, and the right anti-inflammatory ingredients for Jordan summer recovery.",
    tags: ["after-sun", "sun damage", "korean skincare", "centella", "recovery"],
    cover_image: COVERS.green1,
    title_ar: "العناية بعد التعرّض للشمس: اصلحي الضرر بطريقة K-beauty",
    excerpt_ar:
      "تعرّضت لشمس أردنية كتير؟ ما تنفعلي. العناية الكورية عندها بروتوكول محدّد لإصلاح البشرة المتضرّرة من الشمس خلال 48 ساعة. هاد الخطة الكاملة.",
    seo_title_ar: "روتين العناية الكوري بعد الشمس: اصلاح ضرر الشمس بسرعة",
    seo_description_ar:
      "بروتوكول K-beauty 48 ساعة للبشرة المتضرّرة من الشمس. سنتيلا، صبّار، بانثينول، والمكوّنات المضادّة للالتهاب المناسبة لتعافي صيف الأردن.",
    tags_ar: ["بعد الشمس", "ضرر شمس", "عناية كورية", "سنتيلا", "تعافي"],
    content: `<h2>What Happens to Skin in the Sun</h2>
<p>UV from the Jordan sun does three immediate things: it damages DNA in skin cells, generates free radicals, and triggers inflammation. The visible signs (redness, heat, peeling) come after — your skin was already injured by the time you noticed.</p>
<p>The good news: Korean skincare has a specific anti-inflammatory protocol that minimizes the long-term damage if you start within 48 hours.</p>

<h2>The Same-Day Protocol</h2>

<h3>Step 1: Cool the Skin (Hours 0-6)</h3>
<ul>
<li>Cold shower (not freezing — lukewarm to cool).</li>
<li>Apply a cool, damp cloth to the most affected areas for 10 minutes.</li>
<li>Do NOT apply ice directly. It damages cold-sensitive blood vessels.</li>
</ul>

<h3>Step 2: Gentle Cleanse</h3>
<ul>
<li>Cream cleanser only. No foam, no acids, no scrubs.</li>
<li>Pat dry — don't rub.</li>
</ul>

<h3>Step 3: Centella Toner</h3>
<p>Centella asiatica is the K-beauty hero for sun damage. It's anti-inflammatory, calming, and promotes wound healing. <strong>SKIN1004 Madagascar Centella Toning Toner</strong> or <strong>Anua Heartleaf 77%</strong> are ideal.</p>

<h3>Step 4: Hydrating Essence</h3>
<p>Apply a hyaluronic acid + panthenol essence. Skin loses water faster after sun exposure.</p>

<h3>Step 5: Aloe Gel</h3>
<p>A pure aloe vera gel (Korean brand or imported) is the gold standard. <strong>Nature Republic Aloe Vera 92% Soothing Gel</strong> is iconic. Apply a thin layer 2-3 times during the day.</p>

<h3>Step 6: Heavy Moisturizer + Sleeping Mask at Night</h3>
<p>Layer a cream moisturizer, then a calming sleeping mask. The skin will use the night to repair.</p>

<h2>Day 2 Protocol</h2>
<ul>
<li>Repeat morning routine: centella toner, hydrating essence, aloe gel.</li>
<li>Add a panthenol or madecassoside serum for accelerated healing.</li>
<li>Drink lots of water.</li>
<li>Stay indoors if possible. If you go out, wear a hat and SPF 50+.</li>
</ul>

<h2>Day 3-7 Protocol</h2>
<ul>
<li>Slowly resume normal routine, but skip retinol, AHA, BHA, and vitamin C until day 7.</li>
<li>Continue centella and aloe daily.</li>
<li>Apply a brightening serum (Vitamin C derivative) starting day 7 to fade post-sun pigmentation.</li>
</ul>

<h2>The Hero Ingredients for After-Sun</h2>
<ul>
<li><strong>Centella asiatica</strong> — anti-inflammatory, wound healing.</li>
<li><strong>Aloe vera</strong> — cooling, soothing.</li>
<li><strong>Panthenol (B5)</strong> — accelerates healing.</li>
<li><strong>Madecassoside</strong> — concentrated centella, deeply calming.</li>
<li><strong>Niacinamide</strong> — reduces redness, fades pigmentation.</li>
<li><strong>Vitamin E</strong> — antioxidant, supports skin repair.</li>
</ul>

<h2>What to AVOID After Sun Exposure</h2>
<ul>
<li>Retinol or retinoids.</li>
<li>AHA, BHA, glycolic, salicylic.</li>
<li>Strong vitamin C (over 10%).</li>
<li>Hot showers or saunas.</li>
<li>Scrubs or exfoliating toners.</li>
<li>Strong fragranced products.</li>
<li>Alcohol-based products.</li>
<li>Picking at peeling skin.</li>
</ul>

<h2>If You're Peeling</h2>
<ul>
<li>Don't pick. Let it shed naturally.</li>
<li>Keep skin extra moisturized.</li>
<li>Apply petrolatum at night.</li>
<li>Avoid makeup until peeling stops.</li>
</ul>

<h2>Preventing the Next Sunburn</h2>
<ul>
<li>SPF 50+ PA++++ daily, not just at the beach.</li>
<li>Reapply every 2 hours when outdoors.</li>
<li>Use 1/4 teaspoon for the face — most people use too little.</li>
<li>Wear a hat between 10 AM and 4 PM.</li>
<li>Korean sun sticks are great for reapplying over makeup.</li>
</ul>

<h2>When to See a Doctor</h2>
<p>If you have:</p>
<ul>
<li>Blistering.</li>
<li>Fever or chills.</li>
<li>Severe pain.</li>
<li>Confusion or dizziness (signs of sun poisoning).</li>
</ul>
<p>See a doctor immediately. Severe sunburn can require medical treatment.</p>

<h2>Long-Term Sun Damage</h2>
<p>One bad burn doesn't cause cancer alone, but repeated UV damage adds up. Korean skincare can help fade pigmentation and support repair, but daily sunscreen is non-negotiable. Sunscreen is the most effective anti-aging product on the market — no serum competes.</p>`,
    content_ar: `<h2>إيش بصير للبشرة بالشمس</h2>
<p>الأشعة من شمس الأردن بتعمل ثلاث اشياء فوراً: بتضرّ الـ DNA بخلايا البشرة، بتولّد شوارد حرّة، وبتحفّز التهاب. العلامات المرئية (احمرار، حرارة، تقشّر) بتجي بعدين — بشرتك كانت مصابة لمّا لاحظتي.</p>
<p>الأخبار المنيحة: العناية الكورية عندها بروتوكول مضاد التهاب محدّد بقلّل الضرر طويل المدى لو بدأتي خلال 48 ساعة.</p>

<h2>بروتوكول نفس اليوم</h2>

<h3>الخطوة 1: برّدي البشرة (ساعات 0-6)</h3>
<ul>
<li>دوش بارد (مش متجمّد — دافي لبارد).</li>
<li>طبّقي قماشة باردة ورطبة على المناطق الأكثر تأثّر لـ 10 دقايق.</li>
<li>لا تطبّقي ثلج مباشرة. بضرّ الأوعية الدموية الحسّاسة للبرد.</li>
</ul>

<h3>الخطوة 2: تنظيف لطيف</h3>
<ul>
<li>منظّف كريمي فقط. لا رغوة، لا أحماض، لا مقشّرات.</li>
<li>ربّتي للجفاف — ما تفركي.</li>
</ul>

<h3>الخطوة 3: تونر سنتيلا</h3>
<p>السنتيلا أسياتيكا هي بطل K-beauty لضرر الشمس. مضادّة التهاب، مهدّية، وبتعزّز شفاء الجروح. <strong>SKIN1004 Madagascar Centella Toning Toner</strong> أو <strong>Anua Heartleaf 77%</strong> مثاليّين.</p>

<h3>الخطوة 4: إسنس مرطّب</h3>
<p>طبّقي إسنس حمض هيالورونيك + بانثينول. البشرة بتخسر الماي أسرع بعد التعرّض للشمس.</p>

<h3>الخطوة 5: جل صبّار</h3>
<p>جل صبّار نقي (ماركة كورية أو مستورد) هو المعيار الذهبي. <strong>Nature Republic Aloe Vera 92% Soothing Gel</strong> أيقوني. طبّقي طبقة رفيعة 2-3 مرات باليوم.</p>

<h3>الخطوة 6: مرطّب ثقيل + ماسك نوم بالليل</h3>
<p>طبّقي مرطّب كريمي، بعدها ماسك نوم مهدّي. البشرة رح تستعمل الليل للإصلاح.</p>

<h2>بروتوكول اليوم 2</h2>
<ul>
<li>كرّري روتين الصباح: تونر سنتيلا، إسنس مرطّب، جل صبّار.</li>
<li>ضيفي سيروم بانثينول أو ماديكاسوسايد لشفاء أسرع.</li>
<li>اشربي ماي كتير.</li>
<li>ابقي بالبيت لو ممكن. لو بتطلعي، البسي قبّعة و SPF 50+.</li>
</ul>

<h2>بروتوكول الأيام 3-7</h2>
<ul>
<li>ارجعي ببطء للروتين العادي، بس تجاهلي الريتينول، AHA، BHA، وفيتامين C لحدّ اليوم 7.</li>
<li>كمّلي السنتيلا والصبّار يومياً.</li>
<li>طبّقي سيروم مفتّح (مشتقّ فيتامين C) ابتداء من اليوم 7 لتفتيح تصبّغات ما بعد الشمس.</li>
</ul>

<h2>المكوّنات البطلة لبعد الشمس</h2>
<ul>
<li><strong>سنتيلا أسياتيكا</strong> — مضادّة التهاب، شفاء جروح.</li>
<li><strong>الصبّار</strong> — مبرّد، مهدّي.</li>
<li><strong>بانثينول (B5)</strong> — يعجّل الشفاء.</li>
<li><strong>ماديكاسوسايد</strong> — سنتيلا مركّزة، مهدّية بعمق.</li>
<li><strong>نياسيناميد</strong> — يقلّل الاحمرار، يفتّح التصبّغ.</li>
<li><strong>فيتامين E</strong> — مضاد أكسدة، يدعم إصلاح البشرة.</li>
</ul>

<h2>إيش تجنّبي بعد التعرّض للشمس</h2>
<ul>
<li>ريتينول أو ريتينويدات.</li>
<li>AHA، BHA، جلايكوليك، ساليسيليك.</li>
<li>فيتامين C قوي (فوق 10%).</li>
<li>دوشات حارّة أو ساونا.</li>
<li>مقشّرات أو تونرات مقشّرة.</li>
<li>منتجات بروائح قوية.</li>
<li>منتجات بالكحول.</li>
<li>نكش البشرة المتقشّرة.</li>
</ul>

<h2>لو عم تتقشّري</h2>
<ul>
<li>ما تنكشي. خلّيها تتقشّر طبيعياً.</li>
<li>خلّي البشرة مرطّبة كتير.</li>
<li>طبّقي بترولاتوم بالليل.</li>
<li>تجنّبي المكياج لحدّ ما يوقف التقشّر.</li>
</ul>

<h2>منع حرق الشمس الجاي</h2>
<ul>
<li>SPF 50+ PA++++ يومياً، مش بس بالشاطئ.</li>
<li>أعيدي التطبيق كل ساعتين لمّا تكوني برّا.</li>
<li>استعملي ربع ملعقة شاي للوجه — أغلب الناس بستعملوا قليل.</li>
<li>البسي قبّعة بين الـ 10 صباحاً والـ 4 مساء.</li>
<li>أعواد الشمس الكورية ممتازة لإعادة التطبيق فوق المكياج.</li>
</ul>

<h2>متى تشوفي دكتور</h2>
<p>لو عندك:</p>
<ul>
<li>تنفّط.</li>
<li>حمّى أو قشعريرة.</li>
<li>ألم شديد.</li>
<li>إرتباك أو دوخة (علامات تسمّم شمس).</li>
</ul>
<p>شوفي دكتور فوراً. حروق شمس شديدة ممكن تحتاج علاج طبّي.</p>

<h2>ضرر الشمس طويل المدى</h2>
<p>حرق واحد سيّء ما بسبّب سرطان لحاله، بس ضرر الأشعة المتكرّر بيتراكم. العناية الكورية ممكن تساعد بتفتيح التصبّغ ودعم الإصلاح، بس واقي الشمس اليومي غير قابل للتفاوض. واقي الشمس أكثر منتج فعّال ضد الشيخوخة بالسوق — ولا سيروم بنافسه.</p>`,
    published_at: "2026-04-26T08:00:00Z",
  },
  {
    slug: "korean-beauty-tools-gua-sha-jade-roller-guide",
    title: "Korean Beauty Tools: Gua Sha, Jade Rollers, and Cleansing Brushes",
    excerpt:
      "Beauty tools can elevate any Korean skincare routine — but only if you use them right. Here's an honest guide to gua sha, jade rollers, and cleansing brushes.",
    seo_title: "Korean Beauty Tools Guide: Gua Sha, Jade Rollers, Brushes",
    seo_description:
      "Are Korean beauty tools worth it? An honest breakdown of gua sha, jade rollers, cleansing brushes, and LED masks. What works, what doesn't.",
    tags: ["beauty tools", "gua sha", "jade roller", "korean skincare", "facial massage"],
    cover_image: COVERS.spa1,
    title_ar: "أدوات الجمال الكورية: غوا شا، رولر اليشم، وفراشي التنظيف",
    excerpt_ar:
      "أدوات الجمال ممكن ترفع أي روتين عناية كوري — بس بس لو استعمليتيها صح. هاد دليل صادق للغوا شا، رولر اليشم، وفراشي التنظيف.",
    seo_title_ar: "دليل أدوات الجمال الكورية: غوا شا، رولر اليشم، فراشي",
    seo_description_ar:
      "أدوات الجمال الكورية تستاهل؟ تفكيك صادق للغوا شا، رولر اليشم، فراشي التنظيف، وماسكات الليد. إيش بشتغل وإيش لأ.",
    tags_ar: ["أدوات جمال", "غوا شا", "رولر يشم", "عناية كورية", "مساج وجه"],
    content: `<h2>The Reality of Beauty Tools</h2>
<p>Beauty tools won't replace your skincare. They <strong>enhance</strong> what your products do — by improving circulation, lymphatic drainage, and product absorption. Used correctly, they make a real difference. Used wrong, they're useless or even damaging.</p>

<h2>Gua Sha</h2>

<h3>What It Does</h3>
<p>A flat stone (jade, rose quartz, or stainless steel) used to massage the face. Promotes lymphatic drainage, reduces puffiness, sculpts cheekbones, and relaxes facial muscles.</p>

<h3>How to Use</h3>
<ol>
<li>Apply a facial oil or serum so the stone glides.</li>
<li>Hold the stone at a 15° angle to the skin.</li>
<li>Use light pressure — never drag harshly.</li>
<li>Stroke from the center of the face outward and upward.</li>
<li>Do each area 3-5 times.</li>
<li>Use 3-4 times a week, in the evening.</li>
</ol>

<h3>What Gua Sha Won't Do</h3>
<ul>
<li>Eliminate wrinkles permanently.</li>
<li>"Lift" the jawline permanently.</li>
<li>Replace botox or fillers.</li>
</ul>

<h3>What It Will Do</h3>
<ul>
<li>De-puff in the short term.</li>
<li>Improve circulation and skin glow.</li>
<li>Relax facial tension (especially TMJ and jaw clenching).</li>
<li>Help products absorb better.</li>
</ul>

<h2>Jade Roller</h2>

<h3>What It Does</h3>
<p>A small roller with a flat stone wheel at each end. Used for gentle massage and to cool the skin (keep it in the fridge).</p>

<h3>How to Use</h3>
<ol>
<li>Apply your serum first.</li>
<li>Roll from the center of the face outward.</li>
<li>Always roll upward and out — never down.</li>
<li>Use light pressure.</li>
<li>5-10 minutes daily or after applying skincare.</li>
</ol>

<h3>Cold Jade Roller Hack</h3>
<p>Keep the roller in the fridge overnight. The cold de-puffs in the morning, particularly under the eyes. Pair with caffeine eye cream for amplified effect.</p>

<h3>Jade Roller vs Gua Sha</h3>
<ul>
<li>Roller: easier, gentler, daily-friendly.</li>
<li>Gua Sha: more sculpting effect, takes practice.</li>
<li>Both improve circulation.</li>
</ul>

<h2>Cleansing Brushes</h2>

<h3>What They Do</h3>
<p>Mechanical or sonic brushes provide a deeper cleanse than fingertips. The Foreo Luna and Korean versions are popular.</p>

<h3>Who They're For</h3>
<ul>
<li>Oily or congested skin.</li>
<li>Heavy makeup users.</li>
<li>Combination skin in the T-zone.</li>
</ul>

<h3>Who Should Avoid</h3>
<ul>
<li>Sensitive skin.</li>
<li>Active acne.</li>
<li>Damaged barrier.</li>
<li>Eczema-prone skin.</li>
</ul>

<h3>How to Use</h3>
<ol>
<li>Apply cleanser to wet face.</li>
<li>Move the brush in circular motions for 60 seconds total.</li>
<li>Focus on T-zone if oily.</li>
<li>Rinse the brush after every use.</li>
<li>Replace brush heads every 3 months.</li>
</ol>

<h2>LED Masks</h2>

<h3>The Truth</h3>
<p>LED masks (red light for collagen, blue light for acne) have research behind them. The professional versions used in clinics deliver measurable results. The home versions are <strong>weaker but can still help</strong> if used consistently for 8+ weeks.</p>

<h3>Worth It?</h3>
<ul>
<li>Yes, if you'll commit to 10-20 minutes 3-4 times a week.</li>
<li>No, if you'll use it twice and let it sit.</li>
<li>Affordable options: Cellreturn, Mediheal LED Mask.</li>
</ul>

<h2>Microcurrent Devices</h2>
<p>The NuFace and similar tools claim to "tone" facial muscles. Some users see modest lifting effects with daily use. Effects fade if you stop. Not life-changing, but real for some.</p>

<h2>Tools to Skip</h2>
<ul>
<li><strong>Dermarollers at home.</strong> The risk of infection and barrier damage outweighs the benefit for most people. Leave this to a pro.</li>
<li><strong>Suction "pore vacuums."</strong> They create broken capillaries.</li>
<li><strong>Anything claiming to "tighten" with a single use.</strong> Marketing.</li>
</ul>

<h2>The Bottom Line</h2>
<p>Beauty tools are accessories, not essentials. If you have 10 minutes and an oil, gua sha is a lovely ritual that genuinely helps. If you're starting K-beauty, fix the routine first — then add the tools.</p>`,
    content_ar: `<h2>حقيقة أدوات الجمال</h2>
<p>أدوات الجمال ما رح تعوّض عنايتك. هي <strong>بترفع</strong> اللي بتعمله منتجاتك — بتحسين الدورة الدموية، تصريف اللمف، وامتصاص المنتجات. مستعملة صح، بتفرق فعلاً. مستعملة غلط، بلا فايدة أو حتى ضارّة.</p>

<h2>غوا شا</h2>

<h3>إيش بتعمل</h3>
<p>حجر مسطّح (يشم، روز كوارتز، أو فولاذ) بستعمل لمساج الوجه. بعزّز تصريف اللمف، يقلّل الانتفاخ، ينحت عظام الخدود، ويرخي عضلات الوجه.</p>

<h3>كيف تستعملي</h3>
<ol>
<li>طبّقي زيت وجه أو سيروم عشان الحجر ينزلق.</li>
<li>اضبطي الحجر بزاوية 15 درجة على البشرة.</li>
<li>استعملي ضغط خفيف — أبداً ما تجرّي بقوّة.</li>
<li>اضربي من مركز الوجه للخارج وللفوق.</li>
<li>اعملي كل منطقة 3-5 مرات.</li>
<li>استعمليها 3-4 مرات بالأسبوع، بالمساء.</li>
</ol>

<h3>إيش ما رح تعمله الغوا شا</h3>
<ul>
<li>تشيل التجاعيد للأبد.</li>
<li>"ترفع" خط الفك للأبد.</li>
<li>تعوّض البوتوكس أو الفيلر.</li>
</ul>

<h3>إيش رح تعمله</h3>
<ul>
<li>تشيل الانتفاخ على المدى القصير.</li>
<li>تحسّن الدورة الدموية ووهج البشرة.</li>
<li>ترخي توتّر الوجه (خصوصاً المفصل الفكّي وضغط الفك).</li>
<li>تساعد على امتصاص المنتجات أحسن.</li>
</ul>

<h2>رولر اليشم</h2>

<h3>إيش بعمل</h3>
<p>رولر صغير بعجلة حجر مسطّحة بكل نهاية. بستعمل لمساج لطيف وتبريد البشرة (خلّيه بالثلّاجة).</p>

<h3>كيف تستعملي</h3>
<ol>
<li>طبّقي سيرومك أوّل.</li>
<li>دحرجيه من مركز الوجه للخارج.</li>
<li>دايماً دحرجي للفوق وللخارج — أبداً للتحت.</li>
<li>استعملي ضغط خفيف.</li>
<li>5-10 دقايق يومياً أو بعد تطبيق العناية.</li>
</ol>

<h3>حيلة رولر اليشم البارد</h3>
<p>خلّي الرولر بالثلّاجة طول الليل. البرودة بتشيل الانتفاخ بالصبح، خصوصاً تحت العين. اقرنيه مع كريم عين بكافيين لتأثير مضاعف.</p>

<h3>رولر اليشم مقابل الغوا شا</h3>
<ul>
<li>الرولر: أسهل، ألطف، صديق يومي.</li>
<li>الغوا شا: تأثير نحت أكثر، بدّه تمرين.</li>
<li>كلاهما بحسّنوا الدورة الدموية.</li>
</ul>

<h2>فراشي التنظيف</h2>

<h3>إيش بعملوا</h3>
<p>فراشي ميكانيكية أو صوتية بتوفّر تنظيف أعمق من الأصابع. الـ Foreo Luna والنسخ الكورية شعبية.</p>

<h3>لمين</h3>
<ul>
<li>بشرة دهنية أو مزدحمة.</li>
<li>مستخدمي مكياج ثقيل.</li>
<li>بشرة مختلطة بمنطقة T.</li>
</ul>

<h3>مين لازم يتجنّب</h3>
<ul>
<li>بشرة حسّاسة.</li>
<li>حب شباب نشط.</li>
<li>حاجز متضرّر.</li>
<li>بشرة معرّضة للإكزيما.</li>
</ul>

<h3>كيف تستعملي</h3>
<ol>
<li>طبّقي منظّف على وجه مبلول.</li>
<li>حرّكي الفرشاة بحركات دائرية لـ 60 ثانية إجمالاً.</li>
<li>ركّزي على منطقة T لو دهنية.</li>
<li>اشطفي الفرشاة بعد كل استعمال.</li>
<li>بدّلي رؤوس الفرشاة كل 3 شهور.</li>
</ol>

<h2>ماسكات الليد</h2>

<h3>الحقيقة</h3>
<p>ماسكات الليد (ضوء أحمر للكولاجين، أزرق لحب الشباب) عندها بحث علمي ورا. النسخ الاحترافية المستعملة بالعيادات بتعطي نتائج قابلة للقياس. النسخ البيتية <strong>أضعف بس ممكن تساعد</strong> لو استعمليتيها بانتظام لـ 8+ أسابيع.</p>

<h3>تستاهل؟</h3>
<ul>
<li>أيوا، لو رح تلتزمي بـ 10-20 دقيقة 3-4 مرات بالأسبوع.</li>
<li>لأ، لو رح تستعمليها مرّتين وتخلّيها مركونة.</li>
<li>خيارات اقتصادية: Cellreturn، Mediheal LED Mask.</li>
</ul>

<h2>أجهزة التيار الكهربائي الدقيق</h2>
<p>الـ NuFace وأدوات مشابهة بتدّعي إنّها "تشد" عضلات الوجه. بعض المستخدمين بشوفوا آثار رفع متواضعة باستعمال يومي. الآثار بتختفي لو وقفتي. مش مغيّرة للحياة، بس حقيقية للبعض.</p>

<h2>أدوات تجاهليها</h2>
<ul>
<li><strong>الديرما رولر بالبيت.</strong> خطر العدوى وضرر الحاجز بيفوق الفايدة لأغلب الناس. خلّي هاد لمحترف.</li>
<li><strong>شفّاطات المسامات.</strong> بتعمل أوعية شعرية مكسورة.</li>
<li><strong>أي اشي بدّعي "شدّ" بمرّة واحدة.</strong> تسويق.</li>
</ul>

<h2>الخلاصة</h2>
<p>أدوات الجمال إكسسوارات، مش أساسيات. لو عندك 10 دقايق وزيت، الغوا شا طقس جميل وبيساعد فعلاً. لو بتبتدئي K-beauty، صلّحي الروتين أوّل — بعدها ضيفي الأدوات.</p>`,
    published_at: "2026-04-25T08:00:00Z",
  },
]

export { AUTHOR, AUTHOR_AR }
