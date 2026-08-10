/** @module normalizeJsonLdUrl */

/**
 * Matches every run of two or more slashes that is *not* the protocol
 * separator, i.e. any run preceded by a character other than `:`.
 */
const DUPLICATED_PATH_SLASHES = /([^:])\/{2,}/g;

/**
 * Collapses duplicated slashes inside a URL path while preserving both the
 * protocol separator (`https://`) and protocol-relative prefixes (`//cdn…`).
 *
 * Call sites routinely concatenate an origin constant that already ends with a
 * slash (e.g. `Website_Home` === `https://intlayer.org/`) with a leading-slash
 * path, which yields URLs such as `https://intlayer.org//assets/logo.png`.
 * Those resolve, but search engines treat them as distinct from their
 * single-slash canonical form, so every URL emitted in JSON-LD is normalized
 * here rather than at each of the ~100 call sites.
 *
 * @param url - Absolute or relative URL, possibly containing duplicated slashes.
 * @returns The URL with duplicated path slashes collapsed, or the input
 *   unchanged when it is not a string.
 */
export const normalizeJsonLdUrl = <TUrl extends string | undefined>(
  url: TUrl
): TUrl =>
  (typeof url === 'string'
    ? url.replace(DUPLICATED_PATH_SLASHES, '$1/')
    : url) as TUrl;

/**
 * Applies {@link normalizeJsonLdUrl} to every entry of a URL list.
 *
 * @param urls - List of URLs, or `undefined` when the field is omitted.
 * @returns The normalized list, or `undefined` when no list was provided.
 */
export const normalizeJsonLdUrls = <TUrls extends string[] | undefined>(
  urls: TUrls
): TUrls => (urls?.map((url) => normalizeJsonLdUrl(url)) as TUrls) ?? urls;
