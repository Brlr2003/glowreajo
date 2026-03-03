import { model } from "@medusajs/framework/utils"

const Testimonial = model.define("testimonial", {
  id: model.id().primaryKey(),
  name: model.text(),
  location: model.text().nullable(),
  text: model.text(),
  product: model.text().nullable(),
  name_ar: model.text().nullable(),
  location_ar: model.text().nullable(),
  text_ar: model.text().nullable(),
  product_ar: model.text().nullable(),
  rating: model.number().default(5),
  sort_order: model.number().default(0),
  is_active: model.boolean().default(true),
})

export default Testimonial
