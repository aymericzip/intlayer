/**
 * Normalizes a `url` query value (trim, strip wrapping quotes).
 */
export const normalizeUrlQueryValue = (raw: string): string =>
  raw.trim().replace(/^["']+|["']+$/g, '');

const PRIVATE_IPV4 =
  /^(10\.|127\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|0\.|169\.254\.)/;

/**
 * Validates a remote URL for server-side markdown fetch (SSRF mitigation).
 * Allows only https, blocks localhost / obvious private hosts.
 */
export const assertSafeRemoteMarkdownUrl = (input: string): URL => {
  const normalized = normalizeUrlQueryValue(input);
  let url: URL;
  try {
    url = new URL(normalized);
  } catch {
    throw new TypeError('Invalid URL');
  }

  if (url.protocol !== 'https:') {
    throw new TypeError('Only https URLs are supported');
  }

  const host = url.hostname.toLowerCase();
  if (
    host === 'localhost' ||
    host === '0.0.0.0' ||
    host === '[::1]' ||
    host.endsWith('.localhost') ||
    host.endsWith('.local')
  ) {
    throw new TypeError('This host is not allowed');
  }

  if (PRIVATE_IPV4.test(host)) {
    throw new TypeError('This host is not allowed');
  }

  return url;
};
