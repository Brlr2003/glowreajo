import { model } from "@medusajs/framework/utils"

const BlogPost = model.define("blog_post", {
  id: model.id().primaryKey(),
  title: model.text(),
  slug: model.text(),
  excerpt: model.text().nullable(),
  content: model.text().nullable(),
  cover_image: model.text().nullable(),
  author: model.text().nullable(),
  status: model.enum(["draft", "published"]).default("draft"),
  tags: model.json().nullable(),
  seo_title: model.text().nullable(),
  seo_description: model.text().nullable(),
  published_at: model.dateTime().nullable(),
  metadata: model.json().nullable(),
})

export default BlogPost
