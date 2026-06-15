import { describe, expect, it } from 'vitest';
import { formatLineRanges } from './formatLineRanges';

describe('formatLineRanges', () => {
  it('returns an empty string when no lines are provided', () => {
    expect(formatLineRanges([])).toBe('');
  });

  it('keeps an isolated single line as a bare number', () => {
    expect(formatLineRanges([333])).toBe('333');
  });

  it('collapses a run of consecutive lines into a range', () => {
    expect(formatLineRanges([2, 3, 4, 5])).toBe('2-5');
  });

  it('mixes ranges and single lines', () => {
    expect(formatLineRanges([2, 3, 4, 5, 333, 412, 413, 414])).toBe(
      '2-5, 333, 412-414'
    );
  });

  it('sorts and de-duplicates the input first', () => {
    expect(formatLineRanges([5, 2, 4, 3, 3, 5])).toBe('2-5');
  });

  it('treats a two-line run as a range, not two singles', () => {
    expect(formatLineRanges([10, 11])).toBe('10-11');
  });

  it('keeps non-adjacent lines separate', () => {
    expect(formatLineRanges([1, 3, 5])).toBe('1, 3, 5');
  });

  it('honours a custom separator', () => {
    expect(formatLineRanges([1, 2, 9], ' | ')).toBe('1-2 | 9');
  });
});
