import {
  getDictionary as getDictionaryCore,
  type Plugins,
} from '@intlayer/core/interpreter';
import type {
  DeclaredLocales,
  Dictionary,
  LocalesValues,
} from '@intlayer/types';
import { htmlPlugin, intlayerNodePlugins, markdownPlugin } from './plugins';

export const getDictionary = <
  T extends Dictionary,
  L extends LocalesValues = DeclaredLocales,
>(
  dictionary: T,
  locale?: L,
  additionalPlugins?: Plugins[]
) => {
  const plugins: Plugins[] = [
    intlayerNodePlugins,
    markdownPlugin,
    htmlPlugin,
    ...(additionalPlugins ?? []),
  ];

  return getDictionaryCore<T, L>(dictionary, locale, plugins);
};
