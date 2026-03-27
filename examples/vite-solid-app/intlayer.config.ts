import { type IntlayerConfig, Locales } from 'intlayer';
import { solidRouterRewrite } from 'intlayer/routing';

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
  routing: {
    mode: 'prefix-no-default',
    rewrite: solidRouterRewrite({
      '/:locale/tests': {
        fr: '/:locale/essais',
        es: '/:locale/pruebas',
      },
    }),
  },
  dictionary: {
    importMode: 'static',
  },
  editor: {
    enabled: false,
    applicationURL: 'http://localhost:5173',
    editorURL: 'http://localhost:8000',
    // cmsURL: 'http://localhost:3000',
    // backendURL: 'http://localhost:3100',
    // clientId: process.env.INTLAYER_CLIENT_ID,
    // clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
