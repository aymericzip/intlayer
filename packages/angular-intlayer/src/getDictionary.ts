import { getDictionary as getDictionaryCore } from '@intlayer/core/interpreter';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { getPlugins } from './plugins';

export const getDictionary = <
  T extends Dictionary,
  L extends LocalesValues = DeclaredLocales,
>(
  dictionary: T,
  locale?: L
) => getDictionaryCore<T, L>(dictionary, locale, getPlugins(locale));
