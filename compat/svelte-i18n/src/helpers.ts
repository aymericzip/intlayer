import {
  createMessageResolver,
  icuToIntlayerFormatter,
} from '@intlayer/core/messageFormat';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { Readable } from 'svelte/store';
import { configDefaultLocale, setRuntimeOptions } from './configuration';
import { locale } from './locale';
import { dictionary, setMessageCompiler } from './runtimeMessages';
import type {
  ConfigureOptionsInit,
  InterpolationValues,
  LocaleDictionary,
  MessageObject,
  MessagesLoader,
} from './types';

/**
 * Configures fallback locale, formats and missing-message handling, then
 * activates `initialLocale` (or keeps intlayer's current locale).
 */
export const init = (options: ConfigureOptionsInit): Promise<void> => {
  setRuntimeOptions(options);

  if (options.initialLocale) locale.set(options.initialLocale);

  return Promise.resolve();
};

/**
 * Merges runtime messages into a locale. Messages may be raw ICU strings:
 * this is the one entry point that bundles the ICU parser.
 */
export const addMessages = (
  targetLocale: string,
  ...partials: LocaleDictionary[]
): void => {
  setMessageCompiler(icuToIntlayerFormatter);

  dictionary.update((messages) => ({
    ...messages,
    [targetLocale]: Object.assign({}, messages[targetLocale], ...partials),
  }));
};

/** Messages from `register()` still being loaded. */
const pendingLoads = new Set<Promise<void>>();

/**
 * Registers a loader for runtime messages. Intlayer dictionaries need no
 * registration — this only serves catalogs kept outside intlayer.
 */
export const register = (
  targetLocale: string,
  loader: MessagesLoader
): void => {
  const pendingLoad = loader()
    .then((messages) => {
      addMessages(
        targetLocale,
        'default' in messages
          ? (messages.default as LocaleDictionary)
          : messages
      );
    })
    .finally(() => {
      pendingLoads.delete(pendingLoad);
    });

  pendingLoads.add(pendingLoad);
};

/** Resolves once every `register()` loader has settled. */
export const waitLocale = async (_locale?: string): Promise<void> => {
  await Promise.allSettled([...pendingLoads]);
};

/** Identity helper typing a message map. */
export const defineMessages = <T extends Record<string, MessageObject>>(
  messages: T
): T => messages;

type StoreValue<S> = S extends Readable<infer V> ? V : never;

/**
 * Turns a function store (`$_`, `$date`…) into a plain function usable
 * outside components. `freeze()` stops tracking locale changes.
 */
export const unwrapFunctionStore = <
  S extends Readable<(...args: never[]) => unknown>,
>(
  store: S
): StoreValue<S> & { freeze: () => void } => {
  let currentFunction: StoreValue<S> | undefined;

  const unsubscribe = store.subscribe((value) => {
    currentFunction = value as StoreValue<S>;
  });

  const unwrapped = ((...args: Parameters<StoreValue<S>>) =>
    currentFunction?.(...args)) as StoreValue<S> & { freeze: () => void };

  unwrapped.freeze = unsubscribe;

  return unwrapped;
};

/**
 * Standalone ICU formatter for a raw message string — bundles the ICU
 * parser, like `addMessages`.
 */
export const getMessageFormatter = (
  message: string,
  targetLocale: string = configDefaultLocale
): { format: (values?: InterpolationValues) => string } => {
  const resolveIcuMessage = createMessageResolver(icuToIntlayerFormatter);

  return {
    format: (values) =>
      resolveIcuMessage(message, values ?? {}, targetLocale as LocalesValues),
  };
};

const matchLocale = (value: string, pattern: RegExp): string | null => {
  const match = pattern.exec(value);
  return match ? (match[1] ?? match[0]) : null;
};

/** Reads a locale from `window.location.hostname` with a capture group. */
export const getLocaleFromHostname = (hostname: RegExp): string | null =>
  typeof window === 'undefined'
    ? null
    : matchLocale(window.location.hostname, hostname);

/** Reads a locale from `window.location.pathname` with a capture group. */
export const getLocaleFromPathname = (pathname: RegExp): string | null =>
  typeof window === 'undefined'
    ? null
    : matchLocale(window.location.pathname, pathname);

/** The browser's preferred locale. */
export const getLocaleFromNavigator = (): string | null =>
  typeof navigator === 'undefined'
    ? null
    : (navigator.languages?.[0] ?? navigator.language ?? null);

const readSearchParam = (search: string, key: string): string | null =>
  new URLSearchParams(search).get(key);

/** Reads the `key` query-string parameter of the current URL. */
export const getLocaleFromQueryString = (key: string): string | null =>
  typeof window === 'undefined'
    ? null
    : readSearchParam(window.location.search, key);

/** Reads the `key` parameter of the current URL hash (`#lang=fr`). */
export const getLocaleFromHash = (key: string): string | null =>
  typeof window === 'undefined'
    ? null
    : readSearchParam(window.location.hash.slice(1), key);
