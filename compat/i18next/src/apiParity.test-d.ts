import type {
  ExpectNoIncompatibleMembers,
  IncompatibleMembers,
} from '@utils/compat-api-parity';
import type * as upstream from 'i18next';
import { describe, expectTypeOf, it } from 'vitest';
import type * as compat from './index';

/** `i18next` exports typed differently from upstream, and why. */
type TypeGaps =
  /** Typed from the intlayer dictionaries: only declared keys are accepted. */
  | 'getFixedT'
  /** Not implemented by the compat yet. */
  | 'isSafeLanguageCode'
  /** Identity shim: selectors are not resolved, so it is typed loosely. */
  | 'keyFromSelector';

describe('i18next compat type parity', () => {
  it('types every i18next export compatibly', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        IncompatibleMembers<typeof compat, typeof upstream, TypeGaps>
      >
    >().toBeNever();
  });

  it('keeps no stale i18next type gap', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        Exclude<TypeGaps, IncompatibleMembers<typeof compat, typeof upstream>>
      >
    >().toBeNever();
  });
});
