import { createI18n } from 'vue-i18n';

/**
 * Creates the i18n instance.
 *
 * When `@intlayer/vue-i18n` is active (via the vite resolve alias set by
 * `vueI18nVitePlugin`), `createI18n` is the compat shim. It ignores the
 * `messages` option and instead serves translations through `getIntlayer`,
 * which reads from the dictionaries compiled by the intlayer vite plugin
 * (populated via the `syncJSON` plugin from `./locales/{locale}/translation.json`).
 *
 * Locale switching is handled reactively by `vue-intlayer` — components that
 * call `useI18n()` or `useLocale()` re-render automatically when the locale
 * changes.
 */
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
});

export default i18n;
