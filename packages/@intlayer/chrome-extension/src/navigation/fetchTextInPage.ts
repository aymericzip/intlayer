/**
 * Fetches a URL from inside the inspected page, so same-origin files
 * (`robots.txt`, sitemaps) are readable without extension host permissions.
 *
 * IMPORTANT: this function is serialized and injected into the inspected page
 * via `chrome.scripting.executeScript`. It therefore MUST be fully
 * self-contained: no closure over module-level values and no runtime imports.
 */
export const fetchTextInPage = async (
  url: string,
  timeoutInMilliseconds: number
): Promise<string | null> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutInMilliseconds);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
};
