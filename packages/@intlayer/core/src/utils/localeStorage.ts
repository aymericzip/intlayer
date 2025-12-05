import configuration from '@intlayer/config/built';
import type { CookiesAttributes, Locale, LocalesValues } from '@intlayer/types';
import { getStorageAttributes } from '../getStorageAttributes';
import { getCookie } from './getCookie';

type CookieBuildAttributes = {
  /**
   * Cookie domain to store the locale information
   *
   * Default: undefined
   *
   * Define the domain where the cookie is available. Defaults to
   * the domain of the page where the cookie was created.
   */
  domain?: string;
  /**
   * Cookie path to store the locale information
   *
   * Default: undefined
   *
   * Define the path where the cookie is available. Defaults to '/'
   */
  path?: string;
  /**
   * Cookie secure to store the locale information
   *
   * Default: undefined
   *
   * A Boolean indicating if the cookie transmission requires a
   * secure protocol (https). Defaults to false.
   */
  secure?: boolean;
  /**
   * Cookie httpOnly to store the locale information
   *
   * Default: undefined
   *
   * The cookie httpOnly where the locale information is stored.
   */
  httpOnly?: boolean;
  /**
   * Cookie sameSite to store the locale information
   *
   * Default: undefined
   *
   * Asserts that a cookie must not be sent with cross-origin requests,
   * providing some protection against cross-site request forgery
   * attacks (CSRF)
   */
  sameSite?: 'strict' | 'lax' | 'none';

  /**
   * Cookie expires to store the locale information
   *
   * Default: undefined
   *
   * Define when the cookie will be removed. Value can be a Number
   * which will be interpreted as days from time of creation or a
   * Date instance. If omitted, the cookie becomes a session cookie.
   */
  expires?: number | undefined;
};

const buildCookieString = (
  name: string,
  value: string,
  attributes: Omit<CookiesAttributes, 'name' | 'type'>
): string => {
  const encodedValue = encodeURIComponent(value);
  const parts: string[] = [`${name}=${encodedValue}`];

  if (attributes.path) parts.push(`Path=${attributes.path}`);
  if (attributes.domain) parts.push(`Domain=${attributes.domain}`);
  if (attributes.expires instanceof Date)
    parts.push(`Expires=${attributes.expires.toUTCString()}`);

  if (attributes.secure) parts.push('Secure');
  if (attributes.sameSite) parts.push(`SameSite=${attributes.sameSite}`);
  return parts.join('; ');
};

export type LocaleStorageOptions = {
  overwrite?: boolean;
  isCookieEnabled?: boolean;
  setCookieStore?: (
    name: string,
    value: string,
    cookie: CookieBuildAttributes
  ) => void;
  setCookieString?: (name: string, cookie: string) => void;
  getCookie?: (name: string) => string | undefined | null;
  setSessionStorage?: (name: string, value: string) => void;
  getSessionStorage?: (name: string) => string | undefined | null;
  setLocaleStorage?: (name: string, value: string) => void;
  getLocaleStorage?: (name: string) => string | undefined | null;
  getHeader?: (name: string) => string | undefined | null;
  setHeader?: (name: string, value: string) => void;
};

/**
 * Retrieves the locale from various storage mechanisms (cookies, localStorage, sessionStorage, headers).
 * The function checks storage locations in order of priority as defined in the configuration.
 *
 * @returns The locale if found in any storage, or undefined if not found
 */
export const getLocaleFromStorage = (
  options: Pick<
    LocaleStorageOptions,
    | 'getCookie'
    | 'getSessionStorage'
    | 'getLocaleStorage'
    | 'getHeader'
    | 'isCookieEnabled'
  >
): Locale | undefined => {
  const { routing, internationalization } = configuration;
  const { locales } = internationalization;
  const { storage } = routing;

  // If storage is disabled, return undefined
  if (storage === false || options?.isCookieEnabled === false) return undefined;

  const storageAttributes = getStorageAttributes(storage);

  const isValidLocale = (value: string | null | undefined): value is Locale => {
    if (!value) return false;

    return locales.includes(value as Locale);
  };

  const readCookie = (name: string): string | undefined => {
    // Prefer provided getter (server or custom environment)
    try {
      const fromOption = options?.getCookie?.(name);

      if (fromOption !== null && fromOption !== undefined) return fromOption;
    } catch {}

    // Fallback to browser cookie parsing
    return getCookie(name);
  };

  // 1) Check cookies first
  for (let i = 0; i < storageAttributes.cookies.length; i++) {
    const { name } = storageAttributes.cookies[i];

    const value = readCookie(name);

    if (isValidLocale(value)) return value;
  }

  // 2) Then check localStorage candidates (browser only)
  for (let i = 0; i < storageAttributes.localStorage.length; i++) {
    const { name } = storageAttributes.localStorage[i];

    try {
      const value = options?.getLocaleStorage?.(name);

      if (isValidLocale(value)) return value;
    } catch {}
  }

  // 3) Check sessionStorage candidates (browser only)
  for (let i = 0; i < storageAttributes.sessionStorage.length; i++) {
    const { name } = storageAttributes.sessionStorage[i];

    try {
      const value = options?.getSessionStorage?.(name);

      if (isValidLocale(value)) return value;
    } catch {}
  }

  // 4) Finally check header candidates (server only)
  for (let i = 0; i < storageAttributes.headers.length; i++) {
    const { name } = storageAttributes.headers[i];

    try {
      const value = options?.getHeader?.(name);

      if (isValidLocale(value)) return value;
    } catch {}
  }
};

