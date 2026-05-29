import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { articles } from '@/lib/articles';

// Generate static params for all articles and all locales
export function generateStaticParams() {
  const locales = ['en', 'zh', 'zh-TW', 'es', 'fr', 'de', 'ja', 'ko', 'pt', 'ar'];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const article of articles) {
      params.push({ locale, slug: article.slug });
    }
  }
  return params;
}

// Generate metadata per locale + slug
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  const t = await getTranslations({ locale, namespace: 'insights' });
  const titleKey = `${article.titleKey}` as 'art1_title';
  const descKey = `${article.titleKey.replace('title', 'metaDesc')}` as 'art1_metaDesc';
  const title = t(titleKey as any) || article.title;
  const description = t(descKey as any) || article.excerpt;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://spootfind.com';
  const url = `${baseUrl}/${locale}/insights/${slug}`;

  return {
    title: `${title} | Spootfind Insights`,
    description,
    alternates: {
      languages: {
        en: `${baseUrl}/en/insights/${slug}`,
        zh: `${baseUrl}/zh/insights/${slug}`,
        'zh-TW': `${baseUrl}/zh-TW/insights/${slug}`,
        es: `${baseUrl}/es/insights/${slug}`,
        fr: `${baseUrl}/fr/insights/${slug}`,
        de: `${baseUrl}/de/insights/${slug}`,
        ja: `${baseUrl}/ja/insights/${slug}`,
        ko: `${baseUrl}/ko/insights/${slug}`,
        pt: `${baseUrl}/pt/insights/${slug}`,
        ar: `${baseUrl}/ar/insights/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: article.publishedAt,
    },
  };
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const t = await getTranslations({ locale, namespace: 'insights' });
  const title = t(`${article.titleKey}` as any) || article.title;
  const excerpt = t(`${article.titleKey.replace('title', 'subtitle')}` as any) || article.excerpt;
  // Article content: use hotContent + profitContent + regionContent as body (existing keys)
  const hotContent = t(`${article.titleKey.replace('title', 'hotContent')}` as any) || '';
  const profitContent = t(`${article.titleKey.replace('title', 'profitContent')}` as any) || '';
  const regionContent = t(`${article.titleKey.replace('title', 'regionContent')}` as any) || '';
  const tipsContent = t(`${article.titleKey.replace('title', 'tipsContent')}` as any) || '';
  const content = `${hotContent}\n\n${profitContent}\n\n${regionContent}\n\n${tipsContent}`;
  const publishedAt = article.publishedAt;
  const readTime = article.readTime;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://spootfind.com';
  const url = `${baseUrl}/${locale}/insights/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: excerpt,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Spootfind',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Spootfind',
      url: baseUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12">
          <div className="mb-4 flex items-center gap-3 text-sm text-gray-400">
            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-400">
              {article.category}
            </span>
            <time dateTime={publishedAt}>
              {new Date(publishedAt).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>·</span>
            <span>{readTime}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-lg text-gray-400">{excerpt}</p>
        </header>

        {/* Article content - rendered from translated markdown */}
        <div
          className="prose prose-invert prose-cyan max-w-none prose-headings:text-white prose-a:text-cyan-400 prose-strong:text-white prose-code:text-cyan-400"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-white/5 p-8 text-center">
          <h3 className="text-xl font-semibold text-white">
            {t(`${article.titleKey.replace('title', 'contactTitle')}` as any) || 'Ready to Source?'}
          </h3>
          <p className="mt-2 text-gray-400">
            {t(`${article.titleKey.replace('title', 'contactContent')}` as any) || 'Get factory-direct pricing. Contact our sourcing team today.'}
          </p>
          <a
            href={`/${locale}/contact`}
            className="mt-6 inline-block rounded-lg bg-cyan-500 px-8 py-3 font-semibold text-black hover:bg-cyan-400"
          >
            {t(`${article.titleKey.replace('title', 'contactBtn')}` as any) || 'Request a Quote'}
          </a>
        </div>
      </article>
    </>
  );
}
