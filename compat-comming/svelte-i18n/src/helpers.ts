import type { Readable } from 'svelte/store';
import { dictionary, locale, resolveIcuMessage } from './stores';
import type {
  ConfigureOptionsInit,
  LocaleDictionary,
  MemoizedDateTimeFormatterFactoryOptional,
  MemoizedNumberFormatterFactoryOptional,
  MessageObject,
  MessagesLoader,
} from './types';

/**
 * Configure svelte-i18n options and initial locale.
 */
export const init = async (opts: ConfigureOptionsInit): Promise<void> => {
  const targetLocale = opts.initialLocale ?? opts.fallbackLocale;
  if (targetLocale) {
    locale.set(targetLocale);
  }
};

/**
 * Register a dynamic messages loader for a locale.
 */
export const register = (
  targetLocale: string,
  loader: MessagesLoader
): void => {
  loader()
    .then((messages) => {
      if (messages && typeof messages === 'object') {
        addMessages(targetLocale, messages.default ?? messages);
      }
    })
    .catch(() => {});
};

/**
 * Add messages directly to the runtime dictionary for a locale.
 */
export const addMessages = (
  targetLocale: string,
  ...partials: LocaleDictionary[]
): void => {
  dictionary.update((dicts) => {
    const current = dicts[targetLocale] ?? {};
    const merged = { ...current };

    for (const partial of partials) {
      if (partial && typeof partial === 'object') {
        Object.assign(merged, partial);
      }
    }

    return {
      ...dicts,
      [targetLocale]: merged,
    };
  });
};

/**
 * Wait for locale to be ready.
 */
export const waitLocale = async (_optLocale?: string): Promise<void> => {
  return Promise.resolve();
};

/**
 * Identity function for defining messages with typing.
 */
export const defineMessages = (
  i: Record<string, MessageObject>
): Record<string, MessageObject> => i;

type UnwrapStore<T> = T extends Readable<infer U> ? U : T;

/**
 * Unwraps a function from a store so it can be called outside Svelte components.
 */
export const unwrapFunctionStore = <
  S extends Readable<(...args: any[]) => any>,
  Fn extends UnwrapStore<S>,
>(
  store: S
): Fn & { freeze: () => void } => {
  let fnRef: any;
  const unsubscribe = store.subscribe((fn) => {
    fnRef = fn;
  });

  const callable = ((...args: any[]) => {
    if (typeof fnRef === 'function') {
      return fnRef(...args);
    }
    return undefined;
  }) as Fn & { freeze: () => void };

  callable.freeze = () => {
    unsubscribe();
  };

  return callable;
};

// Formatter factories
const numberFormatters = new Map<string, Intl.NumberFormat>();
const dateTimeFormatters = new Map<string, Intl.DateTimeFormat>();

export const getNumberFormatter: MemoizedNumberFormatterFactoryOptional = (
  options = {}
) => {
  const { locale: optLocale = 'en', ...opts } = options;
  const key = `${optLocale}:${JSON.stringify(opts)}`;
  let formatter = numberFormatters.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(optLocale, opts);
    numberFormatters.set(key, formatter);
  }
  return formatter;
};

export const getDateTimeFormatter: MemoizedDateTimeFormatterFactoryOptional = (
  options = {}
) => {
  const { locale: optLocale = 'en', ...opts } = options;
  const key = `${optLocale}:${JSON.stringify(opts)}`;
  let formatter = dateTimeFormatters.get(key);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(optLocale, opts);
    dateTimeFormatters.set(key, formatter);
  }
  return formatter;
};

export const getDateFormatter = getDateTimeFormatter;
export const getTimeFormatter = getDateTimeFormatter;

export const getMessageFormatter = (message: string, optLocale = 'en') => ({
  format: (values?: Record<string, any>) =>
    resolveIcuMessage(message, values, optLocale as any),
});

// URL & client locale detectors
export const getLocaleFromHostname = (hostname: RegExp): string | null => {
  if (typeof window === 'undefined') return null;
  const match = window.location.hostname.match(hostname);
  return match ? (match[1] ?? match[0]) : null;
};

export const getLocaleFromPathname = (pathname: RegExp): string | null => {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(pathname);
  return match ? (match[1] ?? match[0]) : null;
};

export const getLocaleFromNavigator = (): string | null => {
  if (typeof navigator === 'undefined') return null;
  return navigator.languages?.[0] ?? navigator.language ?? null;
};

export const getLocaleFromQueryString = (
  search: string
): string | null | undefined => {
  if (!search) return null;
  const query = search.startsWith('?') ? search.slice(1) : search;
  const params = new URLSearchParams(query);
  return params.get('locale') ?? params.get('lang') ?? null;
};

export const getLocaleFromHash = (hash: string): string | null | undefined => {
  if (!hash) return null;
  const clean = hash.startsWith('#') ? hash.slice(1) : hash;
  return getLocaleFromQueryString(clean);
};
