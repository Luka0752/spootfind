import Script from 'next/script';
import type { Product } from '@/lib/types';

const BASE_URL = 'https://spootfind.com';

// ─── Organization JSON-LD (for homepage / layout) ─────────────────────────────
const ORGANIZATION_JSONLD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Spootfind',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    'Curated trending products from TikTok & Amazon with sourcing costs & profit insights.',
  sameAs: [
    'https://twitter.com/spootfind',
    'https://www.instagram.com/spootfind/',
    'https://www.tiktok.com/@spootfind',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    url: `${BASE_URL}/contact`,
    contactType: 'customer support',
  },
});

// ─── Product JSON-LD ─────────────────────────────────────────────────────────
export function getProductJsonLd(
  product: Product & { procurement?: Product['procurement'] },
  locale: string
): string {
  const productUrl = `${BASE_URL}/${locale !== 'en' ? locale + '/' : ''}products/${product.id.replace('t', '')}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: [`${BASE_URL}${product.image}`],
    url: productUrl,
    offers: {
      '@type': 'Offer',
      price: product.price.toFixed(2),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: productUrl,
    },
    brand: {
      '@type': 'Brand',
      name: 'Spootfind',
    },
    category: product.category,
    aggregateRating:
      product.trend === 'hot'
        ? {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '120',
          }
        : undefined,
    ...(product.procurement && {
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'profitMarginPct',
          value: product.procurement.profitMarginPct,
        },
        {
          '@type': 'PropertyValue',
          name: 'costPriceCNY',
          value: product.procurement.costPriceCny,
        },
        {
          '@type': 'PropertyValue',
          name: 'moq',
          value: product.procurement.moq,
        },
      ],
    }),
  };

  return JSON.stringify(jsonLd);
}

// ─── Homepage Organization Script ──────────────────────────────────────────────
export function OrganizationSchema() {
  return (
    <Script
      id="schema-organization"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: ORGANIZATION_JSONLD }}
    />
  );
}

// ─── Product Schema Script ────────────────────────────────────────────────────
interface ProductSchemaProps {
  product: Product & { procurement?: Product['procurement'] };
  locale: string;
}

export function ProductSchema({ product, locale }: ProductSchemaProps) {
  return (
    <Script
      id={`schema-product-${product.id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: getProductJsonLd(product, locale) }}
    />
  );
}

// ─── Website + BreadcrumbList ─────────────────────────────────────────────────
export function WebsiteSchema() {
  const websiteJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Spootfind',
    url: BASE_URL,
    description: 'Curated trending products from TikTok & Amazon with sourcing costs & profit insights.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  });

  return (
    <Script
      id="schema-website"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: websiteJsonLd }}
    />
  );
}

// ─── BreadcrumbList (for product pages) ──────────────────────────────────────
export function BreadcrumbSchema({ items, locale }: { items: { name: string; url: string }[]; locale: string }) {
  const breadcrumbJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${locale !== 'en' ? '/' + locale : ''}${item.url}`,
    })),
  });

  return (
    <Script
      id="schema-breadcrumb"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
    />
  );
}