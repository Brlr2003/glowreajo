import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, Input, Table, Badge } from "@medusajs/ui"
import { useState, useEffect } from "react"

interface ProductTag {
  id: string
  value: string
  created_at: string
}

function ProductTagsPage() {
  const [tags, setTags] = useState<ProductTag[]>([])
  const [loading, setLoading] = useState(true)
  const [newTag, setNewTag] = useState("")
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchTags()
  }, [])

  async function fetchTags() {
    try {
      const res = await fetch("/admin/product-tags?limit=100", { credentials: "include" })
      if (!res.ok) throw new Error("Failed")
      const data = await res.json()
      setTags(data.product_tags || [])
    } catch {
      setTags([])
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate() {
    const value = newTag.trim()
    if (!value) return
    setCreating(true)
    try {
      const res = await fetch("/admin/product-tags", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      })
      if (!res.ok) throw new Error("Failed")
      const data = await res.json()
      setTags((prev) => [...prev, data.product_tag])
      setNewTag("")
    } catch {
      alert("Failed to create tag. It may already exist.")
    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this tag? It will be removed from all products.")) return
    setDeleting(id)
    try {
      await fetch(`/admin/product-tags/${id}`, { method: "DELETE", credentials: "include" })
      setTags((prev) => prev.filter((t) => t.id !== id))
    } catch {
      alert("Failed to delete tag.")
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return <Container className="p-8"><p className="text-ui-fg-muted">Loading...</p></Container>
  }

  return (
    <Container className="p-0">
      <div className="px-6 py-4 border-b border-ui-border-base">
        <Heading level="h1">Product Tags</Heading>
        <p className="text-ui-fg-muted text-sm mt-1">
          Create and manage tags. Once created, tags can be assigned to products in the product editor under Organization &gt; Tags.
        </p>
      </div>

      <div className="p-6">
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="New tag name (e.g. New Arrival)"
            value={newTag}
            onChange={(e: any) => setNewTag(e.target.value)}
            onKeyDown={(e: any) => { if (e.key === "Enter") handleCreate() }}
          />
          <Button
            variant="primary"
            size="small"
            onClick={handleCreate}
            isLoading={creating}
            disabled={!newTag.trim()}
          >
            + Create Tag
          </Button>
        </div>

        {tags.length === 0 ? (
          <p className="text-ui-fg-muted text-sm">No tags yet. Create one above.</p>
        ) : (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Tag</Table.HeaderCell>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tags.map((tag) => (
                <Table.Row key={tag.id}>
                  <Table.Cell>
                    <Badge color="blue">{tag.value}</Badge>
                  </Table.Cell>
                  <Table.Cell className="text-ui-fg-muted text-xs font-mono">{tag.id}</Table.Cell>
                  <Table.Cell>
                    <Button
                      variant="danger"
                      size="small"
                      onClick={() => handleDelete(tag.id)}
                      isLoading={deleting === tag.id}
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Product Tags",
})

export default ProductTagsPage
