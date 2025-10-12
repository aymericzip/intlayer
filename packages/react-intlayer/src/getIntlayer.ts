import {
  type DictionaryKeys,
  getIntlayer as getIntlayerCore,
  type Plugins,
} from '@intlayer/core';
import type { IntlayerDictionaryTypesConnector, LocalesValues } from 'intlayer';
import {
  type DeepTransformContent,
  intlayerNodePlugins,
  markdownPlugin,
  reactNodePlugins,
} from './plugins';

export const getIntlayer = <T extends DictionaryKeys, L extends LocalesValues>(
  key: T,
  locale?: L,
  additionalPlugins?: Plugins[]
) => {
  const plugins: Plugins[] = [
    intlayerNodePlugins,
    reactNodePlugins,
    markdownPlugin,
    ...(additionalPlugins ?? []),
  ];

  return getIntlayerCore(key, locale, plugins) as any as DeepTransformContent<
    // @ts-ignore Type 'T' cannot be used to index type 'IntlayerDictionaryTypesConnector'
    IntlayerDictionaryTypesConnector[T]['content']
  >;
};
