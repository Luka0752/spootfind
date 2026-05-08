'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/components/CartContext';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const locale = useLocale();
  const { items, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-28 text-center">
          <div className="text-5xl sm:text-6xl mb-6">🎉</div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display mb-4">{t('orderConfirmed')}</h1>
          <p className="text-white/50 mb-8">{t('orderConfirmedDesc')}</p>
          <Link href={`/${locale}`} className="inline-block px-6 py-3 bg-brand-blue text-dark-bg rounded-full font-semibold hover:bg-brand-blue/80 transition-all">
            {t('backToHome')}
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-28 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold font-display mb-4">{t('title')}</h1>
          <p className="text-white/50 mb-8">{t('cartEmpty')}</p>
          <Link href={`/${locale}/products`} className="inline-block px-6 py-3 bg-brand-blue text-dark-bg rounded-full font-semibold hover:bg-brand-blue/80 transition-all">
            {t('addSomeProducts')}
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
        <h1 className="text-2xl sm:text-3xl font-bold font-display mb-8">{t('title')}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">{t('shippingInfo')}</h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder={t('firstName')} required className="px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none" />
              <input type="text" placeholder={t('lastName')} required className="px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none" />
            </div>
            <input type="email" placeholder={t('email')} required className="w-full px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none" />
            <input type="tel" placeholder={t('phone')} required className="w-full px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none" />
            <input type="text" placeholder={t('address')} required className="w-full px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none" />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder={t('city')} required className="px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none" />
              <input type="text" placeholder={t('zipCode')} required className="px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none" />
            </div>
            <input type="text" placeholder={t('country')} required className="w-full px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none" />
            <button type="submit" className="w-full py-4 bg-brand-blue text-dark-bg rounded-full font-semibold hover:bg-brand-blue/80 transition-all mt-4">
              {t('placeOrder')}
            </button>
          </form>

          <div className="bg-dark-card/60 rounded-2xl border border-dark-border p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">{t('orderSummary')}</h2>
            <div className="space-y-3 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-white/60">{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-dark-border pt-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-white/40">{t('subtotal')}</span><span>${total.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/40">{t('shipping')}</span><span className="text-brand-green">Free</span></div>
              <div className="flex justify-between font-bold text-lg pt-2"><span>{t('total')}</span><span className="text-brand-blue">${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
