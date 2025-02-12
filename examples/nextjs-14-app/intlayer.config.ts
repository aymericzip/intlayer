import { Locales, type IntlayerConfig } from 'intlayer';

/** @type {import('intlayer').IntlayerConfig} */

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    strictMode: 'strict',
  },
  editor: {
    applicationURL: 'http://localhost:3000',
  },
};

export default config;
