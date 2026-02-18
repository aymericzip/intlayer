import {
  getIntlayer as getIntlayerCore,
  type Plugins,
} from '@intlayer/core/interpreter';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryContent,
  LocalesValues,
} from '@intlayer/types';
import {
  type DeepTransformContent,
  htmlPlugin,
  insertionPlugin,
  intlayerNodePlugins,
  markdownPlugin,
  reactNodePlugins,
} from './plugins';

export const getIntlayer = <
  T extends DictionaryKeys,
  L extends LocalesValues = DeclaredLocales,
>(
  key: T,
  locale?: L,
  additionalPlugins?: Plugins[]
): DeepTransformContent<DictionaryRegistryContent<T>, L> => {
  const plugins: Plugins[] = [
    intlayerNodePlugins,
    reactNodePlugins,
    insertionPlugin,
    markdownPlugin,
    htmlPlugin,
    ...(additionalPlugins ?? []),
  ];

  return getIntlayerCore(key, locale, plugins) as any;
};
