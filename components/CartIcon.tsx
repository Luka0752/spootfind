'use client';

import { useCart } from './CartContext';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function CartIcon() {
  const { itemCount } = useCart();
  const locale = useLocale();

  return (
    <Link href={`/${locale}/cart`} className="relative p-2 text-white/60 hover:text-white transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.65H5.12" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold bg-brand-blue text-dark-bg rounded-full">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
