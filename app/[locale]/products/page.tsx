import Image from 'next/image';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations, useLocale } from 'next-intl';
import WishlistButton from '@/components/WishlistButton';
import ProductCompare from '@/components/ProductCompare';
import CompareWrapper from '@/components/CompareWrapper';
import { ItemListSchema } from '@/components/StructuredData';
import { trendingData } from '@/lib/data';

const categoryLabels: Record<string, string> = {
  electronics: 'Electronics',
  beauty: 'Beauty',
  home: 'Home & Kitchen',
  fitness: 'Fitness',
  fashion: 'Fashion',
  pets: 'Pet Supplies',
  outdoor: 'Outdoor',
};

// 通用blur占位符（暗色主题适配）
const BLUR_DATA_URL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWYyOTMzIi8+PC9zdmc+";

function ProductsContent() {
  const t = useTranslations('products');
  const locale = useLocale() as keyof typeof import('@/lib/trending.json');
  const products = trendingData.products;

  return (
    <>
      {/* JSON-LD ItemList Schema for SEO */}
      <ItemListSchema products={products} locale={locale} listName={t('title')} />
      
      <main className="relative z-10 pt-28 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl sm:text-4xl font-bold font-display mb-4">{t('title')}</h1>
          <p className="text-white/50 mb-8">{t('subtitle')}</p>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button className="px-4 py-2 text-sm bg-brand-blue/20 text-brand-blue border border-brand-blue/30 rounded-full">
              {t('all')}
            </button>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                className="px-4 py-2 text-sm text-white/60 border border-dark-border rounded-full hover:border-brand-blue/30 transition-colors"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/${locale}/products/${product.id.replace('t', '')}`}
                className="group block rounded-2xl border border-dark-border bg-dark-card/60 hover:border-brand-blue/40 transition-all overflow-hidden relative"
              >
                <div className="relative h-48 overflow-hidden bg-dark-bg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                  <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <WishlistButton productId={product.id} size="sm" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-white/40 mb-1">
                    {product.translations?.[locale as string]?.category || product.category}
                  </p>
                  <h3 className="font-semibold text-white/90 group-hover:text-white transition-colors line-clamp-2">
                    {product.translations?.[locale as string]?.name || product.name}
                  </h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xl font-bold text-brand-blue">${product.price.toFixed(2)}</span>
                    <span className="text-xs text-white/30">MOQ: {product.procurement?.moq || 'N/A'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <CompareWrapper />
    </>
  );
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProductsContent />;
}
