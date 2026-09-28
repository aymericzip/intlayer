import type { Dictionary } from '@intlayer/types/dictionary';
import { describe, expect, it } from 'vitest';
import {
  applyDictionaryEdit,
  getEditability,
  parseEditPath,
} from './editDictionaryContent';

const fakeDictionary = {
  key: 'app-content',
  localId: 'app-content::local::src/app.content.ts',
  filePath: 'src/app.content.ts',
  content: {
    title: {
      nodeType: 'translation',
      translation: { en: 'Hello', fr: 'Bonjour' },
    },
    mixed: {
      nodeType: 'translation',
      translation: {
        en: 'Edit me',
        fr: { nodeType: 'html', html: 'Édite <b>moi</b>' },
      },
    },
    nested: {
      cta: {
        nodeType: 'translation',
        translation: { en: 'Get started', fr: 'Commencer' },
      },
    },
    plainNote: 'Read-only note',
    list: ['first', 'second'],
    count: 5,
    intro: { nodeType: 'markdown', markdown: 'Hello **World**!' },
  },
} as unknown as Dictionary;

describe('parseEditPath', () => {
  it('parses a translation edit from [translationPath, locale]', () => {
    expect(parseEditPath(['title', 'fr'])).toEqual({
      kind: 'translation',
      path: 'title',
      locale: 'fr',
    });
  });

  it('parses a plain-string edit from [path]', () => {
    expect(parseEditPath(['plainNote'])).toEqual({
      kind: 'plain-string',
      path: 'plainNote',
    });
  });

  it('keeps dot-joined translation paths as a single segment', () => {
    expect(parseEditPath(['nested.cta', 'en'])).toEqual({
      kind: 'translation',
      path: 'nested.cta',
      locale: 'en',
    });
  });

  it('strips a leading section name defensively', () => {
    expect(parseEditPath(['Translations', 'title', 'fr'])).toEqual({
      kind: 'translation',
      path: 'title',
      locale: 'fr',
    });
  });

  it('rejects root, empty and deeper paths', () => {
    expect(parseEditPath([])).toBeNull();
    expect(parseEditPath(['(root)'])).toBeNull();
    expect(parseEditPath(['a', 'b', 'c'])).toBeNull();
  });
});

describe('getEditability', () => {
  it('flags translation nodes with only plain string locales', () => {
    expect(getEditability(fakeDictionary, 'title')).toBe('translation');
    expect(getEditability(fakeDictionary, 'nested.cta')).toBe('translation');
  });

  it('flags plain string leaves', () => {
    expect(getEditability(fakeDictionary, 'plainNote')).toBe('plain-string');
  });

  it('rejects rich, mixed, numeric and unknown nodes', () => {
    // mixed holds an html node under fr
    expect(getEditability(fakeDictionary, 'mixed')).toBeNull();
    expect(getEditability(fakeDictionary, 'intro')).toBeNull();
    expect(getEditability(fakeDictionary, 'count')).toBeNull();
    expect(getEditability(fakeDictionary, 'list')).toBeNull();
    expect(getEditability(fakeDictionary, 'missing')).toBeNull();
    expect(getEditability(fakeDictionary, '(root)')).toBeNull();
  });
});

describe('applyDictionaryEdit', () => {
  it('updates the edited locale of a translation node', () => {
    const updated = applyDictionaryEdit(
      fakeDictionary,
      { kind: 'translation', path: 'title', locale: 'fr' },
      'Salut'
    );

    const content = updated?.content as Record<string, any>;

    expect(content.title.translation).toEqual({ en: 'Hello', fr: 'Salut' });
  });

  it('updates a nested translation node', () => {
    const updated = applyDictionaryEdit(
      fakeDictionary,
      { kind: 'translation', path: 'nested.cta', locale: 'en' },
      'Start now'
    );

    const content = updated?.content as Record<string, any>;

    expect(content.nested.cta.translation.en).toBe('Start now');
  });

  it('updates a plain string leaf', () => {
    const updated = applyDictionaryEdit(
      fakeDictionary,
      { kind: 'plain-string', path: 'plainNote' },
      'Edited note'
    );

    const content = updated?.content as Record<string, unknown>;

    expect(content.plainNote).toBe('Edited note');
  });

  it('keeps the declaration metadata for the server to locate the file', () => {
    const updated = applyDictionaryEdit(
      fakeDictionary,
      { kind: 'translation', path: 'title', locale: 'en' },
      'Hi'
    );

    expect(updated?.key).toBe('app-content');
    expect(updated?.localId).toBe('app-content::local::src/app.content.ts');
    expect(updated?.filePath).toBe('src/app.content.ts');
  });

  it('does not mutate the input dictionary', () => {
    const before = JSON.stringify(fakeDictionary.content);

    applyDictionaryEdit(
      fakeDictionary,
      { kind: 'translation', path: 'title', locale: 'en' },
      'Hi'
    );

    expect(JSON.stringify(fakeDictionary.content)).toBe(before);
  });

  it('rejects edits on non-string or non-translation targets', () => {
    expect(
      applyDictionaryEdit(
        fakeDictionary,
        { kind: 'translation', path: 'mixed', locale: 'fr' },
        'nope'
      )
    ).toBeNull();
    expect(
      applyDictionaryEdit(
        fakeDictionary,
        { kind: 'plain-string', path: 'intro' },
        'nope'
      )
    ).toBeNull();
    expect(
      applyDictionaryEdit(
        fakeDictionary,
        { kind: 'plain-string', path: 'count' },
        'nope'
      )
    ).toBeNull();
    expect(
      applyDictionaryEdit(
        fakeDictionary,
        { kind: 'translation', path: 'missing', locale: 'en' },
        'nope'
      )
    ).toBeNull();
  });
});
