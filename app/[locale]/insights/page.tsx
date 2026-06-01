import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

const articles = [
  {
    slug: 'na-tiktok-fidget-toys-may-2026',
    tagKey: 'art1_tag',
    titleKey: 'art1_title',
    subtitleKey: 'art1_subtitle',
    region: '🇺🇸 North America',
    date: '2026-05-22',
    readTime: '8',
    image: '/products/toys.jpg',
    linkedProductIds: ['t1', 't4', 't3'],
  },
  {
    slug: 'china-construction-equipment-may-2026',
    tagKey: 'art2_tag',
    titleKey: 'art2_title',
    subtitleKey: 'art2_subtitle',
    region: '🌏 Global',
    date: '2026-05-23',
    readTime: '10',
    image: '/products/mini-excavator.webp',
    linkedProductIds: ['t9', 't13', 't15'],
  },
  {
    slug: 'sea-ecommerce-sourcing-guide-may-2026',
    tagKey: 'art3_tag',
    titleKey: 'art3_title',
    subtitleKey: 'art3_subtitle',
    region: '🌏 Southeast Asia',
    date: '2026-05-23',
    readTime: '8',
    image: '/products/toys.jpg',
    linkedProductIds: ['t1', 't4', 't3'],
  },
  {
    slug: 'tiktok-shop-june-2026-trending-products',
    tagKey: 'art4_tag',
    titleKey: 'art4_title',
    subtitleKey: 'art4_subtitle',
    region: '\U0001f310 Global',
    date: '2026-06-01',
    readTime: '9',
    image: '/products/toys.jpg',
    linkedProductIds: ['t2', 't3', 't5'],
  },
];

function InsightsContent({ locale }: { locale: string }) {
  const t = useTranslations('insights');

  return (
    <>
      <main className="relative z-10 pt-28 pb-32">
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-sm text-brand-blue mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {t('subtitle')}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold font-display mb-4">{t('title')}</h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
          </div>
        </div>

        {/* Article Grid */}
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-8">{t('latestArticles')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/${locale}/insights/${article.slug}`}
                className="group bg-dark-card/60 rounded-2xl border border-dark-border overflow-hidden hover:border-brand-blue/40 transition-all"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={article.image}
                    alt={t('art1_title')}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-dark-bg/80 backdrop-blur-sm text-xs font-medium text-brand-blue border border-brand-blue/30">
                      {t(article.tagKey)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-white/40 mb-3">
                    <span>{article.region}</span>
                    <span>•</span>
                    <span>{t('publishedOn')} {article.date}</span>
                    <span>•</span>
                    <span>{article.readTime} {t('minutes')}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-brand-blue transition-colors">
                    {t(article.titleKey)}
                  </h3>
                  <p className="text-sm text-white/50 line-clamp-2">{t(article.subtitleKey)}</p>

                  {/* Preview Sections */}
                  <div className="mt-5 pt-5 border-t border-dark-border space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-primary text-sm mt-0.5">🔥</span>
                      <p className="text-xs text-white/60 leading-relaxed">
                        <span className="text-white/80 font-medium">{t(`${article.titleKey.replace('title', 'hotTitle')}` as any).replace('🔥 ', '')}</span><br />
                        {t(`${article.titleKey.replace('title', 'hotContent')}` as any).split('\n')[0]}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary text-sm mt-0.5">💰</span>
                      <p className="text-xs text-white/60 leading-relaxed">
                        <span className="text-white/80 font-medium">{t(`${article.titleKey.replace('title', 'profitTitle')}` as any).replace('💰 ', '')}</span><br />
                        {t(`${article.titleKey.replace('title', 'profitContent')}` as any).split('\n')[0]}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary text-sm mt-0.5">🏭</span>
                      <p className="text-xs text-white/60 leading-relaxed">
                        <span className="text-white/80 font-medium">{t(`${article.titleKey.replace('title', 'regionTitle')}` as any).replace('🏭 ', '')}</span><br />
                        {t(`${article.titleKey.replace('title', 'regionContent')}` as any).split('\n')[0]}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-brand-blue text-sm font-medium group-hover:gap-3 transition-all">
                    {t('readMore')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="bg-dark-card/60 rounded-xl p-5 border border-dark-border text-center">
              <p className="text-2xl font-bold text-brand-blue mb-1">3</p>
              <p className="text-sm text-white/50">{t('hotProducts')}</p>
            </div>
            <div className="bg-dark-card/60 rounded-xl p-5 border border-dark-border text-center">
              <p className="text-2xl font-bold text-brand-blue mb-1">3</p>
              <p className="text-sm text-white/50">{t('sourcingRegion')}</p>
            </div>
            <div className="bg-dark-card/60 rounded-xl p-5 border border-dark-border text-center">
              <p className="text-2xl font-bold text-brand-blue mb-1">200-600%</p>
              <p className="text-sm text-white/50">{t('profitSpace')}</p>
            </div>
            <div className="bg-dark-card/60 rounded-xl p-5 border border-dark-border text-center">
              <p className="text-2xl font-bold text-brand-blue mb-1">7-35d</p>
              <p className="text-sm text-white/50">Shipping Time</p>
            </div>
          </div>

          {/* Curated Products Section */}
          <div className="mb-16">
            <h2 className="text-xl font-bold mb-2">{t('art1_productsTitle')}</h2>
            <p className="text-white/50 text-sm mb-6">{t('art1_productsDesc')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-dark-card/40 rounded-xl p-4 border border-dark-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">🫧</div>
                  <div>
                    <p className="font-medium text-sm">{t('art1_category1')}</p>
                    <p className="text-xs text-white/40">t1 · Pop It Fidget Set</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-card/40 rounded-xl p-4 border border-dark-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">🔬</div>
                  <div>
                    <p className="font-medium text-sm">{t('art1_category2')}</p>
                    <p className="text-xs text-white/40">t4 · LED Slime Making Kit</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-card/40 rounded-xl p-4 border border-dark-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">🚗</div>
                  <div>
                    <p className="font-medium text-sm">{t('art1_category3')}</p>
                    <p className="text-xs text-white/40">t3 · RC Stunt Car 360°</p>
                  </div>
                </div>
              </div>
            </div>
            <Link
              href={`/${locale}/products`}
              className="mt-4 inline-flex items-center gap-2 text-brand-blue text-sm font-medium hover:gap-3 transition-all"
            >
              {t('art1_viewProducts')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-brand-blue/10 to-primary/10 rounded-2xl p-8 border border-brand-blue/20 text-center">
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

export default async function InsightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <InsightsContent locale={locale} />;
}
