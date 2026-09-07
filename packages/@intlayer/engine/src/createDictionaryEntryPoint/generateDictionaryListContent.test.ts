import { mkdtempSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { generateDictionaryListContent } from './generateDictionaryListContent';

const configuration = {
  system: { mainDir: '/project/.intlayer/main' },
} as never;

const dictionaryPaths = ['/project/.intlayer/dictionary/home.json'];

/** Evaluate emitted CJS the way a bundler's interop layer would. */
const requireEmittedCjs = (source: string): Record<string, unknown> => {
  const file = join(mkdtempSync(join(tmpdir(), 'entrypoint-')), 'entry.cjs');

  writeFileSync(file, source.replace(/require\('[^']*'\)/g, '({})'));

  return createRequire(file)(file);
};

describe('generateDictionaryListContent', () => {
  it('keeps the accessor reachable on the CJS entry', () => {
    const content = generateDictionaryListContent(
      dictionaryPaths,
      'getUnmergedDictionaries',
      'json',
      'cjs',
      configuration
    );

    const entry = requireEmittedCjs(content);

    expect(typeof entry.getUnmergedDictionaries).toBe('function');
  });

  it('does not leak the accessor into the dictionary map it returns', () => {
    const content = generateDictionaryListContent(
      dictionaryPaths,
      'getUnmergedDictionaries',
      'json',
      'cjs',
      configuration
    );

    const entry = requireEmittedCjs(content);
    const dictionaries = (
      entry.getUnmergedDictionaries as () => Record<string, unknown>
    )();

    expect(Object.keys(dictionaries)).toEqual(['home']);
  });

  it('exports the accessor and a default from the ESM entry', () => {
    const content = generateDictionaryListContent(
      dictionaryPaths,
      'getUnmergedDictionaries',
      'json',
      'esm',
      configuration
    );

    expect(content).toContain('export { getUnmergedDictionaries };');
    expect(content).toContain('export default dictionaries;');
  });
});
