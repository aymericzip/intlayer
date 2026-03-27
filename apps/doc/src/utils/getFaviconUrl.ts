/**
 * Returns the Google Favicon service URL for a given project URL.
 * It's recommended to use the 256 size for better quality.
 *
 * @param url The URL of the project (e.g., https://example.com)
 * @returns The Google Favicon service URL or null if the URL is invalid.
 */
export const getFaviconUrl = (url: string): string | null => {
  try {
    // Ensure the URL is valid by trying to create a URL object
    const domain = new URL(url).hostname;

    return `https://www.google.com/s2/favicons?domain=${domain}`;
  } catch {
    // Fallback for cases where URL might not have a protocol yet or is malformed
    if (url && !url.includes('://')) {
      try {
        const domain = new URL(`https://${url}`).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}`;
      } catch {
        return null;
      }
    }
    return null;
  }
};
