import { localeStorageOptions } from '@intlayer/core/localization';
import {
  getLocaleFromStorageClient,
  LocaleStorageClient,
  setLocaleInStorageClient as setLocaleInStorageCore,
} from '@intlayer/core/utils';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

/**
 * Get the current locale from storage (cookie or localStorage).
 */
export const localeInStorage = getLocaleFromStorageClient(localeStorageOptions);

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
export const useLocaleCookie = (isCookieEnabled?: boolean) => {
  const storage = useLocaleStorage(isCookieEnabled);

  return {
    localeCookie: storage.localeStorage,
    setLocaleCookie: storage.setLocaleStorage,
  };
};
