import type { Locales, LocalesValues } from '@intlayer/config/client';
import {
  type Dictionary,
  type Plugins,
  getDictionary as getDictionaryCore,
} from '@intlayer/core';
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
) => {
  const plugins: Plugins[] = [
    intlayerNodePlugins,
    preactNodePlugins,
    markdownPlugin,
    ...(additionalPlugins ?? []),
  ];

  return getDictionaryCore(
    dictionary,
    locale,
    plugins
  ) as any as DeepTransformContent<T['content']>;
};
