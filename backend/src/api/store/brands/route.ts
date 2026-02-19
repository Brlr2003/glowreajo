export async function GET(req: any, res: any) {
  try {
    const productService = req.scope.resolve("product") as any
    const [products] = await productService.listAndCountProducts(
      {},
      { select: ["id", "metadata"] }
    )

    const brandSet = new Set<string>()
    for (const product of products) {
      const brand = product.metadata?.brand
      if (brand && typeof brand === "string" && brand.trim()) {
        brandSet.add(brand.trim())
      }
    }

    const brands = Array.from(brandSet).sort()
    res.json({ brands })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
