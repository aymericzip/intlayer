import { log } from '@intlayer/config/built';
import { colorizeKey, getAppLogger } from '@intlayer/config/logger';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { DictionarySelector } from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryResult,
  ExtractSelectorLocale,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import {
  getDictionarySelectorCacheKey,
  parseDictionarySelector,
} from '../dictionaryManipulator/qualifiedDictionary';
import type {
  DeepTransformContent,
  IInterpreterPluginState,
  Plugins,
} from './getContent';
import { getDictionary } from './getDictionary';

/**
 * Creates a Recursive Proxy that returns the path of the accessed key
 * stringified. This prevents the app from crashing on undefined access.
 */
const createSafeFallback = (path = ''): any => {
  return new Proxy({} as Record<string | symbol, unknown>, {
    get: (_target, prop) => {
      if (
        prop === 'toJSON' ||
        prop === Symbol.toPrimitive ||
        prop === 'toString' ||
        prop === 'valueOf'
      ) {
        return () => path;
      }
      if (prop === 'then') {
        return undefined; // Prevent it from being treated as a Promise
      }
      if (prop === Symbol.iterator) {
        return function* () {
          yield path;
        };
      }

      // Recursively build the path (e.g., "myDictionary.home.title")
      const nextPath = path ? `${path}.${String(prop)}` : String(prop);
      return createSafeFallback(nextPath);
    },
  });
};

const dictionaryCache = new Map<string, any>();
const warnedMissingDictionaries = new Set<string>();

/**
 * Picks one dictionary by its key and returns its content for the given
 * locale or selector.
 *
 * The second argument is either a locale (`'fr'`) or a selector object:
 * - `{ item: 2 }` — collection item (omit `item` to get every item as array)
 * - `{ variant: 'black-friday' }` — named variant (omit for the `default` one)
 * - `{ id: 'prod_abc', ...metaFields }` — meta record
 * - `locale` can be combined with any selector: `{ item: 2, locale: 'fr' }`
 */
export const getIntlayer = <
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
> => {
  const dictionaries = getDictionaries();
  const dictionary = dictionaries[key as T];

  if (!dictionary && process.env.NODE_ENV === 'development') {
    if (!warnedMissingDictionaries.has(key as string)) {
      // Log a warning instead of throwing (so developers know it's missing)
      const logger = getAppLogger({ log });
      logger(
        typeof window === 'undefined'
          ? `Dictionary ${colorizeKey(key)} was not found. Using fallback proxy.`
          : `Dictionary ${key} was not found. Using fallback proxy.`,
        {
          level: 'warn',
        }
      );
      warnedMissingDictionaries.add(key as string);
    }

    return createSafeFallback(key as string);
  }

  let locale: LocalesValues | undefined;
  let selectorCacheKey = '';

  if (process.env['INTLAYER_DICTIONARY_SELECTOR'] !== 'false') {
    const parsed = parseDictionarySelector(localeOrSelector);
    locale = parsed.locale;
    selectorCacheKey = getDictionarySelectorCacheKey(parsed.selector);
  } else {
    // Selectors are unused in this project (build-time flag): the second
    // argument can only be a locale, so the selector parsing is dead code.
    locale = localeOrSelector as LocalesValues | undefined;
  }

  const cacheKey = `${key}_${locale ?? 'default'}_${selectorCacheKey}_${plugins ? 'custom_plugins' : 'default_plugins'}`;

  if (dictionaryCache.has(cacheKey)) {
    return dictionaryCache.get(cacheKey);
  }

  const result = getDictionary(dictionary, localeOrSelector, plugins);

  dictionaryCache.set(cacheKey, result);

  return result as any;
};
