import { describe, expect, it } from 'vitest';
import {
  findContentPath,
  getUsageTargetCandidates,
  resolveDictionaryTarget,
} from './resolveDictionaryTarget';

type TestDictionary = { key: string; content: unknown };

/** Loader over an in-memory `key → content` map. */
const createLoader =
  (catalog: Record<string, unknown>) =>
  (dictionaryKey: string): TestDictionary[] | undefined =>
    dictionaryKey in catalog
      ? [{ key: dictionaryKey, content: catalog[dictionaryKey] }]
      : undefined;

describe('findContentPath', () => {
  it('walks nested objects', () => {
    expect(
      findContentPath({ hero: { title: 'Hi' } }, ['hero', 'title'])
    ).toEqual(['hero', 'title']);
  });

  it('matches flat dotted keys, alone or mixed with nesting', () => {
    const content = {
      'shared.footer.github': 'GitHub',
      settings: { 'profile.title': 'Profile' },
    };

    expect(findContentPath(content, ['shared', 'footer', 'github'])).toEqual([
      'shared.footer.github',
    ]);
    expect(findContentPath(content, ['settings', 'profile', 'title'])).toEqual([
      'settings',
      'profile.title',
    ]);
  });

  it('reads through translation nodes', () => {
    const content = {
      title: { nodeType: 'translation', translation: { en: { short: 'x' } } },
    };

    expect(findContentPath(content, ['title', 'short'])).toEqual([
      'title',
      'short',
    ]);
  });

  it('returns null for a missing field', () => {
    expect(findContentPath({ hero: {} }, ['hero', 'title'])).toBeNull();
  });
});

describe('getUsageTargetCandidates', () => {
  it('adds the whole-file catalog fallbacks', () => {
    expect(
      getUsageTargetCandidates({
        dictionaryKey: 'shared',
        fieldPath: ['footer'],
      })
    ).toEqual([
      { dictionaryKey: 'shared', fieldPath: ['footer'] },
      { dictionaryKey: 'index', fieldPath: ['shared', 'footer'] },
      { dictionaryKey: 'index', fieldPath: ['footer'] },
    ]);
  });

  it("uses lingui's `messages` catalog", () => {
    expect(
      getUsageTargetCandidates({
        dictionaryKey: 'messages',
        fieldPath: ['mockBanner'],
        library: 'lingui',
      })
    ).toContainEqual({ dictionaryKey: 'mockBanner', fieldPath: [] });
  });
});

describe('resolveDictionaryTarget', () => {
  it('keeps a direct match', async () => {
    const resolved = await resolveDictionaryTarget(
      { dictionaryKey: 'home', fieldPath: ['title'] },
      createLoader({ home: { title: 'Home' }, index: { home: { title: 'x' } } })
    );

    expect(resolved).toMatchObject({
      dictionaryKey: 'home',
      fieldPath: ['title'],
      isFieldResolved: true,
    });
  });

  it('falls back to the index catalog with flat keys (i18next)', async () => {
    const resolved = await resolveDictionaryTarget(
      { dictionaryKey: 'shared', fieldPath: ['footer', 'github'] },
      createLoader({ index: { 'shared.footer.github': 'GitHub' } })
    );

    expect(resolved).toMatchObject({
      dictionaryKey: 'index',
      fieldPath: ['shared.footer.github'],
      isFieldResolved: true,
    });
  });

  it('prefers a candidate whose field exists over one whose dictionary exists', async () => {
    const resolved = await resolveDictionaryTarget(
      { dictionaryKey: 'footer', fieldPath: ['github'] },
      createLoader({ footer: {}, index: { footer: { github: 'GitHub' } } })
    );

    expect(resolved).toMatchObject({
      dictionaryKey: 'index',
      fieldPath: ['footer', 'github'],
    });
  });

  it('falls back to the existing dictionary when the field is missing', async () => {
    const resolved = await resolveDictionaryTarget(
      { dictionaryKey: 'footer', fieldPath: ['missing'] },
      createLoader({ footer: { github: 'GitHub' } })
    );

    expect(resolved).toMatchObject({
      dictionaryKey: 'footer',
      fieldPath: ['missing'],
      isFieldResolved: false,
    });
  });

  it('returns null when no candidate dictionary is built', async () => {
    expect(
      await resolveDictionaryTarget(
        { dictionaryKey: 'footer', fieldPath: ['github'] },
        createLoader({})
      )
    ).toBeNull();
  });
});
