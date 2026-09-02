import { describe, expectTypeOf, it } from 'vitest';
import { getCanonicalPath } from './getCanonicalPath';

describe('getCanonicalPath', () => {
  it('should accept an omitted locale (checks every locale)', () => {
    expectTypeOf(getCanonicalPath('/a-propos')).toEqualTypeOf<string>();
  });
});
