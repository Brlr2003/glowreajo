import { BLOG_MODULE } from "../../../modules/blog"

export async function GET(req: any, res: any) {
  try {
    const blogService = req.scope.resolve(BLOG_MODULE) as any
    const [posts, count] = await blogService.listAndCountBlogPosts(
      { status: "published" },
      {
        order: { published_at: "DESC" },
        take: 50,
      }
    )
    res.json({ blog_posts: posts, count })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
