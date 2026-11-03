import { describe, expect, it } from 'vitest';
import { chunkArray } from './chunkArray';

describe('chunkArray', () => {
  it('splits an array into chunks of the requested size', () => {
    expect(chunkArray(['a', 'b', 'c', 'd'], 2)).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ]);
  });

  it('keeps the remaining items in a smaller last chunk', () => {
    expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('returns a single chunk when the size exceeds the array length', () => {
    expect(chunkArray([1, 2], 10)).toEqual([[1, 2]]);
  });

  it('returns no chunk for an empty array', () => {
    expect(chunkArray([], 5)).toEqual([]);
  });

  it('returns no chunk for a non-positive chunk size', () => {
    expect(chunkArray([1, 2, 3], 0)).toEqual([]);
    expect(chunkArray([1, 2, 3], -1)).toEqual([]);
  });

  it('does not mutate the source array', () => {
    const items = [1, 2, 3];

    chunkArray(items, 2);

    expect(items).toEqual([1, 2, 3]);
  });
});
