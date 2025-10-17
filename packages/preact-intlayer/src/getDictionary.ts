import {
  getDictionary as getDictionaryCore,
  type Plugins,
} from '@intlayer/core';
import type { Dictionary, Locales, LocalesValues } from '@intlayer/types';
import {
  type DeepTransformContent,
  intlayerNodePlugins,
  markdownPlugin,
  preactNodePlugins,
} from './plugins';

export const getDictionary = <
  T extends Dictionary,
  L extends LocalesValues = Locales,
>(
  dictionary: T,
  locale?: L,
  additionalPlugins?: Plugins[]
): DeepTransformContent<T['content']> => {
  const plugins: Plugins[] = [
    intlayerNodePlugins,
    preactNodePlugins,
    markdownPlugin,
    ...(additionalPlugins ?? []),
  ];

  // @ts-ignore Type instantiation is excessively deep and possibly infinite
  return getDictionaryCore<T, L>(dictionary, locale as L, plugins);
};
