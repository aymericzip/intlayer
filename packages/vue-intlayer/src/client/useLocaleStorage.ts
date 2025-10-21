import {
  getLocaleFromStorage,
  LocaleStorage,
  localeStorageOptions,
  setLocaleInStorage as setLocaleInStorageCore,
} from '@intlayer/core';
import type { LocalesValues } from '@intlayer/types';
import { computed } from 'vue';

/**
 * Get the locale cookie
 */
export const localeInStorage = getLocaleFromStorage(localeStorageOptions);
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
  isCookieEnabled: boolean
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
 * Composable that provides the locale storage and a function to set it
 */
export const useLocaleStorage = (isCookieEnabled?: boolean) => {
  const storage = LocaleStorage({
    ...localeStorageOptions,
    isCookieEnabled,
  });

  return {
    localeStorage: computed(() => storage.getLocale()),
    setLocaleStorage: storage.setLocale,
  };
};

/**
 * @deprecated Use useLocaleStorage instead
 *
 * For GDPR compliance, use useLocaleStorage instead
 *
 * Composable that provides the locale cookie and a function to set it
 */
export const useLocaleCookie = (isCookieEnabled?: boolean) => {
  const storage = useLocaleStorage(isCookieEnabled);

  return {
    localeCookie: storage.localeStorage,
    setLocaleCookie: storage.setLocaleStorage,
  };
};
