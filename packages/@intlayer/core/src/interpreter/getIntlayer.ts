// packages/@intlayer/core/src/interpreter/getIntlayer.ts

import configuration from '@intlayer/config/built';
import { getAppLogger } from '@intlayer/config/client';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryContent,
  DictionaryRegistryElement,
  LocalesValues,
} from '@intlayer/types';
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
  return new Proxy(
    // Target is a function so it can be called if the dictionary expects a function
    () => path,
    {
      get: (_target, prop) => {
        // Handle common object methods to prevent infinite recursion or weird behavior
        if (
          prop === 'toJSON' ||
          prop === Symbol.toPrimitive ||
          prop === 'toString'
        ) {
          return () => path;
        }
        if (prop === 'then') {
          return undefined; // Prevent it from being treated as a Promise
        }

        // Recursively build the path (e.g., "myDictionary.home.title")
        const nextPath = path ? `${path}.${String(prop)}` : String(prop);
        return createSafeFallback(nextPath);
      },
      // If the code tries to execute the missing key as a function: t.title()
      apply: () => {
        return path;
      },
    }
  );
};

export const getIntlayer = <
  T extends DictionaryKeys,
  L extends LocalesValues = DeclaredLocales,
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

  if (!dictionary) {
    // 1. Log a warning instead of throwing (so developers know it's missing)
    const logger = getAppLogger(configuration);
    logger(
      `Dictionary "${key as string}" was not found. Using fallback proxy.`,
      {
        level: 'warn',
        isVerbose: true,
      }
    );

    // 2. Return the Safe Proxy
    // We initialize it with the dictionary key name so the UI shows "my-dictionary.someKey"
    return createSafeFallback(key as string);
  }

  return getDictionary<DictionaryRegistryElement<T>, L>(
    dictionary,
    locale,
    plugins
  );
};
