import { syncJSON } from '@intlayer/sync-json-plugin';
import { type IntlayerConfig, Locales } from 'intlayer';

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.CHINESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    provider: 'anthropic',
    model: 'claude-haiku-4-5-20251001',
    apiKey: process.env.ANTHROPIC_API_KEY,
  },
  // ai: {
  //   provider: 'openai',
  //   model: 'gpt-5-mini',
  //   apiKey: process.env.OPENAI_API_KEY,
  // },
  plugins: [
    syncJSON({
      format: 'icu',
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
