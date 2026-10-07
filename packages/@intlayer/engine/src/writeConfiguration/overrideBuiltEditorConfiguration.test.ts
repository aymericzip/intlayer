import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { IntlayerConfig } from '@intlayer/types/config';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { overrideBuiltEditorConfiguration } from './index';

describe('overrideBuiltEditorConfiguration', () => {
  let configDir: string;

  const createConfiguration = (enabled: boolean): IntlayerConfig =>
    ({
      editor: {
        enabled,
        editorURL: 'http://localhost:8000',
        clientSecret: 'secret',
      },
      system: { configDir },
    }) as unknown as IntlayerConfig;

  const readBuiltConfiguration = (format: 'mjs' | 'cjs') =>
    readFile(join(configDir, `configuration.${format}`), 'utf8');

  beforeEach(async () => {
    configDir = await mkdtemp(join(tmpdir(), 'intlayer-config-'));
  });

  afterEach(async () => {
    await rm(configDir, { recursive: true, force: true });
  });

  it('writes the overrides in both built configuration formats', async () => {
    const configuration = createConfiguration(false);

    const overriddenKeys = await overrideBuiltEditorConfiguration(
      configuration,
      { enabled: true, editorURL: 'http://localhost:8001' }
    );

    expect(overriddenKeys).toEqual(['enabled', 'editorURL']);

    for (const format of ['mjs', 'cjs'] as const) {
      const content = await readBuiltConfiguration(format);

      expect(content).toContain('"enabled": true');
      expect(content).toContain('"editorURL": "http://localhost:8001"');
      expect(content).not.toContain('secret');
    }

    // The passed configuration is left untouched
    expect(configuration.editor.enabled).toBe(false);
  });

  it('writes nothing when the overrides match the configuration', async () => {
    const overriddenKeys = await overrideBuiltEditorConfiguration(
      createConfiguration(true),
      { enabled: true, editorURL: undefined }
    );

    expect(overriddenKeys).toEqual([]);
    await expect(readBuiltConfiguration('mjs')).rejects.toThrow();
  });
});
