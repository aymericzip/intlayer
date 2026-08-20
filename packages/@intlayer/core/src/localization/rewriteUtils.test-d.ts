import { describe, expectTypeOf, it } from 'vitest';
import {
  getCanonicalPath,
  getInternalPath,
  resolveLocalizedPath,
} from './rewriteUtils';

/**
 * `getInternalPath` is pure string surgery — no rewrite rules involved — so its
 * result is fully derivable from the arguments whenever both are literals.
 */
describe('getInternalPath', () => {
  it('should prefix a literal path with the locale', () => {
    expectTypeOf(getInternalPath('/about', 'fr')).toEqualTypeOf<'/fr/about'>();
  });

  it('should collapse the root to a bare prefix, never a trailing slash', () => {
    expectTypeOf(getInternalPath('/', 'fr')).toEqualTypeOf<'/fr'>();
  });

  it('should leave an already-prefixed path untouched', () => {
    expectTypeOf(
      getInternalPath('/fr/about', 'fr')
    ).toEqualTypeOf<'/fr/about'>();
    expectTypeOf(getInternalPath('/fr', 'fr')).toEqualTypeOf<'/fr'>();
  });

  it('should add the leading slash a path is missing', () => {
    expectTypeOf(getInternalPath('about', 'fr')).toEqualTypeOf<'/fr/about'>();
  });

  it('should widen to string when the path is not a literal', () => {
    const dynamicPath = '/about' as string;

    expectTypeOf(getInternalPath(dynamicPath, 'fr')).toEqualTypeOf<string>();
  });
});

/**
 * `resolveLocalizedPath` only computes a new path when a rule matched, so the
 * `isRewritten: false` branch still carries the exact input it was given.
 */
describe('resolveLocalizedPath', () => {
  it('should keep the input literal on the non-rewritten branch', () => {
    const result = resolveLocalizedPath('/about', 'fr');

    if (!result.isRewritten) {
      expectTypeOf(result.path).toEqualTypeOf<'/about'>();
    } else {
      expectTypeOf(result.path).toEqualTypeOf<string>();
    }
  });

  it('should discriminate on isRewritten', () => {
    expectTypeOf(resolveLocalizedPath('/about')).toEqualTypeOf<
      | { path: '/about'; isRewritten: false }
      | { path: string; isRewritten: true }
    >();
  });
});

describe('getCanonicalPath', () => {
  it('should accept an omitted locale (checks every locale)', () => {
    expectTypeOf(getCanonicalPath('/a-propos')).toEqualTypeOf<string>();
  });
});
