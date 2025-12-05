/**
 * Retrieves a cookie by name from a cookie string or document.cookie
 * @param name - The name of the cookie to retrieve
 * @param cookieString - Optional cookie string to parse (defaults to document.cookie in browser)
 * @returns The cookie value or undefined if not found
 */
export const getCookie = (
  name: string,
  cookieString?: string
): string | undefined => {
  try {
    const str =
      cookieString ?? (typeof document !== 'undefined' ? document.cookie : '');

    if (!str) return undefined;

    const pairs = str.split(';');

    for (let i = 0; i < pairs.length; i++) {
      const part = pairs[i].trim();

      if (!part) continue;

      const equalIndex = part.indexOf('=');
      const key = equalIndex >= 0 ? part.substring(0, equalIndex) : part;

      if (key === name) {
        const rawValue = equalIndex >= 0 ? part.substring(equalIndex + 1) : '';

        try {
          return decodeURIComponent(rawValue);
        } catch {
          return rawValue;
        }
      }
    }
  } catch {}
  return undefined;
};
