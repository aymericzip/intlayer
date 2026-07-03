import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { FrameworkSetupContext } from '../types';
import { nextAppRouterAdapter } from './index';

describe('nextAppRouterAdapter', () => {
  let rootDir: string;

  beforeEach(async () => {
    rootDir = await mkdtemp(join(tmpdir(), 'intlayer-next-adapter-'));
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

  const context = (): FrameworkSetupContext => ({
    rootDir,
    allDeps: { next: '^16.0.0', 'next-intlayer': '^7.0.0' },
    packageManager: 'npm',
    useTypeScript: true,
    routingMode: 'prefix-no-default',
  });

  it('detects a Next.js App Router project', async () => {
    await writeFileAt('src/app/page.tsx', 'export default function P() {}');
    expect(await nextAppRouterAdapter.detect(context())).toBe(true);
  });

  it('does not detect a non-Next project', async () => {
    await writeFileAt('src/app/page.tsx', 'export default function P() {}');
    expect(
      await nextAppRouterAdapter.detect({
        ...context(),
        allDeps: {},
      })
    ).toBe(false);
  });

  it('fully scaffolds a create-next-app style project', async () => {
    await writeFileAt(
      'src/app/layout.tsx',
      `import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`
    );
    await writeFileAt(
      'src/app/page.tsx',
      `export default function Home() {
  return <main><h1>Hello</h1></main>;
}`
    );
    await writeFileAt('src/app/globals.css', 'body{}');

    await nextAppRouterAdapter.setup(context());

    // Proxy created (Next >= 16)
    expect(await exists('src/proxy.ts')).toBe(true);
    expect(await readFileAt('src/proxy.ts')).toContain('intlayerProxy');

    // Restructured under [locale]
    expect(await exists('src/app/[locale]/layout.tsx')).toBe(true);
    expect(await exists('src/app/[locale]/page.tsx')).toBe(true);

    // globals.css stayed at root and its import was rewritten
    expect(await exists('src/app/globals.css')).toBe(true);

    // Minimal root layout created
    const rootLayout = await readFileAt('src/app/layout.tsx');
    expect(rootLayout).toContain('<>{children}</>');

    // Locale layout wrapped with the client provider
    const localeLayout = await readFileAt('src/app/[locale]/layout.tsx');
    expect(localeLayout).toContain('IntlayerClientProvider');
    expect(localeLayout).toContain('const locale = await getLocale();');
    expect(localeLayout).toContain('../globals.css');

    // Page wrapped with the server provider
    const localePage = await readFileAt('src/app/[locale]/page.tsx');
    expect(localePage).toContain('IntlayerServerProvider');
    expect(localePage).toContain('const locale = await getLocale();');
  });

  it('creates middleware (not proxy) for Next < 16', async () => {
    await writeFileAt(
      'app/page.tsx',
      'export default function P() { return <main/>; }'
    );

    await nextAppRouterAdapter.setup({
      ...context(),
      allDeps: { next: '^15.0.0' },
    });

    expect(await exists('middleware.ts')).toBe(true);
    expect(await readFileAt('middleware.ts')).toContain('intlayerMiddleware');
    expect(await exists('proxy.ts')).toBe(false);
  });

  it('is idempotent and never overwrites an existing proxy', async () => {
    await writeFileAt(
      'src/app/page.tsx',
      'export default function P() { return <main/>; }'
    );
    await writeFileAt('src/proxy.ts', '// my custom proxy');

    await nextAppRouterAdapter.setup(context());
    const firstPage = await readFileAt('src/app/[locale]/page.tsx');

    // second run is a no-op for already-wrapped files
    await nextAppRouterAdapter.setup(context());
    const secondPage = await readFileAt('src/app/[locale]/page.tsx');

    expect(secondPage).toBe(firstPage);
    expect(await readFileAt('src/proxy.ts')).toBe('// my custom proxy');
  });

  it('does not touch a client-component layout, leaving guidance instead', async () => {
    await writeFileAt(
      'src/app/layout.tsx',
      `"use client";
export default function RootLayout({ children }: any) {
  return <html><body>{children}</body></html>;
}`
    );
    await writeFileAt(
      'src/app/page.tsx',
      'export default function P() { return <main/>; }'
    );

    await nextAppRouterAdapter.setup(context());

    const localeLayout = await readFileAt('src/app/[locale]/layout.tsx');
    // Left untouched (no provider injected into a client component)
    expect(localeLayout).toContain('"use client"');
    expect(localeLayout).not.toContain('IntlayerClientProvider');
  });
});
