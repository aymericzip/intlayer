import { describe, expect, it } from 'vitest';
import {
  parseMetadataValue,
  toMetadataFieldEntries,
  toMetadataRecord,
} from './metadataFields';

describe('metadataFields', () => {
  it('round-trips a record, keeping each value type', () => {
    const metadata = {
      title: 'My post',
      order: 2,
      draft: false,
      tags: ['news', 'release'],
      author: { name: 'Ada' },
    };

    expect(toMetadataRecord(toMetadataFieldEntries(metadata))).toEqual(
      metadata
    );
  });

  it('reads an edited value with the field type', () => {
    expect(parseMetadataValue('3', 2)).toBe(3);
    expect(parseMetadataValue('["a","b"]', ['a'])).toEqual(['a', 'b']);
    expect(parseMetadataValue('42', 'text')).toBe('42');
    expect(parseMetadataValue('42', undefined)).toBe('42');
    expect(parseMetadataValue('[oops', ['a'])).toBe('[oops');
  });

  it('skips the rows without a name', () => {
    expect(
      toMetadataRecord([
        { name: ' slug ', text: 'hello', value: 'hello' },
        { name: '', text: 'draft', value: undefined },
      ])
    ).toEqual({ slug: 'hello' });
  });
});
