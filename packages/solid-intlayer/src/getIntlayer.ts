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
  solidNodePlugins,
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
    solidNodePlugins,
    insertionPlugin,
    markdownPlugin,
    htmlPlugin,
    ...(additionalPlugins ?? []),
  ];

  // @ts-ignore Type instantiation is excessively deep and possibly infinite
  return getIntlayerCore<T, L>(key, locale, plugins);
};
