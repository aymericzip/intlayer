import { syncJSON } from '@intlayer/sync-json-plugin';
import { type IntlayerConfig, Locales } from 'intlayer';

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    /** Same as the @nuxtjs/i18n `prefix_except_default` strategy. */
    mode: 'prefix-no-default',
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
     * Keeps the @nuxtjs/i18n message files as the source of truth.
     * `./i18n/locales/en/home.json` becomes the `home` dictionary, so
     * `t('home.title')` resolves to its `title` field.
     */
    syncJSON({
      format: 'vue-i18n',
      source: ({ key, locale }) => `./i18n/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
