import { type IntlayerConfig, Locales } from 'intlayer';

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: 'search-params', // or `no-prefix` - Useful for middleware detection
    storage: ['header'],
  },
  build: {
    optimize: undefined, // Keep default, optimize in prod only
  },
  dictionary: {
    importMode: 'fetch',
  },
};

export default config;
