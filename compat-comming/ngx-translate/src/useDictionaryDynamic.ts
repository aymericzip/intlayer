import {
  createMessageResolver,
  icuToIntlayerFormatter,
  navigatePath,
} from '@intlayer/core/messageFormat';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DictionaryKeys,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { from, of } from 'rxjs';
import { map } from 'rxjs/operators';

const resolveIcu = createMessageResolver(icuToIntlayerFormatter);

export const useDictionaryDynamic = <
  const T extends Dictionary,
  const K extends DictionaryKeys,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  _key: K,
  options?: Record<string, unknown> & { namespace?: string }
) => {
  const namespacePrefix = options?.namespace;

  const resolveKey = (lookupKey: string): string =>
    namespacePrefix ? `${namespacePrefix}.${lookupKey}` : lookupKey;

  const get = (
    key: string | string[],
    params?: any,
    lang: LocalesValues = 'en' as LocalesValues
  ) => {
    const loader =
      dictionaryPromise[lang] ?? Object.values(dictionaryPromise)[0];
    if (!loader) return of(key);

    return from(loader()).pipe(
      map((dict) => {
        if (Array.isArray(key)) {
          const res: Record<string, any> = {};
          for (const k of key) {
            const rawVal = navigatePath(dict, resolveKey(k));
            const val =
              (rawVal as any)?.$raw?.value ?? (rawVal as any)?.value ?? rawVal;
            res[k] = val !== undefined ? resolveIcu(val, params, lang) : k;
          }
          return res;
        }

        const rawVal = navigatePath(dict, resolveKey(key));
        const val =
          (rawVal as any)?.$raw?.value ?? (rawVal as any)?.value ?? rawVal;
        return val !== undefined ? resolveIcu(val, params, lang) : key;
      })
    );
  };

  return {
    get,
    stream: get,
    instant: (key: string | string[], _params?: any, _lang?: LocalesValues) => {
      if (Array.isArray(key)) {
        const res: Record<string, string> = {};
        for (const k of key) res[k] = k;
        return res;
      }
      return key;
    },
  };
};
