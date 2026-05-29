'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    market: '',
    scale: '',
    priceRange: '',
    certification: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const set = (k: string, v: string) => setForm({ ...form, [k]: v });

  return (
    <>
      <main className="relative z-10 pt-28 pb-32">
        <div className="max-w-2xl mx-auto px-6">
          <h1 className="text-3xl sm:text-4xl font-bold font-display mb-4">{t('title')}</h1>
          <p className="text-white/50 mb-8">{t('subtitle')}</p>

          {submitted ? (
            <div className="bg-dark-card/60 rounded-2xl border border-brand-green/30 p-8 text-center">
              <div className="text-4xl mb-4">✓</div>
              <p className="text-brand-green font-semibold">{t('success')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">{t('name')} <span className="text-red-400">*</span></label>
                  <input type="text" required value={form.name} onChange={e => set('name', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">{t('email')} <span className="text-red-400">*</span></label>
                  <input type="email" required value={form.email} onChange={e => set('email', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none transition-colors" />
                </div>
              </div>

              {/* Row 2: Phone + Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">{t('phone')}</label>
                  <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">{t('company')}</label>
                  <input type="text" value={form.company} onChange={e => set('company', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none transition-colors" />
                </div>
              </div>

              {/* Row 3: Market + Scale */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">{t('market')} <span className="text-red-400">*</span></label>
                  <select required value={form.market} onChange={e => set('market', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none transition-colors appearance-none">
                    <option value="">{t('marketPlaceholder')}</option>
                    <option value="north_america">{t('marketNA')}</option>
                    <option value="europe">{t('marketEU')}</option>
                    <option value="southeast_asia">{t('marketSEA')}</option>
                    <option value="middle_east">{t('marketME')}</option>
                    <option value="africa">{t('marketAfrica')}</option>
                    <option value="south_america">{t('marketSA')}</option>
                    <option value="australia">{t('marketAU')}</option>
                    <option value="other">{t('marketOther')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">{t('scale')} <span className="text-red-400">*</span></label>
                  <select required value={form.scale} onChange={e => set('scale', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none transition-colors appearance-none">
                    <option value="">{t('scalePlaceholder')}</option>
                    <option value="trial">{t('scaleTrial')}</option>
                    <option value="small">{t('scaleSmall')}</option>
                    <option value="medium">{t('scaleMedium')}</option>
                    <option value="bulk">{t('scaleBulk')}</option>
                    <option value="wholesale">{t('scaleWholesale')}</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Price Range + Certification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">{t('priceRange')}</label>
                  <select value={form.priceRange} onChange={e => set('priceRange', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none transition-colors appearance-none">
                    <option value="">{t('priceRangePlaceholder')}</option>
                    <option value="under_1k">Under $1,000</option>
                    <option value="1k_5k">$1,000 – $5,000</option>
                    <option value="5k_20k">$5,000 – $20,000</option>
                    <option value="20k_100k">$20,000 – $100,000</option>
                    <option value="over_100k">$100,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">{t('certification')}</label>
                  <input type="text" value={form.certification} onChange={e => set('certification', e.target.value)}
                    placeholder={t('certPlaceholder')}
                    className="w-full px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none transition-colors" />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm text-white/60 mb-2">{t('subject')} <span className="text-red-400">*</span></label>
                <input type="text" required value={form.subject} onChange={e => set('subject', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none transition-colors" />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm text-white/60 mb-2">{t('message')} <span className="text-red-400">*</span></label>
                <textarea required rows={5} value={form.message} onChange={e => set('message', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none transition-colors resize-none" />
              </div>

              <button type="submit"
                className="w-full py-4 bg-brand-blue text-dark-bg rounded-full font-semibold hover:bg-brand-blue/80 transition-all">
                {t('sendMessage')}
              </button>
            </form>
          )}
        </div>
      </main>
    </>
  );
}
