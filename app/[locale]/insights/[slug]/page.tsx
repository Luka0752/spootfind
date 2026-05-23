import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const locales = ['en', 'zh', 'zh-TW', 'es', 'fr', 'de', 'pt', 'ja', 'ko', 'ar'];

const articles: Record<string, {
  titleKey: string; subtitleKey: string; tagKey: string; region: string; date: string; readTime: string; image: string; linkedProductIds: string[];
  categories: { emoji: string; labelKey: string; ids: string[] }[];
}> = {
  'na-tiktok-fidget-toys-may-2026': {
    titleKey: 'art1_title',
    subtitleKey: 'art1_subtitle',
    tagKey: 'art1_tag',
    region: '🇺🇸 North America',
    date: '2026-05-22',
    readTime: '8',
    image: '/products/toys.jpg',
    linkedProductIds: ['t1', 't4', 't3'],
    categories: [
      { emoji: '🫧', labelKey: 'art1_category1', ids: ['t1', 't7'] },
      { emoji: '🔬', labelKey: 'art1_category2', ids: ['t8', 't5'] },
      { emoji: '🚗', labelKey: 'art1_category3', ids: ['t3', 't2'] },
    ],
  },
  'china-construction-equipment-may-2026': {
    titleKey: 'art2_title',
    subtitleKey: 'art2_subtitle',
    tagKey: 'art2_tag',
    region: '🏭 Jining, China',
    date: '2026-05-23',
    readTime: '10',
    image: '/products/mini-excavator.webp',
    linkedProductIds: ['t9', 't13', 't15'],
    categories: [
      { emoji: '⛏️', labelKey: 'art2_category1', ids: ['t9', 't12'] },
      { emoji: '🛣️', labelKey: 'art2_category2', ids: ['t10', 't16'] },
      { emoji: '🔨', labelKey: 'art2_category3', ids: ['t15', 't11'] },
    ],
  },
  'sea-ecommerce-sourcing-guide-may-2026': {
    titleKey: 'art3_title',
    subtitleKey: 'art3_subtitle',
    tagKey: 'art3_tag',
    region: '🌏 Southeast Asia',
    date: '2026-05-23',
    readTime: '8',
    image: '/products/toys.jpg',
    linkedProductIds: ['t1', 't4', 't3'],
    categories: [
      { emoji: '💆', labelKey: 'art3_category1', ids: ['t1', 't7'] },
      { emoji: '👗', labelKey: 'art3_category2', ids: ['t8', 't5'] },
      { emoji: '🏠', labelKey: 'art3_category3', ids: ['t3', 't2'] },
    ],
  },
};

export function generateStaticParams() {
  return locales.flatMap(locale =>
    Object.keys(articles).map(slug => ({ locale, slug }))
  );
}

function ArticleContent({ locale, slug }: { locale: string; slug: string }) {
  const t = useTranslations('insights');
  const article = articles[slug];

  if (!article) {
    notFound();
  }

  const artPrefix = article.titleKey.split('_')[0]; // 'art1' or 'art2'

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
            <span className="text-white/60">{t(article.titleKey)}</span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-medium border border-brand-blue/30">
                {t(article.tagKey)}
              </span>
              <span className="text-white/40 text-sm">{article.region}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-display mb-4">{t(article.titleKey)}</h1>
            <p className="text-white/50 text-lg">{t(article.subtitleKey)}</p>
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
              alt={t(article.titleKey)}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>

          {/* Content Blocks */}
          <div className="space-y-10">
            {/* Hot Products / What's Trending */}
            <section className="bg-dark-card/40 rounded-2xl p-6 border border-dark-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                {t(`${artPrefix}_hotTitle`)}
              </h2>
              <div className="text-white/70 whitespace-pre-line leading-relaxed">
                {t(`${artPrefix}_hotContent`)}
              </div>
            </section>

            {/* Profit Space */}
            <section className="bg-dark-card/40 rounded-2xl p-6 border border-dark-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                {t(`${artPrefix}_profitTitle`)}
              </h2>
              <div className="text-white/70 whitespace-pre-line leading-relaxed">
                {t(`${artPrefix}_profitContent`)}
              </div>
            </section>

            {/* Sourcing Region */}
            <section className="bg-dark-card/40 rounded-2xl p-6 border border-dark-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                {t(`${artPrefix}_regionTitle`)}
              </h2>
              <div className="text-white/70 whitespace-pre-line leading-relaxed">
                {t(`${artPrefix}_regionContent`)}
              </div>
            </section>

            {/* Sourcing Tips */}
            <section className="bg-dark-card/40 rounded-2xl p-6 border border-dark-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                {t(`${artPrefix}_tipsTitle`)}
              </h2>
              <div className="text-white/70 whitespace-pre-line leading-relaxed">
                {t(`${artPrefix}_tipsContent`)}
              </div>
            </section>

            {/* Curated Products */}
            <section className="bg-dark-card/40 rounded-2xl p-6 border border-dark-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                {t(`${artPrefix}_productsTitle`)}
              </h2>
              <p className="text-white/50 mb-6">{t(`${artPrefix}_productsDesc`)}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {article.categories.map((cat, i) => (
                  <div key={i} className="bg-dark-bg/50 rounded-xl p-4 border border-dark-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl mb-3">{cat.emoji}</div>
                    <p className="font-medium text-sm">{t(cat.labelKey)}</p>
                    <p className="text-xs text-white/40">{cat.ids.map(id => id).join(' · ')}</p>
                  </div>
                ))}
              </div>
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center gap-2 text-brand-blue text-sm font-medium hover:gap-3 transition-all"
              >
                {t(`${artPrefix}_viewProducts`)}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-brand-blue/10 to-primary/10 rounded-2xl p-8 border border-brand-blue/20 text-center">
            <h3 className="text-2xl font-bold mb-3">{t(`${artPrefix}_contactTitle`)}</h3>
            <p className="text-white/50 mb-6 max-w-lg mx-auto">{t(`${artPrefix}_contactContent`)}</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue hover:bg-brand-blue/80 text-white font-semibold rounded-xl transition-colors"
            >
              {t(`${artPrefix}_contactBtn`)}
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
