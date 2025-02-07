/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type Dictionary,
  type Plugins,
  getDictionary as getDictionaryCore,
} from '@intlayer/core';
import {
  type DeepTransformContent,
  intlayerNodePlugins,
  markdownPlugin,
  reactNodePlugins,
} from './plugins';
import type { Locales, LocalesValues } from '@intlayer/config/client';

export const getDictionary = <
  T extends Dictionary<unknown, false>,
  L extends LocalesValues = Locales,
>(
  dictionary: T,
  locale?: L,
  additionalPlugins?: Plugins[]
) => {
  const plugins: Plugins[] = [
    intlayerNodePlugins,
    reactNodePlugins,
    markdownPlugin,
    ...(additionalPlugins ?? []),
  ];

  return getDictionaryCore(
    dictionary,
    locale,
    plugins
  ) as any as DeepTransformContent<T['content']>;
};
