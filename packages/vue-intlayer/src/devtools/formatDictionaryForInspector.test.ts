import type { Dictionary } from '@intlayer/types/dictionary';
import { describe, expect, it } from 'vitest';
import { formatDictionaryForInspector } from './formatDictionaryForInspector';

const buildDictionary = (content: unknown): Dictionary =>
  ({ key: 'test-dictionary', content }) as Dictionary;

describe('formatDictionaryForInspector', () => {
  it('flattens translation nodes into locale maps', () => {
    const dictionary = buildDictionary({
      title: {
        nodeType: 'translation',
        translation: { en: 'Hello', fr: 'Bonjour' },
      },
    });

    expect(formatDictionaryForInspector(dictionary)).toEqual({
      title: { en: 'Hello', fr: 'Bonjour' },
    });
  });

  it('flattens nested objects with dot-separated paths', () => {
    const dictionary = buildDictionary({
      nested: {
        deep: {
          nodeType: 'translation',
          translation: { en: 'Deep' },
        },
      },
    });

    expect(formatDictionaryForInspector(dictionary)).toEqual({
      'nested.deep': { en: 'Deep' },
    });
  });

  it('flattens arrays using index segments', () => {
    const dictionary = buildDictionary({
      items: [
        {
          nodeType: 'translation',
          translation: { en: 'First' },
        },
        {
          nodeType: 'translation',
          translation: { en: 'Second' },
        },
      ],
    });

    expect(formatDictionaryForInspector(dictionary)).toEqual({
      'items.0': { en: 'First' },
      'items.1': { en: 'Second' },
    });
  });

  it('falls back to a string for non-translation typed nodes', () => {
    const dictionary = buildDictionary({
      content: {
        nodeType: 'markdown',
        markdown: '# Title',
      },
      plural: {
        nodeType: 'plural',
        plural: { one: 'item', other: 'items' },
      },
    });

    expect(formatDictionaryForInspector(dictionary)).toEqual({
      content: '# Title',
      plural: '{"one":"item","other":"items"}',
    });
  });

  it('falls back to a string for primitive leaves', () => {
    const dictionary = buildDictionary({
      count: 42,
      enabled: true,
      missing: null,
    });

    expect(formatDictionaryForInspector(dictionary)).toEqual({
      count: '42',
      enabled: 'true',
      missing: 'null',
    });
  });

  it('returns an empty map for empty content', () => {
    const dictionary = buildDictionary({});

    expect(formatDictionaryForInspector(dictionary)).toEqual({});
  });
});
