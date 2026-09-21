import type { IntlayerConfig } from '@intlayer/types/config';
import { describe, expect, it } from 'vitest';
import { getAlias } from './alias';

const configuration = {
  system: {
    baseDir: '/project',
    mainDir: '/project/.intlayer/main',
    configDir: '/project/.intlayer/config',
  },
  build: { outputFormat: ['esm', 'cjs'] },
} as IntlayerConfig;

describe('getAlias', () => {
  it('maps every dictionaries entry subpath and the config to the generated files', () => {
    expect(getAlias({ configuration })).toEqual({
      '@intlayer/dictionaries-entry/unmerged':
        '.intlayer/main/unmerged_dictionaries.mjs',
      '@intlayer/dictionaries-entry/remote':
        '.intlayer/main/remote_dictionaries.mjs',
      '@intlayer/dictionaries-entry/dynamic':
        '.intlayer/main/dynamic_dictionaries.mjs',
      '@intlayer/dictionaries-entry/fetch':
        '.intlayer/main/fetch_dictionaries.mjs',
      '@intlayer/dictionaries-entry': '.intlayer/main/dictionaries.mjs',
      '@intlayer/config/built': '.intlayer/config/configuration.mjs',
    });
  });

  it('lists the bare @intlayer/dictionaries-entry key after all of its subpaths', () => {
    // webpack and Vite match string aliases by prefix and stop at the first
    // hit: a bare-root key listed first would hijack every subpath request.
    const keys = Object.keys(getAlias({ configuration }));
    const rootIndex = keys.indexOf('@intlayer/dictionaries-entry');
    const subpathIndexes = keys
      .filter((key) => key.startsWith('@intlayer/dictionaries-entry/'))
      .map((key) => keys.indexOf(key));

    expect(subpathIndexes).toHaveLength(4);
    expect(Math.max(...subpathIndexes)).toBeLessThan(rootIndex);
  });

  it('honours the requested format and applies the formatter', () => {
    const alias = getAlias({
      configuration,
      format: 'cjs',
      formatter: (value) => `/abs/${value}`,
    });

    expect(alias['@intlayer/dictionaries-entry']).toBe(
      '/abs/.intlayer/main/dictionaries.cjs'
    );
    expect(alias['@intlayer/config/built']).toBe(
      '/abs/.intlayer/config/configuration.cjs'
    );
  });
});
