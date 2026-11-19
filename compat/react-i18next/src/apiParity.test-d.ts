import type {
  ExpectNoIncompatibleMembers,
  IncompatibleMembers,
} from '@utils/compat-api-parity';
import type * as upstream from 'react-i18next';
import { describe, expectTypeOf, it } from 'vitest';
import type * as compat from './index';

/** `react-i18next` exports typed differently from upstream, and why. */
type TypeGaps =
  /** Typed from the intlayer dictionaries: only declared keys are accepted. */
  'useTranslation';

describe('react-i18next compat type parity', () => {
  it('types every react-i18next export compatibly', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        IncompatibleMembers<typeof compat, typeof upstream, TypeGaps>
      >
    >().toBeNever();
  });

  it('keeps no stale react-i18next type gap', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        Exclude<TypeGaps, IncompatibleMembers<typeof compat, typeof upstream>>
      >
    >().toBeNever();
  });
});
