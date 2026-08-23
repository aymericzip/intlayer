import { nextjsRewrite } from 'intlayer/routing';
import { describe, expect, it } from 'vitest';
import { formatDomains, formatRewriteRules } from './createModuleAugmentation';

describe('formatRewriteRules', () => {
  it('should emit nothing when no rewrite is declared', () => {
    expect(formatRewriteRules(undefined)).toBe('');
    expect(formatRewriteRules({})).toBe('');
  });

  it('should emit the normalized url rules of a formatted rewrite', () => {
    const rewrite = nextjsRewrite({
      '/[locale]/tests': { fr: '/[locale]/essais' },
      '/[locale]/product/[id]': { fr: '/[locale]/produit/[id]' },
    });

    expect(formatRewriteRules(rewrite)).toBe(
      "; rewrite: { '/tests': { 'fr': '/essais' }; '/product/:id': { 'fr': '/produit/:id' } }"
    );
  });

  it('should normalize the legacy record format', () => {
    expect(formatRewriteRules({ '/about': { fr: '/a-propos' } })).toBe(
      "; rewrite: { '/about': { 'fr': '/a-propos' } }"
    );
  });
});

describe('formatDomains', () => {
  it('should emit nothing when no domain is declared', () => {
    expect(formatDomains(undefined)).toBe('');
    expect(formatDomains({})).toBe('');
  });

  it('should normalize a bare hostname to an https origin', () => {
    expect(formatDomains({ zh: 'intlayer.cn' })).toBe(
      "; domains: { 'zh': { origin: 'https://intlayer.cn'; exclusive: true } }"
    );
  });

  it('should keep an explicit protocol', () => {
    expect(formatDomains({ zh: 'http://intlayer.cn' })).toBe(
      "; domains: { 'zh': { origin: 'http://intlayer.cn'; exclusive: true } }"
    );
  });

  it('should mark locales sharing a hostname as non-exclusive', () => {
    expect(
      formatDomains({
        en: 'intlayer.org',
        fr: 'https://intlayer.org',
        zh: 'intlayer.cn',
      })
    ).toBe(
      "; domains: { 'en': { origin: 'https://intlayer.org'; exclusive: false }; " +
        "'fr': { origin: 'https://intlayer.org'; exclusive: false }; " +
        "'zh': { origin: 'https://intlayer.cn'; exclusive: true } }"
    );
  });

  it('should skip empty domain values', () => {
    expect(formatDomains({ en: '', zh: 'intlayer.cn' })).toBe(
      "; domains: { 'zh': { origin: 'https://intlayer.cn'; exclusive: true } }"
    );
  });
});
