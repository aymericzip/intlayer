import { type IntlayerConfig, Locales } from 'intlayer';

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.FRENCH, Locales.ENGLISH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    requiredLocales: [Locales.FRENCH, Locales.ENGLISH],
  },
  routing: {
    mode: 'prefix-no-default',
    rewrite: {
      '/about': {
        en: '/about',
        fr: '/a-propos',
        es: '/acerca-de',
      },
      '/product/[id]': {
        en: '/product/[id]',
        fr: '/produit/[id]',
        es: '/producto/[id]',
      },
    },
  },
  editor: {
    enabled: false,
    applicationURL: 'http://localhost:5173',
  },
  dictionary: {
    importMode: 'dynamic',
  },
  build: {
    optimize: undefined, // Keep default, optimize in prod only
    minify: true,
    purge: true,
  },
  ai: {
    provider: 'openai',
    model: 'gpt-5-mini',
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: [''].join('\n'),
  },
  compiler: {
    enabled: true,
    saveComponents: false,
  },
  log: {
    mode: 'verbose',
  },
};

export default config;
