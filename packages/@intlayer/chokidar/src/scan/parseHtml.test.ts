import { describe, expect, it } from 'vitest';
import {
  byteLength,
  extractAnchors,
  extractHreflangs,
  extractHtmlDir,
  extractHtmlLang,
  extractScriptUrls,
  extractVisibleTextStrings,
  hasCanonical,
} from './parseHtml';

const html = `<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <title>Example</title>
    <link rel="canonical" href="https://example.com/" />
    <link rel="alternate" hreflang="en" href="https://example.com/en" />
    <link rel="alternate" hreflang="fr" href="https://example.com/fr" />
    <link rel="alternate" hreflang="x-default" href="https://example.com/" />
    <link rel="modulepreload" href="/assets/chunk.js" />
    <script src="/assets/main.js"></script>
    <script>console.log('inline')</script>
  </head>
  <body>
    <a href="/en/about">About</a>
    <a href="/contact">Contact</a>
    <a href="https://external.com/x">External</a>
    <p>Hello world</p>
  </body>
</html>`;

describe('parseHtml', () => {
  it('extracts the html lang and dir attributes', () => {
    expect(extractHtmlLang(html)).toBe('en');
    expect(extractHtmlDir(html)).toBe('ltr');
  });

  it('detects the canonical link', () => {
    expect(hasCanonical(html)).toBe(true);
    expect(hasCanonical('<html><head></head></html>')).toBe(false);
  });

  it('extracts hreflang links including x-default', () => {
    const hreflangs = extractHreflangs(html);
    expect(hreflangs).toHaveLength(3);
    expect(hreflangs.map((h) => h.hreflang)).toContain('x-default');
  });

  it('extracts eagerly-loaded script urls as absolute', () => {
    const urls = extractScriptUrls(html, 'https://example.com/');
    expect(urls).toContain('https://example.com/assets/main.js');
    expect(urls).toContain('https://example.com/assets/chunk.js');
  });

  it('extracts anchors with their text', () => {
    const anchors = extractAnchors(html);
    expect(anchors).toHaveLength(3);
    expect(anchors[0]).toEqual({ href: '/en/about', text: 'About' });
  });

  it('extracts visible text without scripts', () => {
    const strings = extractVisibleTextStrings(html);
    expect(strings).toContain('Hello world');
    expect(strings.some((s) => s.includes('console.log'))).toBe(false);
  });

  it('measures UTF-8 byte length', () => {
    expect(byteLength('abc')).toBe(3);
    expect(byteLength('é')).toBe(2);
  });
});
