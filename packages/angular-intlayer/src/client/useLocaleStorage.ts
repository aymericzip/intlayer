import {
  getLocaleFromStorageClient,
  LocaleStorageClient,
  localeStorageOptions,
  setLocaleInStorageClient as setLocaleInStorageCore,
} from '@intlayer/core/utils';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

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
 * Hook that provides the locale storage and a function to set it
 */
export const useLocaleStorage = (isCookieEnabled?: boolean) =>
  LocaleStorageClient({
    ...localeStorageOptions,
    isCookieEnabled,
  });

/**
 * @deprecated Use useLocaleStorage instead
 *
 * For GDPR compliance, use useLocaleStorage instead
 *
 * Hook that provides the locale cookie and a function to set it
 */
export const useLocaleCookie = (isCookieEnabled?: boolean) => {
  const storage = useLocaleStorage(isCookieEnabled);

  return {
    localeCookie: storage.getLocale(),
    setLocaleCookie: storage.setLocale,
  };
};
