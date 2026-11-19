import type {
  ExpectNoIncompatibleMembers,
  IncompatibleMembers,
} from '@utils/compat-api-parity';
import type * as upstream from 'next-i18next';
import { describe, expectTypeOf, it } from 'vitest';
import type * as compat from './index';

/** `next-i18next` exports typed differently from upstream, and why. */
type TypeGaps =
  /** Not implemented by the compat yet. */
  | 'defineConfig'
  /** Not implemented by the compat yet. */
  | 'normalizeConfig';

describe('next-i18next compat type parity', () => {
  it('types every next-i18next export compatibly', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        IncompatibleMembers<typeof compat, typeof upstream, TypeGaps>
      >
    >().toBeNever();
  });

  it('keeps no stale next-i18next type gap', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        Exclude<TypeGaps, IncompatibleMembers<typeof compat, typeof upstream>>
      >
    >().toBeNever();
  });
});
