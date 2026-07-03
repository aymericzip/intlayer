import { navigatePath } from '@intlayer/core/messageFormat';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { computed } from 'vue';
import { useDictionary as useDictionaryBase, useLocale } from 'vue-intlayer';
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
 * Overload set for {@link useDictionary}: without a `namespace` option the
 * composer is typed against the dictionary's dot-paths; with one (the
 * key-prefix remainder left by the build rewrite) the keys are relative
 * dot-paths under that scope.
 */
type UseDictionary = {
  <T extends Dictionary>(
    dictionary: T,
    options?: Record<string, unknown> & { namespace?: undefined }
  ): TypedComposer<T['key'] & DictionaryKeys>;
  <T extends Dictionary, Prefix extends string>(
    dictionary: T,
    options: Record<string, unknown> & { namespace: Prefix }
  ): ScopedComposer<T['key'] & DictionaryKeys, Prefix>;
};

/**
 * Dictionary-accepting variant of `useI18n`.
 *
 * Used internally by the Babel optimization: instead of looking up the dictionary
 * at runtime by key, the Babel plugin pre-imports the dictionary JSON at build time
 * and passes it directly here. This enables tree-shaking of unused locale content.
 */
export const useDictionary = (<const T extends Dictionary>(
  dictionary: T,
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

  const content = useDictionaryBase(dictionary);

  const localeRef = computed({
    get: () => currentLocale.value as string,
    set: (newLocale: string) => {
      setLocale(newLocale as LocalesValues);
    },
  });

  const resolveKey = (lookupKey: string): string =>
    namespacePrefix ? `${namespacePrefix}.${lookupKey}` : lookupKey;

  const lookupRaw = (key: string): unknown => {
    // navigatePath on the returned proxy will correctly resolve nested properties
    const result = navigatePath(content, resolveKey(key));
    // For leaf nodes, we can access .value to get the real underlying primitive/node
    return (result as any)?.$raw?.value ?? (result as any)?.value ?? result;
  };

  const translateKey = (key: string, args: unknown[]): string => {
    const { values, count, defaultMessage } = parseTranslateArguments(args);
    const rawValue = lookupRaw(key);

    if (rawValue === undefined) {
      if (defaultMessage !== undefined) {
        return resolveVueMessage(
          defaultMessage,
          values,
          count,
          currentLocale.value as LocalesValues
        );
      }
      return key;
    }

    return resolveVueMessage(
      rawValue,
      values,
      count,
      currentLocale.value as LocalesValues
    );
  };

  const translate = (key: string, ...args: unknown[]): string =>
    translateKey(key, args);

  return {
    locale: localeRef,
    availableLocales: availableLocales as string[],
    t: translate,
    tc: translate,
    te: (key: string): boolean => lookupRaw(key) !== undefined,
    tm: (key: string): unknown => lookupRaw(key) ?? {},
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
}) as UseDictionary;
