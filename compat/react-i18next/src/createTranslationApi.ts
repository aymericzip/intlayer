import { getHTMLTextDir } from '@intlayer/core/localization';
import { resolveMessage } from '@intlayer/core/messageFormat';
import {
  getInterpolationValues,
  resolveTranslation,
  type TypedTFunction,
} from '@intlayer/i18next';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type { TOptions } from 'i18next';

/** Untyped runtime `t()` produced by {@link createTranslationApi}. */
export type TranslateFunction = (
  key: string | string[],
  optionsOrDefaultValue?: TOptions | string,
  extraOptions?: TOptions
) => string;

/**
 * The `i18n` facade with `t` and `getFixedT` typed against the dictionary the
 * hook is bound to: `t` is the hook's translate function type `TFn`, and
 * `getFixedT` returns a fully-typed `t()` for the requested namespace (or the
 * hook's own `t()` when no namespace is given).
 */
export type TypedI18nFacade<TFn = TranslateFunction> = Omit<
  I18nFacade,
  't' | 'getFixedT'
> & {
  t: TFn;
  getFixedT: {
    <N extends DictionaryKeys>(
      language: string | null | undefined,
      fixedNamespace: N
    ): TypedTFunction<N>;
    (language?: string | null, fixedNamespace?: null): TFn;
  };
};

/** Result shape of the typed translation hooks: `{ t, i18n, ready }`. */
export type TypedTranslationResult<TFn = TranslateFunction> = {
  t: TFn;
  i18n: TypedI18nFacade<TFn>;
  ready: true;
};

/** `i18n` facade shape produced by {@link createTranslationApi}. */
export type I18nFacade = {
  language: string;
  languages: string[];
  resolvedLanguage: string;
  isInitialized: boolean;
  changeLanguage: (newLanguage: string) => Promise<void>;
  dir: (language?: string) => 'ltr' | 'rtl';
  exists: (key: string, existsOptions?: TOptions) => boolean;
  t: TranslateFunction;
  getFixedT: (
    language?: string | null,
    fixedNamespace?: string | null
  ) => (key: string, fixedOptions?: TOptions) => string;
};

export type CreateTranslationApiParams = {
  /** Active locale. */
  locale: LocalesValues;
  /** Locale setter backing `i18n.changeLanguage`. */
  setLocale: (newLocale: LocalesValues) => void;
  /** Configured locales backing `i18n.languages`. */
  availableLocales: LocalesValues[];
  /** Default namespace (dictionary key) for `t()` lookups. */
  namespace: string;
  /** Optional prefix prepended to every `t()` key. */
  keyPrefix?: string;
  /**
   * Pre-resolved dictionary content for `namespace` — supplied by the
   * build-optimized `useDictionary` / `useDictionaryDynamic` variants so
   * lookups skip the runtime registry.
   */
  dictionaryContent?: unknown;
};

/**
 * Builds the `{ t, i18n }` pair shared by `useTranslation` (runtime
 * registry lookup) and `useDictionary` / `useDictionaryDynamic`
 * (build-time-imported dictionary content).
 *
 * Translation lookup goes through the shared i18next-dialect resolver:
 * namespace prefixes (`ns:key`), the `ns` option, plural suffixes
 * (`key_one`/`key_other` via `Intl.PluralRules`), context suffixes
 * (`key_male`), `$t()` nesting, `defaultValue` and `{{var}}` interpolation
 * are all supported.
 */
export const createTranslationApi = ({
  locale,
  setLocale,
  availableLocales,
  namespace,
  keyPrefix,
  dictionaryContent,
}: CreateTranslationApiParams): {
  translate: TranslateFunction;
  i18n: I18nFacade;
} => {
  const resolveSingleKey = (
    key: string,
    translateOptions?: TOptions
  ): unknown =>
    resolveTranslation({
      locale,
      namespace,
      key: keyPrefix ? `${keyPrefix}.${key}` : key,
      options: translateOptions,
      dictionaryContent,
    });

  const translate: TranslateFunction = (
    key,
    optionsOrDefaultValue,
    extraOptions
  ) => {
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
        locale,
        'i18next'
      );
    }

    return keys[keys.length - 1] as string;
  };

  const i18n: I18nFacade = {
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
        locale,
        namespace,
        key,
        options: existsOptions,
        dictionaryContent,
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
          dictionaryContent:
            (language ?? locale) === locale &&
            (fixedNamespace ?? namespace) === namespace
              ? dictionaryContent
              : undefined,
        });
        return resolved !== undefined ? (resolved as string) : key;
      },
  };

  return { translate, i18n };
};
