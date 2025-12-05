import { type IntlayerConfig, Locales } from 'intlayer';

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
  ai: {
    provider: 'openai',
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: 'This is a test application',
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
  build: {
    optimize: true,
    importMode: 'dynamic',
  },
  compiler: {
    enabled: false,
  },
};

export default config;
