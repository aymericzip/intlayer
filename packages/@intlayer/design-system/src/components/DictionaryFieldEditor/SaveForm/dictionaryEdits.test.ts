// @vitest-environment node
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import { describe, expect, it } from 'vitest';
import {
  getModifiedDictionaries,
  isDictionaryEdited,
  mergeDictionaryEdits,
} from './dictionaryEdits';

const createDictionary = (key: string, content: unknown): Dictionary =>
  ({
    key,
    localId: `${key}::local::/${key}.content.ts` as LocalDictionaryId,
    content,
  }) as Dictionary;

describe('isDictionaryEdited', () => {
  it('is false without an edit', () => {
    expect(isDictionaryEdited(undefined, createDictionary('a', 'x'))).toBe(
      false
    );
  });

  it('is false when the edit matches the saved dictionary', () => {
    expect(
      isDictionaryEdited(createDictionary('a', 'x'), createDictionary('a', 'x'))
    ).toBe(false);
  });

  it('is true when the content differs', () => {
    expect(
      isDictionaryEdited(createDictionary('a', 'y'), createDictionary('a', 'x'))
    ).toBe(true);
  });
});

describe('mergeDictionaryEdits', () => {
  it('applies the edits over the saved dictionary', () => {
    const original = { ...createDictionary('a', 'x'), id: 'remote-id' };

    expect(
      mergeDictionaryEdits(original, createDictionary('a', 'y'))
    ).toMatchObject({ id: 'remote-id', content: 'y' });
  });

  it('returns the edit when nothing is saved yet', () => {
    const edited = createDictionary('a', 'y');

    expect(mergeDictionaryEdits(undefined, edited)).toBe(edited);
  });
});

describe('getModifiedDictionaries', () => {
  it('lists only the dictionaries that differ', () => {
    const unchanged = createDictionary('a', 'x');
    const changed = createDictionary('b', 'y');
    const created = createDictionary('c', 'z');
    const originals = {
      [unchanged.localId!]: unchanged,
      [changed.localId!]: createDictionary('b', 'x'),
    };

    const modified = getModifiedDictionaries(
      {
        [unchanged.localId!]: unchanged,
        [changed.localId!]: changed,
        [created.localId!]: created,
      },
      originals
    );

    expect(modified.map(({ localId }) => localId)).toEqual([
      changed.localId,
      created.localId,
    ]);
    expect(modified[1]?.originalDictionary).toBeUndefined();
    expect(modified[1]?.dictionaryToSave).toBe(created);
  });

  it('is empty without edits', () => {
    expect(getModifiedDictionaries(undefined, {})).toEqual([]);
  });
});
