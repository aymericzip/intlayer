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
     * Keeps the ngx-translate message files as the source of truth.
     * `./src/i18n/en/home.json` becomes the `home` dictionary, so
     * `'home.title' | translate` resolves to its `title` field.
     * ngx-translate `{{ param }}` interpolation matches the i18next format.
     */
    syncJSON({
      format: 'i18next',
      source: ({ key, locale }) => `./src/i18n/${locale}/${key}.json`,
    }),
  ],
};

export default config;
