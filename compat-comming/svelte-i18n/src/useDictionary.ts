import { getDictionary } from '@intlayer/core/interpreter';
import { navigatePath } from '@intlayer/core/messageFormat';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { derived, type Readable } from 'svelte/store';
import { locale, resolveIcuMessage } from './stores';
import type { MessageFormatter, MessageObject } from './types';

export const useDictionary = <const T extends Dictionary>(
  dictionary: T,
  options?: Record<string, unknown> & { namespace?: string }
) => {
  const namespacePrefix = options?.namespace;

  const resolveKey = (lookupKey: string): string =>
    namespacePrefix ? `${namespacePrefix}.${lookupKey}` : lookupKey;

  const formatStore: Readable<MessageFormatter> = derived(
    locale,
    ($locale): MessageFormatter => {
      const targetLocale = ($locale ?? 'en') as LocalesValues;
      const content = getDictionary(dictionary, targetLocale);

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

        const rawVal = navigatePath(content, resolveKey(id));
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
