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
    liveSync: true,
    applicationURL: 'http://localhost:3000',
  },
  build: {
    optimize: true,
    importMode: 'dynamic',
  },
};

export default config;
