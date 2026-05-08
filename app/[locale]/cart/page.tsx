'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/components/CartContext';

export default function CartPage() {
  const t = useTranslations('cart');
  const locale = useLocale();
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-28">
        <h1 className="text-2xl sm:text-4xl font-bold font-display mb-8">{t('title')}</h1>

        {items.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <p className="text-white/40 mb-6">{t('empty')}</p>
            <Link href={`/${locale}/products`} className="inline-block px-6 py-3 bg-brand-blue text-dark-bg rounded-full font-semibold hover:bg-brand-blue/80 transition-all text-sm sm:text-base">
              {t('browseProducts')}
            </Link>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-dark-card/50 rounded-xl border border-dark-border">
                <div className="w-full sm:w-20 h-32 sm:h-20 bg-dark-bg rounded-lg flex items-center justify-center flex-shrink-0">
                  <Image src={item.image || '/logo.png'} alt={item.name} width={60} height={60} className="opacity-60" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate text-sm sm:text-base">{item.name}</h3>
                  <p className="text-brand-blue">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center border border-dark-border rounded-full hover:border-brand-blue/50 transition-colors text-sm">−</button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center border border-dark-border rounded-full hover:border-brand-blue/50 transition-colors text-sm">+</button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm sm:text-base">${(item.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeItem(item.id)} className="text-xs text-red-400 hover:text-red-300">{t('remove')}</button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 sm:pt-6 border-t border-dark-border gap-4">
              <button onClick={clearCart} className="text-white/40 hover:text-red-400 transition-colors text-sm text-center sm:text-left">{t('clearCart')}</button>
              <div className="text-right">
                <p className="text-sm text-white/40">{t('subtotal')}</p>
                <p className="text-xl sm:text-2xl font-bold">${total.toFixed(2)}</p>
              </div>
            </div>

            <Link href={`/${locale}/checkout`} className="block w-full py-3 sm:py-4 text-center bg-brand-blue text-dark-bg rounded-full font-semibold hover:bg-brand-blue/80 transition-all mt-2 text-sm sm:text-base">
              {t('proceedToCheckout')}
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
