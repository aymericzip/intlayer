import {
  getDictionary as getDictionaryCore,
  type Plugins,
} from '@intlayer/core';
import type {
  DeclaredLocales,
  Dictionary,
  LocalesValues,
} from '@intlayer/types';
import {
  type DeepTransformContent,
  intlayerNodePlugins,
  markdownPlugin,
} from './plugins';

export const getDictionary = <
  T extends Dictionary,
  L extends LocalesValues = DeclaredLocales,
>(
  dictionary: T,
  locale?: L,
  additionalPlugins?: Plugins[]
): DeepTransformContent<T['content'], L> => {
  const plugins: Plugins[] = [
    intlayerNodePlugins,
    markdownPlugin,
    ...(additionalPlugins ?? []),
  ];

  return getDictionaryCore(dictionary, locale, plugins) as any;
};
