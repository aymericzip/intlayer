import type {
  ExpectNoIncompatibleMembers,
  IncompatibleMembers,
} from '@utils/compat-api-parity';
import type * as upstreamRoot from 'use-intl';
import { describe, expectTypeOf, it } from 'vitest';
import type * as compatRoot from './index';

/** `use-intl` exports typed differently from upstream, and why. */
type RootTypeGaps =
  /** Typed from the intlayer dictionaries: only declared keys are accepted. */
  | 'createTranslator'
  /** Typed from the intlayer dictionaries: only declared keys are accepted. */
  | 'useTranslations';
import type * as upstreamCore from 'use-intl/core';
import type * as compatCore from './core/index';

/** `use-intl/core` exports typed differently from upstream, and why. */
type CoreTypeGaps =
  /** Typed from the intlayer dictionaries: only declared keys are accepted. */
  'createTranslator';
import type * as upstreamReact from 'use-intl/react';
import type * as compatReact from './client/index';

/** `use-intl/react` exports typed differently from upstream, and why. */
type ReactTypeGaps =
  /** Typed from the intlayer dictionaries: only declared keys are accepted. */
  'useTranslations';

describe('use-intl compat type parity', () => {
  it('types every use-intl export compatibly', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        IncompatibleMembers<
          typeof compatRoot,
          typeof upstreamRoot,
          RootTypeGaps
        >
      >
    >().toBeNever();
  });

  it('keeps no stale use-intl type gap', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        Exclude<
          RootTypeGaps,
          IncompatibleMembers<typeof compatRoot, typeof upstreamRoot>
        >
      >
    >().toBeNever();
  });

  it('types every use-intl/core export compatibly', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        IncompatibleMembers<
          typeof compatCore,
          typeof upstreamCore,
          CoreTypeGaps
        >
      >
    >().toBeNever();
  });

  it('keeps no stale use-intl/core type gap', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        Exclude<
          CoreTypeGaps,
          IncompatibleMembers<typeof compatCore, typeof upstreamCore>
        >
      >
    >().toBeNever();
  });

  it('types every use-intl/react export compatibly', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        IncompatibleMembers<
          typeof compatReact,
          typeof upstreamReact,
          ReactTypeGaps
        >
      >
    >().toBeNever();
  });

  it('keeps no stale use-intl/react type gap', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        Exclude<
          ReactTypeGaps,
          IncompatibleMembers<typeof compatReact, typeof upstreamReact>
        >
      >
    >().toBeNever();
  });
});
