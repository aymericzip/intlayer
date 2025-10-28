/**
 * Compare two URLs for equality.
 * This function is used to determine if a message originates from the same origin.
 *
 * ```js
 * // Example usage
 * console.log(compareUrls("http://localhost:5173/", "http://localhost:5173")); // true
 * console.log(compareUrls("http://localhost:5173", "http://localhost:5173?myParam=true")); // true
 * console.log(compareUrls("http://localhost:5173/subpath", "http://localhost:5173")); // true
 * console.log(compareUrls("http://localhost:5172", "http://localhost:5173")); // false
 * ```
 *
 * @param url1 - The first URL to compare.
 * @param url2 - The second URL to compare.
 * @returns Whether the two URLs are equal.
 */
export const compareUrls = (url1: string, url2: string): boolean => {
  try {
    const parsedUrl1 = new URL(url1);
    const parsedUrl2 = new URL(url2);

    // Compare protocol, hostname, and port
    if (
      parsedUrl1.protocol !== parsedUrl2.protocol ||
      parsedUrl1.hostname !== parsedUrl2.hostname ||
      parsedUrl1.port !== parsedUrl2.port
    ) {
      return false;
    }

    // One URL should not have a subpath while the other does
    const path1 = parsedUrl1.pathname.replace(/\/$/, ''); // Remove trailing slash
    const path2 = parsedUrl2.pathname.replace(/\/$/, '');

    if (path1 !== '' && path2 !== '' && path1 !== path2) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Invalid URL(s)', error, { url1, url2 });
    return false;
  }
};
