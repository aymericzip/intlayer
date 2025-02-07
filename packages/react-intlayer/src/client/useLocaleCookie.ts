import { type LocalesValues, getConfiguration } from '@intlayer/config/client';
import Cookies from 'js-cookie';

const { cookieName } = getConfiguration().middleware;

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
export const localeCookie = Cookies.get(cookieName) as unknown as
  | LocalesValues
  | undefined;

/**
 * Set the locale cookie
 */
export const setLocaleCookie = (locale: LocalesValues) => {
  Cookies.set(cookieName, locale, cookieAttributes);
};

/**
 * Hook that provides the locale cookie and a function to set it
 */
export const useLocaleCookie = () => ({
  localeCookie,
  setLocaleCookie,
});
