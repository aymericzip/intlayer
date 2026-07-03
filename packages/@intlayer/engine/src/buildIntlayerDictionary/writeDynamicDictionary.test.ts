import { describe, expect, it } from 'vitest';
import {
  generateDictionaryEntryPoint,
  generateQualifiedDictionaryEntryPoint,
  type QualifiedEntrySegments,
} from './writeDynamicDictionary';

/** Shorthand for an entry that loads its own chunk (no aliasing). */
const ownChunk = (segments: string[]): QualifiedEntrySegments => ({
  treeSegments: segments,
  chunkSegments: segments,
});

describe('generateDictionaryEntryPoint', () => {
  it('should emit one lazy import per locale for a plain dictionary (esm)', () => {
    const content = generateDictionaryEntryPoint('app', ['fr', 'en'], 'esm');

    // Locales sorted, one static import() per locale, default export.
    expect(content).toContain(
      "'en': () => import('./json/app/en.json').then(m => m.default)"
    );
    expect(content).toContain(
      "'fr': () => import('./json/app/fr.json').then(m => m.default)"
    );
    expect(content).toContain('export default content;');
    expect(content.indexOf("'en'")).toBeLessThan(content.indexOf("'fr'"));
  });

  it('should escape quotes and backslashes in generated literals', () => {
    const content = generateDictionaryEntryPoint("it's", ['en'], 'esm');

    expect(content).toContain("import('./json/it\\'s/en.json')");
    // The emitted module must stay parseable JavaScript.
    expect(
      () => new Function(content.replace(/export default.*/, ''))
    ).not.toThrow();
  });
});

describe('generateQualifiedDictionaryEntryPoint', () => {
  it('should nest one static import per (locale, qualifierId) and tag the dimensions (esm)', () => {
    const content = generateQualifiedDictionaryEntryPoint(
      'faq',
      ['item'],
      [ownChunk(['3']), ownChunk(['1']), ownChunk(['2'])],
      ['en', 'fr'],
      'esm'
    );

    // The dimension list drives runtime resolution.
    expect(content).toContain('\'__intlayerQualifierTypes\': ["item"]');

    // One static import() per (locale, qualifierId) — Turbopack rejects
    // template-literal dynamic imports, so each chunk must be its own literal.
    expect(content).toContain(
      "'1': () => import('./json/faq/1/en.json').then(m => m.default)"
    );
    expect(content).toContain(
      "'3': () => import('./json/faq/3/fr.json').then(m => m.default)"
    );
    expect(content).toContain('export default content;');

    // No template-literal interpolation leaked into the import specifiers.
    expect(content).not.toContain('${');
  });

  it('should nest one level per dimension for a composite key (variant × item)', () => {
    const content = generateQualifiedDictionaryEntryPoint(
      'banner',
      ['variant', 'item'],
      [
        ownChunk(['promo', '1']),
        ownChunk(['promo', '2']),
        ownChunk(['default', '1']),
      ],
      ['en'],
      'esm'
    );

    expect(content).toContain(
      '\'__intlayerQualifierTypes\': ["variant","item"]'
    );

    // Leaf import path nests both dimension segments before the locale.
    expect(content).toContain(
      "'2': () => import('./json/banner/promo/2/en.json').then(m => m.default)"
    );
    expect(content).toContain(
      "'1': () => import('./json/banner/default/1/en.json').then(m => m.default)"
    );
    // The variant level wraps the item level (nested object literal).
    expect(content).toMatch(/'promo':\s*\{/);
    expect(content).toMatch(/'default':\s*\{/);
  });

  it('should point aliased entries at the canonical chunk (array variant fan-out)', () => {
    const content = generateQualifiedDictionaryEntryPoint(
      'hero',
      ['variant'],
      [
        ownChunk(['black-friday']),
        // 'cyber-monday' shares the black-friday content → same chunk.
        { treeSegments: ['cyber-monday'], chunkSegments: ['black-friday'] },
        ownChunk(['default']),
      ],
      ['en'],
      'esm'
    );

    // Both variant ids exist as tree keys…
    expect(content).toMatch(/'black-friday':/);
    expect(content).toMatch(/'cyber-monday':/);
    // …but the alias imports the canonical chunk path.
    expect(content).toContain(
      "'cyber-monday': () => import('./json/hero/black-friday/en.json').then(m => m.default)"
    );
    // Only two distinct chunk paths are referenced.
    const chunkPaths = new Set(
      [...content.matchAll(/import\('([^']+)'\)/g)].map((match) => match[1])
    );
    expect(chunkPaths).toEqual(
      new Set([
        './json/hero/black-friday/en.json',
        './json/hero/default/en.json',
      ])
    );
  });

  it('should support the cjs format', () => {
    const content = generateQualifiedDictionaryEntryPoint(
      'hero',
      ['variant'],
      [ownChunk(['promo']), ownChunk(['default'])],
      ['en'],
      'cjs'
    );

    expect(content).toContain('\'__intlayerQualifierTypes\': ["variant"]');
    expect(content).toContain(
      "'default': () => Promise.resolve(require('./json/hero/default/en.json'))"
    );
    expect(content).toContain('module.exports = {');
  });
});
