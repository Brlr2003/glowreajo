"use client"

import { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from "react"

export interface CartItem {
  id: string
  variantId: string
  productId: string
  title: string
  variant: string
  price: number
  quantity: number
  image?: string
  brand?: string
}

interface PromoState {
  code: string
  discount: number
  type: string
  value: number
}

interface CartState {
  items: CartItem[]
  isDrawerOpen: boolean
  promo: PromoState | null
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_DRAWER" }
  | { type: "SET_DRAWER"; payload: boolean }
  | { type: "LOAD_CART"; payload: CartItem[] }
  | { type: "APPLY_PROMO"; payload: PromoState }
  | { type: "REMOVE_PROMO" }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.variantId === action.payload.variantId)
      if (existing) {
        return {
          ...state,
          promo: null, // Clear promo when cart changes
          items: state.items.map((i) =>
            i.variantId === action.payload.variantId
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        }
      }
      return { ...state, promo: null, items: [...state.items, action.payload] }
    }
    case "REMOVE_ITEM":
      return { ...state, promo: null, items: state.items.filter((i) => i.id !== action.payload) }
    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        return { ...state, promo: null, items: state.items.filter((i) => i.id !== action.payload.id) }
      }
      return {
        ...state,
        promo: null,
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      }
    case "CLEAR_CART":
      return { ...state, items: [], promo: null }
    case "TOGGLE_DRAWER":
      return { ...state, isDrawerOpen: !state.isDrawerOpen }
    case "SET_DRAWER":
      return { ...state, isDrawerOpen: action.payload }
    case "LOAD_CART":
      return { ...state, items: action.payload }
    case "APPLY_PROMO":
      return { ...state, promo: action.payload }
    case "REMOVE_PROMO":
      return { ...state, promo: null }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  isDrawerOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleDrawer: () => void
  setDrawerOpen: (open: boolean) => void
  totalItems: number
  totalPrice: number
  promo: PromoState | null
  applyPromo: (promo: PromoState) => void
  removePromo: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isDrawerOpen: false, promo: null })

  useEffect(() => {
    const saved = localStorage.getItem("glowreajo-cart")
    if (saved) {
      try {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(saved) })
      } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("glowreajo-cart", JSON.stringify(state.items))
  }, [state.items])

  const addItem = useCallback((item: CartItem) => dispatch({ type: "ADD_ITEM", payload: item }), [])
  const removeItem = useCallback((id: string) => dispatch({ type: "REMOVE_ITEM", payload: id }), [])
  const updateQuantity = useCallback(
    (id: string, quantity: number) => dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } }),
    []
  )
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), [])
  const toggleDrawer = useCallback(() => dispatch({ type: "TOGGLE_DRAWER" }), [])
  const setDrawerOpen = useCallback(
    (open: boolean) => dispatch({ type: "SET_DRAWER", payload: open }),
    []
  )
  const applyPromo = useCallback(
    (promo: PromoState) => dispatch({ type: "APPLY_PROMO", payload: promo }),
    []
  )
  const removePromo = useCallback(() => dispatch({ type: "REMOVE_PROMO" }), [])

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isDrawerOpen: state.isDrawerOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleDrawer,
        setDrawerOpen,
        totalItems,
        totalPrice,
        promo: state.promo,
        applyPromo,
        removePromo,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
