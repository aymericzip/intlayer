import { type IntlayerConfig, Locales } from 'intlayer';

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.FRENCH, Locales.ENGLISH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    requiredLocales: [Locales.FRENCH, Locales.ENGLISH],
  },
  routing: {
    mode: 'prefix-no-default',
  },
  editor: {
    enabled: false,
    applicationURL: 'http://localhost:3000',
  },
  dictionary: {
    importMode: 'fetch',
  },
  ai: {
    provider: 'openai',
    model: 'gpt-5-mini',
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: [''].join('\n'),
  },
  compiler: {
    enabled: true,
    output: ({ fileName, extension }) => `./${fileName}${extension}`,
    saveComponents: false,
  },
};

export default config;
