export const verifyIntlayerBundle = async (url: string): Promise<boolean> => {
  try {
    console.log(`[verifyIntlayerBundle] Fetching ${url}...`);
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(
        `[verifyIntlayerBundle] Failed to fetch ${url}: ${response.status}`
      );
      return false;
    }

    const html = await response.text();

    const regex =
      /name\s*:\s*['"]Intlayer['"]\s*,\s*version\s*:\s*['"][^'"]+['"]\s*,\s*doc\s*:\s*[`'"]https:\/\/intlayer\.org\/docs[`'"]/i;

    if (regex.test(html)) {
      console.log(`[verifyIntlayerBundle] Found Intlayer metadata in HTML!`);
      return true;
    }

    const scriptSrcRegex =
      /(?:src=|href=|import\()\\?['"]([^'"]+\.(?:js|mjs|cjs)[^'"]*)['"]/gi;
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
          console.log(
            `[verifyIntlayerBundle] Found Intlayer metadata in script ${scriptUrl}!`
          );
          return true;
        }
      } catch {
        // ignore gracefully. Might be unreachable or cross-origin issues
      }
    }
  } catch (error) {
    console.error(
      `[verifyIntlayerBundle] Error verifying bundle for ${url}:`,
      error
    );
  }

  return false;
};
