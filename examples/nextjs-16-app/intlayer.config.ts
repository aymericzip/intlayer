import { type IntlayerConfig, Locales } from 'intlayer';

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale: Locales.ENGLISH,
    strictMode: 'strict',
  },
  content: {
    // contentDir: ['./', '../../apps'],
  },
  editor: {
    enabled: true,
    liveSync: false,
    applicationURL: 'http://localhost:3000',
  },
  ai: {
    apiKey: process?.env.OPENAI_API_KEY,
  },
  dictionary: {
    importMode: 'dynamic',
  },
  routing: {
    rewrite: {
      '/about': {
        [Locales.ENGLISH]: '/about',
        [Locales.FRENCH]: '/a-propos',
        [Locales.SPANISH]: '/acerca-de',
      },
    },
  },
  compiler: {
    enabled: true,

    output: ({ fileName, extension }) => `./${fileName}${extension}`,
    saveComponents: true,
  },

  log: {
    mode: 'verbose',
  },
};

export default config;
