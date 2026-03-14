import { getIntlayer as getIntlayerCore } from '@intlayer/core/interpreter';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryContent,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { type DeepTransformContent, getPlugins } from './plugins';

export const getIntlayer = <
  T extends DictionaryKeys,
  L extends LocalesValues = DeclaredLocales,
>(
  key: T,
  locale?: L
) =>
  getIntlayerCore<T, L>(
    key,
    locale,
    getPlugins(locale)
  ) as DeepTransformContent<DictionaryRegistryContent<T>>;
