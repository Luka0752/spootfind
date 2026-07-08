import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh', 'zh-TW', 'es', 'fr', 'de', 'ja', 'ko', 'pt', 'ar'],
  defaultLocale: 'en',
});
