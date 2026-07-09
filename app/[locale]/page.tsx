'use client';

import Image from 'next/image';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations, useLocale } from 'next-intl';
import ParticlesCanvas from '@/components/ParticlesCanvas';
import { trendingData } from '@/lib/data';
import WishlistButton from '@/components/WishlistButton';
import ProductCompare from '@/components/ProductCompare';
import CompareWrapper from '@/components/CompareWrapper';

const trendBadge: Record<string, { label: string; color: string }> = {
  hot: { label: '🔥 Hot', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  rising: { label: '📈 Rising', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  stable: { label: '✓ Stable', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
};

function toMasonryColumns<T>(items: T[], cols: number): T[][] {
  const columns: T[][] = Array.from({ length: cols }, () => []);
  items.forEach((item, i) => columns[i % cols].push(item));
  return columns;
}

// 通用blur占位符（暗色主题适配）
const BLUR_DATA_URL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWYyOTMzIi8+PC9zdmc+";

function HomeContent() {
  const t = useTranslations('home');
  const locale = useLocale();
  const products = trendingData.products;
  const columns = toMasonryColumns(products, 4);

  // JSON-LD for homepage
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Spootfind',
    url: 'https://spootfind.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://spootfind.com/{locale}/products?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <main className="relative overflow-hidden">
        <ParticlesCanvas />

        {/* Hero */}
        <section className="relative z-10 pt-28 pb-16 text-center px-6">
          <div className="mb-6">
            <Image 
              src="/logo.png" 
              alt="Spootfind" 
              width={64} 
              height={64} 
              className="rounded-2xl mx-auto shadow-2xl"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight mb-4">
            {t('heroTitle')}
          </h1>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
          <div className="mt-4 text-xs text-white/30">
            Last updated: {new Date(trendingData.lastUpdated).toLocaleDateString(locale === 'zh' || locale === 'zh-TW' ? 'zh-CN' : locale, { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </section>

        {/* Trending Products */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 pb-32">
          <div className="flex flex-wrap items-center justify-between mb-8 gap-3">
            <h2 className="text-xl sm:text-2xl font-bold font-display">{t('featuredTitle')}</h2>
            <div className="flex gap-2 text-xs">
              {['All', '🔥 Hot', '📈 Rising'].map((f, i) => (
                <button
                  key={f}
                  className={`px-3 py-1.5 rounded-full border transition-all ${
                    i === 0
                      ? 'bg-brand-blue/20 text-brand-blue border-brand-blue/30'
                      : 'text-white/40 border-dark-border hover:text-white/60'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-4">
                {col.map((product) => {
                  const badge = trendBadge[product.trend] || trendBadge.stable;
                  const isTall = product.trend === 'hot';
                  return (
                    <Link
                      key={product.id}
                      href={`/${locale}/products/${product.id.replace('t', '')}`}
                      className="group block rounded-2xl border border-dark-border bg-dark-card/60 hover:border-brand-blue/40 transition-all overflow-hidden relative"
                    >
                      <div className={`relative ${isTall ? 'h-40 sm:h-56' : 'h-32 sm:h-40'} overflow-hidden bg-dark-bg`}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 50vw, 25vw"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                        />
                        <span className={`absolute top-3 left-3 text-[10px] px-2 py-0.5 rounded-full border ${badge.color}`}>
                          {badge.label}
                        </span>
                        <span className="absolute bottom-3 right-3 text-[9px] px-2 py-0.5 rounded-full bg-black/50 text-white/50">
                          {product.source}
                        </span>
                        {/* Action buttons */}
                        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <WishlistButton productId={product.id} size="sm" />
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors line-clamp-2">
                          {product.name}
                        </p>
                        <div className="mt-2 flex items-baseline justify-between">
                          <span className="text-lg font-bold text-brand-blue">${product.price.toFixed(2)}</span>
                          <span className="text-[10px] text-white/30">{product.category}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </section>
      </main>
      <CompareWrapper />
    </>
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}
