import { navigatePath } from '@intlayer/core/messageFormat';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DictionaryKeys,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { derived, type Readable, writable } from 'svelte/store';
import { locale, resolveIcuMessage } from './stores';
import type { MessageFormatter, MessageObject } from './types';

export const useDictionaryDynamic = <
  const T extends Dictionary,
  const K extends DictionaryKeys,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  _key: K,
  options?: Record<string, unknown> & { namespace?: string }
) => {
  const namespacePrefix = options?.namespace;
  const loadedContent = writable<any>({});

  const resolveKey = (lookupKey: string): string =>
    namespacePrefix ? `${namespacePrefix}.${lookupKey}` : lookupKey;

  locale.subscribe((currentLocale) => {
    const targetLocale = (currentLocale ?? 'en') as LocalesValues;
    const loader =
      dictionaryPromise[targetLocale] ?? Object.values(dictionaryPromise)[0];
    if (loader) {
      loader().then((dict) => {
        loadedContent.set(dict);
      });
    }
  });

  const formatStore: Readable<MessageFormatter> = derived(
    [loadedContent, locale],
    ([$content, $locale]): MessageFormatter => {
      const targetLocale = ($locale ?? 'en') as LocalesValues;

      return (
        idOrObj: string | MessageObject,
        opts?: Omit<MessageObject, 'id'>
      ) => {
        let id: string;
        let values = opts?.values;
        let defaultMsg = opts?.default;

        if (typeof idOrObj === 'object') {
          id = idOrObj.id;
          values = idOrObj.values ?? values;
          defaultMsg = idOrObj.default ?? defaultMsg;
        } else {
          id = idOrObj;
        }

        const rawVal = navigatePath($content, resolveKey(id));
        const val =
          (rawVal as any)?.$raw?.value ?? (rawVal as any)?.value ?? rawVal;

        if (val !== undefined && val !== null) {
          return resolveIcuMessage(val, values as any, targetLocale);
        }

        if (defaultMsg !== undefined) {
          return defaultMsg;
        }

        return id;
      };
    }
  );

  return {
    t: formatStore,
    format: formatStore,
    _: formatStore,
  };
};
