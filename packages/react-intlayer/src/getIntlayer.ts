/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  type DictionaryKeys,
  type Plugins,
  getIntlayer as getIntlayerCore,
} from '@intlayer/core';
import {
  type DeepTransformContent,
  intlayerNodePlugins,
  reactNodePlugins,
} from './plugins';
import type { IntlayerDictionaryTypesConnector, Locales } from 'intlayer';

export const getIntlayer = <
  T extends DictionaryKeys,
  L extends Locales | `${Locales}`,
>(
  key: T,
  locale?: L,
  additionalPlugins?: Plugins[]
) => {
  const plugins: Plugins[] = [
    intlayerNodePlugins,
    reactNodePlugins,
    ...(additionalPlugins ?? []),
  ];

  return getIntlayerCore(key, locale, plugins) as any as DeepTransformContent<
    IntlayerDictionaryTypesConnector[T]['content']
  >;
};
