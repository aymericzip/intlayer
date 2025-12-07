import {
  getRequestHeader,
  getRequestHeaders,
} from '@tanstack/react-start/server';
import { getCookie, getLocale as getLocaleCore, type Locale } from 'intlayer';

export const getLocale = async (): Promise<Locale> =>
  getLocaleCore({
    // Fallback using Accept-Language negotiation
    getAllHeaders: async () => {
      const headers = getRequestHeaders();
      const result: Record<string, string> = {};

      // Convert the TypedHeaders into a plain Record<string, string>
      for (const [key, value] of headers.entries()) {
        result[key] = value;
      }

      return result;
    },
    // Get the cookie from the request (default: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader('cookie');

      return getCookie(name, cookieString);
    },
    // Get the header from the request (default: 'x-intlayer-locale')
    getHeader: (name) => getRequestHeader(name),
  });
