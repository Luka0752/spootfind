'use client';

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { useLocale } from 'next-intl';

const STORAGE_KEY = 'spootfind-wishlist';

function getStoredWishlist(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function storeWishlist(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch { /* ignore */ }
}

/* ─── Context for sharing wishlist state ─── */
interface WishlistContextType {
  wishlistIds: string[];
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    setWishlistIds(getStoredWishlist());
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlistIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id];
      storeWishlist(next);
      return next;
    });
  }, []);

  const isInWishlist = useCallback(
    (id: string) => wishlistIds.includes(id),
    [wishlistIds]
  );

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggleWishlist, isInWishlist, count: wishlistIds.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
}

/* ─── Wishlist Button Component ─── */
export default function WishlistButton({
  productId,
  size = 'md',
}: {
  productId: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const active = isInWishlist(productId);

  const sizeClasses = {
    sm: 'w-7 h-7 text-sm',
    md: 'w-9 h-9 text-base',
    lg: 'w-11 h-11 text-lg',
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
      }}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all ${
        active
          ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
          : 'bg-white/5 text-white/30 hover:text-white/60 hover:bg-white/10'
      }`}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {active ? '❤️' : '🤍'}
    </button>
  );
}

/* ─── Wishlist Badge (for Navbar) ─── */
export function WishlistBadge() {
  const { count } = useWishlist();
  const locale = useLocale();

  return (
    <a
      href={`/${locale}/wishlist`}
      className="relative flex items-center justify-center text-white/60 hover:text-brand-blue transition-colors"
      aria-label="Wishlist"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full px-1">
          {count}
        </span>
      )}
    </a>
  );
}
