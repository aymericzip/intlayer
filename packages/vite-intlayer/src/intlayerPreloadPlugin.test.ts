import {
  DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER,
  QUALIFIER_DYNAMIC_TYPES_KEY,
} from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Plugin } from 'vite';
import { describe, expect, it } from 'vitest';
import { intlayerPreload } from './intlayerPreloadPlugin';

// The emitted shape (preamble, single-locale request, window guard, skip rules)
// is covered by `@intlayer/config/dictionaryPreload.test.ts` — these tests only
// cover what the Vite plugin adds on top: activation and module targeting.

const DYNAMIC_DIR = '/app/.intlayer/dynamic_dictionary';

const createConfig = (
  importMode: 'static' | 'dynamic' | 'fetch',
  dictionariesPreload = true
): IntlayerConfig =>
  ({
    build: { importMode, dictionariesPreload },
    dictionary: { importMode },
    system: { dynamicDictionariesDir: DYNAMIC_DIR },
    log: { mode: 'disabled' },
  }) as unknown as IntlayerConfig;

/** Source a generated plain dynamic entry point has, for one key. */
const generatedEntry = `const ${DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER} = {
  'en': () => import('./json/landing/en.json').then(m => m.default),
  'fr': () => import('./json/landing/fr.json').then(m => m.default)
};

export default ${DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER};
`;

/** Invokes the plugin's `transform` hook the way Vite would. */
const transform = (
  plugin: Plugin,
  code: string,
  moduleId: string,
  options?: { ssr?: boolean }
): { code: string } | null => {
  const handler = plugin.transform as unknown as (
    code: string,
    id: string,
    options?: { ssr?: boolean }
  ) => { code: string } | null;

  return handler.call({} as never, code, moduleId, options);
};

describe('intlayerPreload', () => {
  it('is opt-out through `build.dictionariesPreload`', () => {
    const enabled = intlayerPreload(createConfig('dynamic'));
    const disabled = intlayerPreload(createConfig('dynamic', false));

    expect((enabled.apply as () => boolean)()).toBe(true);
    expect((disabled.apply as () => boolean)()).toBe(false);
  });

  it('preloads a per-dictionary override under a non-dynamic global mode', () => {
    // A `.content` file can set `importMode: 'dynamic'` on a single dictionary
    // while the configuration stays `static`. The optimizer then imports that
    // entry point, and it must be preloaded like any other.
    const plugin = intlayerPreload(createConfig('static'));

    const result = transform(
      plugin,
      generatedEntry,
      `${DYNAMIC_DIR}/landing.mjs`
    );

    expect(result?.code).toContain('__intlayerLoader().then(');
  });

  it('applies the shared preload transform to a generated entry point', () => {
    const plugin = intlayerPreload(createConfig('dynamic'));

    const result = transform(
      plugin,
      generatedEntry,
      `${DYNAMIC_DIR}/landing.mjs`
    );

    expect(result?.code).toContain('__intlayerLoader().then(');
    expect(result?.code).toContain(
      `export default ${DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER};`
    );
  });

  it('leaves the server build untouched', () => {
    const plugin = intlayerPreload(createConfig('dynamic'));

    const result = transform(
      plugin,
      generatedEntry,
      `${DYNAMIC_DIR}/landing.mjs`,
      { ssr: true }
    );

    expect(result).toBeNull();
  });

  it('ignores modules outside the dynamic dictionaries directory', () => {
    const plugin = intlayerPreload(createConfig('dynamic'));

    const result = transform(
      plugin,
      generatedEntry,
      '/app/src/components/landing.mjs'
    );

    expect(result).toBeNull();
  });

  it('ignores the per-locale JSON chunks the entry point imports', () => {
    const plugin = intlayerPreload(createConfig('dynamic'));

    const result = transform(
      plugin,
      '{"key":"landing"}',
      `${DYNAMIC_DIR}/json/landing/en.json`
    );

    expect(result).toBeNull();
  });

  it('returns null when the shared transform skips the entry point', () => {
    const plugin = intlayerPreload(createConfig('dynamic'));

    const qualifiedEntry = `const ${DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER} = {
  '${QUALIFIER_DYNAMIC_TYPES_KEY}': ["variant"],
  'en': { promo: () => import('./json/landing/promo/en.json') }
};

export default ${DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER};
`;

    const result = transform(
      plugin,
      qualifiedEntry,
      `${DYNAMIC_DIR}/landing.mjs`
    );

    expect(result).toBeNull();
  });
});
