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
    throw new Error(`Dictionary ${key as string} not found`, dictionaries);
  }

  return getDictionary<DictionaryRegistryElement<T>, L>(
    dictionary,
    locale,
    plugins
  );
};
