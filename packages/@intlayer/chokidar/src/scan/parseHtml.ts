/**
 * Tiny dependency-free HTML extraction helpers.
 *
 * The hosted backend audit relies on Cheerio + a real browser, but the CLI scan
 * must stay dependency-light. These regex-based helpers cover the handful of
 * head/anchor signals the score needs. They are intentionally forgiving: when a
 * tag can't be parsed it is simply skipped rather than throwing.
 */

/** Compute the UTF-8 byte length of a string in both Node and browser builds. */
export const byteLength = (text: string): number =>
  typeof Buffer !== 'undefined'
    ? Buffer.byteLength(text, 'utf-8')
    : new TextEncoder().encode(text).length;

/** Read an attribute value off a single tag's attribute string. */
const readAttribute = (
  attributes: string,
  attributeName: string
): string | undefined => {
  const match = attributes.match(
    new RegExp(`${attributeName}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i')
  );
  if (!match) return undefined;
  return match[2] ?? match[3] ?? match[4];
};

/** Extract the `lang` attribute of the `<html>` element, if present. */
export const extractHtmlLang = (html: string): string | undefined => {
  const htmlTag = html.match(/<html\b([^>]*)>/i);
  return htmlTag ? readAttribute(htmlTag[1], 'lang') : undefined;
};

/** Extract the `dir` attribute of the `<html>` element, if present. */
export const extractHtmlDir = (html: string): string | undefined => {
  const htmlTag = html.match(/<html\b([^>]*)>/i);
  return htmlTag ? readAttribute(htmlTag[1], 'dir') : undefined;
};

/** Extract the document `<title>` text. */
export const extractTitle = (html: string): string => {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? match[1].trim() : '';
};

/** Extract the `<meta name="description">` content. */
export const extractMetaDescription = (html: string): string => {
  const metas = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const meta of metas) {
    if (/name\s*=\s*("|')?description\1?/i.test(meta)) {
      return readAttribute(meta, 'content') ?? '';
    }
  }
  return '';
};

/** Extract the `<meta property="og:image">` content. */
export const extractOgImage = (html: string): string | undefined => {
  const metas = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const meta of metas) {
    if (/property\s*=\s*("|')?og:image\1?/i.test(meta)) {
      return readAttribute(meta, 'content');
    }
  }
  return undefined;
};

/** Whether a `<link rel="canonical">` element is present. */
export const hasCanonical = (html: string): boolean => {
  const links = html.match(/<link\b[^>]*>/gi) ?? [];
  return links.some((link) => /rel\s*=\s*("|')?canonical\1?/i.test(link));
};

/** A parsed `<link rel="alternate" hreflang>` element. */
export type HreflangLink = { hreflang: string; href: string };

/** Extract every `<link rel="alternate" hreflang="…" href="…">` element. */
export const extractHreflangs = (html: string): HreflangLink[] => {
  const links = html.match(/<link\b[^>]*>/gi) ?? [];
  const result: HreflangLink[] = [];
  for (const link of links) {
    if (!/rel\s*=\s*("|')?alternate\1?/i.test(link)) continue;
    const hreflang = readAttribute(link, 'hreflang');
    const href = readAttribute(link, 'href');
    if (hreflang && href) result.push({ hreflang, href });
  }
  return result;
};

/**
 * Extract every eagerly-loaded script URL: `<script src>`,
 * `<link rel="modulepreload">` and `<link rel="preload" as="script">`.
 *
 * @param html - The raw HTML document.
 * @param baseUrl - Base URL used to resolve relative script URLs.
 * @returns Absolute, de-duplicated script URLs.
 */
export const extractScriptUrls = (html: string, baseUrl: string): string[] => {
  const urls = new Set<string>();

  const add = (raw: string | undefined) => {
    if (!raw) return;
    try {
      urls.add(new URL(raw, baseUrl).href);
    } catch {
      /* ignore malformed URLs */
    }
  };

  for (const script of html.match(/<script\b[^>]*>/gi) ?? []) {
    add(readAttribute(script, 'src'));
  }

  for (const link of html.match(/<link\b[^>]*>/gi) ?? []) {
    const rel = readAttribute(link, 'rel')?.toLowerCase();
    const as = readAttribute(link, 'as')?.toLowerCase();
    if (rel === 'modulepreload' || (rel === 'preload' && as === 'script')) {
      add(readAttribute(link, 'href'));
    }
  }

  return Array.from(urls);
};

/** A parsed `<a href>` anchor. */
export type Anchor = { href: string; text: string };

/** Extract every `<a href="…">text</a>` anchor from the document. */
export const extractAnchors = (html: string): Anchor[] => {
  const anchors: Anchor[] = [];
  const anchorPattern = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let match = anchorPattern.exec(html);
  while (match !== null) {
    const href = readAttribute(match[1], 'href');
    if (href) {
      const text = match[2]
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      anchors.push({ href, text });
    }
    match = anchorPattern.exec(html);
  }
  return anchors;
};

/**
 * Extract visible text snippets from an HTML document (scripts, styles and
 * tags stripped). Used to approximate the rendered content size without a DOM.
 */
export const extractVisibleTextStrings = (html: string): string[] => {
  const withoutNonVisible = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');

  return withoutNonVisible
    .replace(/<[^>]+>/g, '\n')
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter((line) => line.length > 1);
};
