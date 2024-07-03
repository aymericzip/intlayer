import { Locales, type IntlayerConfig } from 'intlayer';

/** @type {import('intlayer').IntlayerConfig} */

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
  editor: {
    enabled: process.env.NODE_ENV === 'development',
  },
};

export default config;
