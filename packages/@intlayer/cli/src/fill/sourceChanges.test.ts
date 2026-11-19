import { getGitMergeBase, hasGitRef, readGitFile } from '@intlayer/engine/cli';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import { describe, expect, it, vi } from 'vitest';
import {
  getChangedContent,
  getSourceChangesRef,
  getStaleSourceContent,
  loadPreviousDictionaries,
  omitChangedContent,
} from './sourceChanges';

vi.mock('@intlayer/engine/build', () => ({}));
vi.mock('@intlayer/engine/cli', () => ({
  getGitMergeBase: vi.fn(),
  hasGitRef: vi.fn(),
  readGitFile: vi.fn(),
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
    vi.mocked(hasGitRef).mockResolvedValue(true);

    expect(await getSourceChangesRef()).toEqual({ ref: 'HEAD' });
    expect(await getSourceChangesRef({ mode: ['uncommitted'] })).toEqual({
      ref: 'HEAD',
    });
  });

  it('compares to the upstream for unpushed changes', async () => {
    vi.mocked(hasGitRef).mockResolvedValue(true);

    expect(await getSourceChangesRef({ mode: ['unpushed'] })).toEqual({
      ref: '@{push}',
    });
  });

  it('compares to the merge base with --git-diff', async () => {
    vi.mocked(getGitMergeBase).mockResolvedValue('abc123');

    expect(
      await getSourceChangesRef({ mode: ['gitDiff'], baseRef: 'origin/main' })
    ).toEqual({ ref: 'abc123' });
  });

  it('skips when git or the last commit is not available', async () => {
    vi.mocked(hasGitRef).mockResolvedValue(false);

    const result = await getSourceChangesRef(undefined, '/project');

    expect(hasGitRef).toHaveBeenCalledWith('HEAD', '/project');
    expect(result.ref).toBe(undefined);
    expect(result.skipReason).toContain('git ref HEAD not found');
  });

  it('skips with --git-diff when the merge base is missing', async () => {
    // Shallow clone (e.g. actions/checkout with its default fetch-depth: 1)
    vi.mocked(getGitMergeBase).mockResolvedValue(undefined);

    const result = await getSourceChangesRef({
      mode: ['gitDiff'],
      baseRef: 'origin/main',
    });

    expect(result.ref).toBe(undefined);
    expect(result.skipReason).toContain('fetch-depth: 0');
  });
});

describe('loadPreviousDictionaries', () => {
  const configuration = {
    system: { baseDir: '/project' },
  } as IntlayerConfig;

  const getEntry = (location: string): Dictionary => ({
    key: 'home',
    localId: `home::${location}::src/home.content.json`,
    location,
    filePath: 'src/home.content.json',
    content: {},
  });

  it('reads git only for local and hybrid dictionaries', async () => {
    vi.mocked(readGitFile).mockResolvedValue(undefined);

    const previousDictionaries = await loadPreviousDictionaries(
      [
        getEntry('local'),
        getEntry('hybrid'),
        getEntry('remote'),
        getEntry('plugin'),
        getEntry('sync-json::messages/{{locale}}.json'),
      ],
      configuration,
      'HEAD'
    );

    expect(previousDictionaries).toEqual({});
    expect(readGitFile).toHaveBeenCalledTimes(2);
    expect(readGitFile).toHaveBeenCalledWith(
      '/project/src/home.content.json',
      'HEAD'
    );
  });
});
