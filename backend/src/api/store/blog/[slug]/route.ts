import { BLOG_MODULE } from "../../../../modules/blog"
import { localize } from "../../../helpers/localize"

const BLOG_FIELDS = ["title", "excerpt", "content", "author", "tags", "seo_title", "seo_description"]

export async function GET(req: any, res: any) {
  try {
    const { slug } = req.params
    const locale = req.query.locale || "en"
    const blogService = req.scope.resolve(BLOG_MODULE) as any
    const [posts] = await blogService.listAndCountBlogPosts(
      { slug, status: "published" },
      { take: 1 }
    )

    if (!posts.length) {
      return res.status(404).json({ message: "Post not found" })
    }

    res.json({ blog_post: localize(posts[0], locale, BLOG_FIELDS) })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
