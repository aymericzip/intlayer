import { describe, expect, it } from 'vitest';
import { createPageSearch, getUrlPath } from './pageSearch';

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
