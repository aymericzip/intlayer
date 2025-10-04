import {
  type DictionaryKeys,
  getIntlayer as getIntlayerCore,
  type Plugins,
} from '@intlayer/core';
// @ts-expect-error intlayer declared for module augmentation
import type { IntlayerDictionaryTypesConnector, LocalesValues } from 'intlayer';
import {
  type DeepTransformContent,
  intlayerNodePlugins,
  markdownPlugin,
  preactNodePlugins,
} from './plugins';

export const getIntlayer = <T extends DictionaryKeys, L extends LocalesValues>(
  key: T,
  locale?: L,
  additionalPlugins?: Plugins[]
) => {
  const plugins: Plugins[] = [
    intlayerNodePlugins,
    preactNodePlugins,
    markdownPlugin,
    ...(additionalPlugins ?? []),
  ];

  return getIntlayerCore(key, locale, plugins) as any as DeepTransformContent<
    IntlayerDictionaryTypesConnector[T]['content']
  >;
};
