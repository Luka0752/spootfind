import { MetadataRoute } from 'next';
import trendingData from '@/lib/trending.json';

const BASE_URL = 'https://spootfind.com';

const LOCALES = ['en', 'zh', 'zh-TW', 'es', 'fr', 'de', 'pt', 'ja', 'ko', 'ar'] as const;
type Locale = (typeof LOCALES)[number];

function localePath(locale: Locale, path: string): string {
  return locale === 'en' ? path : `/${locale}${path}`;
}

// Insights article slugs — hardcoded to avoid importing TS module
const INSIGHT_SLUGS = [
  'na-tiktok-fidget-toys-may-2026',
  'china-construction-equipment-may-2026',
  'sea-ecommerce-sourcing-guide-may-2026',
  'tiktok-shop-june-2026-trending-products',
  'prime-day-2026-mid-year-sourcing-guide',
  'fifa-world-cup-2026-sourcing-guide',
];

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

  // Insights articles — all locales
  const insightsPages: MetadataRoute.Sitemap = INSIGHT_SLUGS.flatMap((slug) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}${localePath(locale, `/insights/${slug}`)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  );

  return [...staticRoutes, ...localeHomepages, ...productPages, ...insightsPages];
}
