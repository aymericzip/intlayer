import { navigatePath } from '@intlayer/core/messageFormat';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DictionaryKeys,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { computed } from 'vue';
import {
  useDictionaryDynamic as useDictionaryDynamicBase,
  useLocale,
} from 'vue-intlayer';
import {
  type DateTimeFormatsConfig,
  formatDateValue,
  formatNumberValue,
  type NumberFormatsConfig,
} from './formats';
import {
  parseTranslateArguments,
  resolveVueMessage,
} from './resolveVueMessage';
import type { ScopedComposer, TypedComposer } from './typedComposer';

/**
 * Overload set for {@link useDictionaryDynamic}: without a `namespace` option
 * the composer is typed against the dictionary's dot-paths; with one (the
 * key-prefix remainder left by the build rewrite) the keys are relative
 * dot-paths under that scope.
 */
type UseDictionaryDynamic = {
  <T extends Dictionary, K extends DictionaryKeys>(
    dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
    key: K,
    options?: Record<string, unknown> & { namespace?: undefined }
  ): TypedComposer<K>;
  <T extends Dictionary, K extends DictionaryKeys, Prefix extends string>(
    dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
    key: K,
    options: Record<string, unknown> & { namespace: Prefix }
  ): ScopedComposer<K, Prefix>;
};

/**
 * Dynamic dictionary-accepting variant of `useI18n`.
 *
 * Used internally by the Babel optimization: instead of looking up the dictionary
 * at runtime by key, the Babel plugin dynamically imports the dictionary JSON
 * (or .mjs module) based on the locale.
 */
export const useDictionaryDynamic = (<
  const T extends Dictionary,
  const K extends DictionaryKeys,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  key: K,
  options?: Record<string, unknown> & { namespace?: string }
) => {
  const { locale: currentLocale, setLocale, availableLocales } = useLocale();

  const namespacePrefix = options?.namespace as string | undefined;

  const datetimeFormats = options?.datetimeFormats as
    | DateTimeFormatsConfig
    | undefined;
  const numberFormats = options?.numberFormats as
    | NumberFormatsConfig
    | undefined;

  const content = useDictionaryDynamicBase<T, any>(
    dictionaryPromise,
    key as any
  );

  const localeRef = computed({
    get: () => currentLocale.value as string,
    set: (newLocale: string) => {
      setLocale(newLocale as LocalesValues);
    },
  });

  const resolveKey = (lookupKey: string): string =>
    namespacePrefix ? `${namespacePrefix}.${lookupKey}` : lookupKey;

  const lookupRaw = (lookupKey: string): unknown => {
    // navigatePath on the returned proxy will correctly resolve nested properties
    const result = navigatePath(content, resolveKey(lookupKey));
    // For leaf nodes, we can access .value to get the real underlying primitive/node
    return (result as any)?.$raw?.value ?? (result as any)?.value ?? result;
  };

  const translateKey = (lookupKey: string, args: unknown[]): string => {
    const { values, count, defaultMessage } = parseTranslateArguments(args);
    const rawValue = lookupRaw(lookupKey);

    if (rawValue === undefined) {
      if (defaultMessage !== undefined) {
        return resolveVueMessage(
          defaultMessage,
          values,
          count,
          currentLocale.value as LocalesValues
        );
      }
      return lookupKey;
    }

    return resolveVueMessage(
      rawValue,
      values,
      count,
      currentLocale.value as LocalesValues
    );
  };

  const translate = (lookupKey: string, ...args: unknown[]): string =>
    translateKey(lookupKey, args);

  return {
    locale: localeRef,
    availableLocales: availableLocales as string[],
    t: translate,
    tc: translate,
    te: (lookupKey: string): boolean => lookupRaw(lookupKey) !== undefined,
    tm: (lookupKey: string): unknown => lookupRaw(lookupKey) ?? {},
    rt: (message: unknown, ...args: unknown[]): string => {
      const { values, count } = parseTranslateArguments(args);
      return resolveVueMessage(
        message,
        values,
        count,
        currentLocale.value as LocalesValues
      );
    },
    d: (
      value: Date | number | string,
      formatOrOptions?: string | Intl.DateTimeFormatOptions
    ): string =>
      formatDateValue(
        value,
        formatOrOptions,
        currentLocale.value,
        datetimeFormats
      ),
    n: (
      value: number,
      formatOrOptions?: string | Intl.NumberFormatOptions
    ): string =>
      formatNumberValue(
        value,
        formatOrOptions,
        currentLocale.value,
        numberFormats
      ),
  };
}) as UseDictionaryDynamic;
