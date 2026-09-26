import { getIntlayer } from '@intlayer/core/interpreter';
import { navigatePath } from '@intlayer/core/messageFormat';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';

/**
 * Registry-backed message resolution for svelte-i18n ids.
 *
 * This is the only module touching `@intlayer/dictionaries-entry`, which
 * statically imports every dictionary: the dictionary-bound helpers
 * (`useDictionary`) must not reach it, or each would drag the whole catalog
 * into its chunk.
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
 * Looks up a svelte-i18n id across the intlayer dictionaries:
 *
 * 1. `'home.title'` → dictionary `home`, field `title` (one dictionary per
 *    top-level group — the layout the build optimizations target);
 * 2. `'home'` → the whole `home` dictionary (`$json('home')`);
 * 3. the full id in every dictionary — a single migrated catalog.
 *
 * @returns The interpreted node (string, object or callable), or `undefined`.
 */
export const lookupRegistryMessage = (id: string, locale: string): unknown => {
  const dictionaryKeys = getDictionaryKeys();
  const dotPosition = id.indexOf('.');

  if (dotPosition > 0) {
    const dictionaryKey = id.slice(0, dotPosition);

    if (dictionaryKeys.has(dictionaryKey)) {
      const message = navigatePath(
        readDictionary(dictionaryKey, locale),
        id.slice(dotPosition + 1)
      );
      if (message !== undefined) return message;
    }
  } else if (dictionaryKeys.has(id)) {
    return readDictionary(id, locale);
  }

  for (const dictionaryKey of dictionaryKeys) {
    const message = navigatePath(readDictionary(dictionaryKey, locale), id);
    if (message !== undefined) return message;
  }

  return undefined;
};
