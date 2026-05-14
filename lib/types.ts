// Type definitions only — no imports
export interface ProcurementData {
  supplier: string;
  supplierUrl: string;
  moq: number;
  costPriceCny: number;
  domesticFreightCny: number;
  forwarderFeeCnyPerKg: number;
  weightKg: number;
  shippingDays: number;
  platformFeePct: number;
  profitMarginPct: number;
  certification?: string;
}

// Localized text for a single language
export interface LocalizedText {
  name: string;
  description: string;
  category: string;
}

// All supported locales
export type SupportedLocale = 'en' | 'zh' | 'zh-TW' | 'es' | 'fr' | 'de' | 'ja' | 'ko' | 'pt' | 'ar';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  trend: string;
  region: string;
  image: string;
  description: string;
  source: string;
  procurement?: ProcurementData;
  // Multi-language support
  translations?: Partial<Record<SupportedLocale, LocalizedText>>;
}

export interface TrendingData {
  lastUpdated: string;
  source: string;
  products: Product[];
}
