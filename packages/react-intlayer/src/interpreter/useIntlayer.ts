/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */
import dictionaries from '@intlayer/dictionaries-entry';
import type { IntLayerDictionaryTypesConnector } from 'intlayer';

type StringFallback<T> = T extends never ? string : T; // If no keys are found, return string to disable error, and accept any string as dictionary key
type DictionaryKeys = StringFallback<keyof IntLayerDictionaryTypesConnector>;

type UseIntlayer = <T extends DictionaryKeys>(
  id: T
) => IntLayerDictionaryTypesConnector[T];

export const useIntlayer: UseIntlayer = <T extends DictionaryKeys>(id: T) => {
  const dictionaryContent = dictionaries[id];

  return dictionaryContent as IntLayerDictionaryTypesConnector[T];
};
