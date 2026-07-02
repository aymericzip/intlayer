import type { CallerDescriptor } from '../types';

/**
 * vue-i18n — `@intlayer/vue-i18n` compat adapter.
 *
 * Mirrors `compat/vue-i18n/src/plugin/index.ts`.
 */
export const VUE_I18N_CALLERS: CallerDescriptor[] = [
  {
    callerName: 'useI18n',
    library: 'vue-i18n',
    importSources: ['vue-i18n', '@intlayer/vue-i18n'],
    // `const { t } = useI18n({ namespace: 'ns' })` — the namespace is an
    // intlayer extension of vue-i18n's options object.
    namespaceSources: [
      { from: 'option', argumentIndex: 0, property: 'namespace' },
    ],
    translationFunction: 'destructured-t',
    // Bare `useI18n()` resolves the first key segment as the dictionary:
    // `t('footer.github')` → dictionary `footer`, field `github`.
    allowRootScope: true,
    staticReplacement: 'useDictionary',
    dynamicReplacement: 'useDictionaryDynamic',
  },
];
