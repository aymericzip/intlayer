import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { FrameworkSetupContext } from '../types';
import { expressAdapter, nestJsAdapter } from './index';

describe('backend adapters', () => {
  let rootDir: string;

  beforeEach(async () => {
    rootDir = await mkdtemp(join(tmpdir(), 'intlayer-backend-adapter-'));
  });

  afterEach(async () => {
    await rm(rootDir, { recursive: true, force: true });
  });

  const writeFileAt = async (relativePath: string, content: string) => {
    const absolutePath = join(rootDir, relativePath);
    await mkdir(dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, content, 'utf8');
  };

  const readFileAt = (relativePath: string) =>
    readFile(join(rootDir, relativePath), 'utf8');

  const context = (allDeps: Record<string, string>): FrameworkSetupContext => ({
    rootDir,
    allDeps,
    packageManager: 'npm',
    useTypeScript: true,
    routingMode: 'prefix-no-default',
    enableProxy: true,
  });

  const EXPRESS_APP = `import express from "express";

const app = express();
app.listen(3000);
`;

  it('registers the middleware in the file that creates the app', async () => {
    // A first candidate that does not create the app is skipped
    await writeFileAt('src/index.ts', 'import "./server";\n');
    await writeFileAt('src/server.ts', EXPRESS_APP);

    await expressAdapter.setup(context({ express: '^5.0.0' }));

    expect(await readFileAt('src/index.ts')).toBe('import "./server";\n');
    expect(await readFileAt('src/server.ts')).toContain('app.use(intlayer());');
  });

  it('prefers the package.json main entry', async () => {
    await writeFileAt(
      'package.json',
      JSON.stringify({ main: './lib/start.js' })
    );
    await writeFileAt('lib/start.js', EXPRESS_APP);
    await writeFileAt('src/index.ts', EXPRESS_APP);

    await expressAdapter.setup(context({ express: '^5.0.0' }));

    expect(await readFileAt('lib/start.js')).toContain('app.use(intlayer());');
    expect(await readFileAt('src/index.ts')).toBe(EXPRESS_APP);
  });

  it('is idempotent', async () => {
    await writeFileAt('src/index.ts', EXPRESS_APP);

    await expressAdapter.setup(context({ express: '^5.0.0' }));
    const firstRun = await readFileAt('src/index.ts');
    await expressAdapter.setup(context({ express: '^5.0.0' }));

    expect(await readFileAt('src/index.ts')).toBe(firstRun);
  });

  it('only detects NestJS on the Express platform', () => {
    expect(nestJsAdapter.detect(context({ '@nestjs/core': '^11.0.0' }))).toBe(
      true
    );
    expect(
      nestJsAdapter.detect(
        context({
          '@nestjs/core': '^11.0.0',
          '@nestjs/platform-fastify': '^11.0.0',
        })
      )
    ).toBe(false);
  });
});
