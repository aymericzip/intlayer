import type { Locales, LocalesValues } from '@intlayer/config/client';
import {
  DeepTransformContent,
  Dictionary,
  Plugins,
  getDictionary as getDictionaryCore,
} from '@intlayer/core';
import { intlayerNodePlugins } from './plugins';

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
    ...(additionalPlugins ?? []),
  ];

  return getDictionaryCore(
    dictionary,
    locale,
    plugins
  ) as any as DeepTransformContent<T['content']>;
};
