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
  svelteNodePlugins,
} from './plugins';

/**
 * Get dictionary content by key for Svelte applications
 * @param key The dictionary key to retrieve
 * @param locale The target locale (optional)
 * @param additionalPlugins Additional transformation plugins
 * @returns Transformed dictionary content optimized for Svelte
 */
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
    svelteNodePlugins,
    markdownPlugin,
    ...(additionalPlugins ?? []),
  ];

  return getIntlayerCore(key, locale, plugins) as any as DeepTransformContent<
    DictionaryRegistryContent<T>
  >;
};
