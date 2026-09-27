/** URL helpers shared by the scan checks (browser-safe). */

/** Parse a possibly relative URL, returning `undefined` when it is invalid. */
export const parseUrl = (url: string, baseUrl?: string): URL | undefined => {
  try {
    return new URL(url, baseUrl);
  } catch {
    return undefined;
  }
};

/** Strip a leading `www.` so `www.example.com` and `example.com` compare equal. */
export const normalizeHostname = (hostname: string): string =>
  hostname.toLowerCase().replace(/^www\./, '');

/**
 * Canonical comparable form of a URL: no hash, no trailing slash (except the
 * root), `www.` stripped. Returns the input unchanged when it cannot be parsed.
 */
export const normalizeUrl = (url: string, baseUrl?: string): string => {
  const parsedUrl = parseUrl(url, baseUrl);
  if (!parsedUrl) return url;

  const pathname =
    parsedUrl.pathname.length > 1
      ? parsedUrl.pathname.replace(/\/+$/, '')
      : parsedUrl.pathname;

  return `${parsedUrl.protocol}//${normalizeHostname(parsedUrl.host)}${pathname}${parsedUrl.search}`;
};

/** First non-empty segment of a URL path (`/fr/about` → `fr`). */
export const getFirstPathSegment = (pathname: string): string | undefined =>
  pathname.split('/').find(Boolean);

/**
 * Whether the URL is fully qualified (`https://host/…`), as hreflang requires.
 * Relative (`/fr`), protocol-relative (`//host/fr`) and non-HTTP URLs are not.
 */
export const isAbsoluteUrl = (url: string): boolean =>
  /^https?:\/\/[^/\s?#]+/i.test(url.trim());

/**
 * Approximate registrable domain of a hostname (`gtm.crowdin.com` →
 * `crowdin.com`, `www.airbnb.co.uk` → `airbnb.co.uk`), without a public
 * suffix list: a short second-level label under a country code is treated as
 * part of the suffix.
 */
export const getSiteDomain = (hostname: string): string => {
  const labels = normalizeHostname(hostname).split('.');
  if (labels.length <= 2) return labels.join('.');
  const topLevelLabel = labels[labels.length - 1] ?? '';
  const secondLevelLabel = labels[labels.length - 2] ?? '';
  const isCompoundSuffix =
    topLevelLabel.length === 2 && secondLevelLabel.length <= 3;
  return labels.slice(isCompoundSuffix ? -3 : -2).join('.');
};
