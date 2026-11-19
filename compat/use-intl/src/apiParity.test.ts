// @vitest-environment node
import {
  getExportDifferences,
  getResolvedGaps,
  type KnownGaps,
} from '@utils/compat-api-parity';
import * as upstreamRoot from 'use-intl';
import * as upstreamCore from 'use-intl/core';
import * as upstreamReact from 'use-intl/react';
import { describe, expect, it } from 'vitest';
import * as compatReact from './client/index';
import * as compatCore from './core/index';
import * as compatRoot from './index';

/** `use-intl` exports the compat does not match yet, and why. */
const ROOT_KNOWN_GAPS: KnownGaps = {};

/** `use-intl/core` exports the compat does not match yet, and why. */
const CORE_KNOWN_GAPS: KnownGaps = {};

/** `use-intl/react` exports the compat does not match yet, and why. */
const REACT_KNOWN_GAPS: KnownGaps = {};

describe('use-intl compat API parity', () => {
  it('exposes every use-intl export', () => {
    expect(
      getExportDifferences(upstreamRoot, compatRoot, ROOT_KNOWN_GAPS)
    ).toEqual([]);
  });

  it('exposes every use-intl/core export', () => {
    expect(
      getExportDifferences(upstreamCore, compatCore, CORE_KNOWN_GAPS)
    ).toEqual([]);
  });

  it('exposes every use-intl/react export', () => {
    expect(
      getExportDifferences(upstreamReact, compatReact, REACT_KNOWN_GAPS)
    ).toEqual([]);
  });

  it('keeps no stale known gap', () => {
    expect([
      ...getResolvedGaps(upstreamRoot, compatRoot, ROOT_KNOWN_GAPS),
      ...getResolvedGaps(upstreamCore, compatCore, CORE_KNOWN_GAPS),
      ...getResolvedGaps(upstreamReact, compatReact, REACT_KNOWN_GAPS),
    ]).toEqual([]);
  });
});
