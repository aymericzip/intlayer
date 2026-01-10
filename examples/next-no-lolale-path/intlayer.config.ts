import { type IntlayerConfig, Locales } from 'intlayer';

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: 'search-params', // or `no-prefix` - Useful for middleware detection
  },
  build: {
    optimize: true,
    importMode: 'live',
  },
};

export default config;
