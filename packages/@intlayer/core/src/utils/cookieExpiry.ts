import type { ProcessedCookieAttributes } from '@intlayer/types/config';

/**
 * Resolves a normalized cookie `expires` value to an absolute timestamp
 * (epoch ms). The value is produced by the config-build merge step, so it is
 * already unambiguous:
 *
 * - `number` → seconds from now (relative lifetime);
 * - `string` → an absolute ISO date.
 *
 * Returns `undefined` when no usable expiry is provided so callers fall back
 * to a session cookie.
 *
 * @param expires - The normalized `expires` value from the built config.
 * @returns The absolute expiry in epoch milliseconds, or `undefined`.
 */
export const resolveExpiresToTimestamp = (
  expires: ProcessedCookieAttributes['expires']
): number | undefined => {
  if (typeof expires === 'number') return Date.now() + expires * 1000;
  if (typeof expires === 'string') {
    const time = Date.parse(expires);
    return Number.isNaN(time) ? undefined : time;
  }
  return undefined;
};

/**
 * Serializes a cookie into a `document.cookie` string. Expiry is emitted as an
 * absolute `Expires=` attribute resolved from the normalized `expires` value.
 *
 * @param name - The cookie name.
 * @param value - The cookie value (URL-encoded by this helper).
 * @param attributes - The normalized cookie attributes.
 * @returns The serialized cookie string.
 */
export const buildCookieString = (
  name: string,
  value: string,
  attributes: ProcessedCookieAttributes
): string => {
  const parts: string[] = [`${name}=${encodeURIComponent(value)}`];

  if (attributes.path) parts.push(`Path=${attributes.path}`);
  if (attributes.domain) parts.push(`Domain=${attributes.domain}`);
  const expiresTimestamp = resolveExpiresToTimestamp(attributes.expires);
  if (expiresTimestamp !== undefined)
    parts.push(`Expires=${new Date(expiresTimestamp).toUTCString()}`);
  if (attributes.secure) parts.push('Secure');
  if (attributes.sameSite) parts.push(`SameSite=${attributes.sameSite}`);
  return parts.join('; ');
};
