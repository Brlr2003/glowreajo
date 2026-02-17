import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading } from "@medusajs/ui"

type DetailWidgetProps = {
  data: { id: string; metadata: Record<string, any> | null }
}

function OrderNotesWidget({ data }: DetailWidgetProps) {
  const notes = data.metadata?.order_notes

  if (!notes) return null

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Order Notes</Heading>
      </div>
      <div className="px-6 py-4">
        <p className="text-ui-fg-subtle text-sm whitespace-pre-wrap">{notes}</p>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "order.details.side.after",
})

export default OrderNotesWidget
