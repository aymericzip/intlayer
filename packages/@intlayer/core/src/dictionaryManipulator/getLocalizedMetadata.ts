import type { DictionaryMetadata } from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import * as NodeTypes from '@intlayer/types/nodeType';

type PerLocaleMetadata = {
  nodeType?: unknown;
  [NodeTypes.TRANSLATION]?: Record<string, DictionaryMetadata | undefined>;
};

/**
 * Returns the metadata of a dictionary for a locale. The build merges
 * per-locale declarations under a translation node (`t({ en: {…}, fr: {…} })`),
 * read for `locale`, else `fallbackLocale`; any other metadata applies to
 * every locale.
 *
 * @param metadata - The `metadata` of a dictionary or of a collection entry.
 * @param locale - The locale to read.
 * @param fallbackLocale - The locale read when `locale` declares none.
 */
export const getLocalizedMetadata = (
  metadata: unknown,
  locale: LocalesValues,
  fallbackLocale?: LocalesValues
): DictionaryMetadata => {
  const perLocaleMetadata = metadata as PerLocaleMetadata | undefined;

  if (perLocaleMetadata?.nodeType !== NodeTypes.TRANSLATION) {
    return (metadata ?? {}) as DictionaryMetadata;
  }

  const translations = perLocaleMetadata[NodeTypes.TRANSLATION] ?? {};

  return (
    translations[locale] ??
    (fallbackLocale === undefined ? undefined : translations[fallbackLocale]) ??
    {}
  );
};
