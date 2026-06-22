import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  restructureAppIntoLocale,
  shouldKeepAppEntryAtRoot,
} from './restructure';

describe('shouldKeepAppEntryAtRoot', () => {
  it('keeps root-only conventions at the app root', () => {
    for (const name of [
      'api',
      'globals.css',
      'favicon.ico',
      'icon.png',
      'apple-icon.tsx',
      'opengraph-image.tsx',
      'sitemap.ts',
      'robots.ts',
      'manifest.ts',
      'not-found.tsx',
      'global-error.tsx',
    ]) {
      expect(shouldKeepAppEntryAtRoot(name)).toBe(true);
    }
  });

  it('moves routable entries under [locale]', () => {
    for (const name of [
      'page.tsx',
      'layout.tsx',
      'loading.tsx',
      'error.tsx',
      'template.tsx',
      'dashboard',
      'blog',
    ]) {
      expect(shouldKeepAppEntryAtRoot(name)).toBe(false);
    }
  });
});

describe('restructureAppIntoLocale', () => {
  let rootDir: string;

  beforeEach(async () => {
    rootDir = await mkdtemp(join(tmpdir(), 'intlayer-next-'));
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

  const exists = async (relativePath: string) => {
    try {
      await readFile(join(rootDir, relativePath), 'utf8');
      return true;
    } catch {
      return false;
    }
  };

  it('moves routable entries under [locale] and keeps root-only files', async () => {
    await writeFileAt('src/app/layout.tsx', 'export default function L() {}');
    await writeFileAt('src/app/page.tsx', 'export default function P() {}');
    await writeFileAt('src/app/globals.css', 'body{}');
    await writeFileAt('src/app/favicon.ico', '');
    await writeFileAt('src/app/api/health/route.ts', 'export const GET = 1;');
    await writeFileAt(
      'src/app/dashboard/page.tsx',
      'export default function D() {}'
    );

    const result = await restructureAppIntoLocale(rootDir, 'src/app');

    expect(result.status).toBe('moved');
    // Moved
    expect(await exists('src/app/[locale]/layout.tsx')).toBe(true);
    expect(await exists('src/app/[locale]/page.tsx')).toBe(true);
    expect(await exists('src/app/[locale]/dashboard/page.tsx')).toBe(true);
    // Kept
    expect(await exists('src/app/globals.css')).toBe(true);
    expect(await exists('src/app/favicon.ico')).toBe(true);
    expect(await exists('src/app/api/health/route.ts')).toBe(true);
    // Original locations gone
    expect(await exists('src/app/page.tsx')).toBe(false);
  });

  it('rewrites relative imports to files that stayed at the root', async () => {
    await writeFileAt(
      'src/app/layout.tsx',
      `import "./globals.css";\nexport default function L() {}`
    );
    await writeFileAt('src/app/globals.css', 'body{}');

    await restructureAppIntoLocale(rootDir, 'src/app');

    const moved = await readFileAt('src/app/[locale]/layout.tsx');
    expect(moved).toContain('../globals.css');
  });

  it('rewrites relative imports that escape the app directory', async () => {
    await writeFileAt(
      'src/app/page.tsx',
      `import { Button } from "../components/Button";\nexport default function P() {}`
    );
    await writeFileAt('src/components/Button.tsx', 'export const Button = 1;');

    await restructureAppIntoLocale(rootDir, 'src/app');

    const moved = await readFileAt('src/app/[locale]/page.tsx');
    expect(moved).toContain('../../components/Button');
  });

  it('keeps imports between two moved siblings unchanged', async () => {
    await writeFileAt(
      'src/app/page.tsx',
      `import x from "./other";\nexport default function P() {}`
    );
    await writeFileAt('src/app/other.tsx', 'export default 1;');

    await restructureAppIntoLocale(rootDir, 'src/app');

    const moved = await readFileAt('src/app/[locale]/page.tsx');
    expect(moved).toContain('"./other"');
  });

  it('leaves bare and alias imports untouched', async () => {
    await writeFileAt(
      'src/app/page.tsx',
      `import { useState } from "react";\nimport { x } from "@/lib/x";\nexport default function P() {}`
    );

    await restructureAppIntoLocale(rootDir, 'src/app');

    const moved = await readFileAt('src/app/[locale]/page.tsx');
    expect(moved).toContain('"react"');
    expect(moved).toContain('"@/lib/x"');
  });

  it('is idempotent when [locale] already exists', async () => {
    await writeFileAt(
      'src/app/[locale]/page.tsx',
      'export default function P() {}'
    );
    await writeFileAt('src/app/page.tsx', 'export default function Root() {}');

    const result = await restructureAppIntoLocale(rootDir, 'src/app');

    expect(result.status).toBe('already-structured');
    // Existing root page is left untouched (no destructive move)
    expect(await exists('src/app/page.tsx')).toBe(true);
  });

  it('reports nothing-to-move when only root-only files exist', async () => {
    await writeFileAt('src/app/globals.css', 'body{}');
    await writeFileAt('src/app/favicon.ico', '');

    const result = await restructureAppIntoLocale(rootDir, 'src/app');

    expect(result.status).toBe('nothing-to-move');
  });
});
