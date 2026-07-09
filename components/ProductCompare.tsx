'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import type { Product } from '@/lib/types';

interface CompareItem {
  id: string;
  name: string;
  price: number;
  costPrice?: number;
  profitMargin?: number;
  moq?: number;
  leadTime?: number;
  weight?: number;
  image: string;
}

const STORAGE_KEY = 'spootfind-compare';
const MAX_COMPARE = 3;

function getStoredIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function storeIds(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch { /* ignore */ }
}

export function useCompare() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedIds(getStoredIds());
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setSelectedIds((prev) => {
      let next: string[];
      if (prev.includes(id)) {
        next = prev.filter((i) => i !== id);
      } else {
        if (prev.length >= MAX_COMPARE) return prev;
        next = [...prev, id];
      }
      storeIds(next);
      return next;
    });
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = prev.filter((i) => i !== id);
      storeIds(next);
      return next;
    });
  }, []);

  const clearCompare = useCallback(() => {
    setSelectedIds([]);
    storeIds([]);
  }, []);

  return { selectedIds, toggleCompare, removeFromCompare, clearCompare };
}

/* ─── Compare Checkbox (goes on product cards) ─── */
export function CompareCheckbox({
  productId,
  selected,
  onToggle,
  disabled,
}: {
  productId: string;
  selected: boolean;
  onToggle: (id: string) => void;
  disabled?: boolean;
}) {
  const t = useTranslations('compare');

  return (
    <label
      className={`inline-flex items-center gap-1.5 cursor-pointer select-none text-xs transition-colors ${
        disabled && !selected ? 'opacity-40 cursor-not-allowed' : 'text-white/50 hover:text-brand-blue'
      }`}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onToggle(productId)}
        disabled={disabled && !selected}
        className="sr-only"
      />
      <span
        className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
          selected
            ? 'bg-brand-blue border-brand-blue'
            : 'border-white/30'
        }`}
      >
        {selected && (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      {t('compare')}
    </label>
  );
}

/* ─── Main Compare Panel ─── */
export default function ProductCompare({
  products,
  selectedIds,
  onRemove,
  onClear,
}: {
  products: Product[];
  selectedIds: string[];
  onRemove: (id: string) => void;
  onClear: () => void;
}) {
  const t = useTranslations('compare');
  const [open, setOpen] = useState(false);

  const compareItems: CompareItem[] = products
    .filter((p) => selectedIds.includes(p.id))
    .map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      costPrice: p.procurement?.costPriceCny,
      profitMargin: p.procurement?.profitMarginPct,
      moq: p.procurement?.moq,
      leadTime: p.procurement?.shippingDays,
      weight: p.procurement?.weightKg,
      image: p.image,
    }));

  if (compareItems.length === 0) return null;

  return (
    <>
      {/* Floating bar */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-dark-card border border-brand-blue/30 rounded-full pl-5 pr-3 py-2.5 shadow-lg shadow-brand-blue/10 cursor-pointer hover:border-brand-blue/50 transition-all"
        onClick={() => setOpen(true)}
      >
        <span className="text-sm font-medium text-white/80">
          {t('itemsSelected', { count: compareItems.length })}
        </span>
        <span className="px-3 py-1 bg-brand-blue text-white text-xs font-bold rounded-full">
          {t('viewCompare')}
        </span>
      </div>

      {/* Overlay panel */}
      {open && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center p-4 pb-8"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="relative w-full max-w-4xl bg-dark-card border border-dark-border rounded-2xl overflow-hidden shadow-2xl animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border">
              <h3 className="text-lg font-bold font-display">{t('title')}</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={onClear}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  {t('clearAll')}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-border">
                    <th className="text-left px-6 py-3 text-white/40 font-medium w-32" />
                    {compareItems.map((item) => (
                      <th key={item.id} className="text-left px-4 py-3 min-w-[160px]">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-dark-bg flex-shrink-0 overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-white truncate">{item.name}</p>
                          </div>
                          <button
                            onClick={() => onRemove(item.id)}
                            className="ml-auto text-white/30 hover:text-red-400 transition-colors flex-shrink-0"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: t('price'), key: 'price', render: (v: number) => `$${v.toFixed(2)}` },
                    { label: t('costPrice'), key: 'costPrice', render: (v: number) => v ? `¥${v.toFixed(2)}` : '—' },
                    { label: t('profitMargin'), key: 'profitMargin', render: (v: number) => v ? `${v}%` : '—' },
                    { label: t('moq'), key: 'moq', render: (v: number) => v ? String(v) : '—' },
                    { label: t('leadTime'), key: 'leadTime', render: (v: number) => v ? `${v} days` : '—' },
                    { label: t('weight'), key: 'weight', render: (v: number) => v ? `${v} kg` : '—' },
                  ].map((row) => (
                    <tr key={row.key} className="border-b border-dark-border/50 hover:bg-white/[0.02]">
                      <td className="px-6 py-3 text-white/50">{row.label}</td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="px-4 py-3 text-white/80 font-medium">
                          {row.render((item as any)[row.key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-slide-up {
          animation: slideUp 0.25s ease-out;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
