import type { Locales } from '@intlayer/config';
/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */
import dictionaries from '@intlayer/dictionaries-entry';
import type { Dictionary, DictionaryKeys } from '../types';
import { getDictionary } from './getDictionary';
// @ts-ignore intlayer declared for module augmentation
import { IntlayerDictionaryTypesConnector } from 'intlayer';
import type { DeepTransformContent, Plugins } from './getContent';

export const getIntlayer = <
  T extends DictionaryKeys,
  L extends Locales | `${Locales}`,
>(
  key: T,
  locale?: L,
  plugins?: Plugins[]
) => {
  const dictionary = dictionaries[key as T];

  if (!dictionary) {
    throw new Error(`Dictionary ${key as string} not found`, dictionaries);
  }

  return getDictionary(
    dictionary as Dictionary,
    locale,
    plugins
  ) as DeepTransformContent<IntlayerDictionaryTypesConnector[T]['content']>;
};
