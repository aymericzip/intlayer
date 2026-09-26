import { describe, expect, it } from 'vitest';
import { detectRoutingStrategy } from './detectRoutingStrategy';
import { getLocalizedPages, isBaseLocalePage } from './localizedPages';

describe('getLocalizedPages', () => {
  it('dedupes by url, flags the current page and puts x-default last', () => {
    const pages = getLocalizedPages(
      [
        { hreflang: 'x-default', href: 'https://example.com/' },
        { hreflang: 'en', href: 'https://example.com/' },
        { hreflang: 'fr', href: 'https://example.com/fr' },
        { hreflang: 'es', href: '/es' },
        { hreflang: '', href: 'https://example.com/de' },
      ],
      'https://example.com/fr/'
    );

    expect(pages).toEqual([
      { hreflang: 'en', url: 'https://example.com/', isCurrent: false },
      { hreflang: 'fr', url: 'https://example.com/fr', isCurrent: true },
      { hreflang: 'es', url: 'https://example.com/es', isCurrent: false },
    ]);
  });

  it('keeps a standalone x-default entry', () => {
    const pages = getLocalizedPages(
      [
        { hreflang: 'x-default', href: 'https://example.com/' },
        { hreflang: 'fr', href: 'https://example.com/fr' },
      ],
      'https://example.com/fr'
    );

    expect(pages.map((page) => page.hreflang)).toEqual(['fr', 'x-default']);
  });
});

describe('isBaseLocalePage', () => {
  const check = (
    pageUrl: string,
    hreflangs: { hreflang: string; href: string }[]
  ) =>
    isBaseLocalePage({
      pageUrl,
      hreflangs,
      routing: detectRoutingStrategy({ pageUrl, hreflangs }),
    });

  const noDefaultAlternates = [
    { hreflang: 'en', href: 'https://example.com/about' },
    { hreflang: 'fr', href: 'https://example.com/fr/about' },
  ];

  it('flags the unprefixed default locale of prefix-no-default', () => {
    expect(check('https://example.com/about', noDefaultAlternates)).toBe(true);
    expect(check('https://example.com/fr/about', noDefaultAlternates)).toBe(
      false
    );
  });

  it('flags the root of a prefix-all site and the x-default target', () => {
    const prefixAllAlternates = [
      { hreflang: 'en', href: 'https://example.com/en' },
      { hreflang: 'fr', href: 'https://example.com/fr' },
      { hreflang: 'x-default', href: 'https://example.com/' },
    ];
    expect(check('https://example.com/', prefixAllAlternates)).toBe(true);
    expect(check('https://example.com/en', prefixAllAlternates)).toBe(false);
  });

  it('flags the page without the locale query parameter', () => {
    const searchParamAlternates = [
      { hreflang: 'en', href: 'https://example.com/page' },
      { hreflang: 'fr', href: 'https://example.com/page?lang=fr' },
    ];
    expect(check('https://example.com/page', searchParamAlternates)).toBe(true);
    expect(
      check('https://example.com/page?lang=fr', searchParamAlternates)
    ).toBe(false);
  });

  it('never flags a single-locale site', () => {
    expect(check('https://example.com/', [])).toBe(false);
  });
});
