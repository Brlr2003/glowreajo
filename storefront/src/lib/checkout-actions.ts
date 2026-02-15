import { medusa } from "./medusa-client"

export async function createCart() {
  const { cart } = await medusa.store.cart.create({})
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

export async function completeCart(cartId: string) {
  const { type, order } = await medusa.store.cart.complete(cartId)
  return { type, order }
}
