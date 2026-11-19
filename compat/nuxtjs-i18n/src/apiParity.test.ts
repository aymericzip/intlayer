import * as upstream from '@nuxtjs/i18n';
// @vitest-environment node
import {
  getExportDifferences,
  getResolvedGaps,
  type KnownGaps,
} from '@utils/compat-api-parity';
import { describe, expect, it } from 'vitest';
import * as compat from './index';

/** `@nuxtjs/i18n` exports the compat does not match yet, and why. */
const KNOWN_GAPS: KnownGaps = {};

describe('nuxtjs-i18n compat API parity', () => {
  it('exposes every @nuxtjs/i18n export', () => {
    expect(getExportDifferences(upstream, compat, KNOWN_GAPS)).toEqual([]);
  });

  it('keeps no stale known gap', () => {
    expect([...getResolvedGaps(upstream, compat, KNOWN_GAPS)]).toEqual([]);
  });
});
