import { getIntlayer } from '@intlayer/core/interpreter';
import { navigatePath } from '@intlayer/core/messageFormat';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';

/**
 * Registry-backed key resolution. The only module touching
 * `@intlayer/dictionaries-entry`, which statically imports every dictionary.
 */

/** Keys of every dictionary available at runtime; empty outside a bundle. */
const getDictionaryKeys = (): Set<string> => {
  try {
    return new Set(Object.keys(getDictionaries()));
  } catch {
    return new Set();
  }
};

const readDictionary = (key: string, locale: string): unknown => {
  try {
    return getIntlayer(key as DictionaryKeys, locale as LocalesValues);
  } catch {
    return undefined;
  }
};

/**
 * Looks up an ngx-translate key across the intlayer dictionaries:
 *
 * 1. `'home.title'` → dictionary `home`, field `title`;
 * 2. `'home'` → the whole `home` dictionary;
 * 3. the full key in every dictionary — a single migrated `en.json`.
 *
 * @returns The interpreted node (string, object or callable), or `undefined`.
 */
export const lookupRegistryTranslation = (
  key: string,
  locale: string
): unknown => {
  const dictionaryKeys = getDictionaryKeys();
  const dotPosition = key.indexOf('.');

  if (dotPosition > 0) {
    const dictionaryKey = key.slice(0, dotPosition);

    if (dictionaryKeys.has(dictionaryKey)) {
      const translation = navigatePath(
        readDictionary(dictionaryKey, locale),
        key.slice(dotPosition + 1)
      );
      if (translation !== undefined) return translation;
    }
  } else if (dictionaryKeys.has(key)) {
    return readDictionary(key, locale);
  }

  for (const dictionaryKey of dictionaryKeys) {
    const translation = navigatePath(
      readDictionary(dictionaryKey, locale),
      key
    );
    if (translation !== undefined) return translation;
  }

  return undefined;
};
