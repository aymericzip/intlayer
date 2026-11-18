import { describe, expect, it } from 'vitest';
import { getTypeaheadMatch } from './getTypeaheadMatch';

const options = ['Apple', 'Banana', 'Blueberry', 'Cherry'];

describe('getTypeaheadMatch', () => {
  it('returns -1 for an empty search or no options', () => {
    expect(getTypeaheadMatch(options, '', 0)).toBe(-1);
    expect(getTypeaheadMatch([], 'a', -1)).toBe(-1);
  });

  it('matches case-insensitively from the start when nothing is active', () => {
    expect(getTypeaheadMatch(options, 'b', -1)).toBe(1);
  });

  it('cycles through options sharing a repeated first character', () => {
    expect(getTypeaheadMatch(options, 'b', 1)).toBe(2);
    expect(getTypeaheadMatch(options, 'bb', 2)).toBe(1);
  });

  it('keeps the current option when a longer search still matches it', () => {
    expect(getTypeaheadMatch(options, 'blu', 2)).toBe(2);
  });

  it('returns -1 when no option matches', () => {
    expect(getTypeaheadMatch(options, 'z', 0)).toBe(-1);
  });
});
