import { getIntlayer as getIntlayerCore } from '@intlayer/core/interpreter';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryContent,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { type DeepTransformContent, getPlugins } from './plugins';

/**
 * Get dictionary content by key for Svelte applications
 * @param key The dictionary key to retrieve
 * @param locale The target locale (optional)
 * @returns Transformed dictionary content optimized for Svelte
 */
export const getIntlayer = <
  T extends DictionaryKeys,
  L extends LocalesValues = DeclaredLocales,
>(
  key: T,
  locale?: L
): DeepTransformContent<DictionaryRegistryContent<T>> =>
  getIntlayerCore(key, locale, getPlugins(locale)) as any;
