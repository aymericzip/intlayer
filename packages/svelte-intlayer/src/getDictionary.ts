import { getDictionary as getDictionaryCore } from '@intlayer/core/interpreter';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { type DeepTransformContent, getPlugins } from './plugins';

/**
 * Get dictionary content for a specific locale in Svelte applications
 * @param dictionary The dictionary object to transform
 * @param locale The target locale (optional, defaults to current locale)
 * @returns Transformed dictionary content optimized for Svelte
 */
export const getDictionary = <
  T extends Dictionary,
  L extends LocalesValues = DeclaredLocales,
>(
  dictionary: T,
  locale?: L
): DeepTransformContent<T['content']> =>
  getDictionaryCore(dictionary, locale, getPlugins(locale)) as any;
