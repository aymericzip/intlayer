// @vitest-environment node
import {
  getExportDifferences,
  getResolvedGaps,
  type KnownGaps,
} from '@utils/compat-api-parity';
import * as upstreamRoot from 'next-intl';
import * as upstreamRouting from 'next-intl/routing';
import * as upstreamServer from 'next-intl/server';
import { describe, expect, it } from 'vitest';
import * as compatRoot from './index';
import * as compatRouting from './routing';
import * as compatServer from './server/index';

/** `next-intl` exports the compat does not match yet, and why. */
const ROOT_KNOWN_GAPS: KnownGaps = {};

/** `next-intl/server` exports the compat does not match yet, and why. */
const SERVER_KNOWN_GAPS: KnownGaps = {
  getExtracted: 'Not implemented by the compat yet.',
};

/** `next-intl/routing` exports the compat does not match yet, and why. */
const ROUTING_KNOWN_GAPS: KnownGaps = {};

/**
 * `next-intl/navigation` and `/middleware` import `next/*`, which only
 * resolves inside a Next.js app, so they are compared at the type level
 * only.
 */
describe('next-intl compat API parity', () => {
  it('exposes every next-intl export', () => {
    expect(
      getExportDifferences(upstreamRoot, compatRoot, ROOT_KNOWN_GAPS)
    ).toEqual([]);
  });

  it('exposes every next-intl/server export', () => {
    expect(
      getExportDifferences(upstreamServer, compatServer, SERVER_KNOWN_GAPS)
    ).toEqual([]);
  });

  it('exposes every next-intl/routing export', () => {
    expect(
      getExportDifferences(upstreamRouting, compatRouting, ROUTING_KNOWN_GAPS)
    ).toEqual([]);
  });

  it('keeps no stale known gap', () => {
    expect([
      ...getResolvedGaps(upstreamRoot, compatRoot, ROOT_KNOWN_GAPS),
      ...getResolvedGaps(upstreamServer, compatServer, SERVER_KNOWN_GAPS),
      ...getResolvedGaps(upstreamRouting, compatRouting, ROUTING_KNOWN_GAPS),
    ]).toEqual([]);
  });
});
