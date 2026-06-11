import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { getDictionary as getDictionaryBase } from 'next-intlayer';
import { getLocale } from './server/getLocale';

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
 * Dictionary-accepting variant of `getTranslations`.
 *
 * Used internally by the SWC optimization: instead of looking up the dictionary
 * at runtime by key, the SWC plugin pre-imports the dictionary JSON at build time
 * and passes it directly here. This enables tree-shaking of unused locale content.
 *
 * Runs on the server, where next-intl apps do not mount an `IntlayerServerProvider`.
 * The request locale therefore cannot be read from a server context and is resolved
 * asynchronously from the cookie/header via `getLocale()`. `getTranslations` is always
 * awaited, so an async resolver is a drop-in replacement.
 */
export const getDictionary = async <T extends Dictionary>(
  dictionary: T,
  namespacePrefix?: string
) => {
  const locale = (await getLocale()) as LocalesValues;
  const content = getDictionaryBase(dictionary, locale);

  const resolveKey = (key: string): string =>
    namespacePrefix ? `${namespacePrefix}.${key}` : key;

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
