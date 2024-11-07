import type { Locales } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */
import dictionaries from '@intlayer/dictionaries-entry';
import type { IntlayerDictionaryTypesConnector } from 'intlayer';
import { processDictionary } from './processDictionary/index';
import {
  type DeepTransformContent,
  recursiveTransformContent,
} from './useDictionaryBase';

/**
 * Provides a fallback to string type if the generic type T is never,
 * otherwise returns T. This is useful for handling cases where no keys are found.
 * Example: StringFallback<never> -> string; StringFallback<'key'> -> 'key'
 */
export type StringFallback<T> = T extends never ? string : T; // If no keys are found, return string to disable error, and accept any string as dictionary key

/**
 * Represents the keys of the IntlayerDictionaryTypesConnector,
 * ensuring they are valid dictionary keys or fallback to string if none exist.
 *
 * Example:
 * ```ts
 * DictionaryKeys -> 'key1' | 'key2'
 * // or if IntlayerDictionaryTypesConnector is not defined,
 * DictionaryKeys -> string
 * ```
 */
export type DictionaryKeys = StringFallback<
  keyof IntlayerDictionaryTypesConnector
>;

/**
 * Represents the data type returned by the useIntlayer hook,
 * excluding the 'id' and 'filePath' keys from the dictionary content.
 */
type DataFromDictionaryKey<
  T extends DictionaryKeys,
  K extends Locales,
> = DeepTransformContent<IntlayerDictionaryTypesConnector[T]['content'], K>;

/**
 * Type definition for the useIntlayer hook, which takes a dictionary ID and an optional locale,
 * and returns the deeply transformed dictionary content.
 *
 */
export type UseIntlayer = <T extends DictionaryKeys, L extends Locales>(
  key: T,
  locale?: L
) => DataFromDictionaryKey<T, L>;

/**
 * Hook that picks one dictionary by its ID and returns the content,
 * deeply transformed according to the dictionary structure and metadata.
 */
export const useIntlayerBase: UseIntlayer = <
  T extends DictionaryKeys,
  L extends Locales,
>(
  key: T,
  locale?: L
) => {
  const dictionary: Dictionary = dictionaries[key as keyof typeof dictionaries];

  const result = processDictionary(
    dictionary.content,
    dictionary.key,
    dictionary.filePath,
    [],
    locale
  );

  const isContentSelectable = true;

  return recursiveTransformContent(
    result,
    isContentSelectable
  ) as DataFromDictionaryKey<T, L>;
};
