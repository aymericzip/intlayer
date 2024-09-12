import { Locales, type IntlayerConfig } from 'intlayer';

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

const getBackendURL = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3100';
  }
};

/** @type {import('intlayer').IntlayerConfig} */
const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale: Locales.ENGLISH,
    strictMode: 'strict',
  },
  editor: {
    enabled: true,
    backendURL: getBackendURL(),
  },
};

export default config;
