import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { excludeObjectFormat } from '@intlayer/engine/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  getChangedSourceContent,
  getSourceLocaleContent,
  hashSourceContent,
  omitChangedContent,
  readFillSourceSnapshot,
  setFillSourceSnapshot,
  writeFillSourceSnapshot,
} from './fillSourceSnapshot';

const dictionaryLocalId: LocalDictionaryId = 'home::local::src/home.content.ts';

describe('hashSourceContent', () => {
  it('hashes each value and keeps the object shape', () => {
    const hashes = hashSourceContent({
      title: 'Hi',
      nested: { label: 'Save' },
      items: ['a', 'b'],
    }) as Record<string, unknown>;

    expect(Object.keys(hashes)).toEqual(['title', 'nested', 'items']);
    expect(typeof hashes.title).toBe('string');
    expect(hashes.title).not.toBe('Hi');
    expect(Object.keys(hashes.nested as object)).toEqual(['label']);
    expect(typeof hashes.items).toBe('string');
  });

  it('is stable for the same value', () => {
    expect(hashSourceContent({ title: 'Hi' })).toEqual(
      hashSourceContent({ title: 'Hi' })
    );
    expect(hashSourceContent({ title: 'Hi' })).not.toEqual(
      hashSourceContent({ title: 'Hello' })
    );
  });
});

describe('getChangedSourceContent', () => {
  it('returns only the changed values', () => {
    expect(
      getChangedSourceContent(
        hashSourceContent({
          title: 'Hi',
          nested: { label: 'Save', hint: 'Click' },
        }),
        { title: 'Hello', nested: { label: 'Save', hint: 'Tap' } }
      )
    ).toEqual({ title: 'Hello', nested: { hint: 'Tap' } });
  });

  it('returns undefined when nothing changed', () => {
    expect(
      getChangedSourceContent(hashSourceContent({ title: 'Hi' }), {
        title: 'Hi',
      })
    ).toBeUndefined();
  });

  it('ignores keys with no previous value', () => {
    expect(
      getChangedSourceContent(hashSourceContent({ title: 'Hi' }), {
        title: 'Hi',
        added: 'New',
      })
    ).toBeUndefined();
    expect(getChangedSourceContent(undefined, { title: 'Hi' })).toBeUndefined();
  });

  it('returns a changed array as a whole', () => {
    expect(
      getChangedSourceContent(hashSourceContent({ items: ['a', 'b'] }), {
        items: ['a', 'c'],
      })
    ).toEqual({ items: ['a', 'c'] });
  });

  it('returns a value whose shape changed', () => {
    expect(
      getChangedSourceContent(hashSourceContent({ title: 'Hi' }), {
        title: { short: 'Hi' },
      })
    ).toEqual({ title: { short: 'Hi' } });
  });
});

describe('omitChangedContent', () => {
  it('removes translations of changed values', () => {
    expect(
      omitChangedContent(
        { title: 'Salut', nested: { label: 'Sauver', hint: 'Cliquer' } },
        { title: 'Hello', nested: { hint: 'Tap' } }
      )
    ).toEqual({ nested: { label: 'Sauver' } });
  });

  it('keeps the target as is when nothing changed', () => {
    const targetContent = { title: 'Salut' };

    expect(omitChangedContent(targetContent, undefined)).toBe(targetContent);
  });

  it('leaves changed and missing values to translate', () => {
    const sourceContent = { title: 'Hello', subtitle: 'Welcome', cta: 'Go' };
    const targetContent = { title: 'Salut', subtitle: 'Bienvenue' };
    const changedContent = getChangedSourceContent(
      hashSourceContent({ title: 'Hi', subtitle: 'Welcome' }),
      sourceContent
    );

    expect(
      excludeObjectFormat(
        sourceContent,
        omitChangedContent(targetContent, changedContent)
      )
    ).toEqual({ title: 'Hello', cta: 'Go' });
  });

  it('removes a changed array as a whole', () => {
    expect(
      omitChangedContent(
        { items: ['a', 'b', 'c'], title: 'Salut' },
        { items: ['x'] }
      )
    ).toEqual({ title: 'Salut' });
  });
});

describe('setFillSourceSnapshot', () => {
  const hiHashes = hashSourceContent({ title: 'Hi' });
  const helloHashes = hashSourceContent({ title: 'Hello' });

  it('overwrites the recorded source of the given locales', () => {
    const snapshot = setFillSourceSnapshot(
      { [dictionaryLocalId]: { fr: hiHashes, es: hiHashes } },
      dictionaryLocalId,
      ['fr'],
      { title: 'Hello' },
      true
    );

    expect(snapshot[dictionaryLocalId]).toEqual({
      fr: helloHashes,
      es: hiHashes,
    });
  });

  it('only fills unrecorded locales when not overwriting', () => {
    const previousSnapshot = {
      [dictionaryLocalId]: { fr: hiHashes },
    };

    const snapshot = setFillSourceSnapshot(
      previousSnapshot,
      dictionaryLocalId,
      ['fr', 'es'],
      { title: 'Hello' },
      false
    );

    expect(snapshot[dictionaryLocalId]).toEqual({
      fr: hiHashes,
      es: helloHashes,
    });
    expect(previousSnapshot[dictionaryLocalId]).toEqual({
      fr: hiHashes,
    });
  });
});

describe('getSourceLocaleContent', () => {
  it('returns the source locale values of a multilingual dictionary', () => {
    const dictionary: Dictionary = {
      key: 'home',
      content: {
        title: {
          nodeType: 'translation',
          translation: { en: 'Hello', fr: 'Bonjour' },
        },
      },
    };

    expect(getSourceLocaleContent(dictionary, 'en')).toEqual({
      title: 'Hello',
    });
  });

  it('returns the content of a per-locale dictionary', () => {
    const dictionary: Dictionary = {
      key: 'home',
      locale: 'en',
      content: { title: 'Hello' },
    };

    expect(getSourceLocaleContent(dictionary, 'en')).toEqual({
      title: 'Hello',
    });
  });
});

describe('readFillSourceSnapshot / writeFillSourceSnapshot', () => {
  let baseDir: string;
  let configuration: IntlayerConfig;

  beforeEach(async () => {
    baseDir = await mkdtemp(join(tmpdir(), 'intlayer-fill-'));
    configuration = { system: { baseDir } } as IntlayerConfig;
  });

  afterEach(async () => {
    await rm(baseDir, { recursive: true, force: true });
  });

  it('returns an empty snapshot when none was written', async () => {
    expect(await readFillSourceSnapshot(configuration)).toEqual({});
  });

  it('reads back the written snapshot', async () => {
    const snapshot = {
      [dictionaryLocalId]: { fr: hashSourceContent({ title: 'Hello' }) },
    };

    await writeFillSourceSnapshot(configuration, snapshot);

    expect(await readFillSourceSnapshot(configuration)).toEqual(snapshot);
  });

  it('writes a sorted file at the project root', async () => {
    const hashes = hashSourceContent({ title: 'Hello' });

    await writeFillSourceSnapshot(configuration, {
      'b::local::src/b.content.ts': { fr: hashes, es: hashes },
      'a::local::src/a.content.ts': { fr: hashes },
    });

    const fileContent = await readFile(
      join(baseDir, 'intlayer.journal.json'),
      'utf-8'
    );
    const parsedContent = JSON.parse(fileContent);

    expect(Object.keys(parsedContent)).toEqual([
      'a::local::src/a.content.ts',
      'b::local::src/b.content.ts',
    ]);
    expect(Object.keys(parsedContent['b::local::src/b.content.ts'])).toEqual([
      'es',
      'fr',
    ]);
  });
});
