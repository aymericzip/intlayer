import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { computed, type WritableComputedRef } from 'vue';
import {
  useDictionaryDynamic as useDictionaryDynamicBase,
  useLocale,
} from 'vue-intlayer';

/**
 * Dynamic dictionary-accepting variant of `useI18n`.
 */
export const useDictionaryDynamic = async <
  const T extends Dictionary,
  const K extends string,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  key: K,
  namespacePrefix?: string
): Promise<{
  locale: WritableComputedRef<string>;
  availableLocales: string[];
  t: <P extends ValidDotPathsFor<any>>(key: P, ...args: unknown[]) => string;
  n: (val: unknown) => string;
  d: (val: unknown) => string;
}> => {
  const content = await useDictionaryDynamicBase<T, any>(
    dictionaryPromise,
    key as any
  );

  const { locale: currentLocale, setLocale, availableLocales } = useLocale();

  const localeRef = computed({
    get: () => currentLocale.value as string,
    set: (newVal: string) => {
      setLocale(newVal as LocalesValues);
    },
  });

  const t = <P extends ValidDotPathsFor<any>>(
    lookup: P,
    ...args: unknown[]
  ): string => {
    const params =
      typeof args[0] === 'object' && args[0] !== null
        ? (args[0] as Record<string, unknown>)
        : undefined;

    const lookupKey = namespacePrefix
      ? `${namespacePrefix}.${String(lookup)}`
      : String(lookup);
    const parts = lookupKey.split('.');
    let current: any = content.value;
    for (const part of parts) {
      if (current == null) break;
      current = current[part];
    }
    const str = String(current ?? lookupKey);

    if (!params) return str;
    return str.replace(/\{(\w+)\}/g, (_, key) =>
      params[key] != null ? String(params[key]) : `{${key}}`
    );
  };

  return {
    locale: localeRef,
    availableLocales: availableLocales as string[],
    t,
    n: (val: unknown) => String(val),
    d: (val: unknown) => String(val),
  };
};
