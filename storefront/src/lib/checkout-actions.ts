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

export async function placeOrder(
  items: CartItem[],
  personalInfo: PersonalInfo,
  promoCode?: string
): Promise<PlaceOrderResult> {
  // 1. Create a fresh Medusa cart
  let cart = await createCart()

  // 2. Add all items to the cart
  for (const item of items) {
    cart = await addToCart(cart.id, item.variantId, item.quantity)
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

  cart = await updateCart(cart.id, {
    email: personalInfo.email,
    shipping_address: address,
    billing_address: address,
  })

  // 5. Select shipping option
  const shippingOptions = await getShippingOptions(cart.id)
  if (!shippingOptions || shippingOptions.length === 0) {
    throw new Error("No shipping options available")
  }
  cart = await addShippingMethod(cart.id, shippingOptions[0].id)

  // 6. Initialize payment session
  await medusa.store.payment.initiatePaymentSession(cart as any, {
    provider_id: "pp_system_default",
  })

  // 7. Complete the cart → creates the order
  const { type, order } = await completeCart(cart.id)
  if (type !== "order" || !order) {
    throw new Error("Order creation failed")
  }

  return {
    id: order.id,
    displayId: order.display_id?.toString() || order.id,
    total: (order as any).total || 0,
  }
}
