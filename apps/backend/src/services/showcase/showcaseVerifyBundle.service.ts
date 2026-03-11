import { logger } from '@logger';

/**
 * Verifies that a given URL contains a valid Intlayer bundle
 * by scanning the HTML and linked scripts for Intlayer metadata.
 */
export const verifyIntlayerBundle = async (url: string): Promise<boolean> => {
  const fetchOptions = {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  };

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      logger.error(
        `Failed to fetch URL ${url}: ${response.status} ${response.statusText}`
      );
      return false;
    }

    const html = await response.text();

    // The user's metadata example typically looks like:
    // { name: "Intlayer", version: "...", doc: "https://intlayer.org/docs" }
    // Or minified: name:"Intlayer",version:"...",doc:"https://intlayer.org/docs"
    const metadataRegex = /['"]?name['"]?\s*:\s*['"]Intlayer['"]/i;

    if (metadataRegex.test(html)) {
      return true;
    }

    // Improved script detection: finds src="..." or src='...' or src=...
    // and also handles different extensions or no extensions
    const scriptSrcRegex =
      /(?:src|href)=\s*['"]?([^'"\s>]+(?:\.js|\.mjs|\.cjs)(?:\?[^'"\s>]*)?)['"]?/gi;

    const scriptUrls: string[] = [];

    // Use matchAll to avoid assignments in expressions (Biome lint)
    for (const match of html.matchAll(scriptSrcRegex)) {
      if (match[1]) {
        scriptUrls.push(match[1]);
      }
    }

    // Also look for imports in scripts or inline blocks
    const importRegex =
      /import\s*\(?\s*['"]?([^'"\s>]+\.(?:js|mjs|cjs)[^'"\s>]*)['"]?\s*\)?/gi;
    for (const match of html.matchAll(importRegex)) {
      if (match[1]) {
        scriptUrls.push(match[1]);
      }
    }

    // Look for any JS files referenced in string literals, like arrays of preloads in HTML
    const jsStringRegex =
      /['"]([^'"\s>]+(?:\.js|\.mjs|\.cjs)(?:\?[^'"\s>]*)?)['"]/gi;

    for (const match of html.matchAll(jsStringRegex)) {
      if (match[1]) {
        scriptUrls.push(match[1]);
      }
    }

    const uniqueScriptUrls = Array.from(new Set(scriptUrls));
    const visitedUrls = new Set<string>();
    const MAX_URLS_TO_CHECK = 50;

    for (let i = 0; i < uniqueScriptUrls.length && i < MAX_URLS_TO_CHECK; i++) {
      const scriptSrc = uniqueScriptUrls[i];
      try {
        const scriptUrl = new URL(scriptSrc, url).toString();

        if (visitedUrls.has(scriptUrl)) continue;
        visitedUrls.add(scriptUrl);

        const scriptResponse = await fetch(scriptUrl, fetchOptions);

        if (!scriptResponse.ok) continue;

        const scriptText = await scriptResponse.text();
        if (metadataRegex.test(scriptText)) {
          return true;
        }

        // If not found here, maybe this is an entry file that imports chunks.
        // We can look for strings that are `.js` files from this text, and append them
        // to `uniqueScriptUrls` to be checked in subsequent iterations.
        for (const match of scriptText.matchAll(jsStringRegex)) {
          const newSrc = match[1];
          if (newSrc && !uniqueScriptUrls.includes(newSrc)) {
            uniqueScriptUrls.push(newSrc);
          }
        }
      } catch (error) {
        // ignore cross-origin or unreachable scripts
        logger.debug(`Error fetching script ${scriptSrc} for ${url}:`, error);
      }
    }
  } catch (error) {
    logger.error(`Error verifying bundle for ${url}:`, error);
  }

  return false;
};
