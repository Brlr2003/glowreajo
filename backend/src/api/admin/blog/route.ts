import { BLOG_MODULE } from "../../../modules/blog"

export async function GET(req: any, res: any) {
  try {
    const blogService = req.scope.resolve(BLOG_MODULE) as any
    const [posts, count] = await blogService.listAndCountBlogPosts(
      {},
      { order: { created_at: "DESC" }, take: 100 }
    )
    res.json({ blog_posts: posts, count })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export async function POST(req: any, res: any) {
  try {
    const blogService = req.scope.resolve(BLOG_MODULE) as any
    const body = req.body as any

    if (!body.title || !body.slug) {
      return res.status(400).json({ message: "Title and slug are required" })
    }

    const post = await blogService.createBlogPosts(body)
    res.status(201).json({ blog_post: post })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
