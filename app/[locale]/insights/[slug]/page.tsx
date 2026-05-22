import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const articles: Record<string, { title: string; subtitle: string; tag: string; region: string; date: string; readTime: string; image: string; linkedProductIds: string[] }> = {
  'na-tiktok-fidget-toys-may-2026': {
    title: 'art1_title',
    subtitle: 'art1_subtitle',
    tag: 'Fidget & Sensory Toys',
    region: '🇺🇸 North America',
    date: '2026-05-22',
    readTime: '8',
    image: '/products/toys.jpg',
    linkedProductIds: ['t1', 't4', 't3'],
  },
};

export function generateStaticParams() {
  return [
    { locale: 'en', slug: 'na-tiktok-fidget-toys-may-2026' },
    { locale: 'zh', slug: 'na-tiktok-fidget-toys-may-2026' },
    { locale: 'zh-TW', slug: 'na-tiktok-fidget-toys-may-2026' },
    { locale: 'es', slug: 'na-tiktok-fidget-toys-may-2026' },
    { locale: 'fr', slug: 'na-tiktok-fidget-toys-may-2026' },
    { locale: 'de', slug: 'na-tiktok-fidget-toys-may-2026' },
    { locale: 'pt', slug: 'na-tiktok-fidget-toys-may-2026' },
    { locale: 'ja', slug: 'na-tiktok-fidget-toys-may-2026' },
    { locale: 'ko', slug: 'na-tiktok-fidget-toys-may-2026' },
    { locale: 'ar', slug: 'na-tiktok-fidget-toys-may-2026' },
  ];
}

function ArticleContent({ locale, slug }: { locale: string; slug: string }) {
  const t = useTranslations('insights');
  const article = articles[slug];

  if (!article) {
    notFound();
  }

  return (
    <>
      <main className="relative z-10 pt-28 pb-32">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href={`/${locale}`} className="hover:text-brand-blue transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/${locale}/insights`} className="hover:text-brand-blue transition-colors">{t('title')}</Link>
            <span>/</span>
            <span className="text-white/60">{t(article.title)}</span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-medium border border-brand-blue/30">
                {article.tag}
              </span>
              <span className="text-white/40 text-sm">{article.region}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-display mb-4">{t(article.title)}</h1>
            <p className="text-white/50 text-lg">{t(article.subtitle)}</p>
            <div className="flex items-center gap-4 mt-6 text-sm text-white/40">
              <span>{t('publishedOn')} {article.date}</span>
              <span>•</span>
              <span>{article.readTime} {t('minutes')}</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 border border-dark-border">
            <Image
              src={article.image}
              alt={t(article.title)}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>

          {/* Content Blocks */}
          <div className="space-y-10">
            {/* Hot Products */}
            <section className="bg-dark-card/40 rounded-2xl p-6 border border-dark-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🔥</span>
                {t('art1_hotTitle')}
              </h2>
              <div className="text-white/70 whitespace-pre-line leading-relaxed">
                {t('art1_hotContent')}
              </div>
            </section>

            {/* Profit Space */}
            <section className="bg-dark-card/40 rounded-2xl p-6 border border-dark-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>💰</span>
                {t('art1_profitTitle')}
              </h2>
              <div className="text-white/70 whitespace-pre-line leading-relaxed">
                {t('art1_profitContent')}
              </div>
            </section>

            {/* Sourcing Region */}
            <section className="bg-dark-card/40 rounded-2xl p-6 border border-dark-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🏭</span>
                {t('art1_regionTitle')}
              </h2>
              <div className="text-white/70 whitespace-pre-line leading-relaxed">
                {t('art1_regionContent')}
              </div>
            </section>

            {/* Sourcing Tips */}
            <section className="bg-dark-card/40 rounded-2xl p-6 border border-dark-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>📦</span>
                {t('art1_tipsTitle')}
              </h2>
              <div className="text-white/70 whitespace-pre-line leading-relaxed">
                {t('art1_tipsContent')}
              </div>
            </section>

            {/* Curated Products */}
            <section className="bg-dark-card/40 rounded-2xl p-6 border border-dark-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>✅</span>
                {t('art1_productsTitle')}
              </h2>
              <p className="text-white/50 mb-6">{t('art1_productsDesc')}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-dark-bg/50 rounded-xl p-4 border border-dark-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl mb-3">🫧</div>
                  <p className="font-medium text-sm">{t('art1_category1')}</p>
                  <p className="text-xs text-white/40">t1 · Pop It Fidget Set</p>
                </div>
                <div className="bg-dark-bg/50 rounded-xl p-4 border border-dark-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl mb-3">🔬</div>
                  <p className="font-medium text-sm">{t('art1_category2')}</p>
                  <p className="text-xs text-white/40">t4 · LED Slime Making Kit</p>
                </div>
                <div className="bg-dark-bg/50 rounded-xl p-4 border border-dark-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl mb-3">🚗</div>
                  <p className="font-medium text-sm">{t('art1_category3')}</p>
                  <p className="text-xs text-white/40">t3 · RC Stunt Car 360°</p>
                </div>
              </div>
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center gap-2 text-brand-blue text-sm font-medium hover:gap-3 transition-all"
              >
                {t('art1_viewProducts')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-brand-blue/10 to-primary/10 rounded-2xl p-8 border border-brand-blue/20 text-center">
            <h3 className="text-2xl font-bold mb-3">{t('art1_contactTitle')}</h3>
            <p className="text-white/50 mb-6 max-w-lg mx-auto">{t('art1_contactContent')}</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue hover:bg-brand-blue/80 text-white font-semibold rounded-xl transition-colors"
            >
              {t('art1_contactBtn')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return <ArticleContent locale={locale} slug={slug} />;
}
