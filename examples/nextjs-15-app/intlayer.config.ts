import { Locales, type IntlayerConfig } from 'intlayer';

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

/** @type {import('intlayer').IntlayerConfig} */
const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale: Locales.ENGLISH,
    strictMode: 'strict',
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
    importMode: 'live',
  },
};

export default config;
