import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types';

import Cookies from 'js-cookie';

const { cookieName } = configuration?.middleware ?? {};

const cookieAttributes: Cookies.CookieAttributes = {
  path: '/',
  expires: undefined,
  domain: undefined,
  secure: false,
  sameSite: 'strict',
};

/**
 * Get the locale cookie
 */
export const localeCookie = cookieName
  ? (Cookies.get(cookieName) as LocalesValues | undefined)
  : undefined;

/**
 * Set the locale cookie
 */
export const setLocaleCookie = (locale: LocalesValues) => {
  if (!cookieName) return;
  Cookies.set(cookieName, locale, cookieAttributes);
};

/**
 * Hook that provides the locale cookie and a function to set it
 */
export const useLocaleCookie = () => ({
  localeCookie,
  setLocaleCookie,
});
