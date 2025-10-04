import { syncJSON } from '@intlayer/sync-json-plugin';
import { Locales, type IntlayerConfig } from 'intlayer';

export const locales = [Locales.ENGLISH, Locales.GERMAN];

export const defaultLocale = Locales.ENGLISH;

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
  },
  plugins: [
    syncJSON({
      source: ({ locale }) => `./messages/${locale}.json`,
    }),
  ],
};

export default config;
