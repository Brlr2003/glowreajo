import { BLOG_MODULE } from "../../../../modules/blog"

export async function GET(req: any, res: any) {
  try {
    const blogService = req.scope.resolve(BLOG_MODULE) as any
    const post = await blogService.retrieveBlogPost(req.params.id)
    res.json({ blog_post: post })
  } catch (error: any) {
    res.status(404).json({ message: "Post not found" })
  }
}

export async function POST(req: any, res: any) {
  try {
    const blogService = req.scope.resolve(BLOG_MODULE) as any
    const post = await blogService.updateBlogPosts(req.params.id, req.body as any)
    res.json({ blog_post: post })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export async function DELETE(req: any, res: any) {
  try {
    const blogService = req.scope.resolve(BLOG_MODULE) as any
    await blogService.deleteBlogPosts(req.params.id)
    res.json({ id: req.params.id, deleted: true })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
