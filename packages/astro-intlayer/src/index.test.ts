// @vitest-environment node

import type { AstroIntegration } from 'astro';
import type { Plugin } from 'vite';
import { describe, expect, it, vi } from 'vitest';
import intlayerDefault, { intlayer } from './index';

vi.mock('@intlayer/engine/build', () => ({
  prepareIntlayer: vi.fn().mockResolvedValue(undefined),
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
const runConfigSetup = async () => {
  const updateConfig = vi.fn();
  const hook = intlayer().hooks['astro:config:setup'];

  await hook?.({ updateConfig } as unknown as Parameters<
    NonNullable<AstroIntegration['hooks']['astro:config:setup']>
  >[0]);

  return updateConfig.mock.calls[0][0].vite;
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

describe('astro-intlayer no-external declaration', () => {
  // Astro crawls the dependency tree of every package tagged as an Astro
  // package and force-externalizes what it finds. Since `resolve.external`
  // wins over `resolve.noExternal`, the intlayer packages would be loaded
  // natively by Node and serve dictionaries out of Node's require cache.
  // The crawl reads the Astro config, so this must be declared here rather
  // than returned from the Vite plugin's own `config` hook.
  it('declares the intlayer packages as ssr.noExternal in the Astro config', async () => {
    const viteConfig = await runConfigSetup();

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
    const viteConfig = await runConfigSetup();

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
