'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import CartIcon from './CartIcon';
import LanguageSwitcher from './LanguageSwitcher';
import { WishlistBadge } from './WishlistButton';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/products`, label: t('products') },
    { href: `/${locale}/insights`, label: t('insights') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-dark-bg/80 border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <Image src="/logo.png" alt="Spootfind" width={36} height={36} className="rounded-lg" />
          <span className="text-xl font-bold font-display tracking-tight">
            Spoot<span className="text-brand-blue">find</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 hover:text-brand-blue transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <CartIcon />
          <WishlistBadge />
          <LanguageSwitcher />
          <Link
            href={`/${locale}/contact`}
            className="px-5 py-2 text-sm font-semibold bg-brand-blue/10 text-brand-blue border border-brand-blue/30 rounded-full hover:bg-brand-blue/20 transition-all"
          >
            {t('getInTouch')}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button onClick={() => setOpen(!open)} className="text-white/60 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-dark-bg/95 backdrop-blur-xl border-b border-dark-border">
          <div className="px-6 py-4 flex flex-col gap-3">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-white/60 hover:text-brand-blue transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link href={`/${locale}/cart`} onClick={() => setOpen(false)} className="text-sm text-white/60 hover:text-brand-blue py-2">{t('cart')}</Link>
          </div>
        </div>
      )}
    </nav>
  );
}