import type { Dictionary } from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { createDictionaryTranslator } from '@intlayer/use-intl';
import { getDictionary as getDictionaryBase } from 'next-intlayer';
import { getLocale } from './server/getLocale';

/**
 * Trailing argument left by the optimize pass. `getTranslations('ns.scope')`
 * yields the key-prefix remainder as a string, while the object overload
 * `getTranslations({ locale, namespace })` keeps its options object (with the
 * namespace stripped, since the dictionary is now passed directly).
 */
type DictionaryTranslatorRest = string | { locale?: LocalesValues };

const readRestArgument = (
  rest: DictionaryTranslatorRest | undefined
): { namespacePrefix?: string; localeOverride?: LocalesValues } => {
  if (typeof rest === 'string') return { namespacePrefix: rest };
  return { localeOverride: rest?.locale };
};

/**
 * Dictionary-accepting variant of `getTranslations`.
 *
 * Used internally by the build-time optimization: instead of looking up the
 * dictionary at runtime by key, the babel/swc plugin pre-imports the dictionary
 * JSON at build time and passes it directly here. This enables tree-shaking of
 * unused locale content.
 *
 * Runs on the server, where next-intl apps do not mount an
 * `IntlayerServerProvider`. The request locale therefore cannot be read from a
 * server context and is resolved asynchronously from the cookie/header via
 * `getLocale()` (or the explicit `{ locale }` of the object overload).
 * `getTranslations` is always awaited, so an async resolver is a drop-in
 * replacement.
 */
export const getDictionary = async <T extends Dictionary>(
  dictionary: T,
  rest?: DictionaryTranslatorRest
) => {
  const { namespacePrefix, localeOverride } = readRestArgument(rest);
  const locale = localeOverride ?? ((await getLocale()) as LocalesValues);
  const content = getDictionaryBase(dictionary, locale);

  return createDictionaryTranslator(locale, content, namespacePrefix);
};
