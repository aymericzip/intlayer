import { Locales, type IntlayerConfig } from 'intlayer';

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

/** @type {import('intlayer').IntlayerConfig} */
const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale: Locales.ENGLISH,
    strictMode: 'strict',
  },
  editor: {
    enabled: true,
    backendURL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3100'
        : undefined,
  },
};

export default config;
