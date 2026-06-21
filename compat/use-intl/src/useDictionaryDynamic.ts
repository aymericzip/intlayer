'use client';

import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { StrictModeLocaleMap } from '@intlayer/types/module_augmentation';
import { useDictionaryDynamic as useDictionaryDynamicBase } from 'react-intlayer';
import { navigatePath } from './shared/namespaceTranslator';

/**
 * Dynamic dictionary-accepting variant of `useTranslations`.
 *
 * Counterpart to {@link useDictionary} for dictionaries imported lazily per
 * locale. Used internally by the build-time optimization.
 */
export const useDictionaryDynamic = <
  const T extends Dictionary,
  const K extends string,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  key: K,
  namespacePrefix?: string
) => {
  const content = useDictionaryDynamicBase<T, K>(dictionaryPromise, key);

  const resolveKey = (lookupKey: string): string =>
    namespacePrefix ? `${namespacePrefix}.${lookupKey}` : lookupKey;

  return Object.assign(
    <P extends ValidDotPathsFor<string>>(
      lookup: P,
      params?: Record<string, unknown>
    ): string => {
      const rawValue = navigatePath(content, resolveKey(String(lookup)));
      const text = String(rawValue ?? resolveKey(String(lookup)));
      if (!params) return text;
      return text.replace(/\{(\w+)\}/g, (_match, key) =>
        params[key] != null ? String(params[key]) : `{${key}}`
      );
    },
    {
      has: <P extends ValidDotPathsFor<string>>(lookup: P): boolean =>
        navigatePath(content, resolveKey(String(lookup))) != null,
      raw: <P extends ValidDotPathsFor<string>>(lookup: P): unknown =>
        navigatePath(content, resolveKey(String(lookup))),
    }
  );
};
