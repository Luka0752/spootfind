import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticlesCanvas from '@/components/ParticlesCanvas';
import { trendingData } from '@/lib/data';
import { BreadcrumbSchema } from '@/components/StructuredData';
import ProductDetailClient from './ProductDetailClient';

const BASE_URL = 'https://spootfind.com';

const LOCALES = ['en', 'zh', 'zh-TW', 'es', 'fr', 'de', 'pt', 'ja', 'ko', 'ar'] as const;

export function generateStaticParams() {
  const productIds = trendingData.products.map(p => p.id.replace('t', ''));
  const params: { locale: string; id: string }[] = [];
  for (const locale of LOCALES) {
    for (const id of productIds) {
      params.push({ locale, id });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const product = trendingData.products.find(p => p.id === `t${id}`);
  const canonicalUrl = `${BASE_URL}/${locale !== 'en' ? locale + '/' : ''}products/${id}`;
  const ogImageUrl = `${BASE_URL}/logo.png`;

  return {
    title: product?.name ?? 'Product Not Found',
    description: product?.seoDescription?.substring(0, 160) ?? 'View this product on Spootfind.',
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        (['en', 'zh', 'zh-TW', 'es', 'fr', 'de', 'pt', 'ja', 'ko', 'ar'] as const).map((loc) => [
          loc,
          `${BASE_URL}/${loc !== 'en' ? loc + '/' : ''}products/${id}`,
        ])
      ),
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      siteName: 'Spootfind',
      title: product?.name ?? 'Spootfind Product',
      description: product?.seoDescription?.substring(0, 160) ?? '',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: product?.name ?? 'Product' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product?.name ?? 'Spootfind Product',
      description: product?.seoDescription?.substring(0, 160) ?? '',
      images: [ogImageUrl],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const product = trendingData.products.find(p => p.id === `t${id}`);

  if (!product) {
    return (
      <>
        <Navbar />
        <ParticlesCanvas />
        <main className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <h1 className="text-4xl font-bold">Product Not Found</h1>
          <a href={`/${locale}/products`} className="text-brand-blue mt-4 inline-block">← Back to Products</a>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <ProductDetailClient product={product} locale={locale} />
    </>
  );
}
