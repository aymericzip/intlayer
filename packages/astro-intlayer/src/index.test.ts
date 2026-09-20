// @vitest-environment node

import { readFile } from 'node:fs/promises';
import type { AstroIntegration } from 'astro';
import type { Plugin } from 'vite';
import { describe, expect, it, vi } from 'vitest';
import intlayerDefault, { intlayer } from './index';

vi.mock('@intlayer/engine/build', () => ({
  prepareIntlayer: vi.fn().mockResolvedValue(undefined),
}));

const mockLogger = vi.hoisted(() => vi.fn());

vi.mock('@intlayer/config/logger', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@intlayer/config/logger')>()),
  getAppLogger: () => mockLogger,
}));

vi.mock('vite-intlayer', async () => {
  const { INTLAYER_NO_EXTERNAL_PATTERN } =
    await vi.importActual<typeof import('vite-intlayer')>('vite-intlayer');

  return {
    INTLAYER_NO_EXTERNAL_PATTERN,
    intlayer: () => ({ name: 'vite-intlayer-plugin' }),
  };
});

/**
 * Runs `astro:config:setup` and returns the Vite config the integration
 * pushed through `updateConfig`.
 */
const runConfigSetup = async (
  command: 'dev' | 'build' | 'preview' | 'sync' = 'build'
) => {
  const updateConfig = vi.fn();
  const addMiddleware = vi.fn();
  const injectScript = vi.fn();
  const hook = intlayer().hooks['astro:config:setup'];

  await hook?.({
    command,
    updateConfig,
    addMiddleware,
    injectScript,
  } as unknown as Parameters<
    NonNullable<AstroIntegration['hooks']['astro:config:setup']>
  >[0]);

  return {
    vite: updateConfig.mock.calls[0][0].vite,
    addMiddleware,
    injectScript,
  };
};

describe('astro-intlayer entry point', () => {
  // `astro add astro-intlayer` codemods the Astro config with a default
  // import, so losing the default export silently breaks that install path.
  it('exposes the integration as both the named and the default export', () => {
    expect(intlayerDefault).toBe(intlayer);
  });

  it('creates an integration named after the package', () => {
    expect(intlayer().name).toBe('astro-intlayer');
  });
});

describe('astro-intlayer middleware registration', () => {
  // Pages import their hooks from this entry, which Astro bundles into the
  // server build — the Node-only tooling must stay behind a dynamic import.
  it('keeps the tooling out of the static import graph of the entry', async () => {
    const source = await readFile(
      new URL('./index.ts', import.meta.url),
      'utf8'
    );
    const staticImports = source.match(/^import .* from '(.*)';$/gm) ?? [];

    expect(staticImports).toEqual([
      "import type { AstroIntegration } from 'astro';",
    ]);
  });

  // The `astro-intlayer/server` hooks read `Astro.locals.intlayer`, which
  // only exists when the package middleware ran ahead of the user's one.
  it('registers the locale middleware before the user middleware', async () => {
    const { addMiddleware } = await runConfigSetup();

    expect(addMiddleware).toHaveBeenCalledWith({
      entrypoint: 'astro-intlayer/middleware',
      order: 'pre',
    });
  });

  // Prerendered pages are served as static files, where only the browser can
  // read the stored locale and send the visitor to the matching URL.
  it('injects the client-side locale redirect on every page', async () => {
    const { injectScript } = await runConfigSetup();

    expect(injectScript).toHaveBeenCalledWith(
      'page',
      expect.stringContaining('redirectToStoredLocale()')
    );
  });

  // `astro preview` runs no Vite plugin, so the integration announces the
  // proxy there; `dev` and `build` are announced by the bundled Vite plugin.
  it('announces the proxy for preview only', async () => {
    mockLogger.mockClear();

    await runConfigSetup('preview');
    expect(mockLogger).toHaveBeenCalledTimes(1);
    expect(mockLogger).toHaveBeenCalledWith(
      expect.stringMatching(/^Intlayer proxy .*enabled.*$/),
      { level: 'info' }
    );
    expect(mockLogger.mock.calls[0][0]).not.toContain('disabled');

    mockLogger.mockClear();
    await runConfigSetup('dev');
    await runConfigSetup('build');
    await runConfigSetup('sync');
    expect(mockLogger).not.toHaveBeenCalled();
  });
});

describe('astro-intlayer no-external declaration', () => {
  // Astro crawls the dependency tree of every package tagged as an Astro
  // package and force-externalizes what it finds. Since `resolve.external`
  // wins over `resolve.noExternal`, the intlayer packages would be loaded
  // natively by Node and serve dictionaries out of Node's require cache.
  // The crawl reads the Astro config, so this must be declared here rather
  // than returned from the Vite plugin's own `config` hook.
  it('declares the intlayer packages as ssr.noExternal in the Astro config', async () => {
    const { vite: viteConfig } = await runConfigSetup();

    expect(viteConfig.ssr.noExternal).toEqual([expect.any(RegExp)]);
    expect(
      viteConfig.ssr.noExternal.some((pattern: RegExp) =>
        ['intlayer', '@intlayer/core'].every((packageName) =>
          pattern.test(packageName)
        )
      )
    ).toBe(true);
  });

  // A top-level `ssr.noExternal` only seeds Vite's `ssr` environment, while
  // Astro also renders from its `astro` and `prerender` environments.
  it('declares the same packages for every Vite environment', async () => {
    const { vite: viteConfig } = await runConfigSetup();

    const plugin = (viteConfig.plugins as Plugin[]).find(
      ({ name }) => name === 'astro-intlayer-no-external'
    );

    const environmentConfig = (
      plugin?.configEnvironment as (name: string, options: unknown) => unknown
    )?.('astro', {});

    expect(environmentConfig).toEqual({
      resolve: { noExternal: viteConfig.ssr.noExternal },
    });
  });
});
