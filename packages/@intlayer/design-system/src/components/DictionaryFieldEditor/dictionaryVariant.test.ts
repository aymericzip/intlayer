import { describe, expect, it } from 'vitest';
import {
  formatDictionaryVariant,
  getDictionaryVariantTagLabels,
  parseDictionaryVariant,
} from './dictionaryVariant';

describe('dictionary variant text round-trip', () => {
  it('keeps named variants as-is', () => {
    expect(formatDictionaryVariant('summer')).toBe('summer');
    expect(parseDictionaryVariant('summer')).toEqual({
      variant: 'summer',
      error: false,
    });
  });

  it('round-trips structured and grouped variants as JSON', () => {
    for (const variant of [{ plan: 'pro', seats: 3 }, ['a', { id: 1 }]]) {
      expect(
        parseDictionaryVariant(formatDictionaryVariant(variant)).variant
      ).toEqual(variant);
    }
  });

  it('flags invalid JSON and keeps the raw text', () => {
    expect(parseDictionaryVariant('{ broken')).toEqual({
      variant: '{ broken',
      error: true,
    });
  });

  it('formats a missing variant as an empty string', () => {
    expect(formatDictionaryVariant(undefined)).toBe('');
  });
});

describe('getDictionaryVariantTagLabels', () => {
  it('splits structured variants into one tag per field', () => {
    expect(
      getDictionaryVariantTagLabels({
        id: 'apple-watch',
        category: 'wearables',
      })
    ).toEqual(['category: wearables', 'id: apple-watch']);
  });

  it('keeps named variants whole and dedupes grouped variants', () => {
    expect(getDictionaryVariantTagLabels('promo')).toEqual(['promo']);
    expect(
      getDictionaryVariantTagLabels(['promo', { plan: 'pro' }, 'promo'])
    ).toEqual(['promo', 'plan: pro']);
    expect(getDictionaryVariantTagLabels(undefined)).toEqual([]);
  });
});
