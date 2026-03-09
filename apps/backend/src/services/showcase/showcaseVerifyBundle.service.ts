import { logger } from '@logger';

/**
 * Verifies that a given URL contains a valid Intlayer bundle
 * by scanning the HTML and linked scripts for Intlayer metadata.
 */
export const verifyIntlayerBundle = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return false;
    }

    const html = await response.text();

    const regex = /['"]?name['"]?\s*:\s*['"]Intlayer['"]/i;

    if (regex.test(html)) {
      return true;
    }

    const scriptSrcRegex =
      /(?:src=|href=|import\()\\?['"]?([^'"\s>]+\.(?:js|mjs|cjs)[^'"\s>]*)['"]?/gi;
    const scriptUrls: string[] = [];
    let match: RegExpExecArray | null = scriptSrcRegex.exec(html);

    while (match !== null) {
      const src = match[1];
      if (src) {
        scriptUrls.push(src);
      }
      match = scriptSrcRegex.exec(html);
    }

    for (const scriptSrc of scriptUrls) {
      try {
        const scriptUrl = new URL(scriptSrc, url).toString();
        const scriptResponse = await fetch(scriptUrl);
        if (!scriptResponse.ok) continue;

        const scriptText = await scriptResponse.text();
        if (regex.test(scriptText)) {
          return true;
        }
      } catch {
        // ignore cross-origin or unreachable scripts
      }
    }
  } catch (error) {
    logger.error(`Error verifying bundle for ${url}:`, error);
  }

  return false;
};
