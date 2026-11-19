// @vitest-environment node
import {
  getExportDifferences,
  getResolvedGaps,
  type KnownGaps,
} from '@utils/compat-api-parity';
import * as upstream from 'svelte-i18n';
import { writable } from 'svelte/store';
import { describe, expect, it, vi } from 'vitest';
import * as compat from './index';

vi.mock('svelte-intlayer', () => {
  const store = writable({ locale: 'en' });
  return {
    intlayerStore: {
      subscribe: store.subscribe,
      setLocale: (locale: string) => store.set({ locale }),
    },
  };
});

/** `svelte-i18n` exports the compat does not match yet, and why. */
const KNOWN_GAPS: KnownGaps = {};

describe('svelte-i18n compat API parity', () => {
  it('exposes every svelte-i18n export', () => {
    expect(getExportDifferences(upstream, compat, KNOWN_GAPS)).toEqual([]);
  });

  it('keeps no stale known gap', () => {
    expect([...getResolvedGaps(upstream, compat, KNOWN_GAPS)]).toEqual([]);
  });
});
