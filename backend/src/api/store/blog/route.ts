import { BLOG_MODULE } from "../../../modules/blog"
import { localizeArray } from "../../helpers/localize"

const BLOG_FIELDS = ["title", "excerpt", "content", "author", "tags", "seo_title", "seo_description"]

export async function GET(req: any, res: any) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const locale = url.searchParams.get("locale") || "en"
    const blogService = req.scope.resolve(BLOG_MODULE) as any
    const [posts, count] = await blogService.listAndCountBlogPosts(
      { status: "published" },
      {
        order: { published_at: "DESC" },
        take: 50,
      }
    )
    res.json({ blog_posts: localizeArray(posts, locale, BLOG_FIELDS), count })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
