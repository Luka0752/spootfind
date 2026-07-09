// Import JSON and re-export as typed singleton
import raw from './trending.json';
import type { TrendingData, Product } from './types';

export const trendingData = raw as unknown as TrendingData;
export type { Product } from './types';
