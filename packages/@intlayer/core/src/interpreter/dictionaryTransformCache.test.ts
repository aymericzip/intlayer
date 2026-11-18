import { describe, expect, it } from 'vitest';
import {
  collectTransformCacheWrites,
  deleteTransformCacheWrites,
  readTransformCache,
  writeTransformCache,
} from './dictionaryTransformCache';

describe('transform cache write collection', () => {
  it('reports the writes made while collecting, nested collections included', () => {
    const outerDictionary = {};
    const innerDictionary = {};

    const { result, writes } = collectTransformCacheWrites(() => {
      writeTransformCache(outerDictionary, 'en', 'outer');

      const inner = collectTransformCacheWrites(() =>
        writeTransformCache(innerDictionary, 'en', 'inner')
      );

      expect(inner.writes).toHaveLength(1);

      return 'done';
    });

    expect(result).toBe('done');
    expect(writes.map(({ cacheKey, content }) => [cacheKey, content])).toEqual([
      ['en', 'outer'],
    ]);
  });

  it('does not collect writes made outside a collection', () => {
    const dictionary = {};

    writeTransformCache(dictionary, 'en', 'value');
    const { writes } = collectTransformCacheWrites(() => undefined);

    expect(writes).toEqual([]);
  });

  it('deletes collected entries, keeping ones rewritten since', () => {
    const dictionary = {};

    const { writes } = collectTransformCacheWrites(() => {
      writeTransformCache(dictionary, 'en', 'first');
      writeTransformCache(dictionary, 'fr', 'first');
    });

    writeTransformCache(dictionary, 'fr', 'second');
    deleteTransformCacheWrites(writes);

    expect(readTransformCache(dictionary, 'en')).toEqual({ hit: false });
    expect(readTransformCache(dictionary, 'fr')).toEqual({
      hit: true,
      content: 'second',
    });
  });
});
