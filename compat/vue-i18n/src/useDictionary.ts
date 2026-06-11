import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { computed, type WritableComputedRef } from 'vue';
import { useDictionary as useDictionaryBase, useLocale } from 'vue-intlayer';

/**
 * Dictionary-accepting variant of `useI18n`.
 *
 * Used internally by the SWC optimization: instead of looking up the dictionary
 * at runtime by key, the SWC plugin pre-imports the dictionary JSON at build time
 * and passes it directly here. This enables tree-shaking of unused locale content.
 */
export const useDictionary = <T extends Dictionary>(
  dictionary: T,
  namespacePrefix?: string
): {
  locale: WritableComputedRef<string>;
  availableLocales: string[];
  t: <P extends ValidDotPathsFor<any>>(key: P, ...args: unknown[]) => string;
  n: (val: unknown) => string;
  d: (val: unknown) => string;
} => {
  const content = useDictionaryBase(dictionary);
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
    return str.replace(/\{(\w+)\}/g, (_, k) =>
      params[k] != null ? String(params[k]) : `{${k}}`
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
