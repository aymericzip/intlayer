import type { Locales, LocalesValues } from '@intlayer/config/client';
import {
  type Dictionary,
  getDictionary as getDictionaryCore,
  type Plugins,
} from '@intlayer/core';
import {
  type DeepTransformContent,
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
