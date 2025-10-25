import type { LocalesValues } from '@intlayer/config/client';
/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { Dictionary, DictionaryKeys } from '../types';
import type { IntlayerDictionaryTypesConnector } from '../types/intlayer';
import type { DeepTransformContent, Plugins } from './getContent/plugins';
import { getDictionary } from './getDictionary';

export const getIntlayer = <T extends DictionaryKeys, L extends LocalesValues>(
  key: T,
  locale?: L,
  plugins?: Plugins[]
) => {
  const dictionaries = getDictionaries();
  const dictionary = dictionaries[key as T];

  if (!dictionary) {
    throw new Error(`Dictionary ${key as string} not found`, dictionaries);
  }

  return getDictionary(
    dictionary as Dictionary,
    locale,
    plugins
  ) as any as DeepTransformContent<
    IntlayerDictionaryTypesConnector[T]['content']
  >;
};
