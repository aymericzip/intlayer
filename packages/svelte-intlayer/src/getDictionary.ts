import {
  getDictionary as getDictionaryCore,
  type Plugins,
} from '@intlayer/core';
import type {
  DeclaredLocales,
  Dictionary,
  LocalesValues,
} from '@intlayer/types';
import {
  type DeepTransformContent,
  intlayerNodePlugins,
  markdownPlugin,
  svelteNodePlugins,
} from './plugins';

/**
 * Get dictionary content for a specific locale in Svelte applications
 * @param dictionary The dictionary object to transform
 * @param locale The target locale (optional, defaults to current locale)
 * @param additionalPlugins Additional transformation plugins
 * @returns Transformed dictionary content optimized for Svelte
 */
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
    svelteNodePlugins,
    markdownPlugin,
    ...(additionalPlugins ?? []),
  ];

  return getDictionaryCore(
    dictionary,
    locale,
    plugins
  ) as any as DeepTransformContent<T['content']>;
};
