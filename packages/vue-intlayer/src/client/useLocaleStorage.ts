import { localeStorageOptions } from '@intlayer/core/localization';
import {
  getLocaleFromStorageClient,
  LocaleStorageClient,
  setLocaleInStorageClient as setLocaleInStorageCore,
} from '@intlayer/core/utils';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { computed } from 'vue';

/**
 * Get the locale cookie
 */
export const localeInStorage = getLocaleFromStorageClient(localeStorageOptions);
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
  const storage = LocaleStorageClient({
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
export const useLocaleCookie = useLocaleStorage;
