import { BLOG_MODULE } from "../modules/blog"
import { NEW_BLOGS, AUTHOR, AUTHOR_AR } from "./blogs-data"

export default async function seedBlogs({ container }: { container: any }) {
  const logger = container.resolve("logger")
  const blogService = container.resolve(BLOG_MODULE) as any

  logger.info(`Seeding ${NEW_BLOGS.length} blog posts (idempotent by slug)...`)

  let created = 0
  let skipped = 0

  for (const post of NEW_BLOGS) {
    const [existing] = await blogService.listAndCountBlogPosts(
      { slug: post.slug },
      { take: 1 }
    )

    if (existing.length > 0) {
      skipped++
      continue
    }

    await blogService.createBlogPosts({
      ...post,
      author: AUTHOR,
      author_ar: AUTHOR_AR,
      status: "published",
    })
    created++
    logger.info(`  ✓ Created: ${post.slug}`)
  }

  logger.info(`Blog seed complete. Created: ${created}, Skipped (already existed): ${skipped}`)
}
