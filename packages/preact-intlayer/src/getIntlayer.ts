import { getIntlayer as getIntlayerCore, type Plugins } from '@intlayer/core';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryContent,
  LocalesValues,
} from '@intlayer/types';
import {
  type DeepTransformContent,
  intlayerNodePlugins,
  markdownPlugin,
  preactNodePlugins,
} from './plugins';

export const getIntlayer = <
  T extends DictionaryKeys,
  L extends LocalesValues = DeclaredLocales,
>(
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

  // @ts-ignore Type instantiation is excessively deep and possibly infinite
  return getIntlayerCore<T, L>(key, locale, plugins) as DeepTransformContent<
    DictionaryRegistryContent<T>
  >;
};
