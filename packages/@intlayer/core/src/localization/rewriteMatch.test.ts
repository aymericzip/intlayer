import * as Locales from '@intlayer/types/locales';
import { describe, expect, it } from 'vitest';
import { getRewriteRules } from './rewriteMatch';

describe('getRewriteRules', () => {
  it('should normalize legacy rewrite format', () => {
    const rules = getRewriteRules({
      '/products': {
        [Locales.ENGLISH]: '/products',
        [Locales.FRENCH]: '/produits',
      },
      '/products/[id]': {
        [Locales.ENGLISH]: '/products/[id]',
        [Locales.FRENCH]: '/produits/[id]',
      },
    });

    expect(rules?.rules[0]).toEqual({
      canonical: '/products',
      localized: {
        en: '/products',
        fr: '/produits',
      },
    });
    expect(rules?.rules[1].canonical).toBe('/products/:id');
  });
});
