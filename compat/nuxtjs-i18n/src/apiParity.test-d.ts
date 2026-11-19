import type * as upstream from '@nuxtjs/i18n';
import type {
  ExpectNoIncompatibleMembers,
  IncompatibleMembers,
} from '@utils/compat-api-parity';
import { describe, expectTypeOf, it } from 'vitest';
import type * as compat from './index';

/** `@nuxtjs/i18n` exports typed differently from upstream, and why. */
type TypeGaps =
  /** Nuxt module typed with the intlayer options instead of @nuxtjs/i18n options. */
  'default';

describe('nuxtjs-i18n compat type parity', () => {
  it('types every @nuxtjs/i18n export compatibly', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        IncompatibleMembers<typeof compat, typeof upstream, TypeGaps>
      >
    >().toBeNever();
  });

  it('keeps no stale @nuxtjs/i18n type gap', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        Exclude<TypeGaps, IncompatibleMembers<typeof compat, typeof upstream>>
      >
    >().toBeNever();
  });
});
