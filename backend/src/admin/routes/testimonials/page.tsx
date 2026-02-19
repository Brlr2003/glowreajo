import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, Table, Badge } from "@medusajs/ui"
import { useState, useEffect } from "react"

interface Testimonial {
  id: string
  name: string
  location: string | null
  text: string
  product: string | null
  rating: number
  sort_order: number
  is_active: boolean
}

function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  async function fetchTestimonials() {
    try {
      const res = await fetch("/admin/testimonials", { credentials: "include" })
      if (!res.ok) throw new Error("Failed")
      const data = await res.json()
      setTestimonials(data.testimonials || [])
    } catch {
      setTestimonials([])
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return
    setDeleting(id)
    try {
      await fetch(`/admin/testimonials/${id}`, { method: "DELETE", credentials: "include" })
      setTestimonials((prev) => prev.filter((t) => t.id !== id))
    } catch {
      alert("Failed to delete")
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return <Container className="p-8"><p className="text-ui-fg-muted">Loading...</p></Container>
  }

  return (
    <Container className="p-0">
      <div className="px-6 py-4 border-b border-ui-border-base flex items-center justify-between">
        <div>
          <Heading level="h1">Testimonials</Heading>
          <p className="text-ui-fg-muted text-sm mt-1">Manage customer reviews shown on the storefront.</p>
        </div>
        <Button variant="primary" size="small" onClick={() => { window.location.href = "/app/testimonials/create" }}>
          + Add Testimonial
        </Button>
      </div>

      <div className="p-6">
        {testimonials.length === 0 ? (
          <p className="text-ui-fg-muted text-sm">No testimonials yet.</p>
        ) : (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>Product</Table.HeaderCell>
                <Table.HeaderCell>Rating</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Order</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {testimonials.map((t) => (
                <Table.Row key={t.id}>
                  <Table.Cell className="font-medium">{t.name}</Table.Cell>
                  <Table.Cell>{t.location || "-"}</Table.Cell>
                  <Table.Cell>{t.product || "-"}</Table.Cell>
                  <Table.Cell>{"*".repeat(t.rating)}</Table.Cell>
                  <Table.Cell>
                    <Badge color={t.is_active ? "green" : "grey"}>
                      {t.is_active ? "Active" : "Hidden"}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>{t.sort_order}</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={() => { window.location.href = `/app/testimonials/${t.id}` }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="small"
                        onClick={() => handleDelete(t.id)}
                        isLoading={deleting === t.id}
                      >
                        Delete
                      </Button>
                    </div>
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
  label: "Testimonials",
})

export default TestimonialsPage
