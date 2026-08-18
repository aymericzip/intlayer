import { describe, expect, it } from 'vitest';
import {
  type ChunkingContext,
  createDictionaryModuleParser,
  type ModuleGraphNode,
  resolveBoundaries,
  toBoundaryName,
} from './intlayerChunkPlugin';

/**
 * Builds a `ChunkingContext` over a literal module graph.
 *
 * Each entry declares only the edges pointing *at* it, mirroring what Rolldown
 * exposes: `importers` for static `import`, `dynamicImporters` for `import()`.
 */
const createContext = (
  graph: Record<string, Partial<ModuleGraphNode>>
): ChunkingContext => ({
  getModuleInfo: (moduleId) => {
    const node = graph[moduleId];
    if (!node) return null;
    return {
      id: moduleId,
      isEntry: node.isEntry ?? false,
      importers: node.importers ?? [],
      dynamicImporters: node.dynamicImporters ?? [],
    };
  },
});

describe('createDictionaryModuleParser', () => {
  const DYNAMIC_DICTIONARIES_DIR = '/app/.intlayer/dynamic_dictionary';
  const parseDictionaryModule = createDictionaryModuleParser(
    DYNAMIC_DICTIONARIES_DIR
  );

  it('reads the key and locale of a dynamic dictionary', () => {
    expect(
      parseDictionaryModule(
        `${DYNAMIC_DICTIONARIES_DIR}/json/landing-page/en.json`
      )
    ).toEqual({ key: 'landing-page', locale: 'en' });
  });

  it('reads a region-qualified locale', () => {
    expect(
      parseDictionaryModule(
        `${DYNAMIC_DICTIONARIES_DIR}/json/landing-page/en-GB.json`
      )?.locale
    ).toBe('en-GB');
  });

  it('reads a qualified dictionary nested by dimension', () => {
    expect(
      parseDictionaryModule(
        `${DYNAMIC_DICTIONARIES_DIR}/json/products/shoes/premium/fr.json`
      )
    ).toEqual({ key: 'products', locale: 'fr' });
  });

  it('normalizes a Windows module id', () => {
    const parseWindowsModule = createDictionaryModuleParser(
      'C:/app/.intlayer/dynamic_dictionary'
    );

    expect(
      parseWindowsModule(
        'C:\\app\\.intlayer\\dynamic_dictionary\\json\\landing-page\\en.json'
      )
    ).toEqual({ key: 'landing-page', locale: 'en' });
  });

  it('ignores the generated entry point next to the chunks', () => {
    expect(
      parseDictionaryModule(`${DYNAMIC_DICTIONARIES_DIR}/landing-page.mjs`)
    ).toBeNull();
  });

  it('ignores an application file mirroring the dictionary layout', () => {
    expect(
      parseDictionaryModule('/app/src/json/landing-page/en.json')
    ).toBeNull();
  });

  it('ignores files outside the per-locale layout', () => {
    expect(
      parseDictionaryModule('/app/src/components/Hero/hero.json')
    ).toBeNull();
  });
});

describe('toBoundaryName', () => {
  it('derives a readable name from the module basename', () => {
    expect(toBoundaryName('/app/src/LandingPage/FeaturesSection.tsx')).toMatch(
      /^FeaturesSection-[a-z0-9]+$/
    );
  });

  it('keeps boundaries sharing a basename distinct', () => {
    const first = toBoundaryName('/app/src/pages/blog/index.tsx');
    const second = toBoundaryName('/app/src/pages/docs/index.tsx');

    expect(first).not.toBe(second);
  });

  it('is stable across calls', () => {
    const id = '/app/src/pages/blog/index.tsx';
    expect(toBoundaryName(id)).toBe(toBoundaryName(id));
  });
});

