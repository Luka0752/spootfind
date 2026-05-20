'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ParticlesCanvas from '@/components/ParticlesCanvas'

export default function RequestPage() {
  const t = useTranslations('Request')
  const locale = useLocale()
  const searchParams = useSearchParams()
  const productName = searchParams.get('product') || ''

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResult(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      email: formData.get('email') as string,
      name: formData.get('name') as string,
      details: formData.get('details') as string
    }

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const json = await res.json()

      if (json.success) {
        setResult({ success: true, message: json.message })
        ;(e.target as HTMLFormElement).reset()
      } else {
        setResult({ success: false, message: json.error || 'Submission failed' })
      }
    } catch {
      setResult({ success: false, message: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <ParticlesCanvas />
      <main className="relative z-10 min-h-screen py-12 px-4">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold font-display mb-2">{t('title')}</h1>
          <p className="text-white/50 mb-8">{t('subtitle')}</p>

          {result && (
            <div className={`mb-6 p-4 rounded-lg ${result.success ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
              {result.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-dark-card/60 rounded-2xl border border-dark-border p-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-1">
                {t('email')} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent text-white placeholder:text-white/20"
                placeholder={t('emailPlaceholder')}
              />
              <p className="text-xs text-white/30 mt-1">{t('emailHint')}</p>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/60 mb-1">
                {t('name')} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent text-white placeholder:text-white/20"
                placeholder={t('namePlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="details" className="block text-sm font-medium text-white/60 mb-1">
                {t('details')} *
              </label>
              <textarea
                id="details"
                name="details"
                required
                rows={5}
                defaultValue={productName ? `I'm interested in: ${productName}\n\nPlease provide pricing and availability details.` : ''}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent text-white placeholder:text-white/20"
                placeholder={t('detailsPlaceholder')}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-brand-blue text-dark-bg font-semibold text-lg rounded-lg hover:bg-brand-blue/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? t('submitting') : t('submit')}
              </button>
              <p className="text-xs text-white/20 mt-3 text-center">
                {t('autoRegisterHint')}
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
