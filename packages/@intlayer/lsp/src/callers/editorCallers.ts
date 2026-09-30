import {
  type CallerDescriptor,
  COMPAT_CALLERS,
} from '@intlayer/config/callers';

/**
 * Every module a compat adapter is imported from (original library names and
 * their `@intlayer/*` equivalents), derived from the shared registry so a new
 * compat library is covered without touching this file.
 */
const COMPAT_IMPORT_SOURCES = [
  ...new Set(COMPAT_CALLERS.flatMap((descriptor) => descriptor.importSources)),
];

/**
 * Callers recognised by the editor tooling only (go-to-definition, hover,
 * references) — deliberately kept out of the shared registry in
 * `@intlayer/config/callers`, because the babel/swc optimize and purge passes
 * would otherwise start binding them.
 *
 * Their message ids carry no namespace, so the dictionary is the first id
 * segment; `resolveDictionaryTarget` then falls back to the whole-file catalog
 * (`index`) when that segment names no dictionary.
 */
export const EDITOR_CALLERS: CallerDescriptor[] = [
  {
    // `i18n.t('home.title')`, `i18next.t(…)`, `i18n.global.t(…)`, or a bare
    // `t` in a file importing any compat library. A `t` bound by
    // `useTranslation()` / `useTranslations()` resolves as a translator
    // binding first, and a library's own `t` caller wins over this one.
    callerName: 't',
    library: 'i18next',
    importSources: COMPAT_IMPORT_SOURCES,
    requiresImport: true,
    matchAsMethod: true,
    namespaceSources: [{ from: 'path-first-segment' }],
    translationFunction: 'self',
  },
  {
    // vue-i18n / @nuxtjs/i18n global `$t('home.title')` / `this.$t(…)` —
    // templates never import it, so no import is required.
    callerName: '$t',
    library: 'vue-i18n',
    importSources: ['vue-i18n', '@intlayer/vue-i18n'],
    matchAsMethod: true,
    namespaceSources: [{ from: 'path-first-segment' }],
    translationFunction: 'self',
  },
];
