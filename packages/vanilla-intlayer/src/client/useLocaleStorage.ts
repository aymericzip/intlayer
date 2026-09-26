import {
  getCachedLocaleFromStorageClient,
  getLocaleFromStorageClient,
  LocaleStorageClient,
  localeStorageOptions,
  setLocaleInStorageClient as setLocaleInStorageCore,
} from '@intlayer/core/utils';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

/**
 * Reads the locale persisted in the browser storage (cookie, localStorage…).
 *
 * Unlike `localeInStorage`, read on first call rather than at import, then
 * cached until the next `setLocaleInStorage`. Never cached on the server.
 */
export const getLocaleInStorage = getCachedLocaleFromStorageClient;

/**
 * Get the current locale from storage (cookie or localStorage).
 *
 * Read once at import time; marked pure so bundlers drop the read when nothing
 * imports it.
 */
export const localeInStorage =
  /* @__PURE__ */ getLocaleFromStorageClient(localeStorageOptions);

/**
 * @deprecated Use localeInStorage instead.
 */
export const localeCookie = localeInStorage;

/**
 * Persist the locale to storage (cookie and/or localStorage).
 */
export const setLocaleInStorage = (
  locale: LocalesValues,
  isCookieEnabled: boolean
) =>
  setLocaleInStorageCore(locale, {
    ...localeStorageOptions,
    isCookieEnabled,
  });

/**
 * @deprecated Use setLocaleInStorage instead.
 */
export const setLocaleCookie = setLocaleInStorage;

/**
 * Returns the current locale from storage and a setter.
 */
export const useLocaleStorage = (isCookieEnabled?: boolean) => {
  const storage = LocaleStorageClient({
    ...localeStorageOptions,
    isCookieEnabled,
  });

  return {
    localeStorage: storage.getLocale(),
    setLocaleStorage: storage.setLocale,
  };
};

/**
 * @deprecated Use useLocaleStorage instead.
 */
export const useLocaleCookie = useLocaleStorage;
