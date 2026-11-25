// @vitest-environment node
// Upstream injectables are partially compiled: load the JIT compiler first.
import '@angular/compiler';
import * as upstream from '@ngx-translate/core';
import {
  getExportDifferences,
  getResolvedGaps,
  type KnownGaps,
} from '@utils/compat-api-parity';
import { describe, expect, it } from 'vitest';
import * as compat from './index';

/** `@ngx-translate/core` exports the compat does not match yet, and why. */
const KNOWN_GAPS: KnownGaps = {
  TranslateSlotDirective: 'Rich translation slots are not implemented yet.',
  TranslateSlotsComponent: 'Rich translation slots are not implemented yet.',
};

/**
 * Class members are compared at the type level only: Angular classes keep
 * TypeScript-private methods without a `_` prefix, which runtime reflection
 * cannot tell apart from public ones.
 */
describe('ngx-translate compat API parity', () => {
  it('exposes every @ngx-translate/core export', () => {
    expect(getExportDifferences(upstream, compat, KNOWN_GAPS)).toEqual([]);
  });

  it('keeps no stale known gap', () => {
    expect([...getResolvedGaps(upstream, compat, KNOWN_GAPS)]).toEqual([]);
  });
});
