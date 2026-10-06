import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { TRAVERSE_PATTERN } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { buildComponentFilesList } from './buildComponentFilesList';

const createFile = async (filePath: string): Promise<void> => {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, 'export {};');
};

const createConfig = (baseDir: string, codeDir: string[]): IntlayerConfig =>
  ({
    system: { baseDir },
    build: { traversePattern: TRAVERSE_PATTERN },
    compiler: { transformPattern: [] },
    content: { codeDir, fileExtensions: ['.content.ts'] },
  }) as unknown as IntlayerConfig;

describe('buildComponentFilesList', () => {
  let baseDir: string;

  beforeEach(async () => {
    baseDir = await mkdtemp(join(tmpdir(), 'intlayer-files-list-'));
    await createFile(join(baseDir, 'src/App.tsx'));
    await createFile(join(baseDir, 'src/app.content.ts'));
    await createFile(join(baseDir, 'dist/esm/Button.mjs'));
    await createFile(join(baseDir, 'dist/esm/node_modules/dep/index.mjs'));
    await createFile(join(baseDir, 'node_modules/ds/dist/Card.mjs'));
  });

  afterEach(async () => {
    await rm(baseDir, { recursive: true, force: true });
  });

  it('applies the default exclusions to the project root', () => {
    const files = buildComponentFilesList(createConfig(baseDir, [baseDir]));

    expect(files).toEqual([join(baseDir, 'src/App.tsx')]);
  });

  it('scans a codeDir located inside an excluded directory', () => {
    const files = buildComponentFilesList(
      createConfig(baseDir, [
        join(baseDir, 'dist/esm'),
        join(baseDir, 'node_modules/ds/dist'),
      ])
    );

    expect(files.sort()).toEqual(
      [
        join(baseDir, 'dist/esm/Button.mjs'),
        join(baseDir, 'node_modules/ds/dist/Card.mjs'),
        join(baseDir, 'src/App.tsx'),
      ].sort()
    );
  });

  it('keeps applying exclusions below an explicit codeDir', () => {
    const files = buildComponentFilesList(
      createConfig(baseDir, [join(baseDir, 'dist')])
    );

    expect(files).not.toContain(
      join(baseDir, 'dist/esm/node_modules/dep/index.mjs')
    );
    expect(files).toContain(join(baseDir, 'dist/esm/Button.mjs'));
  });
});
