import { routing } from '@intlayer/config/built';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { getCookie } from '../utils/getCookie';
import { getLocale } from './getLocale';
import { getLocaleFromPath } from './getLocaleFromPath';
import { isDeclaredLocale } from './getPrefix';

// ── Tree-shake constants ──────────────────────────────────────────────────────
// When these env vars are injected at build time, bundlers eliminate the
// branches guarded by these constants.

/**
 * True when the build-time routing mode is known and is NOT 'no-prefix'.
 */
const TREE_SHAKE_NO_PREFIX =
  process.env.INTLAYER_ROUTING_MODE &&
  process.env.INTLAYER_ROUTING_MODE !== 'no-prefix';

/**
 * True when the build-time routing mode is known and is NOT 'search-params'.
 */
const TREE_SHAKE_SEARCH_PARAMS =
  process.env.INTLAYER_ROUTING_MODE &&
  process.env.INTLAYER_ROUTING_MODE !== 'search-params';

/**
 * True when the build-time routing mode is known and is not a prefix-based
 * mode (neither 'prefix-all' nor 'prefix-no-default').
 */
const TREE_SHAKE_PREFIX_MODES =
  process.env.INTLAYER_ROUTING_MODE &&
  process.env.INTLAYER_ROUTING_MODE !== 'prefix-all' &&
  process.env.INTLAYER_ROUTING_MODE !== 'prefix-no-default';

/**
 * The part of a Web `Request` (or of a framework request context such as a
 * Remix `RequestContext`) the locale is resolved from.
 */
export type LocaleRequest = {
  url: string | URL;
  headers: Headers;
};

/**
 * Locale explicitly carried by the URL, or `undefined` when it carries none.
 *
 * Unlike {@link getLocaleFromPath}, a missing `?locale=` in `search-params`
 * mode is not read as the default locale: the request may still be served
 * without the proxy that appends the param, so the stored locale and
 * `Accept-Language` must get a chance to resolve it.
 */
const getExplicitUrlLocale = (
  url: string | URL
): DeclaredLocales | undefined => {
  if (!TREE_SHAKE_SEARCH_PARAMS && routing?.mode === 'search-params') {
    const localeParam = new URL(
      url.toString(),
      'http://localhost'
    ).searchParams.get('locale') as LocalesValues | null;

    return isDeclaredLocale(localeParam) ? localeParam : undefined;
  }

  if (!TREE_SHAKE_PREFIX_MODES) {
    return getLocaleFromPath(url.toString());
  }

  return undefined;
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
  if (TREE_SHAKE_NO_PREFIX || routing?.mode !== 'no-prefix') {
    const urlLocale = getExplicitUrlLocale(url);

    if (urlLocale) return urlLocale;
  }

  return getLocale({
    getHeader: (name) => headers.get(name),
    getCookie: (name) => getCookie(name, headers.get('cookie') ?? undefined),
  });
};
