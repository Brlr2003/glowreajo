import { BLOG_MODULE } from "../../../../modules/blog"

export async function GET(req: any, res: any) {
  try {
    const { slug } = req.params
    const blogService = req.scope.resolve(BLOG_MODULE) as any
    const [posts] = await blogService.listAndCountBlogPosts(
      { slug, status: "published" },
      { take: 1 }
    )

    if (!posts.length) {
      return res.status(404).json({ message: "Post not found" })
    }

    res.json({ blog_post: posts[0] })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
