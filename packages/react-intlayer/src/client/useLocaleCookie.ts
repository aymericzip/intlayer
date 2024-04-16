/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import {
  type Locales,
  intlayerMiddlewareConfiguration,
} from '@intlayer/config/client';
import Cookies from 'js-cookie';

const { cookieName } = intlayerMiddlewareConfiguration;

const cookieAttributes: Cookies.CookieAttributes = {
  path: '/',
  expires: undefined,
  domain: undefined,
  secure: false,
  sameSite: 'strict',
};

export const localeCookie = Cookies.get(cookieName) as Locales | undefined;

export const setLocaleCookie = (locale: Locales) => {
  Cookies.set(cookieName, locale, cookieAttributes);
};

export const useLocaleCookie = () => ({
  localeCookie,
  setLocaleCookie,
});
