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
import type {
  DeepTransformContent,
  IInterpreterPluginState,
  Plugins,
} from './getContent';
import { getDictionary } from './getDictionary';

/**
 * Object.prototype methods libraries call on arbitrary values while inspecting
 * them — TanStack Router's `isPlainObject` reaches for `hasOwnProperty` on
 * every value it deep-compares. Answering them with another path proxy turns
 * a missing dictionary into `hasOwnProperty is not a function`, thrown deep
 * inside the consumer, so they are forwarded to the real implementations.
 */
const PROTOTYPE_METHOD_NAMES = new Set<string | symbol>([
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
]);

/**
 * Creates a Recursive Proxy that returns the path of the accessed key
 * stringified. This prevents the app from crashing on undefined access.
 *
 * The proxy wraps a function so that calling any leaf — `keywords.join(', ')`,
 * `title.trim()` — resolves to the path too, instead of throwing
 * `join is not a function`. Being callable also keeps structural checks
 * (`Object.prototype.toString`) from mistaking it for a plain object worth
 * walking.
 */
const createSafeFallback = (path = ''): any => {
  return new Proxy((() => path) as Record<string | symbol, any>, {
    get: (target, prop) => {
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
      if (PROTOTYPE_METHOD_NAMES.has(prop)) {
        return (Object.prototype as Record<string | symbol, any>)[prop].bind(
          target
        );
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

const warnedMissingDictionaries = new Set<string>();

/**
 * Picks one dictionary by its key and returns its content for the given
 * locale or selector.
 *
 * The second argument is either a locale (`'fr'`) or a selector object:
 * - `{ item: 2 }` — collection item (omit `item` to get every item as array)
 * - `{ variant: 'black-friday' }` — named variant (omit for the `default` one)
 * - `{ variant: { id: 'prod_abc', userId: '123' } }` — structured variant
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
  const dictionary = dictionaries[key as T]!;

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

  return getDictionary(dictionary, localeOrSelector, plugins) as any;
};
