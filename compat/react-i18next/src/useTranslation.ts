'use client';

import { getHTMLTextDir } from '@intlayer/core/localization';
import { resolveMessage } from '@intlayer/core/messageFormat';
import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import { getInterpolationValues, resolveTranslation } from '@intlayer/i18next';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type { TOptions } from 'i18next';
import { useMemo } from 'react';
import type { UseTranslationOptions } from 'react-i18next';
import { useLocale } from 'react-intlayer';

/**
 * Drop-in for react-i18next's `useTranslation`.
 *
 * Translation lookup goes through the shared i18next-dialect resolver:
 * namespace prefixes (`ns:key`), the `ns` option, plural suffixes
 * (`key_one`/`key_other` via `Intl.PluralRules`), context suffixes
 * (`key_male`), `$t()` nesting, `defaultValue` and `{{var}}` interpolation
 * are all supported.
 *
 * The returned `t()` is typed against the intlayer dictionary for namespace N:
 * keys are autocompleted and dot-paths are validated at compile time.
 *
 * @example
 * ```tsx
 * const { t } = useTranslation('about');
 * t('counter.label'); // ✓ typed; compile error if key doesn't exist
 * t('items', { count: 3 }); // plural suffix resolution
 * ```
 */
export const useTranslation = <N extends DictionaryKeys>(
  ns?: N | N[],
  options?: UseTranslationOptions<string>
) => {
  const namespace = (
    Array.isArray(ns) ? (ns[0] ?? 'translation') : (ns ?? 'translation')
  ) as N;

  const { locale, setLocale, availableLocales } = useLocale();

  const keyPrefix = options?.keyPrefix;

  /**
   * @param key - A valid dot-notation path within the namespace N dictionary.
   * @param optionsOrDefaultValue - i18next `t()` options (interpolation
   *   values, `count`, `context`, `ns`, `defaultValue`, …) or a default
   *   value string.
   */
  const translate = useMemo(() => {
    const resolveSingleKey = (
      key: string,
      translateOptions?: TOptions
    ): unknown =>
      resolveTranslation({
        locale: locale as LocalesValues,
        namespace,
        key: keyPrefix ? `${keyPrefix}.${key}` : key,
        options: translateOptions,
      });

    return (
      key: string | string[],
      optionsOrDefaultValue?: TOptions | string,
      extraOptions?: TOptions
    ): string => {
      const translateOptions: TOptions =
        typeof optionsOrDefaultValue === 'string'
          ? { defaultValue: optionsOrDefaultValue, ...extraOptions }
          : (optionsOrDefaultValue ?? {});

      const keys = Array.isArray(key) ? key : [key];

      for (const candidateKey of keys) {
        const resolved = resolveSingleKey(candidateKey, translateOptions);
        if (resolved !== undefined) return resolved as string;
      }

      const defaultValue = translateOptions.defaultValue;
      if (typeof defaultValue === 'string') {
        return resolveMessage(
          defaultValue,
          getInterpolationValues(translateOptions),
          locale as LocalesValues,
          'i18next'
        );
      }

      return keys[keys.length - 1];
    };
  }, [locale, namespace, keyPrefix]);

  const i18n = useMemo(
    () => ({
      language: locale as string,
      languages: (availableLocales ?? []) as string[],
      resolvedLanguage: locale as string,
      isInitialized: true,
      changeLanguage: async (newLanguage: string) => {
        setLocale(newLanguage as LocalesValues);
      },
      dir: (language?: string): 'ltr' | 'rtl' => {
        const direction = getHTMLTextDir((language ?? locale) as LocalesValues);
        return direction === 'rtl' ? 'rtl' : 'ltr';
      },
      exists: (key: string, existsOptions?: TOptions): boolean =>
        resolveTranslation({
          locale: locale as LocalesValues,
          namespace,
          key,
          options: existsOptions,
        }) !== undefined,
      t: translate,
      getFixedT:
        (language?: string | null, fixedNamespace?: string | null) =>
        (key: string, fixedOptions?: TOptions): string => {
          const resolved = resolveTranslation({
            locale: (language ?? locale) as LocalesValues,
            namespace: fixedNamespace ?? namespace,
            key,
            options: fixedOptions,
          });
          return resolved !== undefined ? (resolved as string) : key;
        },
    }),
    [locale, availableLocales, setLocale, namespace, translate]
  );

  /** Typed facade over the untyped runtime translate function. */
  const t = translate as <P extends ValidDotPathsFor<N>>(
    key: P | P[],
    optionsOrDefaultValue?: TOptions | string,
    extraOptions?: TOptions
  ) => string;

  return { t, i18n, ready: true };
};
