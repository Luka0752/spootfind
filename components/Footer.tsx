'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-border bg-dark-bg">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="Spootfind" width={32} height={32} className="rounded-lg" />
              <span className="text-lg font-bold font-display">
                Spoot<span className="text-brand-blue">find</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm max-w-md leading-relaxed">{t('madeWith')}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/80 mb-4">{t('company')}</h4>
            <div className="flex flex-col gap-2">
              <Link href={`/${locale}/about`} className="text-sm text-white/40 hover:text-brand-blue transition-colors">{t('aboutUs')}</Link>
              <Link href={`/${locale}/products`} className="text-sm text-white/40 hover:text-brand-blue transition-colors">{t('products')}</Link>
              <Link href={`/${locale}/contact`} className="text-sm text-white/40 hover:text-brand-blue transition-colors">{t('contactUs')}</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/80 mb-4">{t('connect')}</h4>
            <div className="flex flex-col gap-2 text-sm text-white/40">
              <a href="mailto:lukazhang0752@gmail.com" className="hover:text-brand-blue transition-colors">lukazhang0752@gmail.com</a>
              <a href="tel:+8615588702803" className="hover:text-brand-blue transition-colors">+86 155-8870-2803</a>
              <span>Shanghai, China</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">{t('copyright', { year })}</p>
          <div className="flex gap-6 text-xs text-white/30">
            <span className="hover:text-white/50 cursor-pointer transition-colors">{t('privacy')}</span>
            <span className="hover:text-white/50 cursor-pointer transition-colors">{t('terms')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
