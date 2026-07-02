import type { CallerDescriptor } from '../types';

/**
 * use-intl — `@intlayer/use-intl` compat adapter.
 *
 * Mirrors `compat/use-intl/src/plugin/index.ts`.
 */
export const USE_INTL_CALLERS: CallerDescriptor[] = [
  {
    callerName: 'useTranslations',
    library: 'use-intl',
    importSources: ['use-intl', 'use-intl/react', '@intlayer/use-intl'],
    namespaceSources: [{ from: 'argument', index: 0 }],
    translationFunction: 'return-value',
    // Same namespace semantics as next-intl (next-intl re-exports use-intl).
    nestedNamespace: true,
    allowRootScope: true,
    staticReplacement: 'useDictionary',
    dynamicReplacement: 'useDictionaryDynamic',
  },
  {
    callerName: 'createTranslator',
    library: 'use-intl',
    importSources: ['use-intl', 'use-intl/core', '@intlayer/use-intl'],
    namespaceSources: [
      { from: 'option', argumentIndex: 0, property: 'namespace' },
    ],
    translationFunction: 'return-value',
    nestedNamespace: true,
    allowRootScope: true,
  },
];