describe('resolveBoundaries', () => {
  const JSON_ID = '/app/.intlayer/dynamic_dictionary/json/hero/en.json';
  const LOADER_ID = '/app/.intlayer/dynamic_dictionary/hero.mjs';

  it('walks past the loader map to the lazily imported section', () => {
    const context = createContext({
      [JSON_ID]: { dynamicImporters: [LOADER_ID] },
      [LOADER_ID]: { importers: ['/app/src/HeroSection.tsx'] },
      // Reached through `import()`, so it opens its own chunk.
      '/app/src/HeroSection.tsx': {
        dynamicImporters: ['/app/src/Landing.tsx'],
      },
    });

    expect(resolveBoundaries(JSON_ID, context)).toEqual([
      '/app/src/HeroSection.tsx',
    ]);
  });

  it('climbs through statically imported components to the boundary', () => {
    const context = createContext({
      [JSON_ID]: { dynamicImporters: [LOADER_ID] },
      [LOADER_ID]: { importers: ['/app/src/Title.tsx'] },
      '/app/src/Title.tsx': { importers: ['/app/src/HeroSection.tsx'] },
      '/app/src/HeroSection.tsx': {
        dynamicImporters: ['/app/src/Landing.tsx'],
      },
    });

    expect(resolveBoundaries(JSON_ID, context)).toEqual([
      '/app/src/HeroSection.tsx',
    ]);
  });

  it('reports every boundary when two Suspense sections share a dictionary', () => {
    const context = createContext({
      [JSON_ID]: { dynamicImporters: [LOADER_ID] },
      [LOADER_ID]: {
        importers: ['/app/src/SectionA.tsx', '/app/src/SectionB.tsx'],
      },
      '/app/src/SectionA.tsx': { dynamicImporters: ['/app/src/Landing.tsx'] },
      '/app/src/SectionB.tsx': { dynamicImporters: ['/app/src/Landing.tsx'] },
    });

    expect(resolveBoundaries(JSON_ID, context)).toEqual([
      '/app/src/SectionA.tsx',
      '/app/src/SectionB.tsx',
    ]);
  });

  it('keeps two pages separate so neither ships the other content', () => {
    const blogJson = '/app/.intlayer/dynamic_dictionary/json/blog/en.json';
    const blogLoader = '/app/.intlayer/dynamic_dictionary/blog.mjs';
    const context = createContext({
      [JSON_ID]: { dynamicImporters: [LOADER_ID] },
      [LOADER_ID]: { importers: ['/app/src/routes/home.tsx'] },
      '/app/src/routes/home.tsx': { dynamicImporters: ['/app/src/router.tsx'] },
      [blogJson]: { dynamicImporters: [blogLoader] },
      [blogLoader]: { importers: ['/app/src/routes/blog.tsx'] },
      '/app/src/routes/blog.tsx': { dynamicImporters: ['/app/src/router.tsx'] },
    });

    expect(resolveBoundaries(JSON_ID, context)).toEqual([
      '/app/src/routes/home.tsx',
    ]);
    expect(resolveBoundaries(blogJson, context)).toEqual([
      '/app/src/routes/blog.tsx',
    ]);
  });

  it('stops at an entry module that is never dynamically imported', () => {
    const context = createContext({
      [JSON_ID]: { dynamicImporters: [LOADER_ID] },
      [LOADER_ID]: { importers: ['/app/src/main.tsx'] },
      '/app/src/main.tsx': { isEntry: true },
    });

    expect(resolveBoundaries(JSON_ID, context)).toEqual(['/app/src/main.tsx']);
  });

  it('terminates on a cycle between components', () => {
    const context = createContext({
      [JSON_ID]: { dynamicImporters: [LOADER_ID] },
      [LOADER_ID]: { importers: ['/app/src/A.tsx'] },
      '/app/src/A.tsx': { importers: ['/app/src/B.tsx'] },
      '/app/src/B.tsx': { importers: ['/app/src/A.tsx'] },
    });

    expect(resolveBoundaries(JSON_ID, context)).toEqual([]);
  });

  it('returns nothing when the module is absent from the graph', () => {
    expect(resolveBoundaries(JSON_ID, createContext({}))).toEqual([]);
  });
});
