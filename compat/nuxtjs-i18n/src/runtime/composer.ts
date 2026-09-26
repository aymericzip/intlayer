import { getHTMLTextDir, getLocaleName } from '@intlayer/core/localization';
import {
  getCachedLocaleFromStorageClient,
  localeStorageOptions,
  setLocaleInStorageClient,
} from '@intlayer/core/utils';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DictionaryKeys,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import {
  type LooseComposer,
  type ScopedComposer,
  type TypedComposer,
  useDictionary as useDictionaryBase,
  useDictionaryDynamic as useDictionaryDynamicBase,
  useI18n as useI18nBase,
} from '@intlayer/vue-i18n';
import { type ComputedRef, computed } from 'vue';
import { createIntlayerClient } from 'vue-intlayer';
import type { LocaleObject, Strategies } from '../types';
import {
  defaultLocale,
  detectBrowserLocale,
  getActiveLocale,
  getCurrentFullPath,
  getRouter,
  localeCodes,
  localizeFullPath,
  strategy,
} from './routing';

/** What @nuxtjs/i18n adds to vue-i18n's composer. */
export type NuxtI18nComposerExtras = {
  locales: ComputedRef<LocaleObject[]>;
  localeCodes: ComputedRef<string[]>;
  localeProperties: ComputedRef<LocaleObject>;
  defaultLocale: string;
  strategy: Strategies;
  /** Activates a locale, persists it and navigates to the localized route. */
  setLocale: (locale: string) => Promise<void>;
  getBrowserLocale: () => string | undefined;
  getLocaleCookie: () => string | undefined;
  setLocaleCookie: (locale: string) => void;
  /** Kept for API parity: locale switches are never deferred. */
  finalizePendingLocaleChange: () => Promise<void>;
  /** Kept for API parity: locale switches are never deferred. */
  waitForPendingLocaleChange: () => Promise<void>;
  /** Kept for API parity: intlayer dictionaries need no loading. */
  loadLocaleMessages: (locale: string) => Promise<void>;
};

/** The @nuxtjs/i18n locale object describing a locale code. */
export const toLocaleObject = (code: string): LocaleObject => ({
  code,
  language: code,
  name: getLocaleName(code as LocalesValues, code as LocalesValues),
  dir: getHTMLTextDir(code as LocalesValues),
});

const localeObjects = localeCodes.map(toLocaleObject);

const resolveNothing = (): Promise<void> => Promise.resolve();

/**
 * Builds the Nuxt extras. Must run in a component setup, where the router is
 * reachable for `setLocale` navigation.
 */
const createComposerExtras = (): NuxtI18nComposerExtras => {
  const router = getRouter();
  const intlayerClient = createIntlayerClient();

  const setLocaleCookie = (locale: string): void =>
    setLocaleInStorageClient(locale as LocalesValues, localeStorageOptions);

  return {
    locales: computed(() => localeObjects),
    localeCodes: computed(() => localeCodes),
    localeProperties: computed(() => toLocaleObject(getActiveLocale())),
    defaultLocale,
    strategy,
    setLocale: async (locale) => {
      if (!localeCodes.includes(locale)) return;

      intlayerClient.setLocale(locale as LocalesValues);
      setLocaleCookie(locale);

      if (!router || strategy === 'no_prefix') return;

      await router.push(localizeFullPath(getCurrentFullPath(router), locale));
    },
    getBrowserLocale: detectBrowserLocale,
    getLocaleCookie: () => getCachedLocaleFromStorageClient(),
    setLocaleCookie,
    finalizePendingLocaleChange: resolveNothing,
    waitForPendingLocaleChange: resolveNothing,
    loadLocaleMessages: resolveNothing,
  };
};

type ComposerOptions = Record<string, unknown>;

type NuxtUseI18n = {
  <N extends DictionaryKeys>(
    options: ComposerOptions & { namespace: N }
  ): TypedComposer<N> & NuxtI18nComposerExtras;
  (
    options?: ComposerOptions & { namespace?: undefined }
  ): LooseComposer & NuxtI18nComposerExtras;
};

type NuxtUseDictionary = {
  <T extends Dictionary>(
    dictionary: T,
    options?: ComposerOptions & { namespace?: undefined }
  ): TypedComposer<T['key'] & DictionaryKeys> & NuxtI18nComposerExtras;
  <T extends Dictionary, Prefix extends string>(
    dictionary: T,
    options: ComposerOptions & { namespace: Prefix }
  ): ScopedComposer<T['key'] & DictionaryKeys, Prefix> & NuxtI18nComposerExtras;
};

type NuxtUseDictionaryDynamic = {
  <T extends Dictionary, K extends DictionaryKeys>(
    dictionaryLoaders: StrictModeLocaleMap<() => Promise<T>>,
    key: K,
    options?: ComposerOptions & { namespace?: undefined }
  ): TypedComposer<K> & NuxtI18nComposerExtras;
  <T extends Dictionary, K extends DictionaryKeys, Prefix extends string>(
    dictionaryLoaders: StrictModeLocaleMap<() => Promise<T>>,
    key: K,
    options: ComposerOptions & { namespace: Prefix }
  ): ScopedComposer<K, Prefix> & NuxtI18nComposerExtras;
};

/**
 * `useI18n()` of @nuxtjs/i18n: vue-i18n's composer (backed by intlayer
 * dictionaries) plus the Nuxt locale helpers.
 */
export const useI18n = ((options?: ComposerOptions) => ({
  ...useI18nBase(options),
  ...createComposerExtras(),
})) as NuxtUseI18n;

/**
 * Build-optimized `useI18n({ namespace })`: the optimize pass rewrites the
 * call to pass the dictionary, so only it reaches the bundle.
 */
export const useDictionary = ((
  dictionary: Dictionary,
  options?: ComposerOptions
) => ({
  ...useDictionaryBase(dictionary, options),
  ...createComposerExtras(),
})) as NuxtUseDictionary;

/** Per-locale lazy variant of {@link useDictionary}. */
export const useDictionaryDynamic = ((
  dictionaryLoaders: StrictModeLocaleMap<() => Promise<Dictionary>>,
  key: DictionaryKeys,
  options?: ComposerOptions
) => ({
  ...useDictionaryDynamicBase(dictionaryLoaders, key, options),
  ...createComposerExtras(),
})) as NuxtUseDictionaryDynamic;
