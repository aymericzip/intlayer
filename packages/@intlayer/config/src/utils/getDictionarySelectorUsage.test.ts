import type {
  Dictionary,
  QualifiedDictionaryGroup,
} from '@intlayer/types/dictionary';
import { describe, expect, it } from 'vitest';
import { getHasDictionarySelector } from './getDictionarySelectorUsage';

const plainDictionary = {
  key: 'home',
  content: { title: 'Home' },
} as unknown as Dictionary;

const qualifiedGroup = {
  key: 'faq',
  qualifierTypes: ['item'],
  content: { '1': {}, '2': {} },
} as unknown as QualifiedDictionaryGroup;

describe('getHasDictionarySelector', () => {
  it('returns false when only plain dictionaries are present (record)', () => {
    expect(getHasDictionarySelector({ home: plainDictionary })).toBe(false);
  });

  it('returns false for an empty dictionary record', () => {
    expect(getHasDictionarySelector({})).toBe(false);
  });

  it('returns true when at least one qualified group is present (record)', () => {
    expect(
      getHasDictionarySelector({ home: plainDictionary, faq: qualifiedGroup })
    ).toBe(true);
  });

  it('accepts an array of dictionaries', () => {
    expect(getHasDictionarySelector([plainDictionary])).toBe(false);
    expect(getHasDictionarySelector([plainDictionary, qualifiedGroup])).toBe(
      true
    );
  });

  it('treats an empty qualifierTypes array as unqualified', () => {
    const emptyGroup = {
      key: 'faq',
      qualifierTypes: [],
      content: {},
    } as unknown as QualifiedDictionaryGroup;

    expect(getHasDictionarySelector([emptyGroup])).toBe(false);
  });
});
