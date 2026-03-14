import { type IntlayerConfig, Locales } from 'intlayer';
import { solidRouterRewrite } from 'intlayer/routing';

/** @type {import('intlayer').IntlayerConfig} */

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
  routing: {
    mode: 'prefix-all',
    rewrite: solidRouterRewrite({
      '/:locale/tests': {
        fr: '/:locale/essais',
        es: '/:locale/pruebas',
      },
    }),
  },
  editor: {
    enabled: false,
    applicationURL: 'http://localhost:5173',
    cmsURL: 'http://localhost:3000',
    editorURL: 'http://localhost:8000',
    backendURL: 'http://localhost:3100',
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
