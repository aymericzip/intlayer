import type { CallerDescriptor } from '../types';

/**
 * react-i18next / next-i18next — `@intlayer/react-i18next` and
 * `@intlayer/next-i18next` compat adapters (next-i18next re-exports the
 * react-i18next hook, so both libraries share the same callers).
 *
 * Mirrors `compat/react-i18next/src/plugin/index.ts` and
 * `compat/next-i18next/src/plugin/index.ts`.
 */
export const REACT_I18NEXT_CALLERS: CallerDescriptor[] = [
  {
    callerName: 'useTranslation',
    library: 'react-i18next',
    importSources: [
      'react-i18next',
      'next-i18next',
      '@intlayer/react-i18next',
      '@intlayer/next-i18next',
    ],
    namespaceSources: [{ from: 'argument', index: 0 }],
    keyPrefixSources: [
      { from: 'option', argumentIndex: 1, property: 'keyPrefix' },
    ],
    translationFunction: 'destructured-t',
    staticReplacement: 'useDictionary',
    dynamicReplacement: 'useDictionaryDynamic',
  },
  {
    callerName: 'Trans',
    library: 'react-i18next',
    importSources: [
      'react-i18next',
      'next-i18next',
      '@intlayer/react-i18next',
      '@intlayer/next-i18next',
    ],
    // <Trans ns="home" i18nKey="richText" /> — the namespace attribute is
    // optional; without it the analyser falls back to the single translator
    // namespace declared in the same file.
    jsxIdAttribute: 'i18nKey',
    jsxNamespaceAttribute: 'ns',
    namespaceSources: [],
    translationFunction: 'self',
  },
];
