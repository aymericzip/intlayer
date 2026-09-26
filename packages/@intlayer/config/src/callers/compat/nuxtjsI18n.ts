import type { CallerDescriptor } from '../types';

/**
 * @nuxtjs/i18n — `@intlayer/nuxtjs-i18n` compat adapter.
 *
 * Mirrors `compat-comming/nuxtjs-i18n/src/plugin/index.ts`.
 */
export const NUXTJS_I18N_CALLERS: CallerDescriptor[] = [
  {
    callerName: 'useI18n',
    library: '@nuxtjs/i18n',
    importSources: ['#i18n', '@nuxtjs/i18n', '@intlayer/nuxtjs-i18n'],
    namespaceSources: [
      { from: 'option', argumentIndex: 0, property: 'namespace' },
    ],
    translationFunction: 'destructured-t',
    allowRootScope: true,
    staticReplacement: 'useDictionary',
    dynamicReplacement: 'useDictionaryDynamic',
  },
];
