import { internationalization } from '@intlayer/config/built';
import { getDictionary as getDictionaryCore } from '@intlayer/core/interpreter';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type { TOptions } from 'i18next';
import { resolveTranslation } from './resolveTranslation';
import type { ScopedTFunction, TypedTFunction } from './typedTranslation';

/**
 * Overload set for {@link getDictionary}: without a key prefix the returned
 * `t()` is typed against the dictionary's dot-paths; with a prefix the keys
 * are relative dot-paths under that scope.
 */
type GetDictionary = {
  <T extends Dictionary>(
    dictionary: T,
    locale?: LocalesValues
  ): TypedTFunction<T['key'] & DictionaryKeys>;
  <T extends Dictionary, Prefix extends string>(
    dictionary: T,
    locale: LocalesValues | undefined,
    keyPrefix: Prefix
  ): ScopedTFunction<T['key'] & DictionaryKeys, Prefix>;
};

/**
 * Dictionary-accepting variant of `getFixedT`.
 *
 * Used by the build-time optimization (and available for manual use): instead
 * of resolving the namespace from the runtime registry, the dictionary is
 * supplied directly — enabling tree-shaking of unused locale content.
 *
 * The returned `t()` matches the fixed translator produced by
 * `getFixedT(lng, ns, keyPrefix)`: plural and context suffixes, `$t()`
 * nesting, `defaultValue` and `{{var}}` interpolation are all supported.
 *
 * @example
 * import aboutDictionary from './about.content';
 * const t = getDictionary(aboutDictionary, 'fr');
 * t('counter.label');
 */
export const getDictionary = (<T extends Dictionary>(
  dictionary: T,
  locale?: LocalesValues,
  keyPrefix?: string
) => {
  const targetLocale = (locale ??
    internationalization?.defaultLocale) as LocalesValues;
  const dictionaryContent = getDictionaryCore(dictionary, targetLocale);

  return (key: string, options?: TOptions): unknown => {
    const resolved = resolveTranslation({
      locale: targetLocale,
      namespace: dictionary.key,
      key: keyPrefix ? `${keyPrefix}.${key}` : key,
      options,
      dictionaryContent,
    });
    return resolved !== undefined ? resolved : key;
  };
}) as GetDictionary;
