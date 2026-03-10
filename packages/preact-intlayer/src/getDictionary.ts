import {
  getDictionary as getDictionaryCore,
  type Plugins,
} from '@intlayer/core/interpreter';
import type { DeclaredLocales, LocalesValues } from '@intlayer/types/module_augmentation';
import type { Dictionary } from '@intlayer/types/dictionary';
import {
  type DeepTransformContent,
  htmlPlugin,
  insertionPlugin,
  intlayerNodePlugins,
  markdownPlugin,
  preactNodePlugins,
} from './plugins';

export const getDictionary = <
  T extends Dictionary,
  L extends LocalesValues = DeclaredLocales,
>(
  dictionary: T,
  locale?: L,
  additionalPlugins?: Plugins[]
): DeepTransformContent<T['content']> => {
  const plugins: Plugins[] = [
    intlayerNodePlugins,
    preactNodePlugins,
    insertionPlugin,
    markdownPlugin,
    htmlPlugin,
    ...(additionalPlugins ?? []),
  ];

  // @ts-ignore Type instantiation is excessively deep and possibly infinite
  return getDictionaryCore<T, L>(dictionary, locale as L, plugins);
};
