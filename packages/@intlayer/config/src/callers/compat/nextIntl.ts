import type { CallerDescriptor } from '../types';

/**
 * next-intl — `@intlayer/next-intl` compat adapter.
 *
 * Mirrors `compat/next-intl/src/plugin/index.ts` (`NEXT_INTL_SWC_CALLERS`),
 * adding the `getTranslations({ locale, namespace })` object overload.
 */
export const NEXT_INTL_CALLERS: CallerDescriptor[] = [
  {
    callerName: 'useTranslations',
    library: 'next-intl',
    importSources: ['next-intl', '@intlayer/next-intl'],
    namespaceSources: [{ from: 'argument', index: 0 }],
    translationFunction: 'return-value',
    // useTranslations('about.counter') → dictionary `about`, prefix `counter`
    nestedNamespace: true,
    // bare useTranslations() → first id segment is the dictionary
    allowRootScope: true,
    staticReplacement: 'useDictionary',
    dynamicReplacement: 'useDictionaryDynamic',
  },
  {
    callerName: 'getTranslations',
    library: 'next-intl',
    importSources: ['next-intl/server', '@intlayer/next-intl/server'],
    // Both overloads: getTranslations('ns') and
    // getTranslations({ locale, namespace: 'ns' }).
    namespaceSources: [
      { from: 'argument', index: 0 },
      { from: 'option', argumentIndex: 0, property: 'namespace' },
    ],
    translationFunction: 'return-value',
    nestedNamespace: true,
    allowRootScope: true,
    staticReplacement: 'getDictionary',
    dynamicReplacement: 'getDictionaryDynamic',
  },
];
