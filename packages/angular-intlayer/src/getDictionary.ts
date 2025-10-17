import {
  getDictionary as getDictionaryCore,
  type Plugins,
} from '@intlayer/core';
import type { Dictionary, LocalesValues } from '@intlayer/types';
import { intlayerNodePlugins, markdownPlugin } from './plugins';

export const getDictionary = <T extends Dictionary, L extends LocalesValues>(
  dictionary: T,
  locale?: L,
  additionalPlugins?: Plugins[]
) => {
  const plugins: Plugins[] = [
    intlayerNodePlugins,
    markdownPlugin,
    ...(additionalPlugins ?? []),
  ];

  return getDictionaryCore<T, L>(dictionary, locale, plugins);
};
