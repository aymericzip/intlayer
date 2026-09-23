import { describe, expect, it } from 'vitest';
import { createPageSearch, getLocalizedPages, getUrlPath } from './pageSearch';

describe('getUrlPath', () => {
  it('keeps path, query and hash', () => {
    expect(getUrlPath('https://example.com/fr/docs?tab=1#intro')).toBe(
      '/fr/docs?tab=1#intro'
    );
    expect(getUrlPath('https://example.com')).toBe('/');
  });

  it('returns invalid urls unchanged', () => {
    expect(getUrlPath('not a url')).toBe('not a url');
  });
});

describe('createPageSearch', () => {
  const searchPages = createPageSearch([
    'https://example.com/',
    'https://example.com/fr/pricing',
    'https://example.com/docs/get-started',
    'https://example.com/fr/docs/get-started',
  ]);

  it('returns every page, capped, for an empty query', () => {
    expect(searchPages('  ', 2).map((page) => page.path)).toEqual([
      '/',
      '/fr/pricing',
    ]);
  });

  it('fuzzy-matches anywhere in the path', () => {
    const paths = searchPages('get startd', 10).map((page) => page.path);

    expect(paths).toContain('/docs/get-started');
    expect(paths).toContain('/fr/docs/get-started');
    expect(paths).not.toContain('/fr/pricing');
  });
});

describe('getLocalizedPages', () => {
  it('dedupes by url, flags the current page and puts x-default last', () => {
    const pages = getLocalizedPages(
      [
        { hreflang: 'x-default', href: 'https://example.com/' },
        { hreflang: 'en', href: 'https://example.com/' },
        { hreflang: 'fr', href: 'https://example.com/fr' },
        { hreflang: 'es', href: 'https://example.com/es' },
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
