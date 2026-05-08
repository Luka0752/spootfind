import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

function AboutContent() {
  const t = useTranslations('about');

  return (
    <>
      <main className="relative z-10 pt-28 pb-32">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl sm:text-4xl font-bold font-display mb-4">{t('title')}</h1>
          <p className="text-white/50 mb-12">{t('subtitle')}</p>

          <div className="prose prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4">{t('story')}</h2>
              <p className="text-white/70 leading-relaxed">{t('storyContent')}</p>
            </section>

            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4">{t('mission')}</h2>
              <p className="text-white/70 leading-relaxed">{t('missionContent')}</p>
            </section>

            <section className="mb-12">
              <h2 className="text-xl font-bold mb-6">{t('values')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-dark-card/60 rounded-xl p-6 border border-dark-border">
                  <h3 className="font-semibold mb-2">{t('value1')}</h3>
                  <p className="text-sm text-white/50">{t('value1Desc')}</p>
                </div>
                <div className="bg-dark-card/60 rounded-xl p-6 border border-dark-border">
                  <h3 className="font-semibold mb-2">{t('value2')}</h3>
                  <p className="text-sm text-white/50">{t('value2Desc')}</p>
                </div>
                <div className="bg-dark-card/60 rounded-xl p-6 border border-dark-border">
                  <h3 className="font-semibold mb-2">{t('value3')}</h3>
                  <p className="text-sm text-white/50">{t('value3Desc')}</p>
                </div>
              </div>
            </section>

            {/* How It Works */}
            <section className="mb-16">
              <h2 className="text-xl font-bold mb-8 text-center">{t('howItWorks')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-xl">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">{t('step1Title')}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{t('step1Desc')}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-xl">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">{t('step2Title')}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{t('step2Desc')}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-xl">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">{t('step3Title')}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{t('step3Desc')}</p>
                </div>
              </div>
            </section>

            {/* Stats Bar */}
            <section className="mb-16">
              <div className="bg-dark-card/60 rounded-2xl p-8 border border-dark-border">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <p className="text-3xl font-bold text-primary mb-1">{t('statsNumber.products')}</p>
                    <p className="text-sm text-white/50">{t('stats.products')}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary mb-1">{t('statsNumber.suppliers')}</p>
                    <p className="text-sm text-white/50">{t('stats.suppliers')}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary mb-1">{t('statsNumber.countries')}</p>
                    <p className="text-sm text-white/50">{t('stats.countries')}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary mb-1">{t('statsNumber.orders')}</p>
                    <p className="text-sm text-white/50">{t('stats.orders')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Story Expanded */}
            <section className="mb-16">
              <h2 className="text-xl font-bold mb-4">{t('ourStory')}</h2>
              <p className="text-white/70 leading-relaxed">{t('storyExpanded')}</p>
            </section>

            {/* FAQ */}
            <section className="mb-16">
              <h2 className="text-xl font-bold mb-6 text-center">{t('faq')}</h2>
              <div className="space-y-4">
                <details className="bg-dark-card/60 rounded-xl border border-dark-border group">
                  <summary className="p-5 cursor-pointer font-medium list-none flex justify-between items-center hover:text-primary transition-colors">
                    {t('faqQ1')}
                    <span className="text-white/30 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-white/60 leading-relaxed border-t border-dark-border pt-4">
                    {t('faqA1')}
                  </div>
                </details>
                <details className="bg-dark-card/60 rounded-xl border border-dark-border group">
                  <summary className="p-5 cursor-pointer font-medium list-none flex justify-between items-center hover:text-primary transition-colors">
                    {t('faqQ2')}
                    <span className="text-white/30 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-white/60 leading-relaxed border-t border-dark-border pt-4">
                    {t('faqA2')}
                  </div>
                </details>
                <details className="bg-dark-card/60 rounded-xl border border-dark-border group">
                  <summary className="p-5 cursor-pointer font-medium list-none flex justify-between items-center hover:text-primary transition-colors">
                    {t('faqQ3')}
                    <span className="text-white/30 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-white/60 leading-relaxed border-t border-dark-border pt-4">
                    {t('faqA3')}
                  </div>
                </details>
                <details className="bg-dark-card/60 rounded-xl border border-dark-border group">
                  <summary className="p-5 cursor-pointer font-medium list-none flex justify-between items-center hover:text-primary transition-colors">
                    {t('faqQ4')}
                    <span className="text-white/30 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-white/60 leading-relaxed border-t border-dark-border pt-4">
                    {t('faqA4')}
                  </div>
                </details>
              </div>
              <p className="text-center text-sm text-white/40 mt-6">{t('contactForFaq')}</p>
            </section>

            {/* CTA */}
            <section className="text-center">
              <h2 className="text-2xl font-bold mb-4">{t('startSourcing')}</h2>
              <p className="text-white/50 mb-8">Ready to discover trending products from global markets?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="px-8 py-3 bg-primary hover:bg-primary/80 text-white font-semibold rounded-xl transition-colors"
                >
                  {t('startSourcing')}
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-dark-card/60 border border-dark-border hover:border-primary/60 text-white font-semibold rounded-xl transition-colors"
                >
                  {t('contactForFaq')}
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}
