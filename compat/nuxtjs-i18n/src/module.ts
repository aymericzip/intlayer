import { NUXTJS_I18N_CALLERS } from '@intlayer/config/callers';
import {
  addComponent,
  addImports,
  addPlugin,
  createResolver,
  defineNuxtModule,
  installModule,
} from '@nuxt/kit';
import type { NuxtModule } from '@nuxt/schema';
import nuxtIntlayerModule from 'nuxt-intlayer';
import type { NuxtI18nOptions } from './types';

/** Specifier of the client runtime, as auto-imports and the registry see it. */
const RUNTIME_MODULE = '@intlayer/nuxtjs-i18n/runtime';

/** Composables and helpers @nuxtjs/i18n auto-imports. */
const AUTO_IMPORTS = [
  'useI18n',
  'useDictionary',
  'useDictionaryDynamic',
  'useLocalePath',
  'useSwitchLocalePath',
  'useLocaleRoute',
  'useRouteBaseName',
  'useLocaleHead',
  'useBrowserLocale',
  'useCookieLocale',
  'useSetI18nParams',
  'useI18nPreloadKeys',
  'defineI18nRoute',
  'defineI18nConfig',
  'defineI18nLocale',
  'defineI18nLocaleDetector',
];

/**
 * Nuxt module replacing `@nuxtjs/i18n` with intlayer.
 *
 * - installs `nuxt-intlayer` (dictionaries, locale routing, Vite plugin) with
 *   the `useI18n` caller, so `useI18n({ namespace })` call sites are
 *   rewritten to import only their dictionary;
 * - aliases `#i18n` and auto-imports the @nuxtjs/i18n composables;
 * - registers `<NuxtLinkLocale>` and the plugin providing `$t`,
 *   `$localePath`, `$switchLocalePath`…
 *
 * Locales, default locale and routing come from `intlayer.config.ts`; the
 * `i18n` key of `nuxt.config` is accepted for migration and ignored.
 *
 * @example
 * ```ts
 * // nuxt.config.ts
 * export default defineNuxtConfig({
 *   modules: ['@intlayer/nuxtjs-i18n'],
 * });
 * ```
 */
export const nuxtjsI18nModule: NuxtModule<NuxtI18nOptions> =
  defineNuxtModule<NuxtI18nOptions>({
    meta: {
      name: '@intlayer/nuxtjs-i18n',
      configKey: 'i18n',
    },
    setup: async (_options, nuxt) => {
      const resolver = createResolver(import.meta.url);

      await installModule(nuxtIntlayerModule, {
        compatCallers: NUXTJS_I18N_CALLERS,
      });

      nuxt.options.alias['#i18n'] = RUNTIME_MODULE;

      addImports(AUTO_IMPORTS.map((name) => ({ name, from: RUNTIME_MODULE })));

      addComponent({
        name: 'NuxtLinkLocale',
        export: 'NuxtLinkLocale',
        filePath: RUNTIME_MODULE,
      });

      addPlugin({
        src: resolver.resolve('./runtime/nuxtPlugin'),
        mode: 'all',
      });
    },
  });

export default nuxtjsI18nModule;
