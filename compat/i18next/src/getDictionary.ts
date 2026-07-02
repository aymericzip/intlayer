import { internationalization } from '@intlayer/config/built';
import { getDictionary as getDictionaryCore } from '@intlayer/core/interpreter';
import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { TOptions } from 'i18next';
import { resolveTranslation } from './resolveTranslation';

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
export const getDictionary = <T extends Dictionary>(
  dictionary: T,
  locale?: LocalesValues,
  keyPrefix?: string
) => {
  const targetLocale = (locale ??
    internationalization?.defaultLocale) as LocalesValues;
  const dictionaryContent = getDictionaryCore(dictionary, targetLocale);

  return <P extends ValidDotPathsFor<T['key']>>(
    key: P,
    options?: TOptions
  ): string => {
    const resolved = resolveTranslation({
      locale: targetLocale,
      namespace: dictionary.key,
      key: keyPrefix ? `${keyPrefix}.${String(key)}` : String(key),
      options,
      dictionaryContent,
    });
    return resolved !== undefined ? (resolved as string) : String(key);
  };
};
