import { Locales, type IntlayerConfig } from 'intlayer';

/** @type {import('intlayer').IntlayerConfig} */

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    strictMode: 'strict',
  },
  editor: {
    enabled: true,
    backendURL: process.env.INTLAYER_BACKEND_URL,
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
