export interface Article {
  slug: string;
  tagKey: string;
  titleKey: string;
  subtitleKey: string;
  category: string;
  publishedAt: string;
  readTime: string;
  image: string;
  linkedProductIds: string[];
}

export const articles: Article[] = [
  {
    slug: 'na-tiktok-fidget-toys-may-2026',
    tagKey: 'art1_tag',
    titleKey: 'art1_title',
    subtitleKey: 'art1_subtitle',
    category: 'Trending',
    publishedAt: '2026-05-22',
    readTime: '8 min read',
    image: '/products/toys.jpg',
    linkedProductIds: ['t1', 't4', 't3'],
  },
  {
    slug: 'china-construction-equipment-may-2026',
    tagKey: 'art2_tag',
    titleKey: 'art2_title',
    subtitleKey: 'art2_subtitle',
    category: 'Industrial',
    publishedAt: '2026-05-23',
    readTime: '10 min read',
    image: '/products/mini-excavator.webp',
    linkedProductIds: ['t9', 't13', 't15'],
  },
  {
    slug: 'sea-ecommerce-sourcing-guide-may-2026',
    tagKey: 'art3_tag',
    titleKey: 'art3_title',
    subtitleKey: 'art3_subtitle',
    category: 'Guide',
    publishedAt: '2026-05-23',
    readTime: '8 min read',
    image: '/products/toys.jpg',
    linkedProductIds: ['t1', 't4', 't3'],
  },
  {
    slug: 'tiktok-shop-june-2026-trending-products',
    tagKey: 'art4_tag',
    titleKey: 'art4_title',
    subtitleKey: 'art4_subtitle',
    category: 'Trending',
    publishedAt: '2026-06-01',
    readTime: '8 min read',
    image: '/products/toys.jpg',
    linkedProductIds: ['t1', 't4', 't3'],
  },
];