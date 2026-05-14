'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticlesCanvas from '@/components/ParticlesCanvas';
import { useCart, CartItem } from '@/components/CartContext';
import WishlistButton from '@/components/WishlistButton';
import ProductCompare from '@/components/ProductCompare';
import CompareWrapper from '@/components/CompareWrapper';
import { trendingData } from '@/lib/data';
import type { Product } from '@/lib/data';

// JSON-LD structured data for SEO
function generateProductJsonLd(product: Product, locale: string) {
  const translations = (product as any).translations?.[locale];
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: translations?.name || product.name,
    description: translations?.description || product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price.toFixed(2),
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '100',
    },
  };
}

const trendBadge: Record<string, { label: string; color: string }> = {
  hot: { label: '🔥 Hot', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  rising: { label: '📈 Rising', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  stable: { label: '✓ Stable', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
};

const RATE = 7.2;

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const t = useTranslations('product');
  const { id, locale } = await params;
  const product: Product | undefined = trendingData.products.find(p => p.id === `t${id}`);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'procurement'>('overview');

  if (!product) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Product Not Found' }) }}
        />
        <Navbar />
        <ParticlesCanvas />
        <main className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <h1 className="text-4xl font-bold">Product Not Found</h1>
          <Link href={`/${locale}/products`} className="text-brand-blue mt-4 inline-block">← {t('viewOn1688')}</Link>
        </main>
        <Footer />
      </>
    );
  }

  const badge = trendBadge[product.trend] || trendBadge.stable;
  const p = product.procurement;

  const costCny = p ? p.costPriceCny : 0;
  const intlFreightCny = p ? (p.forwarderFeeCnyPerKg * p.weightKg * p.moq) / Math.max(p.moq, 1) : 0;
  const domesticFreightPerUnitCny = p ? p.domesticFreightCny / Math.max(p.moq, 1) : 0;
  const totalCnyPerUnit = costCny + intlFreightCny + domesticFreightPerUnitCny;
  const totalUsdPerUnit = totalCnyPerUnit / RATE;
  const sellUsd = product.price;
  const profitUsd = sellUsd - totalUsdPerUnit;
  const profitMargin = p ? p.profitMarginPct : 0;

  const handleAddToCart = () => {
    const item: CartItem = {
      id: parseInt(product.id.replace('t', '')),
      name: (product as any).translations?.[locale]?.name || product.name,
      price: product.price,
      quantity,
      image: product.image,
    };
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const jsonLd = generateProductJsonLd(product, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <ParticlesCanvas />
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-32">
        <Link href={`/${locale}/products`} className="inline-flex items-center gap-2 text-white/40 text-sm mb-8 hover:text-brand-blue transition-colors">
          ← {t('viewOn1688')}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
          <div className="relative h-80 rounded-2xl overflow-hidden bg-dark-bg">
            <Image
              src={product.image}
              alt={(product as any).translations?.[locale]?.name || product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <span className={`absolute top-4 left-4 text-xs px-3 py-1 rounded-full border ${badge.color}`}>{badge.label}</span>
            <div className="absolute top-4 right-4">
              <WishlistButton productId={product.id} size="md" />
            </div>
          </div>

          <div>
            <p className="text-xs text-white/30 uppercase tracking-widest mb-2">
              {(product as any).translations?.[locale]?.category || product.category} · {product.region}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold font-display mb-3">
              {(product as any).translations?.[locale]?.name || product.name}
            </h1>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              {(product as any).translations?.[locale]?.description || product.description}
            </p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-brand-blue">${product.price.toFixed(2)}</span>
              <span className="text-sm text-white/30">{t('retailPrice')}</span>
            </div>

            {p && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                <div className="bg-dark-card/60 rounded-xl p-3 text-center border border-dark-border">
                  <div className="text-brand-green text-lg font-bold">¥{p.costPriceCny}</div>
                  <div className="text-xs text-white/30 mt-1">{t('costPrice')} (CNY)</div>
                </div>
                <div className="bg-dark-card/60 rounded-xl p-3 text-center border border-dark-border">
                  <div className="text-brand-blue text-lg font-bold">{p.profitMarginPct}%</div>
                  <div className="text-xs text-white/30 mt-1">{t('profitMargin')}</div>
                </div>
                <div className="bg-dark-card/60 rounded-xl p-3 text-center border border-dark-border">
                  <div className="text-brand-green text-lg font-bold">{p.shippingDays}d</div>
                  <div className="text-xs text-white/30 mt-1">{t('leadTime')}</div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-dark-border rounded-full">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-white/60 hover:text-white transition-colors">−</button>
                <span className="px-4 text-white">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-white/60 hover:text-white transition-colors">+</button>
              </div>
              <button onClick={handleAddToCart} disabled={added} className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all text-sm ${added ? 'bg-green-500 text-white' : 'bg-brand-blue text-dark-bg hover:bg-brand-blue/80'}`}>
                {added ? '✓ Added' : 'Add to Cart'}
              </button>
            </div>

            <p className="text-xs text-white/20">Source: {product.source}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-dark-card/30 p-1 rounded-full w-fit">
          <button onClick={() => setActiveTab('overview')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-brand-blue text-dark-bg' : 'text-white/40 hover:text-white'}`}>
            {t('description')}
          </button>
          <button onClick={() => setActiveTab('procurement')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'procurement' ? 'bg-brand-blue text-dark-bg' : 'text-white/40 hover:text-white'}`}>
            {t('procurement')}
          </button>
        </div>

        {activeTab === 'procurement' && p && (
          <div className="bg-dark-card/60 rounded-2xl border border-dark-border p-6">
            <h3 className="text-lg font-bold mb-4">{t('sourcing')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div><span className="text-xs text-white/30">{t('costPrice')}</span><div className="font-semibold">¥{p.costPriceCny}</div></div>
              <div><span className="text-xs text-white/30">{t('moq')}</span><div className="font-semibold">{p.moq} units</div></div>
              <div><span className="text-xs text-white/30">{t('leadTime')}</span><div className="font-semibold">{p.shippingDays} days</div></div>
              <div><span className="text-xs text-white/30">{t('supplier')}</span><div className="font-semibold">{p.supplier}</div></div>
              <div><span className="text-xs text-white/30">{t('certification')}</span><div className="font-semibold">{p.certification || 'N/A'}</div></div>
            </div>
            {p.supplierUrl && (
              <a href={p.supplierUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 text-brand-blue border border-brand-blue/30 rounded-full text-sm hover:bg-brand-blue/20 transition-all">
                {t('viewOn1688')} →
              </a>
            )}
          </div>
        )}
      </main>
      <Footer />
      <CompareWrapper />
    </>
  );
}
