import type * as upstreamCore from '@lingui/core';
import type * as upstreamReact from '@lingui/react';
import type {
  ExpectNoIncompatibleMembers,
  IncompatibleMembers,
  IncompatibleParameters,
} from '@utils/compat-api-parity';
import { describe, expectTypeOf, it } from 'vitest';
import type * as compat from './index';

/**
 * `I18n`: lingui's class has private fields, so no other class is ever
 * assignable to it. Its instance surface is checked below and at runtime.
 */
type CoreTypeGaps =
  | 'I18n'
  /** Holds `FormatsTypeGaps`; its other members are checked one by one. */
  | 'formats';

/**
 * `defaultLocale`: lingui hardcodes the `'en'` literal; the compat reads the
 * intlayer configuration's default locale instead.
 */
type FormatsTypeGaps = 'defaultLocale';

describe('@intlayer/lingui type parity', () => {
  it('types every @lingui/core export compatibly', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        IncompatibleMembers<typeof compat, typeof upstreamCore, CoreTypeGaps>
      >
    >().toBeNever();
  });

  it('types the formats helpers compatibly', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        IncompatibleMembers<
          typeof compat.formats,
          typeof upstreamCore.formats,
          FormatsTypeGaps
        >
      >
    >().toBeNever();
  });

  it('types every @lingui/react export compatibly', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        IncompatibleMembers<typeof compat, typeof upstreamReact>
      >
    >().toBeNever();
  });

  it('accepts every upstream call on I18n instance methods', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        IncompatibleParameters<compat.I18n, upstreamCore.I18n>
      >
    >().toBeNever();
  });
});
