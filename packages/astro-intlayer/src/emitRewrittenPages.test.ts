// @vitest-environment node

import { mkdir, mkdtemp, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { IntlayerConfig } from '@intlayer/types/config';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { emitRewrittenPages } from './emitRewrittenPages';

const buildConfiguration = (
  overrides: Partial<IntlayerConfig['routing']> = {}
) =>
  ({
    internationalization: {
      locales: ['es', 'en'],
      defaultLocale: 'es',
    },
    routing: {
      mode: 'prefix-no-default',
      rewrite: {
        '/about': { es: '/nosotros', en: '/about' },
        '/products/[id]': { es: '/productos/[id]', en: '/products/[id]' },
      },
      ...overrides,
    },
  }) as unknown as IntlayerConfig;

let outputDirectory: string;

/**
 * Creates an empty HTML file at the given path, relative to the output dir.
 */
const writePage = async (relativePath: string) => {
  const filePath = join(outputDirectory, relativePath);
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, `<html><body>${relativePath}</body></html>`);
};

/**
 * Lists every emitted HTML file, relative to the output dir, sorted.
 */
const listPages = async (directory = outputDirectory): Promise<string[]> => {
  const entries = await readdir(directory, {
    withFileTypes: true,
    recursive: true,
  });

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) =>
      join(entry.parentPath, entry.name).slice(outputDirectory.length + 1)
    )
    .sort();
};

beforeEach(async () => {
  outputDirectory = await mkdtemp(join(tmpdir(), 'astro-intlayer-'));
});

afterEach(async () => {
  await rm(outputDirectory, { recursive: true, force: true });
});

describe('emitRewrittenPages', () => {
  it('emits the default-locale page at its rewritten path', async () => {
    await writePage('about/index.html');

    const emitted = await emitRewrittenPages(
      buildConfiguration(),
      pathToFileURL(`${outputDirectory}/`)
    );

    expect(emitted).toEqual([['/about', '/nosotros']]);
    expect(await listPages()).toEqual([
      'about/index.html',
      'nosotros/index.html',
    ]);
  });

  it('keeps the locale prefix of prefixed pages', async () => {
    await writePage('en/about/index.html');

    const emitted = await emitRewrittenPages(
      buildConfiguration({
        rewrite: { '/about': { es: '/nosotros', en: '/a-propos' } },
      }),
      pathToFileURL(`${outputDirectory}/`)
    );

    expect(emitted).toEqual([['/en/about', '/en/a-propos']]);
    expect(await listPages()).toContain('en/a-propos/index.html');
  });

  it('skips pages whose localized path equals the canonical one', async () => {
    await writePage('en/about/index.html');
    await writePage('index.html');

    const emitted = await emitRewrittenPages(
      buildConfiguration(),
      pathToFileURL(`${outputDirectory}/`)
    );

    expect(emitted).toEqual([]);
    expect(await listPages()).toEqual(['en/about/index.html', 'index.html']);
  });

  it('preserves route parameters', async () => {
    await writePage('products/42/index.html');

    const emitted = await emitRewrittenPages(
      buildConfiguration(),
      pathToFileURL(`${outputDirectory}/`)
    );

    expect(emitted).toEqual([['/products/42', '/productos/42']]);
    expect(await listPages()).toContain('productos/42/index.html');
  });

  it('mirrors the `file` build format', async () => {
    await writePage('about.html');

    const emitted = await emitRewrittenPages(
      buildConfiguration(),
      pathToFileURL(`${outputDirectory}/`)
    );

    expect(emitted).toEqual([['/about', '/nosotros']]);
    expect(await listPages()).toEqual(['about.html', 'nosotros.html']);
  });

  it('does nothing without rewrite rules', async () => {
    await writePage('about/index.html');

    const emitted = await emitRewrittenPages(
      buildConfiguration({ rewrite: undefined }),
      pathToFileURL(`${outputDirectory}/`)
    );

    expect(emitted).toEqual([]);
  });

  it('does nothing in non-prefix routing modes', async () => {
    await writePage('about/index.html');

    const emitted = await emitRewrittenPages(
      buildConfiguration({ mode: 'no-prefix' }),
      pathToFileURL(`${outputDirectory}/`)
    );

    expect(emitted).toEqual([]);
  });
});
