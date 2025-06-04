import type { Locales, LocalesValues } from '@intlayer/config';
import {
  type Dictionary,
  type Plugins,
  getDictionary as getDictionaryCore,
} from '@intlayer/core';
import {
  type DeepTransformContent,
  angularTemplatePlugin,
  intlayerNodePlugins,
  markdownPlugin,
} from '../plugins';

/**
 * Get dictionary content for a specific locale
 */
export const getDictionary = <
  T extends Dictionary,
  L extends LocalesValues = Locales,
>(
  dictionary: T,
  locale?: L,
  additionalPlugins?: Plugins[]
) => {
  const plugins: Plugins[] = [
    intlayerNodePlugins,
    angularTemplatePlugin,
    markdownPlugin,
    ...(additionalPlugins ?? []),
  ];

  return getDictionaryCore(
    dictionary,
    locale,
    plugins
  ) as any as DeepTransformContent<T['content']>;
};
