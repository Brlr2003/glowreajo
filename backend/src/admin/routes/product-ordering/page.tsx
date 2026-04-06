import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button } from "@medusajs/ui"
import { useState, useEffect } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface Product {
  id: string
  title: string
  thumbnail: string | null
  metadata: Record<string, any> | null
}

function SortableItem({ product, index }: { product: Product; index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: product.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
    opacity: isDragging ? 0.8 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3 rounded-lg border ${
        isDragging ? "border-ui-border-interactive bg-ui-bg-highlight shadow-lg" : "border-ui-border-base bg-ui-bg-base"
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 text-ui-fg-muted hover:text-ui-fg-base"
        title="Drag to reorder"
      >
        &#9776;
      </button>
      <span className="text-ui-fg-muted text-sm w-8 text-center">{index + 1}</span>
      {product.thumbnail ? (
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-10 h-10 rounded object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded bg-ui-bg-subtle flex items-center justify-center text-ui-fg-muted text-xs">
          N/A
        </div>
      )}
      <span className="font-medium text-ui-fg-base flex-1">{product.title}</span>
    </div>
  )
}

function ProductOrderingPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [message, setMessage] = useState("")

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const res = await fetch(
        "/admin/products?limit=100&fields=id,title,thumbnail,+metadata",
        { credentials: "include" }
      )
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      const sorted = (data.products || []).sort((a: Product, b: Product) => {
        const orderA = Number(a.metadata?.sort_order ?? 999999)
        const orderB = Number(b.metadata?.sort_order ?? 999999)
        return orderA - orderB
      })
      setProducts(sorted)
    } catch {
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  function handleDragEnd(event: any) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setProducts((prev) => {
      const oldIndex = prev.findIndex((p) => p.id === active.id)
      const newIndex = prev.findIndex((p) => p.id === over.id)
      return arrayMove(prev, oldIndex, newIndex)
    })
    setDirty(true)
    setMessage("")
  }

  async function handleSave() {
    setSaving(true)
    setMessage("")
    try {
      for (let i = 0; i < products.length; i++) {
        const p = products[i]
        await fetch(`/admin/products/${p.id}`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ metadata: { ...p.metadata, sort_order: i } }),
        })
      }
      setDirty(false)
      setMessage("Order saved successfully!")
      setTimeout(() => setMessage(""), 3000)
    } catch {
      setMessage("Failed to save order.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Container className="p-8">
        <p className="text-ui-fg-muted">Loading products...</p>
      </Container>
    )
  }

  return (
    <Container className="p-0">
      <div className="px-6 py-4 border-b border-ui-border-base flex items-center justify-between">
        <div>
          <Heading level="h1">Product Ordering</Heading>
          <p className="text-ui-fg-muted text-sm mt-1">
            Drag and drop to set the display order on the storefront.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {message && (
            <span className={`text-sm ${message.includes("success") ? "text-ui-fg-interactive" : "text-ui-fg-error"}`}>
              {message}
            </span>
          )}
          <Button
            variant="primary"
            size="small"
            onClick={handleSave}
            isLoading={saving}
            disabled={!dirty}
          >
            Save Order
          </Button>
        </div>
      </div>

      <div className="p-6">
        {products.length === 0 ? (
          <p className="text-ui-fg-muted text-sm">No products found.</p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={products.map((p) => p.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-2">
                {products.map((product, index) => (
                  <SortableItem key={product.id} product={product} index={index} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Product Ordering",
})

export default ProductOrderingPage
