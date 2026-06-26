import { getIntlayer as getIntlayerCore } from '@intlayer/core/interpreter';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryResult,
  DictionarySelectorForKey,
  ExtractSelectorLocale,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { type DeepTransformContent, getPlugins } from './plugins';

/**
 * Get dictionary content by key for Svelte applications.
 *
 * The second argument is either a locale or a selector object (`{ item }`,
 * `{ variant }`, optionally combined with `locale`).
 *
 * @param key The dictionary key to retrieve
 * @param localeOrSelector The target locale or selector (optional)
 * @returns Transformed dictionary content optimized for Svelte
 */
export const getIntlayer = <
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<T> = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  ExtractSelectorLocale<A>
> => {
  const locale = (
    typeof localeOrSelector === 'object' && localeOrSelector !== null
      ? localeOrSelector.locale
      : localeOrSelector
  ) as LocalesValues | undefined;

  return getIntlayerCore(key, localeOrSelector, getPlugins(locale)) as any;
};
