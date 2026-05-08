import { Metadata } from 'next';
import { routing } from '@/routing';

const BASE_URL = 'https://spootfind.com';
const LOCALE_LABELS: Record<string, string> = {
  en: 'English',
  zh: '简体中文',
  'zh-TW': '繁體中文',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
  ja: '日本語',
  ko: '한국어',
  ar: 'العربية',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `${BASE_URL}/${locale !== 'en' ? locale : ''}`;
  const ogImageUrl = `${BASE_URL}/logo.png`;

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: 'Spootfind — Curated Viral Products & Sourcing Insights',
      template: '%s | Spootfind',
    },
    description:
      locale === 'zh'
        ? 'Spootfind 精选 TikTok 爆款与亚马逊热销产品，提供选品分析、1688 采购成本及利润测算。'
        : locale === 'zh-TW'
        ? 'Spootfind 精選 TikTok 爆款與亞馬遜熱銷產品，提供選品分析、1688 採購成本及利潤測算。'
        : locale === 'ja'
        ? 'Spootfind — TikTokで人気を得た商品とAmazonベストセラーを精选。仕入コストと利益計算も提供。'
        : locale === 'ko'
        ? 'Spootfind — 틱톡 핫产品和 아마존 베스트셀러精选. 조달 원가 및 수익 계산 제공.'
        : locale === 'ar'
        ? 'سبوتفيند — منتجات TikTok viral وأفضل بائعي أمازون منتقاة مع تحليل التكاليف والربح.'
        : 'Spootfind — Curated trending products from TikTok & Amazon with sourcing costs & profit insights.',
    keywords: [
      'trending products',
      'TikTok viral products',
      'Amazon bestseller',
      'dropshipping',
      'sourcing',
      '1688',
      'Alibaba',
      'profit margin',
      'eco-friendly products',
    ],
    authors: [{ name: 'Spootfind' }],
    creator: 'Spootfind',
    publisher: 'Spootfind',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${BASE_URL}/${loc !== 'en' ? loc : ''}`])
      ),
    },
    openGraph: {
      type: 'website',
      locale: locale === 'zh-TW' ? 'zh_TW' : locale === 'zh' ? 'zh_CN' : locale,
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => (l === 'zh-TW' ? 'zh_TW' : l === 'zh' ? 'zh_CN' : l)),
      url: canonicalUrl,
      siteName: 'Spootfind',
      title: 'Spootfind — Curated Viral Products & Sourcing Insights',
      description:
        locale === 'zh'
          ? '精选 TikTok 爆款与亚马逊热销产品，提供选品分析、1688 采购成本及利润测算。'
          : 'Curated trending products from TikTok & Amazon with sourcing costs & profit insights.',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'Spootfind — Trending Products & Sourcing Insights',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Spootfind — Curated Viral Products & Sourcing Insights',
      description:
        locale === 'zh'
          ? '精选 TikTok 爆款与亚马逊热销产品，提供选品分析、1688 采购成本及利润测算。'
          : 'Curated trending products from TikTok & Amazon with sourcing costs & profit insights.',
      images: [ogImageUrl],
      site: '@spootfind',
      creator: '@spootfind',
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/logo.png',
    },
  };
}