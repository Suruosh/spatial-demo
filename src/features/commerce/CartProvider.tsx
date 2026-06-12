import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react';
import { PRODUCTS } from '../../data/products';
import { buildCartLines, cartTotals, type CartItem, type CartLine } from './cart';

export interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  total: number;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((productId: string, quantity = 1) => {
    if (!PRODUCTS.some((product) => product.id === productId)) return;
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...current, { productId, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((current) => current.filter((item) => item.productId !== productId));
      return;
    }
    setItems((current) =>
      current.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const lines = useMemo(() => buildCartLines(items, PRODUCTS), [items]);
  const { itemCount, subtotal, total } = useMemo(() => cartTotals(lines), [lines]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      itemCount,
      subtotal,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [lines, itemCount, subtotal, total, addItem, removeItem, updateQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
