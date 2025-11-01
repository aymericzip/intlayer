import { syncJSON } from '@intlayer/sync-json-plugin';
import { type IntlayerConfig, Locales } from 'intlayer';

export const locales = [Locales.ENGLISH, Locales.GERMAN, Locales.SPANISH];

export const defaultLocale = Locales.ENGLISH;

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },

  plugins: [
    syncJSON({
      source: ({ locale }) => `./messages/${locale}.json`,
    }),
  ],
};

export default config;
