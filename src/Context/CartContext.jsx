import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('mt_cart')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('mt_cart', JSON.stringify(items))
    } catch {}
  }, [items])

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === product.id)
      if (found) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + qty } : p))
      }
      return [...prev, { id: product.id, qty, price: product.price }]
    })
  }

  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id))

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeItem(id)
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)))
  }

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
