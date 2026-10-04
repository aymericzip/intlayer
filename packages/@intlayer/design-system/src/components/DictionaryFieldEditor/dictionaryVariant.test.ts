import { describe, expect, it } from 'vitest';
import {
  formatDictionaryVariant,
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