/**
 * Stores the locale in various storage mechanisms (cookies, localStorage, sessionStorage, headers).
 * The function writes to all configured storage locations according to their attributes.
 * Respects overwrite flags for localStorage and sessionStorage.
 *
 * @param locale - The locale to store
 */
export const setLocaleInStorage = (
  locale: LocalesValues,
  options?: LocaleStorageOptions
): void => {
  // If storage is disabled, do nothing
  if (
    configuration.routing.storage === false ||
    options?.isCookieEnabled === false
  )
    return;

  const storageAttributes = getStorageAttributes(configuration.routing.storage);

  // Write to cookies (server via setCookie, client via cookieStore/document)
  for (let i = 0; i < storageAttributes.cookies.length; i++) {
    const { name, attributes } = storageAttributes.cookies[i];

    try {
      if (options?.setCookieStore) {
        options?.setCookieStore?.(name, locale, {
          ...attributes,
          expires:
            attributes.expires instanceof Date
              ? attributes.expires.getTime()
              : attributes.expires,
        });
      }
    } catch {
      try {
        if (options?.setCookieString) {
          const cookieString = buildCookieString(name, locale, attributes);

          options?.setCookieString?.(name, cookieString);
        }
      } catch {}
    }
  }

  // Write to localStorage (browser only)
  if (options?.setLocaleStorage) {
    for (let i = 0; i < storageAttributes.localStorage.length; i++) {
      const { name } = storageAttributes.localStorage[i];

      try {
        const shouldOverwrite = options?.overwrite ?? true;

        if (!shouldOverwrite && options?.getLocaleStorage) {
          const existing = options?.getLocaleStorage?.(name);
          if (existing) continue;
        }
        options?.setLocaleStorage?.(name, locale);
      } catch {}
    }
  }

  // Write to sessionStorage (browser only)
  if (options?.setSessionStorage) {
    for (let i = 0; i < storageAttributes.sessionStorage.length; i++) {
      const { name } = storageAttributes.sessionStorage[i];

      try {
        const shouldOverwrite = options?.overwrite ?? true;

        if (!shouldOverwrite && options?.getSessionStorage) {
          const existing = options?.getSessionStorage?.(name);
          if (existing) continue;
        }

        options?.setSessionStorage?.(name, locale);
      } catch {}
    }
  }

  // Write to headers (server only)
  if (options?.setHeader) {
    for (let i = 0; i < storageAttributes.headers.length; i++) {
      const { name } = storageAttributes.headers[i];

      try {
        options?.setHeader?.(name, locale);
      } catch {}
    }
  }
};

/**
 * Utility object to get and set the locale in the storage by considering the configuration
 *
 * @property getLocale - Retrieves the locale from various storage mechanisms (cookies, localStorage, sessionStorage, headers).
 * Retrieves the locale from various storage mechanisms (cookies, localStorage, sessionStorage, headers).
 * The function checks storage locations in order of priority as defined in the configuration.
 *
 * @property setLocale - Stores the locale in various storage mechanisms (cookies, localStorage, sessionStorage, headers).
 * The function writes to all configured storage locations according to their attributes.
 * Respects overwrite flags for localStorage and sessionStorage.
 *
 * @returns The locale if found in any storage, or undefined if not found
 */
export const LocaleStorage = (options: LocaleStorageOptions) => ({
  getLocale: () => getLocaleFromStorage(options),
  setLocale: (locale: LocalesValues) => setLocaleInStorage(locale, options),
});
