import { describe, expect, it } from 'vitest';
import {
  getDictionaryFilterTypes,
  getMatchesFilterTypes,
} from './dictionaryFilterType';

describe('getDictionaryFilterTypes', () => {
  it('classifies unqualified dictionaries as standard', () => {
    expect(getDictionaryFilterTypes({})).toEqual(['standard']);
  });

  it('classifies items, named and structured variants', () => {
    expect(getDictionaryFilterTypes({ item: 1 })).toEqual(['collection']);
    expect(getDictionaryFilterTypes({ variant: 'promo' })).toEqual(['variant']);
    expect(getDictionaryFilterTypes({ variant: { id: 'prod_1' } })).toEqual([
      'meta',
    ]);
    expect(getDictionaryFilterTypes({ item: 2, variant: 'promo' })).toEqual([
      'collection',
      'variant',
    ]);
  });
});

describe('getMatchesFilterTypes', () => {
  it('matches everything without active types', () => {
    expect(getMatchesFilterTypes({ item: 1 }, [])).toBe(true);
  });

  it('matches any of the active types', () => {
    expect(getMatchesFilterTypes({ variant: 'promo' }, ['variant'])).toBe(true);
    expect(getMatchesFilterTypes({}, ['variant'])).toBe(false);
  });
});
