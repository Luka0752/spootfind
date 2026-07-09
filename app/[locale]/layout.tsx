import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsletterPopup from '@/components/NewsletterPopup';
import { OrganizationSchema, WebsiteSchema } from '@/components/StructuredData';
import { WishlistProvider } from '@/components/WishlistButton';
import { CartProvider } from '@/components/CartContext';
import '@/app/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const BASE_URL = 'https://spootfind.com';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// SEO meta — shared across all pages
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
      'trending products', 'TikTok viral products', 'Amazon bestseller',
      'dropshipping', 'sourcing', '1688', 'Alibaba', 'profit margin',
      'eco-friendly products',
    ],
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
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: 'Spootfind' }],
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

// Force rebuild to clear Vercel cache - May 9, 2026
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <OrganizationSchema />
        <WebsiteSchema />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <WishlistProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <NewsletterPopup />
            </WishlistProvider>
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}