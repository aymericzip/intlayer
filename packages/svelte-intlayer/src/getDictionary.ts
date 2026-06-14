import { getDictionary as getDictionaryCore } from '@intlayer/core/interpreter';
import type {
  Dictionary,
  DictionarySelector,
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
 * Get content for a dictionary (or qualified dictionary group) in Svelte
 * applications, for the given locale or selector (`{ item }`, `{ variant }`,
 * `{ id, ...meta }`, optionally combined with `locale`).
 *
 * @param dictionary The dictionary (or qualified group) to transform
 * @param localeOrSelector The target locale or selector (optional)
 * @returns Transformed dictionary content optimized for Svelte
 */
export const getDictionary = <
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends
    | LocalesValues
    | DictionarySelectorForGroup<T> = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A
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
    getPlugins(locale)
  ) as any;
};
