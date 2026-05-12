'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function RequestPage() {
  const t = useTranslations('Request')
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
      phone: formData.get('phone') as string,
      productName: formData.get('productName') as string,
      market: formData.get('market') as string,
      price: formData.get('price') as string,
      source: formData.get('source') as string,
      expectedTime: formData.get('expectedTime') as string,
      notes: formData.get('notes') as string
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
    } catch (err) {
      setResult({ success: false, message: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600 mb-8">{t('subtitle')}</p>

        {result && (
          <div className={`mb-6 p-4 rounded-lg ${result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {result.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          {/* Contact Information */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('contactInfo')}</h2>
            <div className="grid gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('emailPlaceholder')}
                />
                <p className="text-xs text-gray-500 mt-1">{t('emailHint')}</p>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('name')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('namePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('phonePlaceholder')}
                />
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('productInfo')}</h2>
            <div className="grid gap-4">
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('productName')} *
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('productNamePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="market" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('market')} *
                </label>
                <select
                  id="market"
                  name="market"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{t('selectMarket')}</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="CA">Canada</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                  <option value="KR">South Korea</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('price')}
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('pricePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('source')}
                </label>
                <input
                  type="text"
                  id="source"
                  name="source"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('sourcePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="expectedTime" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('expectedTime')}
                </label>
                <input
                  type="text"
                  id="expectedTime"
                  name="expectedTime"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('expectedTimePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('notes')}
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('notesPlaceholder')}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {t('autoRegisterHint')}
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? t('submitting') : t('submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
