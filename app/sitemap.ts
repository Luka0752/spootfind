import { MetadataRoute } from 'next';
import trendingData from '@/lib/trending.json';

const BASE_URL = 'https://spootfind.com';

const LOCALES = ['en', 'zh', 'zh-TW', 'es', 'fr', 'de', 'pt', 'ja', 'ko', 'ar'] as const;
type Locale = (typeof LOCALES)[number];

function localePath(locale: Locale, path: string): string {
  return locale === 'en' ? path : `/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const products = trendingData.products as { id: string }[];

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Per-locale homepage variants
  const localeHomepages: MetadataRoute.Sitemap = LOCALES.filter((l) => l !== 'en').map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Product pages — all locales
  const productPages: MetadataRoute.Sitemap = products.flatMap((product) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}${localePath(locale, `/products/${product.id.replace('t', '')}`)}`,
      lastModified: new Date(trendingData.lastUpdated),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  return [...staticRoutes, ...localeHomepages, ...productPages];
}