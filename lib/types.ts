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
}

export interface TrendingData {
  lastUpdated: string;
  source: string;
  products: Product[];
}
