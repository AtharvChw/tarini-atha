import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { getProduct } from '../data/products';

export type CartLine = {
  slug: string;
  qty: number;
  variant?: string;
};

type ShopContextValue = {
  cart: CartLine[];
  wishlist: string[];
  add: (slug: string, qty?: number, variant?: string) => void;
  remove: (slug: string, variant?: string) => void;
  updateQty: (slug: string, qty: number, variant?: string) => void;
  toggleWish: (slug: string) => void;
  isWished: (slug: string) => boolean;
  subtotal: number;
  cartCount: number;
};

const ShopContext = createContext<ShopContextValue | null>(null);

const WISH_KEY = 'tarini-wishlist';
const CART_KEY = 'tarini-cart';

function sameLine(a: CartLine, slug: string, variant?: string): boolean {
  return a.slug === slug && (a.variant ?? '') === (variant ?? '');
}

function isCartLine(v: unknown): v is CartLine {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return typeof o.slug === 'string' && typeof o.qty === 'number' && (o.variant === undefined || typeof o.variant === 'string');
}

function readCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartLine).map((l) => ({ slug: l.slug, qty: Math.max(0, Math.floor(l.qty)), variant: l.variant }));
  } catch {
    return [];
  }
}

function readWishlist(): string[] {
  try {
    const raw = localStorage.getItem(WISH_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v): v is string => typeof v === 'string');
  } catch {
    return [];
  }
}

export function subtotalFor(cart: CartLine[]): number {
  return cart.reduce((sum, line) => {
    const p = getProduct(line.slug);
    return sum + (p ? p.priceInr * line.qty : 0);
  }, 0);
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(readCart);
  const [wishlist, setWishlist] = useState<string[]>(readWishlist);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* storage unavailable */
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
    } catch {
      /* storage unavailable */
    }
  }, [wishlist]);

  const add = useCallback((slug: string, qty = 1, variant?: string) => {
    setCart((prev) => {
      const found = prev.find((l) => sameLine(l, slug, variant));
      if (found) {
        return prev.map((l) => (sameLine(l, slug, variant) ? { ...l, qty: l.qty + qty } : l));
      }
      return [...prev, { slug, qty, variant }];
    });
  }, []);

  const remove = useCallback((slug: string, variant?: string) => {
    setCart((prev) => prev.filter((l) => !sameLine(l, slug, variant)));
  }, []);

  const updateQty = useCallback((slug: string, qty: number, variant?: string) => {
    setCart((prev) =>
      prev
        .map((l) => (sameLine(l, slug, variant) ? { ...l, qty: Math.max(0, Math.floor(qty)) } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const toggleWish = useCallback((slug: string) => {
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const isWished = useCallback((slug: string) => wishlist.includes(slug), [wishlist]);

  const value = useMemo<ShopContextValue>(() => {
    return {
      cart,
      wishlist,
      add,
      remove,
      updateQty,
      toggleWish,
      isWished,
      subtotal: subtotalFor(cart),
      cartCount: cart.reduce((sum, l) => sum + l.qty, 0),
    };
  }, [cart, wishlist, add, remove, updateQty, toggleWish, isWished]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop(): ShopContextValue {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used inside <ShopProvider>');
  return ctx;
}