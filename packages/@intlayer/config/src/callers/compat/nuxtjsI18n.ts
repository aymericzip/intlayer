import type { CallerDescriptor } from '../types';

/**
 * @nuxtjs/i18n — `@intlayer/nuxtjs-i18n` compat adapter.
 *
 * `useI18n()` is vue-i18n's composer (plus Nuxt routing helpers), imported
 * explicitly from `#i18n` or auto-imported by the Nuxt module from the
 * adapter's runtime entry.
 *
 * Mirrors `compat-comming/nuxtjs-i18n/src/module.ts`.
 */
export const NUXTJS_I18N_CALLERS: CallerDescriptor[] = [
  {
    callerName: 'useI18n',
    library: '@nuxtjs/i18n',
    // Every module listed here must also export the two replacements below:
    // `#i18n` aliases the runtime entry, and the Nuxt module registers
    // `useDictionary` / `useDictionaryDynamic` as `#imports` auto-imports.
    importSources: ['#i18n', '#imports', '@intlayer/nuxtjs-i18n/runtime'],
    // `const { t } = useI18n({ namespace: 'ns' })` — intlayer extension of
    // vue-i18n's options object, shared with `@intlayer/vue-i18n`.
    namespaceSources: [
      { from: 'option', argumentIndex: 0, property: 'namespace' },
    ],
    translationFunction: 'destructured-t',
    // Bare `useI18n()` resolves the first key segment as the dictionary.
    allowRootScope: true,
    staticReplacement: 'useDictionary',
    dynamicReplacement: 'useDictionaryDynamic',
  },
];
