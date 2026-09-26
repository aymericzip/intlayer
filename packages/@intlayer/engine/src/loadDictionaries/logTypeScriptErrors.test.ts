import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import type { IntlayerConfig } from '@intlayer/types/config';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const loggedMessages: string[] = [];

vi.mock('@intlayer/config/logger', () => ({
  getAppLogger: () => (message: string) => {
    loggedMessages.push(message);
  },
}));

/** Root install, pinned to the classic (<= 6) compiler API. */
const loadClassicTypeScript = (): Record<string, unknown> =>
  createRequire(resolve(__dirname, '../../../../../package.json'))(
    'typescript'
  );

const importLogTypeScriptErrors = async () =>
  (await import('./logTypeScriptErrors')).logTypeScriptErrors;

describe('logTypeScriptErrors', () => {
  let testDir: string;
  let configuration: IntlayerConfig;

  beforeEach(async () => {
    loggedMessages.length = 0;
    vi.resetModules();
    testDir = await mkdtemp(join(tmpdir(), 'log-typescript-errors-'));
    configuration = { system: { baseDir: testDir } } as IntlayerConfig;

    await writeFile(
      join(testDir, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: { strict: true, noEmit: true, module: 'nodenext' },
        include: ['*.ts'],
      })
    );
    await writeFile(
      join(testDir, 'invalid.content.ts'),
      'const value: number = "text";\nexport default value;\n'
    );
    await writeFile(
      join(testDir, 'valid.content.ts'),
      'const value: number = 1;\nexport default value;\n'
    );
  });

  afterEach(async () => {
    vi.doUnmock('typescript');
    await rm(testDir, { recursive: true, force: true });
  });

  it('logs errors with the native compiler (typescript >= 7)', async () => {
    const logTypeScriptErrors = await importLogTypeScriptErrors();

    await logTypeScriptErrors(
      [join(testDir, 'invalid.content.ts'), join(testDir, 'valid.content.ts')],
      configuration
    );

    expect(loggedMessages).toHaveLength(1);
    expect(loggedMessages[0]).toContain('invalid.content.ts (1,7)');
    expect(loggedMessages[0]).toContain(
      "Type 'string' is not assignable to type 'number'."
    );
  }, 30_000);

  it('logs errors with the classic compiler (typescript <= 6)', async () => {
    const classicTypeScript = loadClassicTypeScript();
    vi.doMock('typescript', () => ({
      ...classicTypeScript,
      default: classicTypeScript,
    }));
    const logTypeScriptErrors = await importLogTypeScriptErrors();

    await logTypeScriptErrors(
      [join(testDir, 'invalid.content.ts'), join(testDir, 'valid.content.ts')],
      configuration
    );

    expect(loggedMessages).toHaveLength(1);
    expect(loggedMessages[0]).toContain('invalid.content.ts (1,7)');
    expect(loggedMessages[0]).toContain(
      "Type 'string' is not assignable to type 'number'."
    );
  }, 30_000);

  it('skips files without a checkable extension', async () => {
    const logTypeScriptErrors = await importLogTypeScriptErrors();

    await logTypeScriptErrors([join(testDir, 'content.md')], configuration);

    expect(loggedMessages).toHaveLength(0);
  });
});
