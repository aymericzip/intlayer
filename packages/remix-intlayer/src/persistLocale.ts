import {
  type CookieBuildAttributes,
  setLocaleInStorageServer,
} from '@intlayer/core/utils';
import type { Locale } from '@intlayer/types/allLocales';
import { SetCookie } from 'remix/headers';

/**
 * Serializes a locale cookie as a `Set-Cookie` header value.
 */
const serializeCookie = (
  name: string,
  value: string,
  attributes: CookieBuildAttributes
): string =>
  new SetCookie({
    name,
    value,
    path: attributes.path,
    domain: attributes.domain,
    expires:
      attributes.expires === undefined
        ? undefined
        : new Date(attributes.expires),
    secure: attributes.secure,
    httpOnly: attributes.httpOnly,
    sameSite: attributes.sameSite
      ? ((attributes.sameSite.charAt(0).toUpperCase() +
          attributes.sameSite.slice(1)) as 'Strict' | 'Lax' | 'None')
      : undefined,
  }).toString();

/**
 * Writes the locale into the storage headers configured in `routing.storage`
 * (custom header, and the cookie when `includeCookie` is set).
 */
export const writeLocaleHeaders = (
  headers: Headers,
  locale: Locale,
  { includeCookie = false }: { includeCookie?: boolean } = {}
): void =>
  setLocaleInStorageServer(locale, {
    setHeader: (name, value) => headers.set(name, value),
    setCookieStore: includeCookie
      ? (name, value, attributes) =>
          headers.append('set-cookie', serializeCookie(name, value, attributes))
      : undefined,
  });

/**
 * Returns the response with the locale headers set. A response whose headers
 * are immutable (`Response.redirect`, `Response.error`) is re-created.
 */
export const withLocaleHeaders = (
  response: Response,
  locale: Locale
): Response => {
  // Written apart first: `setLocaleInStorageServer` swallows setter errors,
  // so an immutable target has to be detected on the copy.
  const localeHeaders = new Headers();
  writeLocaleHeaders(localeHeaders, locale);

  try {
    for (const [name, value] of localeHeaders) {
      response.headers.set(name, value);
    }

    return response;
  } catch {
    const headers = new Headers(response.headers);

    for (const [name, value] of localeHeaders) {
      headers.set(name, value);
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }
};
