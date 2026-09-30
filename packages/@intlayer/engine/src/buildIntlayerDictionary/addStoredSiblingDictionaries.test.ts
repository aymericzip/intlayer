import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { addStoredSiblingDictionaries } from './buildIntlayerDictionary';

const buildDeclaration = (key: string, localId: string, note: string) =>
  ({ key, localId, content: { note } }) as unknown as Dictionary;

describe('addStoredSiblingDictionaries', () => {
  let baseDir: string;
  let configuration: IntlayerConfig;

  beforeEach(async () => {
    baseDir = await mkdtemp(join(tmpdir(), 'intlayer-siblings-'));

    const unmergedDictionariesDir = join(baseDir, 'unmerged_dictionary');

    await mkdir(unmergedDictionariesDir, { recursive: true });
    await writeFile(
      join(unmergedDictionariesDir, 'app.json'),
      JSON.stringify([
        buildDeclaration('app', 'app::local::a.content.ts', 'Stored A'),
        buildDeclaration('app', 'app::local::b.content.ts', 'Stored B'),
      ])
    );
    await writeFile(
      join(unmergedDictionariesDir, 'other.json'),
      JSON.stringify([
        buildDeclaration('other', 'other::local::o.content.ts', 'Other'),
      ])
    );

    configuration = {
      system: { unmergedDictionariesDir },
    } as unknown as IntlayerConfig;
  });

  afterEach(async () => {
    await rm(baseDir, { recursive: true, force: true });
  });

  it('keeps the stored declarations of the same key from other files', () => {
    const rebuiltDeclaration = buildDeclaration(
      'app',
      'app::local::a.content.ts',
      'Rebuilt A'
    );

    expect(
      addStoredSiblingDictionaries([rebuiltDeclaration], configuration)
    ).toEqual([
      rebuiltDeclaration,
      buildDeclaration('app', 'app::local::b.content.ts', 'Stored B'),
    ]);
  });

  it('adds nothing for a key without stored declarations', () => {
    const newDeclaration = buildDeclaration(
      'new',
      'new::local::n.content.ts',
      'New'
    );

    expect(
      addStoredSiblingDictionaries([newDeclaration], configuration)
    ).toEqual([newDeclaration]);
  });
});
