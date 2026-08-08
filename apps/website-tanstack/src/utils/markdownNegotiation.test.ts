import { describe, expect, it } from 'vitest';
import {
  getRawMarkdownPath,
  hasLocalePrefix,
  prefersMarkdown,
} from './markdownNegotiation';

describe('hasLocalePrefix', () => {
  it('detects a two-letter locale', () => {
    expect(hasLocalePrefix('/fr/doc/raw/why')).toBe(true);
  });

  it('detects a region-qualified locale', () => {
    expect(hasLocalePrefix('/en-GB/doc/raw/why')).toBe(true);
  });

  it('detects a locale-only path', () => {
    expect(hasLocalePrefix('/fr')).toBe(true);
  });

  it('rejects a path whose first segment is a section', () => {
    expect(hasLocalePrefix('/doc/raw/why')).toBe(false);
    expect(hasLocalePrefix('/blog/raw/why')).toBe(false);
  });

  it('rejects the root path', () => {
    expect(hasLocalePrefix('/')).toBe(false);
  });
});

describe('prefersMarkdown', () => {
  it('returns false when no Accept header is sent', () => {
    expect(prefersMarkdown(null)).toBe(false);
    expect(prefersMarkdown('')).toBe(false);
  });

  it('returns false for a browser Accept header', () => {
    expect(
      prefersMarkdown(
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
      )
    ).toBe(false);
  });

  it('returns false for a bare wildcard', () => {
    expect(prefersMarkdown('*/*')).toBe(false);
  });

  it('returns true when markdown is the only requested type', () => {
    expect(prefersMarkdown('text/markdown')).toBe(true);
  });

  it('returns true when markdown outranks html', () => {
    expect(prefersMarkdown('text/markdown,text/html;q=0.9')).toBe(true);
  });

  it('returns true when markdown ties with html', () => {
    expect(prefersMarkdown('text/markdown,text/html')).toBe(true);
  });

  it('returns false when html outranks markdown', () => {
    expect(prefersMarkdown('text/html,text/markdown;q=0.5')).toBe(false);
  });

  it('ignores casing and surrounding whitespace', () => {
    expect(prefersMarkdown('  TEXT/MARKDOWN ; q=1.0 ')).toBe(true);
  });

  it('treats a malformed quality value as the default of 1', () => {
    expect(prefersMarkdown('text/markdown;q=abc,text/html;q=0.9')).toBe(true);
  });
});

describe('getRawMarkdownPath', () => {
  it('rewrites a non-localized documentation path', () => {
    expect(getRawMarkdownPath('/doc/get-started')).toBe('/doc/raw/get-started');
  });

  it('preserves the locale prefix', () => {
    expect(getRawMarkdownPath('/fr/doc/get-started')).toBe(
      '/fr/doc/raw/get-started'
    );
  });

  it('preserves a region-qualified locale prefix', () => {
    expect(getRawMarkdownPath('/en-GB/doc/get-started')).toBe(
      '/en-GB/doc/raw/get-started'
    );
  });

  it('handles nested slugs', () => {
    expect(getRawMarkdownPath('/doc/concept/cms')).toBe('/doc/raw/concept/cms');
  });

  it.each(['blog', 'frequent-questions'])(
    'supports the %s section',
    (section) => {
      expect(getRawMarkdownPath(`/${section}/some-slug`)).toBe(
        `/${section}/raw/some-slug`
      );
    }
  );

  it('ignores section index pages, which have no raw counterpart', () => {
    expect(getRawMarkdownPath('/doc')).toBeUndefined();
    expect(getRawMarkdownPath('/fr/doc')).toBeUndefined();
  });

  it('ignores paths outside the negotiable sections', () => {
    expect(getRawMarkdownPath('/')).toBeUndefined();
    expect(getRawMarkdownPath('/cms')).toBeUndefined();
    expect(getRawMarkdownPath('/fr/playground/anything')).toBeUndefined();
  });

  it('ignores interactive pages that render no markdown source', () => {
    expect(getRawMarkdownPath('/doc/search')).toBeUndefined();
    expect(getRawMarkdownPath('/fr/doc/chat')).toBeUndefined();
  });

  it('does not nest an already-raw path', () => {
    expect(getRawMarkdownPath('/doc/raw/get-started')).toBeUndefined();
    expect(getRawMarkdownPath('/fr/doc/raw/get-started')).toBeUndefined();
  });
});
