import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

const STORAGE_KEY = 'reka-botswana-cart';

export const CartContext = createContext(null);

const lineId = ({ slug, size, color }) =>
  [slug, size || 'default', color || 'default'].join('__');

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'hydrate':
      return action.items;
    case 'add': {
      const id = lineId(action.item);
      const qty = action.qty || 1;
      const existing = state.find((item) => item.id === id);
      if (existing) {
        return state.map((item) =>
          item.id === id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...state, { id, ...action.item, qty }];
    }
    case 'remove':
      return state.filter((item) => item.id !== action.id);
    case 'setQty': {
      const qty = Math.max(0, parseInt(action.qty, 10) || 0);
      if (qty === 0) return state.filter((item) => item.id !== action.id);
      return state.map((item) =>
        item.id === action.id ? { ...item, qty } : item
      );
    }
    case 'clear':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on the client only (build-time render stays empty).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) dispatch({ type: 'hydrate', items: parsed });
      }
    } catch (error) {
      // Corrupted or unavailable storage — start with an empty cart.
      // eslint-disable-next-line no-console
      console.warn('Reka Botswana: could not read saved cart.', error);
    }
    setHydrated(true);
  }, []);

  // Persist on every change after hydration.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      // Storage full/blocked (private mode) — cart simply won't persist.
      // eslint-disable-next-line no-console
      console.warn('Reka Botswana: could not save cart.', error);
    }
  }, [items, hydrated]);

  const addItem = useCallback((item, qty = 1) => {
    dispatch({ type: 'add', item, qty });
  }, []);
  const removeItem = useCallback((id) => {
    dispatch({ type: 'remove', id });
  }, []);
  const setQty = useCallback((id, qty) => {
    dispatch({ type: 'setQty', id, qty });
  }, []);
  const clearCart = useCallback(() => {
    dispatch({ type: 'clear' });
  }, []);

  const value = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = items.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * item.qty,
      0
    );
    return { items, hydrated, count, subtotal, addItem, removeItem, setQty, clearCart };
  }, [items, hydrated, addItem, removeItem, setQty, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within <CartProvider>');
  }
  return ctx;
};

export default CartContext;
