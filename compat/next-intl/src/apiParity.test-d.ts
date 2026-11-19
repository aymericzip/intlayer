import type {
  ExpectNoIncompatibleMembers,
  IncompatibleMembers,
} from '@utils/compat-api-parity';
import type * as upstreamRoot from 'next-intl';
import { describe, expectTypeOf, it } from 'vitest';
import type * as compatRoot from './index';

/** `next-intl` exports typed differently from upstream, and why. */
type RootTypeGaps =
  /** Typed from the intlayer dictionaries: only declared keys are accepted. */
  | 'createTranslator'
  /** Extraction is handled by the intlayer compiler; typed from the dictionaries. */
  | 'useExtracted'
  /** Typed from the intlayer dictionaries: only declared keys are accepted. */
  | 'useTranslations';
import type * as upstreamServer from 'next-intl/server';
import type * as compatServer from './server/index';

/** `next-intl/server` exports typed differently from upstream, and why. */
type ServerTypeGaps =
  /** Not implemented by the compat yet. */
  | 'getExtracted'
  /** Typed from the intlayer dictionaries: only declared keys are accepted. */
  | 'getTranslations';
import type * as upstreamRouting from 'next-intl/routing';
import type * as compatRouting from './routing';

/** `next-intl/routing` exports typed differently from upstream, and why. */
type RoutingTypeGaps =
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  'defineRouting';
import type * as upstreamNavigation from 'next-intl/navigation';
import type * as compatNavigation from './navigation/index';

/** `next-intl/navigation` exports typed differently from upstream. */
type NavigationTypeGaps = never;
import type * as upstreamMiddleware from 'next-intl/middleware';
import type * as compatMiddleware from './middleware';

/** `next-intl/middleware` exports typed differently from upstream. */
type MiddlewareTypeGaps = never;

describe('next-intl compat type parity', () => {
  it('types every next-intl export compatibly', () => {
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

  it('keeps no stale next-intl type gap', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        Exclude<
          RootTypeGaps,
          IncompatibleMembers<typeof compatRoot, typeof upstreamRoot>
        >
      >
    >().toBeNever();
  });

  it('types every next-intl/server export compatibly', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        IncompatibleMembers<
          typeof compatServer,
          typeof upstreamServer,
          ServerTypeGaps
        >
      >
    >().toBeNever();
  });

  it('keeps no stale next-intl/server type gap', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        Exclude<
          ServerTypeGaps,
          IncompatibleMembers<typeof compatServer, typeof upstreamServer>
        >
      >
    >().toBeNever();
  });

  it('types every next-intl/routing export compatibly', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        IncompatibleMembers<
          typeof compatRouting,
          typeof upstreamRouting,
          RoutingTypeGaps
        >
      >
    >().toBeNever();
  });

  it('keeps no stale next-intl/routing type gap', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        Exclude<
          RoutingTypeGaps,
          IncompatibleMembers<typeof compatRouting, typeof upstreamRouting>
        >
      >
    >().toBeNever();
  });

  it('types every next-intl/navigation export compatibly', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        IncompatibleMembers<
          typeof compatNavigation,
          typeof upstreamNavigation,
          NavigationTypeGaps
        >
      >
    >().toBeNever();
  });

  it('keeps no stale next-intl/navigation type gap', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        Exclude<
          NavigationTypeGaps,
          IncompatibleMembers<
            typeof compatNavigation,
            typeof upstreamNavigation
          >
        >
      >
    >().toBeNever();
  });

  it('types every next-intl/middleware export compatibly', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        IncompatibleMembers<
          typeof compatMiddleware,
          typeof upstreamMiddleware,
          MiddlewareTypeGaps
        >
      >
    >().toBeNever();
  });

  it('keeps no stale next-intl/middleware type gap', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        Exclude<
          MiddlewareTypeGaps,
          IncompatibleMembers<
            typeof compatMiddleware,
            typeof upstreamMiddleware
          >
        >
      >
    >().toBeNever();
  });
});
