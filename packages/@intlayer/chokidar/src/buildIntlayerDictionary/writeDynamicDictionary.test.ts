import { describe, expect, it } from 'vitest';
import {
  generateDictionaryEntryPoint,
  generateQualifiedDictionaryEntryPoint,
} from './writeDynamicDictionary';

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
});

describe('generateQualifiedDictionaryEntryPoint', () => {
  it('should nest one static import per (locale, qualifierId) and tag the dimensions (esm)', () => {
    const content = generateQualifiedDictionaryEntryPoint(
      'faq',
      ['item'],
      [['3'], ['1'], ['2']],
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
        ['promo', '1'],
        ['promo', '2'],
        ['default', '1'],
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

  it('should support the cjs format', () => {
    const content = generateQualifiedDictionaryEntryPoint(
      'hero',
      ['variant'],
      [['promo'], ['default']],
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
