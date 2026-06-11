import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { StrictModeLocaleMap } from '@intlayer/types/module_augmentation';
import { useDictionaryDynamic as getDictionaryDynamicBase } from 'next-intlayer/server';

const navigatePath = (objectValue: unknown, path: string): unknown => {
  if (!path) return objectValue;
  const parts = path.split('.');
  let current: unknown = objectValue;
  for (const part of parts) {
    if (
      current === null ||
      current === undefined ||
      typeof current !== 'object'
    ) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return current;
};

/**
 * Dynamic dictionary-accepting variant of `getTranslations`.
 */
export const getDictionaryDynamic = async <
  const T extends Dictionary,
  const K extends string,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  key: K,
  namespacePrefix?: string
) => {
  const content = await getDictionaryDynamicBase<T, any>(
    dictionaryPromise,
    key as any
  );

  const resolveKey = (lookupKey: string): string =>
    namespacePrefix ? `${namespacePrefix}.${lookupKey}` : lookupKey;

  return Object.assign(
    <P extends ValidDotPathsFor<any>>(
      lookup: P,
      params?: Record<string, unknown>
    ): string => {
      const rawValue = navigatePath(content, resolveKey(String(lookup)));
      const str = String(rawValue ?? resolveKey(String(lookup)));
      if (!params) return str;
      return str.replace(/\{(\w+)\}/g, (_, k) =>
        params[k] != null ? String(params[k]) : `{${k}}`
      );
    },
    {
      has: <P extends ValidDotPathsFor<any>>(lookup: P): boolean =>
        navigatePath(content, resolveKey(String(lookup))) != null,
      raw: <P extends ValidDotPathsFor<any>>(lookup: P): unknown =>
        navigatePath(content, resolveKey(String(lookup))),
    }
  );
};
