/* eslint-disable @typescript-eslint/no-explicit-any */

import { getIntlayer as getIntlayerCore, type Plugins } from '@intlayer/core';
import { intlayerNodePlugins, reactNodePlugins } from './plugins';

export const getIntlayer: typeof getIntlayerCore = (
  dictionary,
  locale,
  additionalPlugins
) => {
  const plugins: Plugins[] = [
    intlayerNodePlugins,
    reactNodePlugins,
    ...(additionalPlugins ?? []),
  ];

  return getIntlayerCore(dictionary, locale, plugins) as any;
};
