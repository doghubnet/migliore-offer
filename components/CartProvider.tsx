'use client';

import { createContext, useContext, useState } from 'react';

const CartContext = createContext({ items: [] as string[], addItem: (_id: string) => {} });

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  return <CartContext.Provider value={{ items, addItem: (id: string) => setItems((prev) => [...prev, id]) }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
