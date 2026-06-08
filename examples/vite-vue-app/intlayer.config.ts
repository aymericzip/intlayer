import { type IntlayerConfig, Locales } from 'intlayer';
import { vueRouterRewrite } from 'intlayer/routing';

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    strictMode: 'strict',
  },
  routing: {
    mode: 'prefix-no-default',
    rewrite: vueRouterRewrite({
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
  build: {
    optimize: true,
    minify: true,
    purge: true,
  },
  log: {
    mode: 'verbose',
  },
  ai: {
    provider: 'openai',
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-5-mini',
    applicationContext: 'This is a test application',
  },
  compiler: {
    enabled: false,
    output: ({ fileName }) => `./${fileName}.content.ts`,
  },
  // build: {
  //   optimize: true,
  // },
  dictionary: {
    importMode: 'dynamic',
  },
};

export default config;
