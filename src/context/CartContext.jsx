import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("sidThreadCart") || "[]"));

  useEffect(() => localStorage.setItem("sidThreadCart", JSON.stringify(cart)), [cart]);

  function addToCart(product, size = product.sizes?.[0] || "One Size") {
    setCart(prev => {
      const key = `${product.id}-${size}`;
      const existing = prev.find(item => item.key === key);
      if (existing) return prev.map(item => item.key === key ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, size, qty: 1, key }];
    });
  }
  function updateQty(key, qty) {
    setCart(prev => qty <= 0 ? prev.filter(item => item.key !== key) : prev.map(item => item.key === key ? {...item, qty} : item));
  }
  function removeFromCart(key) { setCart(prev => prev.filter(item => item.key !== key)); }
  function clearCart() { setCart([]); }

  const count = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + Number(item.price) * item.qty, 0), [cart]);

  return <CartContext.Provider value={{ cart, count, subtotal, addToCart, updateQty, removeFromCart, clearCart }}>{children}</CartContext.Provider>;
}
export function useCart() { return useContext(CartContext); }
