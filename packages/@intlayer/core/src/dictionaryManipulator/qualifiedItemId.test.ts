import type {
  Dictionary,
  QualifiedDictionaryGroup,
} from '@intlayer/types/dictionary';
import { describe, expect, it } from 'vitest';
import { mergeQualifiedDictionaries } from './mergeQualifiedDictionaries';
import {
  compareItemIds,
  parseItemId,
  parseItemSegment,
  resolveQualifiedDictionary,
  serializeItem,
} from './qualifiedDictionary';
import {
  getDictionaryCompositeIds,
  getDictionaryQualifierTypes,
} from './qualifiedDictionaryDeclaration';
import {
  collectQualifiedChunks,
  QUALIFIER_DYNAMIC_TYPES_KEY,
  type QualifiedDynamicLoaderMap,
} from './qualifiedDynamicLoader';

const getContents = (resolved: Dictionary | Dictionary[] | null) =>
  (resolved as Dictionary[]).map((entry) => entry.content);

describe('parseItemId', () => {
  it('reads a canonical number as a position', () => {
    expect(parseItemId('2')).toBe(2);
    expect(parseItemId('1.5')).toBe(1.5);
    expect(parseItemId('-3')).toBe(-3);
  });

  it('keeps anything else as a string id', () => {
    expect(parseItemId('65f1c0a2')).toBe('65f1c0a2');
    expect(parseItemId('007')).toBe('007');
    expect(parseItemId('1e3')).toBe('1e3');
    expect(parseItemId(' 1')).toBe(' 1');
    expect(parseItemId('Infinity')).toBe('Infinity');
    expect(parseItemId('NaN')).toBe('NaN');
    expect(parseItemId('')).toBe('');
  });
});

describe('serializeItem / parseItemSegment', () => {
  it('serializes a number and its digits identically', () => {
    expect(serializeItem(2)).toBe('2');
    expect(serializeItem('2')).toBe('2');
  });

  it('keeps common database ids verbatim', () => {
    for (const databaseId of [
      '65f1c0a2b3c4d5e6f7a8b9c0',
      '0190b8e4-7c2d-7a3f-9b1e-5d6c7e8f9a0b',
      'V1StGXR8_Z5jdHi6B-myT',
    ]) {
      expect(serializeItem(databaseId)).toBe(databaseId);
      expect(parseItemSegment(serializeItem(databaseId))).toBe(databaseId);
    }
  });

  it('encodes path-hostile characters and decodes them back', () => {
    const itemId = "posts/l'été 2026";
    const segment = serializeItem(itemId);

    expect(segment).not.toMatch(/[/' ]/);
    expect(parseItemSegment(segment)).toBe(itemId);
  });

  it('round-trips an empty string and percent signs', () => {
    expect(parseItemSegment(serializeItem(''))).toBe('');
    expect(parseItemSegment(serializeItem('%'))).toBe('%');
    expect(parseItemSegment(serializeItem('100%0041'))).toBe('100%0041');
  });
});

describe('compareItemIds', () => {
  it('orders positions by value, then string ids by character code', () => {
    expect(['b', 10, 'B', 2, 'a', 1].sort(compareItemIds)).toEqual([
      1,
      2,
      10,
      'B',
      'a',
      'b',
    ]);
  });
});

describe('string item declarations', () => {
  it('declares the item dimension for a non-empty string id', () => {
    expect(
      getDictionaryQualifierTypes({ key: 'blog', item: 'abc', content: {} })
    ).toEqual(['item']);
    expect(
      getDictionaryQualifierTypes({ key: 'blog', item: '', content: {} })
    ).toEqual([]);
  });

  it('builds the composite id from the serialized string id', () => {
    expect(
      getDictionaryCompositeIds(
        { key: 'blog', variant: 'promo', item: 'a/b', content: {} },
        ['variant', 'item']
      )
    ).toEqual(['promo/a%002Fb']);
  });
});

describe('resolveQualifiedDictionary with string ids', () => {
  const blogGroup = mergeQualifiedDictionaries([
    { key: 'blog', item: '65f1c0b7', content: { title: 'Second post' } },
    { key: 'blog', item: 2, content: { title: 'Pinned' } },
    { key: 'blog', item: '65f1c0a2', content: { title: 'First post' } },
    { key: 'blog', item: 'posts/hello world', content: { title: 'Slug' } },
    { key: 'blog', content: { footer: 'Shared' } },
  ]) as QualifiedDictionaryGroup;

  it('lists positions first, then string ids by character code', () => {
    expect(getContents(resolveQualifiedDictionary(blogGroup))).toEqual([
      { title: 'Pinned', footer: 'Shared' },
      { title: 'First post', footer: 'Shared' },
      { title: 'Second post', footer: 'Shared' },
      { title: 'Slug', footer: 'Shared' },
    ]);
  });

  it('selects an entry by its string id and keeps the id on the entry', () => {
    const resolved = resolveQualifiedDictionary(blogGroup, {
      item: '65f1c0a2',
    }) as Dictionary;

    expect(resolved.content).toEqual({ title: 'First post', footer: 'Shared' });
    expect(resolved.item).toBe('65f1c0a2');
  });

  it('selects an id holding path-hostile characters', () => {
    const resolved = resolveQualifiedDictionary(blogGroup, {
      item: 'posts/hello world',
    }) as Dictionary;

    expect(resolved.content).toEqual({ title: 'Slug', footer: 'Shared' });
    expect(resolved.item).toBe('posts/hello world');
  });

  it('treats the digits of a position as that position', () => {
    const resolved = resolveQualifiedDictionary(blogGroup, {
      item: '2',
    }) as Dictionary;

    expect(resolved.content).toEqual({ title: 'Pinned', footer: 'Shared' });
    expect(resolved.item).toBe(2);
  });

  it('returns null for an unknown string id', () => {
    expect(resolveQualifiedDictionary(blogGroup, { item: 'missing' })).toBe(
      null
    );
  });
});

describe('collectQualifiedChunks with string ids', () => {
  const loadNothing = (): Promise<Dictionary> =>
    Promise.resolve({ key: 'blog', content: {} });

  const blogLoaderMap: QualifiedDynamicLoaderMap = {
    [QUALIFIER_DYNAMIC_TYPES_KEY]: ['item'],
    en: {
      '65f1c0b7': loadNothing,
      '10': loadNothing,
      '65f1c0a2': loadNothing,
      '2': loadNothing,
      [serializeItem('a b')]: loadNothing,
    },
  };

  it('fans out in collection order', () => {
    const { chunks } = collectQualifiedChunks(
      blogLoaderMap,
      'blog',
      'en',
      undefined
    );

    expect(chunks.map((chunk) => chunk.cacheKey)).toEqual([
      'blog.en.2',
      'blog.en.10',
      'blog.en.65f1c0a2',
      'blog.en.65f1c0b7',
      `blog.en.${serializeItem('a b')}`,
    ]);
  });

  it('descends into the chunk of a pinned string id', () => {
    const pinned = collectQualifiedChunks(blogLoaderMap, 'blog', 'en', {
      item: 'a b',
    });

    expect(pinned.missed).toBe(false);
    expect(pinned.chunks.map((chunk) => chunk.cacheKey)).toEqual([
      `blog.en.${serializeItem('a b')}`,
    ]);
    expect(
      collectQualifiedChunks(blogLoaderMap, 'blog', 'en', { item: 'missing' })
        .missed
    ).toBe(true);
  });
});
