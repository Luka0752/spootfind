'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useWishlist } from '@/components/WishlistButton';
import type { Product } from '@/lib/types';
import { trendingData } from '@/lib/data';

const allProducts = trendingData.products;

export default function WishlistPage() {
  const t = useTranslations('wishlist');
  const locale = useLocale();
  const { wishlistIds, toggleWishlist } = useWishlist();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const wishlistProducts = allProducts.filter((p: Product) => wishlistIds.includes(p.id));

  if (!mounted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 w-48 bg-dark-card rounded" />
              <div className="h-4 w-72 bg-dark-card rounded" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display mb-2">{t('title')}</h1>
          <p className="text-white/50">
            {wishlistProducts.length > 0
              ? t('subtitle', { count: wishlistProducts.length })
              : t('emptySubtitle')}
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-20 h-20 rounded-full bg-dark-card flex items-center justify-center mb-6">
              <span className="text-4xl">💔</span>
            </div>
            <h2 className="text-xl font-bold font-display mb-2">{t('emptyTitle')}</h2>
            <p className="text-white/40 text-sm mb-6">{t('emptyDesc')}</p>
            <Link
              href={`/${locale}/products`}
              className="px-6 py-3 bg-brand-blue text-white text-sm font-semibold rounded-xl hover:bg-brand-blue/90 transition-all"
            >
              {t('browseProducts')}
            </Link>
          </div>
        ) : (
          /* Product grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {wishlistProducts.map((product: Product) => (
              <div
                key={product.id}
                className="group bg-dark-card border border-dark-border rounded-xl overflow-hidden hover:border-brand-blue/30 transition-all"
              >
                {/* Image */}
                <div className="relative aspect-square bg-dark-bg overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Remove button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-dark-bg/80 backdrop-blur flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all"
                    aria-label={t('remove')}
                  >
                    ❤️
                  </button>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-white/90 mb-1 truncate">
                    {product.name}
                  </h3>
                  <p className="text-xs text-white/40 mb-3 capitalize">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-blue font-bold">${product.price.toFixed(2)}</span>
                    <Link
                      href={`/${locale}/products/${product.id}`}
                      className="text-xs text-white/50 hover:text-brand-blue transition-colors"
                    >
                      {t('viewDetails')} →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
      <Footer />
    </>
  );
}
