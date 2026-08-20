import { nextjsRewrite } from 'intlayer/routing';
import { describe, expect, it } from 'vitest';
import { formatRewriteRules } from './createModuleAugmentation';

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
