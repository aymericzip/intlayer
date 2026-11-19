import type {
  ExpectNoIncompatibleMembers,
  IncompatibleMembers,
} from '@utils/compat-api-parity';
import type * as upstream from 'svelte-i18n';
import { describe, expectTypeOf, it } from 'vitest';
import type * as compat from './index';

/** `svelte-i18n` exports typed differently from upstream, and why. */
type TypeGaps =
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'getMessageFormatter'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'unwrapFunctionStore';

describe('svelte-i18n compat type parity', () => {
  it('types every svelte-i18n export compatibly', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        IncompatibleMembers<typeof compat, typeof upstream, TypeGaps>
      >
    >().toBeNever();
  });

  it('keeps no stale svelte-i18n type gap', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        Exclude<TypeGaps, IncompatibleMembers<typeof compat, typeof upstream>>
      >
    >().toBeNever();
  });
});
