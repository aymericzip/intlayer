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

const buildDeclaration = (
  key: string,
  importMode?: Dictionary['importMode']
): Dictionary => ({
  key,
  ...(importMode && { importMode }),
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

  it('emits no per-locale chunks for a static dictionary', async () => {
    const { dynamicDictionaries, fetchDictionaries } = await buildDictionary(
      [buildDeclaration('home-metadata')],
      configuration,
      { formats: ['esm'], importOtherDictionaries: false }
    );

    expect(dynamicDictionaries).toBeNull();
    expect(fetchDictionaries).toBeNull();
    expect(
      existsSync(
        join(configuration.system.dynamicDictionariesDir, 'home-metadata.mjs')
      )
    ).toBe(false);
  });

  it('emits per-locale chunks for a dictionary declaring the dynamic mode', async () => {
    const { dynamicDictionaries } = await buildDictionary(
      [buildDeclaration('home-metadata', 'dynamic')],
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
});
