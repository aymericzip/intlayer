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
    model: 'claude-4-5-opus',
    apiKey: process.env.ANTHROPIC_API_KEY,
  },
  plugins: [
    syncJSON({
      format: 'icu',
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
