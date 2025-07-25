import { Locales, type IntlayerConfig } from 'intlayer';

/** @type {import('intlayer').IntlayerConfig} */

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    strictMode: 'loose',
  },
  editor: {
    enabled: true,
    applicationURL: 'http://localhost:5173',
    cmsURL: 'http://localhost:3000',
    editorURL: 'http://localhost:8000',
    backendURL: 'http://localhost:3100',
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  log: {
    mode: 'verbose',
  },
  ai: {
    provider: 'openai',
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: 'This is a test application',
  },
  build: {
    optimize: true,
    importMode: 'async',
  },
};

export default config;
