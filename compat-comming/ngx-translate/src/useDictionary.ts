import { getDictionary } from '@intlayer/core/interpreter';
import {
  createMessageResolver,
  icuToIntlayerFormatter,
  navigatePath,
} from '@intlayer/core/messageFormat';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { of } from 'rxjs';

const resolveIcu = createMessageResolver(icuToIntlayerFormatter);

export const useDictionary = <const T extends Dictionary>(
  dictionary: T,
  options?: Record<string, unknown> & { namespace?: string }
) => {
  const namespacePrefix = options?.namespace;

  const resolveKey = (lookupKey: string): string =>
    namespacePrefix ? `${namespacePrefix}.${lookupKey}` : lookupKey;

  const instant = (
    key: string | string[],
    params?: any,
    lang: LocalesValues = 'en' as LocalesValues
  ): any => {
    if (Array.isArray(key)) {
      const res: Record<string, any> = {};
      for (const k of key) {
        res[k] = instant(k, params, lang);
      }
      return res;
    }

    const content = getDictionary(dictionary, lang);
    const rawVal = navigatePath(content, resolveKey(key));
    const val =
      (rawVal as any)?.$raw?.value ?? (rawVal as any)?.value ?? rawVal;

    if (val !== undefined && val !== null) {
      return resolveIcu(val, params, lang);
    }
    return key;
  };

  return {
    instant,
    get: (key: string | string[], params?: any, lang?: LocalesValues) =>
      of(instant(key, params, lang)),
    stream: (key: string | string[], params?: any, lang?: LocalesValues) =>
      of(instant(key, params, lang)),
    t: instant,
  };
};
