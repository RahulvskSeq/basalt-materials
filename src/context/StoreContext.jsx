import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { productById } from '../data/products'

const StoreContext = createContext(null)

/* Namespaced per brand: every demo is served from the same origin, so a
   shared key would let one site's basket overwrite another's. */
const CART_KEY = 'basalt.cart.v1'
const WISH_KEY = 'basalt.wishlist.v1'

export const FREE_DELIVERY_THRESHOLD = 15000

const readLS = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

const writeLS = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable (private mode) — cart simply won't persist */
  }
}

/* ---------------- Cart reducer ---------------- */
function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { id, qty } = action
      const existing = state.find((l) => l.id === id)
      if (existing) {
        return state.map((l) => (l.id === id ? { ...l, qty: Math.min(99, l.qty + qty) } : l))
      }
      return [...state, { id, qty }]
    }
    case 'setQty': {
      if (action.qty < 1) return state.filter((l) => l.id !== action.id)
      return state.map((l) => (l.id === action.id ? { ...l, qty: Math.min(99, action.qty) } : l))
    }
    case 'remove':
      return state.filter((l) => l.id !== action.id)
    case 'clear':
      return []
    default:
      return state
  }
}

export function StoreProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, undefined, () =>
    readLS(CART_KEY, []).filter((l) => productById[l?.id])
  )
  const [wishlist, setWishlist] = useState(() =>
    readLS(WISH_KEY, []).filter((id) => productById[id])
  )

  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  /** Product object currently shown in the Quick View modal, or null. */
  const [quickView, setQuickView] = useState(null)
  /** Bumped on every add-to-cart so the header icon can pulse. */
  const [pulse, setPulse] = useState(0)

  useEffect(() => writeLS(CART_KEY, cart), [cart])
  useEffect(() => writeLS(WISH_KEY, wishlist), [wishlist])

  const addToCart = useCallback((id, qty = 1, { open = true } = {}) => {
    dispatch({ type: 'add', id, qty })
    setPulse((n) => n + 1)
    if (open) setCartOpen(true)
  }, [])

  const setQty = useCallback((id, qty) => dispatch({ type: 'setQty', id, qty }), [])
  const removeFromCart = useCallback((id) => dispatch({ type: 'remove', id }), [])
  const clearCart = useCallback(() => dispatch({ type: 'clear' }), [])

  const toggleWishlist = useCallback((id) => {
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]))
  }, [])

  const removeFromWishlist = useCallback((id) => {
    setWishlist((w) => w.filter((x) => x !== id))
  }, [])

  const moveToCart = useCallback(
    (id) => {
      dispatch({ type: 'add', id, qty: 1 })
      setWishlist((w) => w.filter((x) => x !== id))
      setPulse((n) => n + 1)
      setCartOpen(true)
    },
    []
  )

  /** Cart lines joined to product records, with per-line totals. */
  const lines = useMemo(
    () =>
      cart
        .map((l) => {
          const product = productById[l.id]
          if (!product) return null
          return {
            ...l,
            product,
            lineTotal: product.price * l.qty,
            lineMrp: product.mrp * l.qty,
          }
        })
        .filter(Boolean),
    [cart]
  )

  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.lineTotal, 0), [lines])
  const savings = useMemo(() => lines.reduce((s, l) => s + (l.lineMrp - l.lineTotal), 0), [lines])
  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines])

  const freeDeliveryGap = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal)
  const deliveryProgress =
    subtotal <= 0 ? 0 : Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)

  const wishlistProducts = useMemo(
    () => wishlist.map((id) => productById[id]).filter(Boolean),
    [wishlist]
  )

  const value = {
    cart,
    lines,
    subtotal,
    savings,
    count,
    freeDeliveryGap,
    deliveryProgress,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    wishlist,
    wishlistProducts,
    toggleWishlist,
    removeFromWishlist,
    moveToCart,
    inWishlist: (id) => wishlist.includes(id),
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    quickView,
    setQuickView,
    pulse,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>')
  return ctx
}
