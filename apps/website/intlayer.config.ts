import { Locales, type IntlayerConfig } from 'intlayer';

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

/** @type {import('intlayer').IntlayerConfig} */

const config: IntlayerConfig = {
  internationalization: {
    locales,
    strictMode: 'strict',
  },
  editor: {
    enabled: true,
  },
};

export default config;
