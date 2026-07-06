import { mkdtempSync, rmSync, utimesSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import * as esbuild from 'esbuild';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  clearTranspileCache,
  transpileTSToCJS,
  transpileTSToCJSSync,
} from './transpileTSToCJS';

const temporaryDirectory = mkdtempSync(join(tmpdir(), 'intlayer-transpile-'));

// Give the fixture directory a package.json so tsconfig resolution behaves
// like a real project instead of walking out of the temp directory.
writeFileSync(
  join(temporaryDirectory, 'package.json'),
  JSON.stringify({ name: 'transpile-fixture', private: true })
);

/** Wraps the real esbuild so calls can be counted while keeping real behavior. */
const createSpiedEsbuildInstance = () => {
  const buildSpy = vi.fn(esbuild.build);
  const buildSyncSpy = vi.fn(esbuild.buildSync);

  const esbuildInstance = {
    ...esbuild,
    build: buildSpy,
    buildSync: buildSyncSpy,
  } as unknown as typeof esbuild;

  return { esbuildInstance, buildSpy, buildSyncSpy };
};

describe('transpileTSToCJS', () => {
  beforeEach(() => {
    clearTranspileCache();
  });

  afterAll(() => {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  });

  it('transpiles a TS module to CJS', async () => {
    const filePath = join(temporaryDirectory, 'simple.content.ts');
    const code = `const content = { key: 'simple' as const };\nexport default content;`;

    const output = await transpileTSToCJS(code, filePath);

    expect(output).toBeDefined();
    expect(output).toContain('simple');
    // CJS output should reference module.exports / exports
    expect(output).toMatch(/exports/);
  });

  it('returns the cached output on a second call with identical code', async () => {
    const { esbuildInstance, buildSpy } = createSpiedEsbuildInstance();
    const filePath = join(temporaryDirectory, 'cached.content.ts');
    const code = `export default { key: 'cached' };`;

    const firstOutput = await transpileTSToCJS(code, filePath, {
      esbuildInstance,
    });
    const secondOutput = await transpileTSToCJS(code, filePath, {
      esbuildInstance,
    });

    expect(firstOutput).toBeDefined();
    expect(secondOutput).toBe(firstOutput);
    expect(buildSpy).toHaveBeenCalledTimes(1);
  });

  it('rebuilds when the entry code changes', async () => {
    const { esbuildInstance, buildSpy } = createSpiedEsbuildInstance();
    const filePath = join(temporaryDirectory, 'changed.content.ts');

    const firstOutput = await transpileTSToCJS(
      `export default { key: 'before' };`,
      filePath,
      { esbuildInstance }
    );
    const secondOutput = await transpileTSToCJS(
      `export default { key: 'after' };`,
      filePath,
      { esbuildInstance }
    );

    expect(buildSpy).toHaveBeenCalledTimes(2);
    expect(firstOutput).toContain('before');
    expect(secondOutput).toContain('after');
  });

  it('rebuilds when a bundled relative import changes', async () => {
    const { esbuildInstance, buildSpy } = createSpiedEsbuildInstance();
    const dependencyPath = join(temporaryDirectory, 'dependency.ts');
    const entryPath = join(temporaryDirectory, 'entry.content.ts');
    const entryCode = `import { value } from './dependency';\nexport default { key: value };`;

    writeFileSync(dependencyPath, `export const value = 'first-value';`);

    const firstOutput = await transpileTSToCJS(entryCode, entryPath, {
      esbuildInstance,
    });
    expect(firstOutput).toContain('first-value');
    expect(buildSpy).toHaveBeenCalledTimes(1);

    // Unchanged dependency → cache hit
    await transpileTSToCJS(entryCode, entryPath, { esbuildInstance });
    expect(buildSpy).toHaveBeenCalledTimes(1);

    // Change the dependency and force a distinct mtime so the fingerprint differs
    writeFileSync(dependencyPath, `export const value = 'second-value';`);
    const futureTime = new Date(Date.now() + 5_000);
    utimesSync(dependencyPath, futureTime, futureTime);

    const thirdOutput = await transpileTSToCJS(entryCode, entryPath, {
      esbuildInstance,
    });
    expect(buildSpy).toHaveBeenCalledTimes(2);
    expect(thirdOutput).toContain('second-value');
  });

  it('does not share cache entries between different build options', async () => {
    const { esbuildInstance, buildSpy } = createSpiedEsbuildInstance();
    const filePath = join(temporaryDirectory, 'options.content.ts');
    const code = `export default { key: 'options' };`;

    await transpileTSToCJS(code, filePath, { esbuildInstance });
    await transpileTSToCJS(code, filePath, {
      esbuildInstance,
      banner: { js: '// custom banner' },
    });

    expect(buildSpy).toHaveBeenCalledTimes(2);
  });

  it('caches the sync path as well', () => {
    const { esbuildInstance, buildSyncSpy } = createSpiedEsbuildInstance();
    const filePath = join(temporaryDirectory, 'sync.content.ts');
    const code = `export default { key: 'sync' };`;

    const firstOutput = transpileTSToCJSSync(code, filePath, {
      esbuildInstance,
    });
    const secondOutput = transpileTSToCJSSync(code, filePath, {
      esbuildInstance,
    });

    expect(firstOutput).toBeDefined();
    expect(secondOutput).toBe(firstOutput);
    expect(buildSyncSpy).toHaveBeenCalledTimes(1);
  });
});
