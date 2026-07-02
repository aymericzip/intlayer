import type { CallerDescriptor } from '../types';

/**
 * i18next — `@intlayer/i18next` compat adapter.
 *
 * Mirrors `compat/i18next/src/plugin/index.ts` (`I18NEXT_COMPAT_CALLERS`).
 */
export const I18NEXT_CALLERS: CallerDescriptor[] = [
  {
    callerName: 'getFixedT',
    library: 'i18next',
    importSources: ['i18next', '@intlayer/i18next'],
    // `i18n.getFixedT(...)` — instance method, never imported as a specifier.
    matchAsMethod: true,
    // Signature: getFixedT(locale, namespace, keyPrefix?)
    namespaceSources: [{ from: 'argument', index: 1 }],
    keyPrefixSources: [{ from: 'argument', index: 2 }],
    translationFunction: 'return-value',
  },
];
