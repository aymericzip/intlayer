import { getIntlayer as getIntlayerCore, type Plugins } from '@intlayer/core';
import type {
  DictionaryKeys,
  DictionaryRegistryContent,
  LocalesValues,
} from '@intlayer/types';
import {
  type DeepTransformContent,
  intlayerNodePlugins,
  markdownPlugin,
  solidNodePlugins,
} from './plugins';

export const getIntlayer = <T extends DictionaryKeys, L extends LocalesValues>(
  key: T,
  locale?: L,
  additionalPlugins?: Plugins[]
): DeepTransformContent<DictionaryRegistryContent<T>> => {
  const plugins: Plugins[] = [
    intlayerNodePlugins,
    solidNodePlugins,
    markdownPlugin,
    ...(additionalPlugins ?? []),
  ];

  // @ts-ignore Type instantiation is excessively deep and possibly infinite
  return getIntlayerCore<T, L>(key, locale, plugins);
};
