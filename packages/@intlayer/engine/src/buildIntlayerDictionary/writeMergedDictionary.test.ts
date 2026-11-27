import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { writeMergedDictionaries } from './writeMergedDictionary';

const loggedMessages: string[] = [];

vi.mock('@intlayer/config/logger', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@intlayer/config/logger')>()),
  getAppLogger: () => (message: string | string[]) => {
    loggedMessages.push([message].flat().join(' '));
  },
}));

const buildDictionary = (
  filePath: string,
  content: Record<string, unknown>,
  extra: Partial<Dictionary> = {}
) =>
  ({
    key: 'home',
    localId: `home::local::${filePath}`,
    filePath,
    location: 'local',
    content,
    ...extra,
  }) as unknown as Dictionary;

const translation = (translations: Record<string, unknown> | string) => ({
  nodeType: 'translation',
  translation:
    typeof translations === 'string' ? { en: translations } : translations,
});

describe('writeMergedDictionaries', () => {
  let baseDir: string;
  let configuration: IntlayerConfig;

  const merge = async (dictionaries: Dictionary[]) => {
    const output = await writeMergedDictionaries(
      { home: { dictionaryPath: '', dictionaries } },
      configuration
    );

    return output.home!.dictionary as Dictionary;
  };

  beforeEach(async () => {
    loggedMessages.length = 0;
    baseDir = await mkdtemp(join(tmpdir(), 'intlayer-merged-'));

    configuration = {
      system: { dictionariesDir: join(baseDir, 'dictionary') },
      internationalization: { locales: ['en', 'fr'] },
      editor: { dictionaryPriorityStrategy: 'local_first' },
    } as unknown as IntlayerConfig;
  });

  afterEach(async () => {
    await rm(baseDir, { recursive: true, force: true });
  });

  it('merges fields declared in different files', async () => {
    const merged = await merge([
      buildDictionary('src/a/home.content.ts', { title: translation('A') }),
      buildDictionary('src/b/home.content.ts', { subtitle: translation('B') }),
    ]);

    expect(merged.content).toMatchObject({
      translation: { en: { title: 'A', subtitle: 'B' } },
    });
    expect(loggedMessages).toEqual([]);
  });

  it('warns when two files of the same priority declare the same field with different values', async () => {
    const fileA = buildDictionary('src/a/home.content.ts', {
      title: translation('Title from A'),
    });
    const fileB = buildDictionary('src/b/home.content.ts', {
      title: translation('Title from B'),
    });

    // The file order alone picks the value that is kept
    expect((await merge([fileA, fileB])).content).toMatchObject({
      translation: { en: { title: 'Title from A' } },
    });
    expect((await merge([fileB, fileA])).content).toMatchObject({
      translation: { en: { title: 'Title from B' } },
    });

    expect(loggedMessages).toHaveLength(2);
    expect(loggedMessages[0]).toContain('home');
    expect(loggedMessages[0]).toContain('title (en)');
    expect(loggedMessages[0]).toContain('src/a/home.content.ts');
    expect(loggedMessages[0]).toContain('src/b/home.content.ts');
    expect(loggedMessages[0]).toContain('priority');
  });

  it('lists every locale of a conflicting field in a single warning', async () => {
    await merge([
      buildDictionary('src/a/home.content.ts', {
        title: translation({ en: 'Hello', fr: 'Bonjour' }),
        subtitle: translation({ en: 'Same', fr: 'Pareil' }),
      }),
      buildDictionary('src/b/home.content.ts', {
        title: translation({ en: 'Hi', fr: 'Salut' }),
        subtitle: translation({ en: 'Same', fr: 'Pareil' }),
      }),
    ]);

    expect(loggedMessages).toHaveLength(1);
    expect(loggedMessages[0]).toContain('title (en, fr)');
    expect(loggedMessages[0]).not.toContain('subtitle');
  });

  it('warns when arrays of plain values differ', async () => {
    await merge([
      buildDictionary('src/a/home.content.ts', { tags: ['a', 'b'] }),
      buildDictionary('src/b/home.content.ts', { tags: ['a', 'b', 'c'] }),
    ]);

    expect(loggedMessages).toHaveLength(1);
    expect(loggedMessages[0]).toContain('tags (en, fr)');
  });

  it('does not warn when the priority decides which value is kept', async () => {
    const merged = await merge([
      buildDictionary('src/a/home.content.ts', { title: translation('A') }),
      buildDictionary(
        'src/b/home.content.ts',
        { title: translation('B') },
        { priority: 10 }
      ),
    ]);

    expect(merged.content).toMatchObject({
      translation: { en: { title: 'B' } },
    });
    expect(loggedMessages).toEqual([]);
  });

  it('does not warn when the location decides which value is kept', async () => {
    await merge([
      buildDictionary('src/a/home.content.ts', { title: translation('A') }),
      buildDictionary(
        'src/b/home.content.ts',
        { title: translation('B') },
        { location: 'remote' }
      ),
    ]);

    expect(loggedMessages).toEqual([]);
  });

  it('does not warn for per-locale files completing a multilingual one', async () => {
    await merge([
      buildDictionary('src/home.content.ts', { title: translation('Hello') }),
      buildDictionary(
        'src/home.fr.content.ts',
        { title: 'Bonjour' },
        { locale: 'fr' }
      ),
    ]);

    expect(loggedMessages).toEqual([]);
  });

  it('does not warn when both files declare the same value', async () => {
    await merge([
      buildDictionary('src/a/home.content.ts', { title: translation('Same') }),
      buildDictionary('src/b/home.content.ts', { title: translation('Same') }),
    ]);

    expect(loggedMessages).toEqual([]);
  });
});
