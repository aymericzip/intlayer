// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('@intlayer/core/interpreter', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@intlayer/core/interpreter')>()),
  getIntlayer: vi.fn((dictionaryKey: string, _locale: string) => {
    if (dictionaryKey === 'about') {
      return {
        title: 'About',
        counter: { label: 'Counter' },
        items: '{count, plural, one {# item} other {# items}}',
        greeting: 'Hello {name}',
        gender: '{gender, select, male {He} female {She} other {They}}',
        terms: 'Accept the <link>terms</link> now',
      };
    }
    throw new Error('Dictionary not found');
  }),
}));

import { createNamespaceTranslator } from './namespaceTranslator';

describe('createNamespaceTranslator', () => {
  it('should resolve keys inside a namespace', () => {
    const t = createNamespaceTranslator('en', 'about');
    expect(t('title')).toBe('About');
    expect(t('counter.label')).toBe('Counter');
  });

  it('should resolve nested namespaces as key prefixes', () => {
    const t = createNamespaceTranslator('en', 'about.counter');
    expect(t('label')).toBe('Counter');
  });

  it('should resolve root-scope keys from their first segment', () => {
    const t = createNamespaceTranslator('en');
    expect(t('about.title')).toBe('About');
  });

  it('should resolve ICU plural messages', () => {
    const t = createNamespaceTranslator('en', 'about');
    expect(t('items', { count: 1 })).toBe('1 item');
    expect(t('items', { count: 3 })).toBe('3 items');
  });

  it('should resolve ICU select messages', () => {
    const t = createNamespaceTranslator('en', 'about');
    expect(t('gender', { gender: 'female' })).toBe('She');
  });

  it('should interpolate simple ICU arguments', () => {
    const t = createNamespaceTranslator('en', 'about');
    expect(t('greeting', { name: 'John' })).toBe('Hello John');
  });

  it('should echo the namespaced key when missing', () => {
    const t = createNamespaceTranslator('en', 'about');
    expect(t('missing')).toBe('about.missing');
  });

  it('should expose has() and raw()', () => {
    const t = createNamespaceTranslator('en', 'about');
    expect(t.has('title')).toBe(true);
    expect(t.has('missing')).toBe(false);
    expect(t.raw('counter')).toEqual({ label: 'Counter' });
  });

  it('should resolve markup through string renderers', () => {
    const t = createNamespaceTranslator('en', 'about');
    expect(
      t.markup('terms', {
        link: (chunks: string) => `<a href="/terms">${chunks}</a>`,
      })
    ).toBe('Accept the <a href="/terms">terms</a> now');
  });

  it('should resolve rich text through React renderers', () => {
    const t = createNamespaceTranslator('en', 'about');
    const richResult = t.rich('terms', {
      link: (chunks) => ({ chunks }),
    });
    // The result is a React fragment tree; assert it is not the raw string
    expect(typeof richResult).not.toBe('string');
  });
});
