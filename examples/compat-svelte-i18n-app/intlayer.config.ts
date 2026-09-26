import { syncJSON } from '@intlayer/sync-json-plugin';
import { type IntlayerConfig, Locales } from 'intlayer';

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    model: 'gpt-5-mini',
    apiKey: process.env.OPENAI_API_KEY,
  },
  build: {
    minify: true,
    purge: true,
  },
  plugins: [
    /**
     * Keeps the svelte-i18n message files as the source of truth.
     * `./src/locales/en/home.json` becomes the `home` dictionary, so
     * `$_('home.title')` resolves to its `title` field.
     */
    syncJSON({
      format: 'icu',
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
