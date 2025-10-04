import { type IntlayerConfig, Locales } from 'intlayer';

/** @type {import('intlayer').IntlayerConfig} */

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
  editor: {
    applicationURL: 'http://localhost:3000',
  },
};

export default config;
