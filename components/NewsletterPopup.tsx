'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';

const STORAGE_KEY = 'spootfind-newsletter-dismissed';
const DELAY_MS = 60_000;
const COOLDOWN_DAYS = 7;

export default function NewsletterPopup() {
  const t = useTranslations('newsletter');
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isDismissed = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const dismissedAt = Number(raw);
      return Date.now() - dismissedAt < COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    if (isDismissed()) return;
    const timer = setTimeout(() => {
      setVisible(true);
    }, DELAY_MS);
    return () => clearTimeout(timer);
  }, [isDismissed]);

  const handleClose = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch { /* ignore */ }
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) return t('errorEmpty');
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) return t('errorInvalid');
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setSubmitting(true);

    // Simulate API call (no external API dependency)
    await new Promise((resolve) => setTimeout(resolve, 800));

    setSubmitting(false);
    setSuccess(true);

    // Auto-close after showing success
    setTimeout(() => {
      handleClose();
      setSuccess(false);
      setEmail('');
    }, 3000);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-dark-card border border-dark-border rounded-2xl p-8 shadow-2xl shadow-brand-blue/10 animate-in">

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!success ? (
          <>
            {/* Icon */}
            <div className="mb-4 flex justify-center">
              <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold font-display text-center mb-2">
              {t('title')}
            </h2>
            <p className="text-sm text-white/50 text-center mb-6">
              {t('subtitle')}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                  placeholder={t('emailPlaceholder')}
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all"
                  disabled={submitting}
                />
                {error && (
                  <p className="text-xs text-red-400 mt-1 ml-1">{error}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-brand-blue text-white font-semibold text-sm rounded-xl hover:bg-brand-blue/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? t('subscribing') : t('subscribe')}
              </button>
            </form>

            <p className="text-[11px] text-white/25 text-center mt-4">
              {t('disclaimer')}
            </p>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold font-display mb-2">{t('successTitle')}</h2>
            <p className="text-sm text-white/50">{t('successDesc')}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-in {
          animation: popupIn 0.3s ease-out;
        }
        @keyframes popupIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
