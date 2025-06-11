import {
  DictionaryKeys,
  getIntlayer as getIntlayerCore,
  Plugins,
} from '@intlayer/core';
// @ts-ignore intlayer declared for module augmentation
import type { IntlayerDictionaryTypesConnector, LocalesValues } from 'intlayer';
import {
  DeepTransformContent,
  intlayerNodePlugins,
  markdownPlugin,
} from './plugins';

export const getIntlayer = <T extends DictionaryKeys, L extends LocalesValues>(
  key: T,
  locale?: L,
  additionalPlugins?: Plugins[]
) => {
  const plugins: Plugins[] = [
    intlayerNodePlugins,
    markdownPlugin,
    ...(additionalPlugins ?? []),
  ];

  return getIntlayerCore(key, locale, plugins) as any as DeepTransformContent<
    IntlayerDictionaryTypesConnector[T]['content']
  >;
};
