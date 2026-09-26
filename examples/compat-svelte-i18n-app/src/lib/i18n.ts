import { getLocaleFromNavigator, init } from 'svelte-i18n';

/**
 * Standard svelte-i18n setup.
 *
 * `svelte-i18n` is aliased to `@intlayer/svelte-i18n` by
 * `svelteI18nVitePlugin`, so no `register()` / `addMessages()` call is needed:
 * messages are read from the dictionaries intlayer compiles out of
 * `./src/locales/{locale}/{namespace}.json` (see `intlayer.config.ts`).
 *
 * The `locale` store is shared with `svelte-intlayer`, so `$_` and
 * `useIntlayer` always render the same language.
 */
init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
});
