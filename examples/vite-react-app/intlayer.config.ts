import { Locales, type IntlayerConfig } from 'intlayer';

/** @type {import('intlayer').IntlayerConfig} */

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
  content: {
    contentDir: ['./', '../../apps'],
  },
  editor: {
    enabled: true,
    applicationURL: 'http://localhost:5173',
    cmsURL: 'http://localhost:3000',
    editorURL: 'http://localhost:8000',
    backendURL: 'http://localhost:3100',
    clientId: process.env.INTLAYER_CLIENT_ID,
    hotReload: true,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  build: {
    // optimize: process.env.NODE_ENV === 'production',
    importMode: 'dynamic',
  },
};

export default config;
