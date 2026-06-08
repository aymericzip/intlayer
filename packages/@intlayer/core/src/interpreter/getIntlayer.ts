import { log } from '@intlayer/config/built';
import { colorizeKey, getAppLogger } from '@intlayer/config/logger';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryContent,
  DictionaryRegistryElement,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
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

export const getIntlayer = <
  const T extends DictionaryKeys,
  const L extends LocalesValues = DeclaredLocales,
>(
  key: T,
  locale?: L,
  plugins?: Plugins[]
): DeepTransformContent<
  DictionaryRegistryContent<T>,
  IInterpreterPluginState,
  L
> => {
  const dictionaries = getDictionaries();
  const dictionary = dictionaries[key as T] as DictionaryRegistryElement<T>;

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

  const cacheKey = `${key}_${locale ?? 'default'}_${plugins ? 'custom_plugins' : 'default_plugins'}`;

  if (dictionaryCache.has(cacheKey)) {
    return dictionaryCache.get(cacheKey);
  }

  const result = getDictionary<DictionaryRegistryElement<T>, L>(
    dictionary,
    locale,
    plugins
  );

  dictionaryCache.set(cacheKey, result);

  return result;
};
