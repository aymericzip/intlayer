/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type Dictionary,
  type Plugins,
  getDictionary as getDictionaryCore,
} from '@intlayer/core';
import {
  type DeepTransformContent,
  intlayerNodePlugins,
  reactNodePlugins,
} from './plugins';
import type { Locales } from '@intlayer/config/client';

export const getDictionary = <
  T extends Dictionary,
  L extends Locales | `${Locales}` = Locales,
>(
  dictionary: T,
  locale?: L,
  additionalPlugins?: Plugins[]
) => {
  const plugins: Plugins[] = [
    intlayerNodePlugins,
    reactNodePlugins,
    ...(additionalPlugins ?? []),
  ];

  return getDictionaryCore(
    dictionary,
    locale,
    plugins
  ) as any as DeepTransformContent<T['content']>;
};
