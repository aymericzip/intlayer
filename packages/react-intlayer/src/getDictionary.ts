/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getDictionary as getDictionaryCore,
  type Plugins,
} from '@intlayer/core';
import { intlayerNodePlugins, reactNodePlugins } from './plugins';

export const getDictionary: typeof getDictionaryCore = (
  dictionary,
  locale,
  additionalPlugins
) => {
  const plugins: Plugins[] = [
    intlayerNodePlugins,
    reactNodePlugins,
    ...(additionalPlugins ?? []),
  ];

  return getDictionaryCore(dictionary, locale, plugins) as any;
};
