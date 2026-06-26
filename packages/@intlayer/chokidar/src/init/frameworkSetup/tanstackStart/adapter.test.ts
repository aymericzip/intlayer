import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { FrameworkSetupContext } from '../types';
import { tanStackStartAdapter } from './index';

describe('tanStackStartAdapter', () => {
  let rootDir: string;

  beforeEach(async () => {
    rootDir = await mkdtemp(join(tmpdir(), 'intlayer-tanstack-adapter-'));
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

  const context = (
    routingMode: FrameworkSetupContext['routingMode'] = 'prefix-no-default'
  ): FrameworkSetupContext => ({
    rootDir,
    allDeps: { '@tanstack/react-start': '^1.0.0', 'react-intlayer': '^7.0.0' },
    packageManager: 'npm',
    useTypeScript: true,
    routingMode,
  });

  it('detects a TanStack Start project', async () => {
    await writeFileAt('src/routes/index.tsx', 'export default function I() {}');
    expect(await tanStackStartAdapter.detect(context())).toBe(true);
  });

  it('does not detect a project without TanStack deps', async () => {
    await writeFileAt('src/routes/index.tsx', 'export default function I() {}');
    expect(
      await tanStackStartAdapter.detect({ ...context(), allDeps: {} })
    ).toBe(false);
  });

  it('does not detect a TanStack dep without a routes dir', async () => {
    expect(await tanStackStartAdapter.detect(context())).toBe(false);
  });

  it('restructures routes under {-$locale} and wraps the root document', async () => {
    await writeFileAt(
      'src/routes/__root.tsx',
      `import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createRootRoute({
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
`
    );
    await writeFileAt(
      'src/routes/index.tsx',
      `import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <h1>Home</h1>,
});
`
    );

    await tanStackStartAdapter.setup(context());

    // Routable file moved under the locale segment, root files stayed.
    expect(await exists('src/routes/{-$locale}/index.tsx')).toBe(true);
    expect(await exists('src/routes/index.tsx')).toBe(false);
    expect(await exists('src/routes/__root.tsx')).toBe(true);

    // Locale segment route scaffolded.
    expect(await exists('src/routes/{-$locale}/route.tsx')).toBe(true);
    const localeRoute = await readFileAt('src/routes/{-$locale}/route.tsx');
    expect(localeRoute).toContain('validatePrefix');
    expect(localeRoute).toContain('createFileRoute("/{-$locale}")');

    // Root document wrapped with the provider + locale derivation.
    const root = await readFileAt('src/routes/__root.tsx');
    expect(root).toContain('IntlayerProvider');
    expect(root).toContain(
      'const locale = useParams({ strict: false }).locale ?? defaultLocale'
    );
    expect(root).toContain('lang={locale}');
    expect(root).toContain('dir={getHTMLTextDir(locale)}');
  });

  it('scaffolds a root document when none exists', async () => {
    await writeFileAt('src/routes/index.tsx', 'export const Route = null;\n');

    await tanStackStartAdapter.setup(context());

    expect(await exists('src/routes/__root.tsx')).toBe(true);
    const root = await readFileAt('src/routes/__root.tsx');
    expect(root).toContain('IntlayerProvider');
    expect(root).toContain('createRootRoute');
  });

  it('keeps api routes at the root and rewrites imports of moved files', async () => {
    await writeFileAt(
      'src/routes/api/users.ts',
      'export const Route = null;\n'
    );
    await writeFileAt(
      'src/routes/-components/Card.tsx',
      'export const Card = null;\n'
    );
    await writeFileAt('src/routeTree.gen.ts', '// generated\n');
    await writeFileAt(
      'src/routes/index.tsx',
      `import { Card } from "./-components/Card";

export const Route = { Card };
`
    );

    await tanStackStartAdapter.setup(context());

    // api + ignored dirs + generated tree stay at root.
    expect(await exists('src/routes/api/users.ts')).toBe(true);
    expect(await exists('src/routes/{-$locale}/api/users.ts')).toBe(false);
    expect(await exists('src/routes/-components/Card.tsx')).toBe(true);
    expect(await exists('src/routeTree.gen.ts')).toBe(true);

    // The moved route file's relative import was rewritten to the new depth.
    expect(await exists('src/routes/{-$locale}/index.tsx')).toBe(true);
    const moved = await readFileAt('src/routes/{-$locale}/index.tsx');
    expect(moved).toContain('../-components/Card');
  });

  it('wraps an arrow-expression-bodied root document without breaking it', async () => {
    await writeFileAt(
      'src/routes/__root.tsx',
      `import { createRootRoute } from "@tanstack/react-router";

const RootDocument = ({ children }: { children: React.ReactNode }) => (
  <html>
    <body>{children}</body>
  </html>
);

export const Route = createRootRoute({ shellComponent: RootDocument });
`
    );
    await writeFileAt('src/routes/index.tsx', 'export const Route = null;\n');

    await tanStackStartAdapter.setup(context());

    const root = await readFileAt('src/routes/__root.tsx');
    // Provider added and locale declared (no dangling reference) via a block body.
    expect(root).toContain('<IntlayerProvider locale={locale}>');
    expect(root).toContain(
      'const locale = useParams({ strict: false }).locale ?? defaultLocale'
    );
    expect(root).toContain('return');
    expect(root).toContain('lang={locale}');
  });

  it('does not inject a duplicate params declaration', async () => {
    await writeFileAt(
      'src/routes/__root.tsx',
      `import { createRootRoute, useParams } from "@tanstack/react-router";

function RootDocument({ children }: { children: React.ReactNode }) {
  const params = useParams({ strict: false });
  return (
    <html data-route={params.foo}>
      <body>{children}</body>
    </html>
  );
}

export const Route = createRootRoute({ shellComponent: RootDocument });
`
    );
    await writeFileAt('src/routes/index.tsx', 'export const Route = null;\n');

    await tanStackStartAdapter.setup(context());

    const root = await readFileAt('src/routes/__root.tsx');
    // Exactly one `const params` — the pre-existing one — survives.
    expect(root.match(/const params =/g)?.length).toBe(1);
    expect(root).toContain('<IntlayerProvider locale={locale}>');
    expect(root).toContain('const locale =');
  });

  it('does not inject a duplicate locale declared via destructuring', async () => {
    await writeFileAt(
      'src/routes/__root.tsx',
      `import { createRootRoute } from "@tanstack/react-router";
import { defaultLocale } from "../i18n/lingui";

function RootDocument({ children }: { children: React.ReactNode }) {
  const { locale = defaultLocale, messages } = Route.useLoaderData();
  return (
    <html data-messages={messages}>
      <body>{children}</body>
    </html>
  );
}

export const Route = createRootRoute({ shellComponent: RootDocument });
`
    );
    await writeFileAt('src/routes/index.tsx', 'export const Route = null;\n');

    await tanStackStartAdapter.setup(context());

    const root = await readFileAt('src/routes/__root.tsx');
    // The destructured `locale` is detected → no second `const locale` is added.
    expect(root).not.toContain('const locale =');
    expect(root).toContain('const { locale = defaultLocale, messages }');
    expect(root).toContain('<IntlayerProvider locale={locale}>');
    expect(root).toContain('lang={locale}');
  });

  it('does not inject a duplicate locale declared as a function parameter', async () => {
    await writeFileAt(
      'src/routes/__root.tsx',
      `import { createRootRoute } from "@tanstack/react-router";

function RootDocument({ children, locale }: { children: React.ReactNode; locale: string }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

export const Route = createRootRoute({ shellComponent: RootDocument });
`
    );
    await writeFileAt('src/routes/index.tsx', 'export const Route = null;\n');

    await tanStackStartAdapter.setup(context());

    const root = await readFileAt('src/routes/__root.tsx');
    // The `locale` parameter is reused → no `const locale` is injected.
    expect(root).not.toContain('const locale =');
    expect(root).toContain('<IntlayerProvider locale={locale}>');
    expect(root).toContain('lang={locale}');
  });

  it('reuses an existing defaultLocale import instead of redeclaring it', async () => {
    await writeFileAt(
      'src/routes/__root.tsx',
      `import { createRootRoute } from "@tanstack/react-router";
import { defaultLocale } from "../i18n/lingui";

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

export const Route = createRootRoute({ shellComponent: RootDocument });
`
    );
    await writeFileAt('src/routes/index.tsx', 'export const Route = null;\n');

    await tanStackStartAdapter.setup(context());

    const root = await readFileAt('src/routes/__root.tsx');
    // The pre-existing local import is reused — `defaultLocale` is not
    // re-imported from `intlayer`, so it is never declared twice.
    expect(root.match(/defaultLocale/g)?.length).toBeGreaterThan(0);
    expect(root).not.toMatch(
      /import \{[^}]*defaultLocale[^}]*\} from ["']intlayer["']/
    );
    expect(root).toContain(
      'const locale = useParams({ strict: false }).locale ?? defaultLocale'
    );
    // getHTMLTextDir was not previously bound, so it is still imported.
    expect(root).toContain('getHTMLTextDir');
  });

  it('uses the required $locale segment (not the optional {-$locale}) for prefix-all', async () => {
    await writeFileAt(
      'src/routes/index.tsx',
      `import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <h1>Home</h1>,
});
`
    );

    await tanStackStartAdapter.setup(context('prefix-all'));

    // Routes moved under the required `$locale` segment, not the optional one.
    expect(await exists('src/routes/$locale/index.tsx')).toBe(true);
    expect(await exists('src/routes/{-$locale}/index.tsx')).toBe(false);

    // The locale route targets the required `$locale` param.
    expect(await exists('src/routes/$locale/route.tsx')).toBe(true);
    const localeRoute = await readFileAt('src/routes/$locale/route.tsx');
    expect(localeRoute).toContain('createFileRoute("/$locale")');
    expect(localeRoute).toContain('to: "/$locale"');
    expect(localeRoute).not.toContain('{-$locale}');
  });

  it('skips restructure for prefix-all routing (existing $locale segment)', async () => {
    await writeFileAt(
      'src/routes/$locale/index.tsx',
      'export const Route = null;\n'
    );

    await tanStackStartAdapter.setup(context());

    // The existing prefix-all segment is left in place and never nested under a
    // freshly created `{-$locale}` (which would produce `{-$locale}/$locale`).
    expect(await exists('src/routes/$locale/index.tsx')).toBe(true);
    expect(await exists('src/routes/{-$locale}/$locale/index.tsx')).toBe(false);
    expect(await exists('src/routes/{-$locale}/index.tsx')).toBe(false);
  });

  it('is idempotent (already-structured project is left intact)', async () => {
    await writeFileAt(
      'src/routes/__root.tsx',
      `import { IntlayerProvider } from "react-intlayer";

function RootDocument({ children }) {
  return <html><body><IntlayerProvider locale="en">{children}</IntlayerProvider></body></html>;
}
`
    );
    await writeFileAt(
      'src/routes/{-$locale}/index.tsx',
      'export const Route = null;\n'
    );

    const before = await readFileAt('src/routes/__root.tsx');
    await tanStackStartAdapter.setup(context());
    const after = await readFileAt('src/routes/__root.tsx');

    // Root already wraps the provider → untouched.
    expect(after).toBe(before);
  });
});
