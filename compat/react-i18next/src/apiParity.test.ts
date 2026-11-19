// @vitest-environment node
import {
  getExportDifferences,
  getResolvedGaps,
  type KnownGaps,
} from '@utils/compat-api-parity';
import * as upstream from 'react-i18next';
import { describe, expect, it } from 'vitest';
import * as compat from './index';

/** `react-i18next` exports the compat does not match yet, and why. */
const KNOWN_GAPS: KnownGaps = {};

describe('react-i18next compat API parity', () => {
  it('exposes every react-i18next export', () => {
    expect(getExportDifferences(upstream, compat, KNOWN_GAPS)).toEqual([]);
  });

  it('keeps no stale known gap', () => {
    expect([...getResolvedGaps(upstream, compat, KNOWN_GAPS)]).toEqual([]);
  });
});
