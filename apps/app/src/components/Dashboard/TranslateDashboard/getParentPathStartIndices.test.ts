import type { KeyPath } from '@intlayer/types/keyPath';
import * as NodeTypes from '@intlayer/types/nodeType';
import { describe, expect, it } from 'vitest';
import { getParentPathStartIndices } from './getParentPathStartIndices';

const row = (dictionaryKey: string, ...keys: string[]) => [
  {
    dictionary: { key: dictionaryKey },
    keyPath: keys.map(
      (key): KeyPath => ({ type: NodeTypes.OBJECT, key }) as KeyPath
    ),
  },
];

describe('getParentPathStartIndices', () => {
  it('groups consecutive siblings under the same parent', () => {
    const rows = [
      row('labels', 'summary', 'chunkTable', 'bundleSize'),
      row('labels', 'summary', 'chunkTable', 'file'),
      row('labels', 'summary', 'chunkTable', 'lazy'),
      row('labels', 'summary', 'title'),
      row('labels', 'summary', 'description'),
    ];

    expect([...getParentPathStartIndices(rows)]).toEqual([0, 3]);
  });

  it('starts a new group when the dictionary changes', () => {
    const rows = [row('first', 'title'), row('second', 'title')];

    expect([...getParentPathStartIndices(rows)]).toEqual([0, 1]);
  });

  it('treats top-level fields of one dictionary as a single group', () => {
    const rows = [row('home', 'title'), row('home', 'description')];

    expect([...getParentPathStartIndices(rows)]).toEqual([0]);
  });

  it('returns an empty set for no rows', () => {
    expect(getParentPathStartIndices([]).size).toBe(0);
  });
});
