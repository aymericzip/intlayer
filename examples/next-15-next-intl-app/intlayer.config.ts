import { loadJSON, syncJSON } from '@intlayer/sync-json-plugin';
import { type IntlayerConfig, Locales } from 'intlayer';

export const locales = [Locales.ENGLISH, Locales.SPANISH];

export const defaultLocale = Locales.ENGLISH;

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
  },
  ai: {
    provider: 'openai',
    model: 'gpt-5-mini',
    apiKey: process.env.OPENAI_API_KEY,
  },

  plugins: [
    // loadJSON({
    //   source: ({ key }) => `./src/**/${key}.i18n.json`,
    //   locale: Locales.ENGLISH,
    //   format: 'intlayer',
    //   priority: 1,
    // }),
    syncJSON({
      format: 'icu',
      source: ({ locale }) => `./messages_ICU/${locale}.json`,
      location: 'messages_ICU',
    }),
    // syncJSON({
    //   format: 'i18next',
    //   source: ({ locale }) => `./messages_i18next/${locale}.json`,
    //   location: 'messages_i18next',
    // }),
    // syncJSON({
    //   source: ({ locale }) => `./messages_intlayer/${locale}.json`,
    //   location: 'messages_intlayer',
    // }),
  ],
};

export default config;
