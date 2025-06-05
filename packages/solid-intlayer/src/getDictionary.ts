import type { Locales, LocalesValues } from '@intlayer/config/client';
import {
  Dictionary,
  Plugins,
  getDictionary as getDictionaryCore,
} from '@intlayer/core';
import {
  DeepTransformContent,
  intlayerNodePlugins,
  markdownPlugin,
} from './plugins';

export const getDictionary = <
  T extends Dictionary,
  L extends LocalesValues = Locales,
>(
  dictionary: T,
  locale?: L,
  additionalPlugins?: Plugins[]
) => {
  const plugins: Plugins[] = [
    intlayerNodePlugins,
    markdownPlugin,
    ...(additionalPlugins ?? []),
  ];

  return getDictionaryCore(
    dictionary,
    locale,
    plugins
  ) as any as DeepTransformContent<T['content']>;
};
