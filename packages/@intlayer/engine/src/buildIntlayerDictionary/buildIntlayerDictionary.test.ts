import { existsSync } from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildConfigurationFields } from '@intlayer/config/node';
import { t } from '@intlayer/core/transpiler';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { buildDictionary } from './buildIntlayerDictionary';

const buildDeclaration = (key: string): Dictionary => ({
  key,
  localId: `${key}::local::src/${key}.content.ts`,
  location: 'local',
  filePath: `src/${key}.content.ts`,
  content: { title: t({ en: 'Title', fr: 'Titre' }) },
});

describe('buildDictionary', () => {
  let baseDir: string;
  let configuration: IntlayerConfig;

  beforeEach(async () => {
    baseDir = await mkdtemp(join(tmpdir(), 'intlayer-build-dictionary-'));

    configuration = buildConfigurationFields(
      {
        internationalization: { locales: ['en', 'fr'], defaultLocale: 'en' },
        dictionary: { importMode: 'static' },
        log: { mode: 'disabled' },
      },
      baseDir
    );
  });

  afterEach(async () => {
    await rm(baseDir, { recursive: true, force: true });
  });

  it('emits the per-locale loader read by getIntlayerAsync in static mode', async () => {
    const { dynamicDictionaries } = await buildDictionary(
      [buildDeclaration('home-metadata')],
      configuration,
      { formats: ['esm'], importOtherDictionaries: false }
    );

    const { dynamicDictionariesDir } = configuration.system;

    expect(Object.keys(dynamicDictionaries ?? {})).toEqual(['home-metadata']);
    expect(existsSync(join(dynamicDictionariesDir, 'home-metadata.mjs'))).toBe(
      true
    );
    expect(
      existsSync(join(dynamicDictionariesDir, 'json/home-metadata/fr.json'))
    ).toBe(true);
  });

  it('writes no fetch loader for a static dictionary', async () => {
    const { fetchDictionaries } = await buildDictionary(
      [buildDeclaration('home-metadata')],
      configuration,
      { formats: ['esm'], importOtherDictionaries: false }
    );

    expect(fetchDictionaries).toBeNull();
  });
});
