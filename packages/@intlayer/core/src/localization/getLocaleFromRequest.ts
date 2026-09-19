import { routing } from '@intlayer/config/built';
import type { DeclaredLocales } from '@intlayer/types/module_augmentation';
import { getCookie } from '../utils/getCookie';
import { getLocale } from './getLocale';
import { getLocaleFromPath } from './getLocaleFromPath';

/**
 * The part of a Web `Request` (or of a framework request context such as a
 * Remix `RequestContext`) the locale is resolved from.
 */
export type LocaleRequest = {
  url: string | URL;
  headers: Headers;
};

/**
 * Resolves the locale of an incoming Web request.
 *
 * Priority:
 * 1. The URL, in every routing mode but `no-prefix` (path prefix or `?locale=` search param).
 * 2. The locale persisted by the client (cookie or custom header).
 * 3. `Accept-Language` negotiation, falling back to the default locale.
 *
 * @example
 * ```ts
 * const locale = await getLocaleFromRequest(request);
 * ```
 */
export const getLocaleFromRequest = async ({
  url,
  headers,
}: LocaleRequest): Promise<DeclaredLocales> => {
  if (routing?.mode !== 'no-prefix') {
    const urlLocale = getLocaleFromPath(url.toString());

    if (urlLocale) return urlLocale;
  }

  return getLocale({
    getHeader: (name) => headers.get(name),
    getCookie: (name) => getCookie(name, headers.get('cookie') ?? undefined),
  });
};
