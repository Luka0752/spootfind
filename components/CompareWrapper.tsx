'use client';

import { trendingData } from '@/lib/data';
import ProductCompare from './ProductCompare';
import { useCompare } from './ProductCompare';

export default function CompareWrapper() {
  const { selectedIds, removeFromCompare, clearCompare } = useCompare();

  if (selectedIds.length === 0) return null;

  return (
    <ProductCompare
      products={trendingData.products}
      selectedIds={selectedIds}
      onRemove={removeFromCompare}
      onClear={clearCompare}
    />
  );
}
