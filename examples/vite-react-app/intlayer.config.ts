import { type IntlayerConfig, Locales } from 'intlayer';

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
  routing: {
    mode: 'prefix-all',
    storage: ['cookie', 'localStorage'],
  },
};

export default config;
