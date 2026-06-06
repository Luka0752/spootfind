import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
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

/** Simple markdown-to-HTML: bold, bullet lists, paragraphs */
function renderMarkdown(text: string): string {
  if (!text) return '';
  const lines = text.split('\n');
  const htmlLines: string[] = [];
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Empty line → close list if open, add paragraph break
    if (!trimmed) {
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }
      continue;
    }

    // Bullet list item (• or -)
    if (/^[•\-]\s/.test(trimmed)) {
      if (!inList) {
        htmlLines.push('<ul class="space-y-2 my-4">');
        inList = true;
      }
      const itemContent = trimmed.replace(/^[•\-]\s+/, '');
      htmlLines.push(
        `<li class="flex items-start gap-2 text-gray-300"><span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400"></span><span>${processBold(itemContent)}</span></li>`
      );
      continue;
    }

    // Close list if we were in one
    if (inList) {
      htmlLines.push('</ul>');
      inList = false;
    }

    // Regular paragraph line
    htmlLines.push(`<p class="text-gray-300 leading-relaxed">${processBold(trimmed)}</p>`);
  }

  if (inList) {
    htmlLines.push('</ul>');
  }

  return htmlLines.join('\n');
}

/** Replace **text** with <strong> tags */
function processBold(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');
}

/** Section component props */
interface ContentSectionProps {
  emoji: string;
  title: string;
  content: string;
  accentColor?: string;
}

function ContentSection({ emoji, title, content, accentColor = 'cyan' }: ContentSectionProps) {
  const borderColor = accentColor === 'amber' ? 'border-amber-500/30' : 'border-cyan-500/30';
  const bgColor = accentColor === 'amber' ? 'bg-amber-500/10' : 'bg-cyan-500/10';
  const textColor = accentColor === 'amber' ? 'text-amber-400' : 'text-cyan-400';

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 border-t border-b border-gray-800 py-3">
        <span className="text-xl">{emoji}</span>
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <div dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
    </section>
  );
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

  const hotTitle = t(`${article.titleKey.replace('title', 'hotTitle')}` as any) || '';
  const hotContent = t(`${article.titleKey.replace('title', 'hotContent')}` as any) || '';
  const profitTitle = t(`${article.titleKey.replace('title', 'profitTitle')}` as any) || '';
  const profitContent = t(`${article.titleKey.replace('title', 'profitContent')}` as any) || '';
  const regionTitle = t(`${article.titleKey.replace('title', 'regionTitle')}` as any) || '';
  const regionContent = t(`${article.titleKey.replace('title', 'regionContent')}` as any) || '';
  const tipsTitle = t(`${article.titleKey.replace('title', 'tipsTitle')}` as any) || '';
  const tipsContent = t(`${article.titleKey.replace('title', 'tipsContent')}` as any) || '';

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

  // Check if article has a hero image (some reuse product images, art5)
  const hasHeroImage = article.image.startsWith('/articles/');

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

        {/* Article sections */}
        <div className="space-y-10">
          {/* Hot / Trending section */}
          {hotContent && (
            <ContentSection emoji="🔥" title={hotTitle} content={hotContent} />
          )}

          {/* In-article image after hot section */}
          {hasHeroImage && (
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
              <Image
                src={article.image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          {/* Profit section */}
          {profitContent && (
            <ContentSection emoji="💰" title={profitTitle} content={profitContent} accentColor="amber" />
          )}

          {/* Region section */}
          {regionContent && (
            <ContentSection emoji="🏭" title={regionTitle} content={regionContent} />
          )}

          {/* Tips section */}
          {tipsContent && (
            <ContentSection emoji="📦" title={tipsTitle} content={tipsContent} />
          )}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-white/5 p-8 text-center backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-white">
            {t(`${article.titleKey.replace('title', 'contactTitle')}` as any) || 'Ready to Source?'}
          </h3>
          <p className="mt-2 text-gray-400">
            {t(`${article.titleKey.replace('title', 'contactContent')}` as any) || 'Get factory-direct pricing. Contact our sourcing team today.'}
          </p>
          <a
            href={`/${locale}/contact`}
            className="mt-6 inline-block rounded-lg bg-cyan-500 px-8 py-3 font-semibold text-black transition-colors hover:bg-cyan-400"
          >
            {t(`${article.titleKey.replace('title', 'contactBtn')}` as any) || 'Request a Quote'}
          </a>
        </div>
      </article>
    </>
  );
}
