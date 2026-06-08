/**
 * Returns the Google Favicon service URL for a given project URL.
 */
export const getFaviconUrl = (url: string): string | null => {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}`;
  } catch {
    return null;
  }
};
