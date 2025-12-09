export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'zh', 'es', 'fr'],
};

export const config = {
  fallbackLng: {
    default: ['en'],
  },
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  localePath: './public/locales',
  localeDetection: true,
};