import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { IntlayerConfig } from '@intlayer/types/config';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanRemovedContentDeclaration } from './cleanRemovedContentDeclaration';

const contentFilePath = 'src/app/app.content.ts';

/** Flush the deferred removal: fire its timer, then let the fs calls settle. */
const runDeferredRemoval = async () => {
  await vi.runAllTimersAsync();
  for (let attempt = 0; attempt < 10; attempt++) {
    await new Promise((resolve) => setImmediate(resolve));
  }
};

const createConfiguration = (baseDir: string): IntlayerConfig => {
  const intlayerDir = join(baseDir, '.intlayer');

  return {
    system: {
      baseDir,
      mainDir: join(intlayerDir, 'main'),
      dictionariesDir: join(intlayerDir, 'dictionary'),
      unmergedDictionariesDir: join(intlayerDir, 'unmerged_dictionary'),
      dynamicDictionariesDir: join(intlayerDir, 'dynamic_dictionary'),
      fetchDictionariesDir: join(intlayerDir, 'fetch_dictionary'),
      remoteDictionariesDir: join(intlayerDir, 'remote_dictionary'),
      typesDir: join(intlayerDir, 'types'),
    },
    build: { outputFormat: ['esm'] },
    log: { mode: 'disabled' },
  } as unknown as IntlayerConfig;
};

/** Write the artifacts the build emits for a dictionary from a single file. */
const writeSingleSourceDictionary = async (
  configuration: IntlayerConfig,
  key: string
) => {
  const { dictionariesDir, unmergedDictionariesDir, typesDir } =
    configuration.system;
  const localId = `${key}::local::${contentFilePath}`;
  const dictionary = {
    key,
    content: {},
    location: 'local',
    localId,
    filePath: contentFilePath,
  };

  await writeFile(
    join(unmergedDictionariesDir, `${key}.json`),
    JSON.stringify([dictionary])
  );
  // A merged dictionary built from one source is the source itself, so it
  // carries `localId` rather than `localIds`.
  await writeFile(
    join(dictionariesDir, `${key}.json`),
    JSON.stringify(dictionary)
  );
  await writeFile(join(typesDir, `${key}.ts`), 'export default {};');
};

describe('cleanRemovedContentDeclaration', () => {
  let baseDir: string;
  let configuration: IntlayerConfig;

  beforeEach(async () => {
    baseDir = await mkdtemp(join(tmpdir(), 'clean-removed-'));
    configuration = createConfiguration(baseDir);

    await Promise.all(
      Object.values(configuration.system).map((directory) =>
        mkdir(directory, { recursive: true })
      )
    );

    // Only the deferred artifact removal is faked; fs and glob internals must run
    vi.useFakeTimers({ toFake: ['setTimeout'] });
  });

  afterEach(async () => {
    vi.useRealTimers();
    await rm(baseDir, { recursive: true, force: true });
  });

  it('removes every artifact of a renamed key', async () => {
    const { dictionariesDir, unmergedDictionariesDir, typesDir, mainDir } =
      configuration.system;

    await writeSingleSourceDictionary(configuration, 'main');
    await writeSingleSourceDictionary(configuration, 'main2');

    const result = await cleanRemovedContentDeclaration(
      join(baseDir, contentFilePath),
      ['main2'],
      configuration
    );

    expect(result.excludeKeys).toEqual(['main']);
    expect(result.hasRebuilt).toBe(true);

    // Type declarations leave immediately: the module augmentation is
    // regenerated right after and must not reference them anymore.
    expect(existsSync(join(typesDir, 'main.ts'))).toBe(false);
    expect(existsSync(join(typesDir, 'main2.ts'))).toBe(true);

    // Entry points no longer import the removed dictionary
    for (const entryPoint of [
      'dictionaries.mjs',
      'unmerged_dictionaries.mjs',
    ]) {
      const content = await readFile(join(mainDir, entryPoint), 'utf-8');

      expect(content).toContain('main2.json');
      expect(content).not.toContain('/main.json');
    }

    // Bundler-graph JSON is kept until the bundler picked up the entry points
    expect(existsSync(join(dictionariesDir, 'main.json'))).toBe(true);
    expect(existsSync(join(unmergedDictionariesDir, 'main.json'))).toBe(true);

    await runDeferredRemoval();

    expect(existsSync(join(dictionariesDir, 'main.json'))).toBe(false);
    expect(existsSync(join(unmergedDictionariesDir, 'main.json'))).toBe(false);
    expect(existsSync(join(dictionariesDir, 'main2.json'))).toBe(true);
    expect(existsSync(join(unmergedDictionariesDir, 'main2.json'))).toBe(true);
  });

  it('keeps a multi-source dictionary and drops only the changed file', async () => {
    const { dictionariesDir, unmergedDictionariesDir, typesDir } =
      configuration.system;
    const otherLocalId = 'main::local::src/other.content.ts';
    const changedLocalId = `main::local::${contentFilePath}`;

    await writeFile(
      join(unmergedDictionariesDir, 'main.json'),
      JSON.stringify([
        {
          key: 'main',
          content: {},
          localId: otherLocalId,
          filePath: 'src/other.content.ts',
        },
        {
          key: 'main',
          content: {},
          localId: changedLocalId,
          filePath: contentFilePath,
        },
      ])
    );
    await writeFile(
      join(dictionariesDir, 'main.json'),
      JSON.stringify({
        key: 'main',
        content: {},
        localIds: [otherLocalId, changedLocalId],
      })
    );
    await writeFile(join(typesDir, 'main.ts'), 'export default {};');

    const result = await cleanRemovedContentDeclaration(
      join(baseDir, contentFilePath),
      [],
      configuration
    );

    await runDeferredRemoval();

    expect(result.excludeKeys).toEqual([]);
    expect(result.changedDictionariesLocalIds).toEqual([changedLocalId]);
    expect(existsSync(join(typesDir, 'main.ts'))).toBe(true);

    const merged = JSON.parse(
      await readFile(join(dictionariesDir, 'main.json'), 'utf-8')
    );
    expect(merged.localIds).toEqual([otherLocalId]);

    const unmerged = JSON.parse(
      await readFile(join(unmergedDictionariesDir, 'main.json'), 'utf-8')
    );
    expect(
      unmerged.map((dictionary: { localId: string }) => dictionary.localId)
    ).toEqual([otherLocalId]);
  });
});
