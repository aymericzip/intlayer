import type { Dictionary } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import * as NodeTypes from '@intlayer/types/nodeType';
import { describe, expect, it } from 'vitest';
import {
  applyDictionaryEdit,
  getEditability,
  getEditKeyPath,
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
    'dotted.key': 'Dotted',
    dotted: { key: 'Nested' },
    list: ['first', 'second'],
    count: 5,
    intro: { nodeType: 'markdown', markdown: 'Hello **World**!' },
  },
} as unknown as Dictionary;

/** Key path of a chain of object keys. */
const objectPath = (...keys: string[]): KeyPath[] =>
  keys.map((key) => ({ type: NodeTypes.OBJECT, key }));

/** Key path of one locale of a translation node. */
const localePath = (locale: string, ...keys: string[]): KeyPath[] => [
  ...objectPath(...keys),
  { type: NodeTypes.TRANSLATION, key: locale },
];

describe('parseEditPath', () => {
  it('parses a translation edit from [label, locale]', () => {
    expect(parseEditPath(['title', 'fr'])).toEqual({
      label: 'title',
      locale: 'fr',
    });
  });

  it('parses a whole-value edit from [label]', () => {
    expect(parseEditPath(['plainNote'])).toEqual({ label: 'plainNote' });
  });

  it('keeps dot-joined labels as a single segment', () => {
    expect(parseEditPath(['nested.cta', 'en'])).toEqual({
      label: 'nested.cta',
      locale: 'en',
    });
  });

  it('strips a leading section name defensively', () => {
    expect(parseEditPath(['Translations', 'title', 'fr'])).toEqual({
      label: 'title',
      locale: 'fr',
    });
  });

  it('rejects empty and deeper paths', () => {
    expect(parseEditPath([])).toBeNull();
    expect(parseEditPath(['a', 'b', 'c'])).toBeNull();
  });
});

describe('getEditKeyPath', () => {
  it('resolves a row label to its key path', () => {
    expect(getEditKeyPath(fakeDictionary, { label: 'plainNote' })).toEqual(
      objectPath('plainNote')
    );
  });

  it('appends the locale of a translation edit', () => {
    expect(
      getEditKeyPath(fakeDictionary, { label: 'nested.cta', locale: 'en' })
    ).toEqual(localePath('en', 'nested', 'cta'));
  });

  it('tells a dotted key apart from a nested path', () => {
    expect(getEditKeyPath(fakeDictionary, { label: '"dotted.key"' })).toEqual(
      objectPath('dotted.key')
    );
    expect(getEditKeyPath(fakeDictionary, { label: 'dotted.key' })).toEqual(
      objectPath('dotted', 'key')
    );
  });

  it('resolves array items through array key paths', () => {
    expect(getEditKeyPath(fakeDictionary, { label: 'list.1' })).toEqual([
      { type: NodeTypes.OBJECT, key: 'list' },
      { type: NodeTypes.ARRAY, key: 1 },
    ]);
  });

  it('returns null for an unknown label', () => {
    expect(getEditKeyPath(fakeDictionary, { label: 'missing' })).toBeNull();
  });
});

describe('getEditability', () => {
  it('flags translation nodes with only plain string locales', () => {
    expect(getEditability(fakeDictionary, objectPath('title'))).toBe(
      'translation'
    );
    expect(getEditability(fakeDictionary, objectPath('nested', 'cta'))).toBe(
      'translation'
    );
  });

  it('flags plain string leaves', () => {
    expect(getEditability(fakeDictionary, objectPath('plainNote'))).toBe(
      'plain-string'
    );
  });

  it('rejects rich, mixed, numeric and unknown nodes', () => {
    // mixed holds an html node under fr
    expect(getEditability(fakeDictionary, objectPath('mixed'))).toBeNull();
    expect(getEditability(fakeDictionary, objectPath('intro'))).toBeNull();
    expect(getEditability(fakeDictionary, objectPath('count'))).toBeNull();
    expect(getEditability(fakeDictionary, objectPath('list'))).toBeNull();
    expect(getEditability(fakeDictionary, objectPath('missing'))).toBeNull();
  });
});

describe('applyDictionaryEdit', () => {
  it('updates the edited locale of a translation node', () => {
    const updated = applyDictionaryEdit(
      fakeDictionary,
      localePath('fr', 'title'),
      'Salut'
    );

    const content = updated?.content as Record<string, any>;

    expect(content.title.translation).toEqual({ en: 'Hello', fr: 'Salut' });
  });

  it('updates a nested translation node', () => {
    const updated = applyDictionaryEdit(
      fakeDictionary,
      localePath('en', 'nested', 'cta'),
      'Start now'
    );

    const content = updated?.content as Record<string, any>;

    expect(content.nested.cta.translation.en).toBe('Start now');
  });

  it('updates a plain string leaf', () => {
    const updated = applyDictionaryEdit(
      fakeDictionary,
      objectPath('plainNote'),
      'Edited note'
    );

    const content = updated?.content as Record<string, unknown>;

    expect(content.plainNote).toBe('Edited note');
  });

  it('updates a key holding a dot without touching the nested path', () => {
    const updated = applyDictionaryEdit(
      fakeDictionary,
      objectPath('dotted.key'),
      'Edited'
    );

    const content = updated?.content as Record<string, any>;

    expect(content['dotted.key']).toBe('Edited');
    expect(content.dotted.key).toBe('Nested');
  });

  it('keeps the declaration metadata for the server to locate the file', () => {
    const updated = applyDictionaryEdit(
      fakeDictionary,
      localePath('en', 'title'),
      'Hi'
    );

    expect(updated?.key).toBe('app-content');
    expect(updated?.localId).toBe('app-content::local::src/app.content.ts');
    expect(updated?.filePath).toBe('src/app.content.ts');
  });

  it('does not mutate the input dictionary', () => {
    const before = structuredClone(fakeDictionary.content);

    applyDictionaryEdit(fakeDictionary, localePath('en', 'title'), 'Hi');

    expect(fakeDictionary.content).toEqual(before);
  });

  it('rejects edits that do not target an existing string', () => {
    // html node under fr
    expect(
      applyDictionaryEdit(fakeDictionary, localePath('fr', 'mixed'), 'nope')
    ).toBeNull();
    expect(
      applyDictionaryEdit(fakeDictionary, objectPath('intro'), 'nope')
    ).toBeNull();
    expect(
      applyDictionaryEdit(fakeDictionary, objectPath('count'), 'nope')
    ).toBeNull();
    // whole-value edit of a translation row
    expect(
      applyDictionaryEdit(fakeDictionary, objectPath('title'), 'nope')
    ).toBeNull();
    // missing locale: an edit never creates a node
    expect(
      applyDictionaryEdit(fakeDictionary, localePath('es', 'title'), 'nope')
    ).toBeNull();
    expect(
      applyDictionaryEdit(fakeDictionary, localePath('en', 'missing'), 'nope')
    ).toBeNull();
  });
});
