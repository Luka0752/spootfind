import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh', 'zh-TW', 'es', 'fr', 'ar', 'pt', 'de', 'ja', 'ko'],
  defaultLocale: 'en',
});
