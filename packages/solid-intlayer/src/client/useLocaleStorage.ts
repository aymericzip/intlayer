import {
  getLocaleFromStorageClient,
  LocaleStorageClient,
  localeStorageOptions,
  setLocaleInStorageClient as setLocaleInStorageCore,
} from '@intlayer/core/utils';
import type { Locale } from '@intlayer/types/allLocales';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { createMemo } from 'solid-js';

let hasReadLocaleInStorage = false;
let storedLocale: Locale | undefined;

/**
 * Reads the locale persisted in the browser storage (cookie, localStorage…)
 * on first call, then serves that value — like `localeInStorage`, without
 * reading storage at import time.
 */
export const getLocaleInStorage = (): Locale | undefined => {
  if (!hasReadLocaleInStorage) {
    storedLocale = getLocaleFromStorageClient(localeStorageOptions);
    hasReadLocaleInStorage = true;
  }

  return storedLocale;
};

/**
 * Get the locale cookie
 *
 * Read once at import time; marked pure so bundlers drop the read when nothing
 * imports it.
 */
export const localeInStorage =
  /* @__PURE__ */ getLocaleFromStorageClient(localeStorageOptions);

/**
 * @deprecated Use localeInStorage instead
 *
 * Get the locale cookie
 */
export const localeCookie = localeInStorage;

/**
 * Set the locale cookie
 */
export const setLocaleInStorage = (
  locale: LocalesValues,
  isCookieEnabled?: boolean
) =>
  setLocaleInStorageCore(locale, {
    ...localeStorageOptions,
    isCookieEnabled,
  });

/**
 * @deprecated Use setLocaleInStorage instead
 *
 * Set the locale cookie
 */
export const setLocaleCookie = setLocaleInStorage;

/**
 * Hook that provides the locale storage and a function to set it
 */
export const useLocaleStorage = (isCookieEnabled?: boolean) =>
  createMemo(() =>
    LocaleStorageClient({
      ...localeStorageOptions,
      isCookieEnabled,
    })
  );

/**
 * @deprecated Use useLocaleStorage instead
 *
 * For GDPR compliance, use useLocaleStorage instead
 *
 * Hook that provides the locale cookie and a function to set it
 */
export const useLocaleCookie = useLocaleStorage;
