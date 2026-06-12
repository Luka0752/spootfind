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
    image: '/articles/art1-na-tiktok-fidget.png',
    linkedProductIds: ['t17', 't18', 't1'],
  },
  {
    slug: 'china-construction-equipment-may-2026',
    tagKey: 'art2_tag',
    titleKey: 'art2_title',
    subtitleKey: 'art2_subtitle',
    category: 'Industrial',
    publishedAt: '2026-05-23',
    readTime: '10 min read',
    image: '/articles/art2-china-construction.png',
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
    image: '/articles/art3-sea-ecommerce.png',
    linkedProductIds: ['t1', 't2', 't5'],
  },
  {
    slug: 'tiktok-shop-june-2026-trending-products',
    tagKey: 'art4_tag',
    titleKey: 'art4_title',
    subtitleKey: 'art4_subtitle',
    category: 'Trending',
    publishedAt: '2026-06-01',
    readTime: '8 min read',
    image: '/articles/art4-tiktok-shop-june.png',
    linkedProductIds: ['t17', 't18', 't1'],
  },
  {
    slug: 'prime-day-2026-mid-year-sourcing-guide',
    tagKey: 'art5_tag',
    titleKey: 'art5_title',
    subtitleKey: 'art5_subtitle',
    category: 'Guide',
    publishedAt: '2026-06-05',
    readTime: '10 min read',
    image: '/articles/art5-prime-day.png',
    linkedProductIds: ['t17', 't18', 't1', 't4'],
  },
  {
    slug: 'fifa-world-cup-2026-sourcing-guide',
    tagKey: 'art6_tag',
    titleKey: 'art6_title',
    subtitleKey: 'art6_subtitle',
    category: 'Trending',
    publishedAt: '2026-06-12',
    readTime: '9 min read',
    image: '/articles/art6-world-cup-2026.png',
    linkedProductIds: ['t19', 't20', 't21', 't22', 't23', 't24', 't25', 't26'],
  },
];