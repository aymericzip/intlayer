import {
  getDictionary as getDictionaryCore,
  type Plugins,
} from '@intlayer/core/interpreter';
import type {
  Dictionary,
  DictionarySelectorForGroup,
  QualifiedDictionaryGroup,
  ResolveQualifiedDictionaryContent,
} from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  ExtractSelectorLocale,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { type DeepTransformContent, getPlugins } from './plugins';

/**
 * Transforms a dictionary (or qualified dictionary group) and returns its
 * content for the given locale or selector (`{ item }`, `{ variant }`,
 * optionally combined with `locale`).
 *
 * `getPluginsForLocale` picks the plugin set; transforms are cached per plugin
 * set, so a dedicated set keeps the result from being shared.
 */
export const getDictionary = <
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelectorForGroup<T> =
    DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A,
  getPluginsForLocale: (locale?: LocalesValues) => Plugins[] = getPlugins
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  ExtractSelectorLocale<A>
> => {
  const locale = (
    typeof localeOrSelector === 'object' && localeOrSelector !== null
      ? localeOrSelector.locale
      : localeOrSelector
  ) as LocalesValues | undefined;

  return getDictionaryCore(
    dictionary,
    localeOrSelector,
    getPluginsForLocale(locale)
  ) as any;
};
