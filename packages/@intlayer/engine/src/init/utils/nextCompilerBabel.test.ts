import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { exists } from './fileSystem';
import {
  NEXT_INTLAYER_BABEL_CONFIG_CONTENT,
  setupNextCompilerBabelConfig,
} from './nextCompilerBabel';

describe('setupNextCompilerBabelConfig', () => {
  let rootDir: string;

  beforeEach(async () => {
    rootDir = await mkdtemp(join(tmpdir(), 'intlayer-init-babel-'));
  });

  afterEach(async () => {
    await rm(rootDir, { recursive: true, force: true });
  });

  const run = () =>
    setupNextCompilerBabelConfig({
      rootDir,
      packageManager: 'npm',
      // Pretend @intlayer/babel is already installed so the test never shells out.
      allDeps: { '@intlayer/babel': '9.0.0' },
      skipInstall: true,
    });

  it('does nothing when no Babel config is present', async () => {
    await run();

    expect(await exists(rootDir, 'babel.config.js')).toBe(false);
  });

  it('does nothing when only SWC is configured (withIntlayer injects @intlayer/swc, no Babel setup needed)', async () => {
    await writeFile(join(rootDir, '.swcrc'), '{}', 'utf8');

    await run();

    // A babel.config.js must NOT be created: adding one makes Next.js fall back
    // from SWC to Babel, disabling both .swcrc and the @intlayer/swc plugin.
    expect(await exists(rootDir, 'babel.config.js')).toBe(false);
  });

  it('leaves an existing babel config untouched', async () => {
    const existing = 'module.exports = { presets: ["next/babel"] };\n';
    await writeFile(join(rootDir, 'babel.config.js'), existing, 'utf8');

    await run();

    const content = await readFile(join(rootDir, 'babel.config.js'), 'utf8');
    expect(content).toBe(existing);
  });

  it('is idempotent when the babel config already wires Intlayer', async () => {
    await writeFile(
      join(rootDir, 'babel.config.js'),
      NEXT_INTLAYER_BABEL_CONFIG_CONTENT,
      'utf8'
    );

    await run();

    const content = await readFile(join(rootDir, 'babel.config.js'), 'utf8');
    expect(content).toBe(NEXT_INTLAYER_BABEL_CONFIG_CONTENT);
  });
});
