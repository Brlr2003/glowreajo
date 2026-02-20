import { medusa, getRegionId } from "./medusa-client"
import type { CartItem } from "@/context/CartContext"

export async function createCart() {
  const region_id = await getRegionId()
  const { cart } = await medusa.store.cart.create({ region_id } as any)
  return cart
}

export async function addToCart(cartId: string, variantId: string, quantity: number) {
  const { cart } = await medusa.store.cart.createLineItem(cartId, {
    variant_id: variantId,
    quantity,
  })
  return cart
}

export async function updateLineItem(cartId: string, lineItemId: string, quantity: number) {
  const { cart } = await medusa.store.cart.updateLineItem(cartId, lineItemId, {
    quantity,
  })
  return cart
}

export async function removeLineItem(cartId: string, lineItemId: string) {
  const { parent: cart } = await medusa.store.cart.deleteLineItem(cartId, lineItemId)
  return cart
}

export async function updateCart(
  cartId: string,
  data: {
    email?: string
    shipping_address?: {
      first_name: string
      last_name: string
      address_1: string
      city: string
      country_code: string
      phone?: string
    }
    billing_address?: {
      first_name: string
      last_name: string
      address_1: string
      city: string
      country_code: string
      phone?: string
    }
  }
) {
  const { cart } = await medusa.store.cart.update(cartId, data)
  return cart
}

export async function addShippingMethod(cartId: string, optionId: string) {
  const { cart } = await medusa.store.cart.addShippingMethod(cartId, {
    option_id: optionId,
  })
  return cart
}

export async function getShippingOptions(cartId: string) {
  const { shipping_options } = await medusa.store.fulfillment.listCartOptions(
    { cart_id: cartId } as any
  )
  return shipping_options
}

export async function completeCart(cartId: string) {
  const { type, order } = await medusa.store.cart.complete(cartId)
  return { type, order }
}

interface PersonalInfo {
  firstName: string
  lastName: string
  phone: string
  email: string
  city: string
  address: string
  notes?: string
}

export interface PlaceOrderResult {
  id: string
  displayId: string
  total: number
}

function pickShippingOption(options: any[], city: string, subtotalAfterDiscount: number): any {
  const find = (keyword: string) =>
    options.find((o: any) => o.name.toLowerCase().includes(keyword))

  // Free shipping for orders >= 50 JOD
  if (subtotalAfterDiscount >= 50) {
    return find("free") || options[0]
  }

  const cityLower = city.toLowerCase().trim()
  if (cityLower === "amman" || cityLower === "عمان") {
    return find("amman") || find("free") || options[0]
  }

  return find("other") || find("free") || options[0]
}

export async function placeOrder(
  items: CartItem[],
  personalInfo: PersonalInfo,
  promoCode?: string,
  promoDiscount?: number
): Promise<PlaceOrderResult> {
  // 1. Create a fresh Medusa cart
  let cart = await createCart()

  // 2. Add all items to the cart
  for (const item of items) {
    try {
      cart = await addToCart(cart.id, item.variantId, item.quantity)
    } catch (err: any) {
      const msg = err?.message || ""
      if (msg.includes("inventory") || msg.includes("stock") || msg.includes("quantity")) {
        throw new Error(`"${item.title}" is out of stock or has insufficient quantity. Please review your cart.`)
      }
      throw err
    }
  }

  // 3. Apply promo code if provided
  if (promoCode) {
    try {
      await medusa.store.cart.update(cart.id, {
        promo_codes: [promoCode],
      } as any)
    } catch {
      // Promo application is non-critical — continue without it
    }
  }

  // 4. Set customer info and addresses
  const address = {
    first_name: personalInfo.firstName,
    last_name: personalInfo.lastName,
    address_1: personalInfo.address,
    city: personalInfo.city,
    country_code: "jo",
    phone: personalInfo.phone,
  }

  const metadata: Record<string, string> = {}
  if (personalInfo.notes?.trim()) {
    metadata.order_notes = personalInfo.notes.trim()
  }

  cart = await updateCart(cart.id, {
    email: personalInfo.email,
    shipping_address: address,
    billing_address: address,
    ...(Object.keys(metadata).length > 0 ? { metadata } : {}),
  } as any)

  // 5. Select shipping option based on city and subtotal
  const shippingOptions = await getShippingOptions(cart.id)
  if (!shippingOptions || shippingOptions.length === 0) {
    throw new Error("No shipping options available")
  }

  const subtotalForShipping = items.reduce((sum: number, i: CartItem) => sum + i.price * i.quantity, 0) - (promoDiscount || 0)
  const selectedOption = pickShippingOption(shippingOptions, personalInfo.city, subtotalForShipping)
  cart = await addShippingMethod(cart.id, selectedOption.id)

  // 6. Initialize payment session
  await medusa.store.payment.initiatePaymentSession(cart as any, {
    provider_id: "pp_system_default",
  })

  // 7. Complete the cart → creates the order
  const { type, order } = await completeCart(cart.id)
  if (type !== "order" || !order) {
    throw new Error("Order creation failed")
  }

  // Calculate totals for both success page and email
  const subtotal = items.reduce((sum: number, i: CartItem) => sum + i.price * i.quantity, 0)
  const discount = promoDiscount || 0
  const subtotalAfterDiscount = subtotal - discount
  const cityForEmail = personalInfo.city.toLowerCase().trim()
  const isAmman = cityForEmail === "amman" || cityForEmail === "عمان"
  const shipping = subtotalAfterDiscount >= 50 ? 0 : isAmman ? 2 : 3

  const result: PlaceOrderResult = {
    id: order.id,
    displayId: order.display_id?.toString() || order.id,
    total: subtotalAfterDiscount + shipping,
  }

  // Fire-and-forget order confirmation email
  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
  const apiKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
  fetch(`${backendUrl}/store/order/confirm-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-publishable-api-key": apiKey,
    },
    body: JSON.stringify({
      email: personalInfo.email,
      name: `${personalInfo.firstName} ${personalInfo.lastName}`,
      orderId: result.displayId,
      items: items.map((item: CartItem) => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal,
      shipping,
      discount,
      total: subtotalAfterDiscount + shipping,
      address: personalInfo.address,
      city: personalInfo.city,
      phone: personalInfo.phone || "",
      promoCode: promoCode || "",
      notes: personalInfo.notes?.trim() || "",
    }),
  }).catch((err: any) => console.error("[OrderEmail] Failed:", err?.message))

  return result
}
