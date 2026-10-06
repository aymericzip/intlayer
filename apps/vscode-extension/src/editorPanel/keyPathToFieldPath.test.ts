import { describe, expect, it } from 'vitest';
import { keyPathToFieldPath } from './keyPathToFieldPath';

describe('keyPathToFieldPath', () => {
  it('keeps nested object keys', () => {
    expect(
      keyPathToFieldPath([
        { type: 'object', key: 'hero' },
        { type: 'object', key: 'title' },
      ])
    ).toEqual(['hero', 'title']);
  });

  it('skips translation branches, wherever they sit', () => {
    expect(
      keyPathToFieldPath([
        { type: 'translation', key: 'fr' },
        { type: 'object', key: 'title' },
      ])
    ).toEqual(['title']);
    expect(
      keyPathToFieldPath([
        { type: 'object', key: 'title' },
        { type: 'translation', key: 'en' },
      ])
    ).toEqual(['title']);
  });

  it('stops at array items', () => {
    expect(
      keyPathToFieldPath([
        { type: 'object', key: 'items' },
        { type: 'array', key: 0 },
        { type: 'object', key: 'label' },
      ])
    ).toEqual(['items']);
  });

  it('returns an empty path for the dictionary root', () => {
    expect(keyPathToFieldPath([])).toEqual([]);
  });
});
