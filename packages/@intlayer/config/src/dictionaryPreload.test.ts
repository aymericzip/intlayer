import { describe, expect, it } from 'vitest';
import {
  DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER,
  PRELOADED_DYNAMIC_KEY,
  QUALIFIER_DYNAMIC_TYPES_KEY,
} from './defaultValues/dictionary';
import {
  addDynamicEntryPreload,
  createDynamicEntryFilter,
  DYNAMIC_ENTRY_PATTERN,
  PRELOAD_MODULE_SPECIFIER,
  resolvePreloadModuleId,
} from './dictionaryPreload';

/** Source a generated plain dynamic entry point has, for one key. */
const generatedEntry = `const ${DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER} = {
  'en': () => import('./json/landing/en.json').then(m => m.default),
  'fr': () => import('./json/landing/fr.json').then(m => m.default)
};

export default ${DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER};
`;

/** Stands in for the plugin-resolved absolute id of the locale resolver. */
const preloadModuleId =
  '/app/node_modules/@intlayer/core/dist/esm/localization/index.mjs';

describe('DYNAMIC_ENTRY_PATTERN', () => {
  it('captures the key of a generated entry point', () => {
    const match = DYNAMIC_ENTRY_PATTERN.exec(
      '/app/.intlayer/dynamic/landing.mjs'
    );

    expect(match?.groups?.key).toBe('landing');
  });

  it('does not match the per-locale JSON chunks', () => {
    expect(
      DYNAMIC_ENTRY_PATTERN.test('/app/.intlayer/dynamic/json/landing/en.json')
    ).toBe(false);
  });
});

describe('createDynamicEntryFilter', () => {
  const filter = createDynamicEntryFilter('/app/.intlayer/dynamic_dictionary');

  it('matches a generated entry point', () => {
    expect(filter.test('/app/.intlayer/dynamic_dictionary/landing.mjs')).toBe(
      true
    );
  });

  it('matches the same path with Windows separators', () => {
    expect(
      filter.test('C:\\app\\.intlayer\\dynamic_dictionary\\landing.mjs')
    ).toBe(true);
  });

  it('does not match the per-locale JSON chunks', () => {
    expect(
      filter.test('/app/.intlayer/dynamic_dictionary/json/landing/en.json')
    ).toBe(false);
  });

  it('does not match unrelated modules of the build', () => {
    expect(filter.test('/app/node_modules/some-package/index.mjs')).toBe(false);
  });
});

describe('resolvePreloadModuleId', () => {
  const PACKAGE_ROOT = '/repo/packages/@intlayer/core';

  /**
   * Stands in for `require` / `createRequire(…)`: resolves the manifest to a
   * fixed path and reads it from the supplied `exports` map. `resolve` throws on
   * anything but the manifest unless a fallback is expected, so a test relying
   * on the `require` condition has to say so.
   */
  const createRequireStub = (
    exports: Record<string, unknown>,
    fallback?: string
  ) => {
    const requireStub = ((request: string) => {
      if (request === `${PACKAGE_ROOT}/package.json`) return { exports };
      throw new Error(`unexpected require: ${request}`);
    }) as unknown as NodeRequire;

    requireStub.resolve = ((request: string) => {
      if (request === '@intlayer/core/package.json') {
        return `${PACKAGE_ROOT}/package.json`;
      }
      if (request === PRELOAD_MODULE_SPECIFIER && fallback) return fallback;
      throw new Error(`unexpected resolve: ${request}`);
    }) as unknown as NodeRequire['resolve'];

    return requireStub;
  };

  it('resolves the ESM build rather than the CommonJS one', () => {
    // `require.resolve` would apply the `require` condition and pull the
    // CommonJS build into a browser bundle, next to the ESM copy.
    const requireStub = createRequireStub({
      './localization': {
        require: './dist/cjs/localization/index.cjs',
        import: './dist/esm/localization/index.mjs',
      },
    });

    expect(resolvePreloadModuleId(requireStub)).toBe(
      `${PACKAGE_ROOT}/dist/esm/localization/index.mjs`
    );
  });

  it('accepts a subpath exported as a bare string', () => {
    const requireStub = createRequireStub({
      './localization': './dist/esm/localization/index.mjs',
    });

    expect(resolvePreloadModuleId(requireStub)).toBe(
      `${PACKAGE_ROOT}/dist/esm/localization/index.mjs`
    );
  });

  it('falls back to the standard resolution when no ESM entry is declared', () => {
    const requireStub = createRequireStub(
      { './localization': { require: './dist/cjs/localization/index.cjs' } },
      `${PACKAGE_ROOT}/dist/cjs/localization/index.cjs`
    );

    expect(resolvePreloadModuleId(requireStub)).toBe(
      `${PACKAGE_ROOT}/dist/cjs/localization/index.cjs`
    );
  });
});

describe('addDynamicEntryPreload', () => {
  it('appends a top-level await that records the resolved locale', () => {
    const result = addDynamicEntryPreload(generatedEntry, preloadModuleId);

    expect(result.code).toContain('await __intlayerLoader()');
    expect(result.code).toContain(PRELOADED_DYNAMIC_KEY);
  });

  it('imports the locale resolver through the id the plugin resolved, never a bare specifier', () => {
    const result = addDynamicEntryPreload(generatedEntry, preloadModuleId);

    expect(result.code).toContain(`from '${preloadModuleId}'`);
    expect(result.code).not.toContain(`from '${PRELOAD_MODULE_SPECIFIER}'`);
  });

  it('keeps the generated source intact, since the preamble mutates its binding', () => {
    const result = addDynamicEntryPreload(generatedEntry, preloadModuleId);

    expect(result.code).toContain(
      `export default ${DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER};`
    );
    expect(result.code).toContain(
      "'fr': () => import('./json/landing/fr.json')"
    );
  });

  it('awaits a single locale, never the whole loader map', () => {
    const result = addDynamicEntryPreload(generatedEntry, preloadModuleId);

    expect(result.code?.match(/await /g)).toHaveLength(1);
    expect(result.code).toContain(
      `${DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER}[__intlayerLocale]`
    );
  });

  it('guards the preload so a server bundle keeps its synchronous shape', () => {
    const result = addDynamicEntryPreload(generatedEntry, preloadModuleId);

    expect(result.code).toContain("typeof window !== 'undefined'");
  });

  it('swallows a failed load so a missing dictionary cannot break the chunk', () => {
    const result = addDynamicEntryPreload(generatedEntry, preloadModuleId);

    expect(result.code).toContain('.catch(() => undefined)');
  });

  it('skips qualified entry points, whose loaders are a per-locale tree', () => {
    const qualifiedEntry = `const ${DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER} = {
  '${QUALIFIER_DYNAMIC_TYPES_KEY}': ["variant"],
  'en': { promo: () => import('./json/landing/promo/en.json') }
};

export default ${DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER};
`;

    expect(addDynamicEntryPreload(qualifiedEntry, preloadModuleId)).toEqual({
      skipped: 'qualified',
    });
  });

  it('skips an entry point whose generated shape it does not recognise', () => {
    const result = addDynamicEntryPreload(
      'export default { en: () => import("./json/landing/en.json") };',
      preloadModuleId
    );

    expect(result).toEqual({ skipped: 'unrecognized-shape' });
  });
});
