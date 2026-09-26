import { internationalization } from '@intlayer/config/built';
import { getIntlayer } from '@intlayer/core/interpreter';
import {
  createMessageResolver,
  icuToIntlayerFormatter,
  interpolateMessage,
  navigatePath,
} from '@intlayer/core/messageFormat';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { derived, type Readable, type Writable, writable } from 'svelte/store';
import type {
  DateFormatter,
  IntlFormatterOptions,
  LocalesDictionary,
  MessageFormatter,
  MessageObject,
  NumberFormatter,
  TimeFormatter,
} from './types';

const defaultLocale = (internationalization?.defaultLocale ?? 'en') as string;
const configLocales = (internationalization?.locales ?? [
  defaultLocale,
]) as string[];

/** Dedicated ICU message resolver for bundler efficiency */
export const resolveIcuMessage = createMessageResolver(icuToIntlayerFormatter);

/** Store for dynamically registered dictionary messages */
export const dictionary: Writable<LocalesDictionary> =
  writable<LocalesDictionary>({});

/** Writable store tracking loading state */
export const isLoading: Writable<boolean> = writable<boolean>(false);

/** Readonly store of available locales */
export const locales: Readable<string[]> = writable<string[]>(configLocales);

/** Helper to look up an id in the user-provided dictionary store */
const lookupInDictionaryStore = (
  dicts: LocalesDictionary,
  targetLocale: string,
  id: string
): unknown => {
  const dict = dicts[targetLocale];
  if (!dict) return undefined;
  return navigatePath(dict, id);
};

/** Helper to look up a key against intlayer's compiled dictionaries */
const lookupInIntlayer = (targetLocale: string, id: string): unknown => {
  let dictionaries: Record<string, unknown> = {};
  try {
    dictionaries = getDictionaries() ?? {};
  } catch {}

  // 1. Try segmented key: 'home.title' -> dict 'home', path 'title'
  if (id.includes('.')) {
    const dotIndex = id.indexOf('.');
    const dictKey = id.slice(0, dotIndex);
    const path = id.slice(dotIndex + 1);
    if (dictionaries[dictKey]) {
      try {
        const dict = getIntlayer(
          dictKey as DictionaryKeys,
          targetLocale as LocalesValues
        );
        const val = navigatePath(dict, path);
        if (val !== undefined && val !== null) {
          return (val as any)?.$raw?.value ?? (val as any)?.value ?? val;
        }
      } catch {}
    }
  }

  // 2. Try default 'translation' dictionary
  if (dictionaries['translation']) {
    try {
      const dict = getIntlayer(
        'translation' as DictionaryKeys,
        targetLocale as LocalesValues
      );
      const val = navigatePath(dict, id);
      if (val !== undefined && val !== null) {
        return (val as any)?.$raw?.value ?? (val as any)?.value ?? val;
      }
    } catch {}
  }

  // 3. Try whole id as dictionary key
  if (dictionaries[id]) {
    try {
      const dict = getIntlayer(
        id as DictionaryKeys,
        targetLocale as LocalesValues
      );
      if (dict !== undefined && dict !== null) {
        return (dict as any)?.$raw?.value ?? (dict as any)?.value ?? dict;
      }
    } catch {}
  }

  return undefined;
};

// Internal store for current locale value
const internalLocale = writable<string | null | undefined>(defaultLocale);

export const locale = {
  subscribe: internalLocale.subscribe,
  set: (newLocale: string | null | undefined) => {
    internalLocale.set(newLocale);
  },
  update: (
    updater: (value: string | null | undefined) => string | null | undefined
  ) => {
    internalLocale.update((prev) => updater(prev));
  },
};

/**
 * Format message derived store ($format, $_, $t)
 */
export const format: Readable<MessageFormatter> = derived(
  [locale, dictionary],
  ([$locale, $dictionary]): MessageFormatter =>
    (idOrObj: string | MessageObject, options?: Omit<MessageObject, 'id'>) => {
      let id: string;
      let values = options?.values;
      let defaultMsg = options?.default;
      let targetLocale = options?.locale ?? $locale ?? defaultLocale;

      if (typeof idOrObj === 'object') {
        id = idOrObj.id;
        values = idOrObj.values ?? values;
        defaultMsg = idOrObj.default ?? defaultMsg;
        targetLocale = idOrObj.locale ?? targetLocale;
      } else {
        id = idOrObj;
      }

      // Check user-added dictionary store
      const localVal = lookupInDictionaryStore($dictionary, targetLocale, id);
      if (localVal !== undefined) {
        return resolveIcuMessage(
          localVal,
          values as any,
          targetLocale as LocalesValues
        );
      }

      // Check intlayer dictionaries
      const intlayerVal = lookupInIntlayer(targetLocale, id);
      if (intlayerVal !== undefined) {
        return resolveIcuMessage(
          intlayerVal,
          values as any,
          targetLocale as LocalesValues
        );
      }

      // Fallback
      if (defaultMsg !== undefined) {
        return interpolateMessage(
          defaultMsg,
          values as any,
          targetLocale as LocalesValues
        );
      }

      return id;
    }
);

export const _ = format;
export const t = format;

/**
 * Date formatting derived store ($date)
 */
export const date: Readable<DateFormatter> = derived(
  locale,
  ($locale): DateFormatter =>
    (
      d: Date | number,
      options?: IntlFormatterOptions<Intl.DateTimeFormatOptions>
    ) => {
      const targetLocale = options?.locale ?? $locale ?? defaultLocale;
      const dateObj = typeof d === 'number' ? new Date(d) : d;
      return new Intl.DateTimeFormat(targetLocale, options).format(dateObj);
    }
);

/**
 * Time formatting derived store ($time)
 */
export const time: Readable<TimeFormatter> = derived(
  locale,
  ($locale): TimeFormatter =>
    (
      d: Date | number,
      options?: IntlFormatterOptions<Intl.DateTimeFormatOptions>
    ) => {
      const targetLocale = options?.locale ?? $locale ?? defaultLocale;
      const dateObj = typeof d === 'number' ? new Date(d) : d;
      return new Intl.DateTimeFormat(targetLocale, {
        timeStyle: 'medium',
        ...options,
      }).format(dateObj);
    }
);

/**
 * Number formatting derived store ($number)
 */
export const number: Readable<NumberFormatter> = derived(
  locale,
  ($locale): NumberFormatter =>
    (num: number, options?: IntlFormatterOptions<Intl.NumberFormatOptions>) => {
      const targetLocale = options?.locale ?? $locale ?? defaultLocale;
      return new Intl.NumberFormat(targetLocale, options).format(num);
    }
);

/**
 * Raw JSON dictionary getter derived store ($json)
 */
export const json: Readable<(id: string, optLocale?: string) => unknown> =
  derived(
    [locale, dictionary],
    ([$locale, $dictionary]) =>
      (id: string, optLocale?: string): unknown => {
        const targetLocale = optLocale ?? $locale ?? defaultLocale;
        const localVal = lookupInDictionaryStore($dictionary, targetLocale, id);
        if (localVal !== undefined) return localVal;

        return lookupInIntlayer(targetLocale, id);
      }
  );
