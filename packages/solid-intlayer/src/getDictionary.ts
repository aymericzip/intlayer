import {
  getDictionary as getDictionaryCore,
  type Plugins,
} from '@intlayer/core/interpreter';
import type {
  DeclaredLocales,
  Dictionary,
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

export const getDictionary = <
  T extends Dictionary,
  L extends LocalesValues = DeclaredLocales,
>(
  dictionary: T,
  locale?: L,
  additionalPlugins?: Plugins[]
): DeepTransformContent<T['content'], L> => {
  const plugins: Plugins[] = [
    intlayerNodePlugins,
    solidNodePlugins,
    insertionPlugin,
    markdownPlugin,
    htmlPlugin,
    ...(additionalPlugins ?? []),
  ];

  // @ts-ignore Type instantiation is excessively deep and possibly infinite
  return getDictionaryCore<T, L>(dictionary, locale as L, plugins) as any;
};
