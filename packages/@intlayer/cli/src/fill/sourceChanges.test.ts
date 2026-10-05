import type { Dictionary } from '@intlayer/types/dictionary';
import { describe, expect, it, vi } from 'vitest';
import {
  getChangedContent,
  getSourceChangesRef,
  getStaleSourceContent,
  omitChangedContent,
} from './sourceChanges';

vi.mock('@intlayer/engine/build', () => ({}));
vi.mock('@intlayer/engine/cli', () => ({
  getGitMergeBase: vi.fn(async () => 'abc123'),
}));

const getDictionary = (
  title: Record<string, string>,
  subtitle: Record<string, string>
): Dictionary => ({
  key: 'home',
  content: {
    title: { nodeType: 'translation', translation: title },
    subtitle: { nodeType: 'translation', translation: subtitle },
  },
});

describe('getChangedContent', () => {
  it('returns only the changed values', () => {
    expect(
      getChangedContent(
        { a: 'Hi', b: 'Bye', c: { d: 'Same' } },
        { a: 'Hello', b: 'Bye', c: { d: 'Same' } }
      )
    ).toEqual({ a: 'Hello' });
  });

  it('returns undefined when nothing changed', () => {
    expect(getChangedContent({ a: ['x', 'y'] }, { a: ['x', 'y'] })).toBe(
      undefined
    );
  });

  it('compares arrays as a whole', () => {
    expect(getChangedContent({ a: ['x', 'y'] }, { a: ['x', 'z'] })).toEqual({
      a: ['x', 'z'],
    });
  });
});

describe('omitChangedContent', () => {
  it('removes changed values from the target content', () => {
    expect(
      omitChangedContent(
        { a: 'Salut', b: 'Au revoir', c: { d: 'x', e: 'y' } },
        { a: 'Hello', c: { d: 'z' } }
      )
    ).toEqual({ b: 'Au revoir', c: { e: 'y' } });
  });
});

describe('getStaleSourceContent', () => {
  const current = getDictionary(
    { en: 'Hello', fr: 'Salut' },
    { en: 'Welcome', fr: 'Bienvenue' }
  );

  it('returns source values changed since the previous version', () => {
    const previous = getDictionary(
      { en: 'Hi', fr: 'Salut' },
      { en: 'Welcome', fr: 'Bienvenue' }
    );

    expect(getStaleSourceContent(previous, current, 'en', 'fr')).toEqual({
      title: 'Hello',
    });
  });

  it('keeps translations updated in the same change', () => {
    const previous = getDictionary(
      { en: 'Hi', fr: 'Coucou' },
      { en: 'Welcome', fr: 'Bienvenue' }
    );

    expect(getStaleSourceContent(previous, current, 'en', 'fr')).toBe(
      undefined
    );
  });

  it('returns undefined without a previous version', () => {
    expect(getStaleSourceContent(undefined, current, 'en', 'fr')).toBe(
      undefined
    );
  });

  it('compares per-locale files on their source only', () => {
    const perLocale = (title: string): Dictionary => ({
      key: 'home',
      locale: 'en',
      content: { title },
    });

    expect(
      getStaleSourceContent(perLocale('Hi'), perLocale('Hello'), 'en', 'fr')
    ).toEqual({ title: 'Hello' });
  });
});

describe('getSourceChangesRef', () => {
  it('compares to the last commit by default', async () => {
    expect(await getSourceChangesRef()).toBe('HEAD');
    expect(await getSourceChangesRef({ mode: ['uncommitted'] })).toBe('HEAD');
  });

  it('compares to the upstream for unpushed changes', async () => {
    expect(await getSourceChangesRef({ mode: ['unpushed'] })).toBe('@{push}');
  });

  it('compares to the merge base with --git-diff', async () => {
    expect(
      await getSourceChangesRef({ mode: ['gitDiff'], baseRef: 'origin/main' })
    ).toBe('abc123');
  });
});
