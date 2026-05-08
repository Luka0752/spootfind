'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-white/60 mb-2">{t('name')}</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">{t('email')}</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">{t('subject')}</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">{t('message')}</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-card/60 border border-dark-border rounded-xl focus:border-brand-blue/50 outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-brand-blue text-dark-bg rounded-full font-semibold hover:bg-brand-blue/80 transition-all"
              >
                {t('sendMessage')}
              </button>
            </form>
          )}
        </div>
      </main>
    </>
  );
}
