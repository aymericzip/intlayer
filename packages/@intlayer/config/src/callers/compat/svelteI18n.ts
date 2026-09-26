import type { CallerDescriptor } from '../types';

/**
 * svelte-i18n — `@intlayer/svelte-i18n` compat adapter.
 *
 * Mirrors `compat-comming/svelte-i18n/src/plugin/index.ts`.
 */
export const SVELTE_I18N_CALLERS: CallerDescriptor[] = [
  {
    callerName: '_',
    library: 'svelte-i18n',
    importSources: ['svelte-i18n', '@intlayer/svelte-i18n'],
    namespaceSources: [{ from: 'argument', index: 0 }],
    translationFunction: 'self',
    allowRootScope: true,
    staticReplacement: 'useDictionary',
    dynamicReplacement: 'useDictionaryDynamic',
  },
  {
    callerName: 't',
    library: 'svelte-i18n',
    importSources: ['svelte-i18n', '@intlayer/svelte-i18n'],
    namespaceSources: [{ from: 'argument', index: 0 }],
    translationFunction: 'self',
    allowRootScope: true,
    staticReplacement: 'useDictionary',
    dynamicReplacement: 'useDictionaryDynamic',
  },
  {
    callerName: 'format',
    library: 'svelte-i18n',
    importSources: ['svelte-i18n', '@intlayer/svelte-i18n'],
    namespaceSources: [{ from: 'argument', index: 0 }],
    translationFunction: 'self',
    allowRootScope: true,
    staticReplacement: 'useDictionary',
    dynamicReplacement: 'useDictionaryDynamic',
  },
];
