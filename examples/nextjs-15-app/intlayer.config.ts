import { type IntlayerConfig, Locales } from 'intlayer';
import { nextjsRewrite } from 'intlayer/routing';

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

/** @type {import('intlayer').IntlayerConfig} */
const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale: Locales.ENGLISH,
    strictMode: 'strict',
  },
  routing: {
    mode: 'prefix-all',
    rewrite: nextjsRewrite({
      '/[locale]/tests': {
        en: '/[locale]/tests',
        fr: '/[locale]/essais',
        es: '/[locale]/pruebas',
      },
    }),
  },
  content: {
    // contentDir: ['./', '../../apps'],
  },
  editor: {
    liveSync: false,
    applicationURL: 'http://localhost:3000',
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  build: {
    optimize: true,
    importMode: 'fetch',
  },
};

export default config;
