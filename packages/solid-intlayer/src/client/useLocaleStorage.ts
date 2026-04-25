import { localeStorageOptions } from '@intlayer/core/localization';
import {
  getLocaleFromStorageClient,
  LocaleStorageClient,
  setLocaleInStorageClient as setLocaleInStorageCore,
} from '@intlayer/core/utils';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { createMemo } from 'solid-js';

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
