// @vitest-environment node
import * as upstreamCore from '@lingui/core';
import * as upstreamReact from '@lingui/react';
import {
  getExportDifferences,
  getMemberDifferences,
  getMemberNames,
  getResolvedGaps,
  type KnownGaps,
} from '@utils/compat-api-parity';
import { describe, expect, it, vi } from 'vitest';
import * as compat from './index';

vi.mock('@intlayer/dictionaries-entry', () => ({
  getDictionaries: () => ({}),
}));

/** `@lingui/core` exports the compat deliberately does not provide. */
const CORE_KNOWN_GAPS: KnownGaps = {};

/** `@lingui/react` exports the compat deliberately does not provide. */
const REACT_KNOWN_GAPS: KnownGaps = {};

/** `I18n` instance members the compat deliberately does not provide. */
const I18N_KNOWN_GAPS: KnownGaps = {};

describe('@intlayer/lingui API parity', () => {
  it('exposes every @lingui/core export', () => {
    expect(getExportDifferences(upstreamCore, compat, CORE_KNOWN_GAPS)).toEqual(
      []
    );
  });

  it('exposes every @lingui/react export', () => {
    expect(
      getExportDifferences(upstreamReact, compat, REACT_KNOWN_GAPS)
    ).toEqual([]);
  });

  it('gives setupI18n() instances every upstream I18n member', () => {
    expect(
      getMemberDifferences(
        upstreamCore.setupI18n({ locale: 'en' }),
        compat.setupI18n({ locale: 'en' }),
        I18N_KNOWN_GAPS
      )
    ).toEqual([]);
  });

  it('gives the i18n singleton every upstream I18n member', () => {
    expect(
      getMemberDifferences(upstreamCore.i18n, compat.i18n, I18N_KNOWN_GAPS)
    ).toEqual([]);
  });

  it('keeps no stale known gap', () => {
    expect([
      ...getResolvedGaps(upstreamCore, compat, CORE_KNOWN_GAPS),
      ...getResolvedGaps(upstreamReact, compat, REACT_KNOWN_GAPS),
      ...getResolvedGaps(
        upstreamCore.i18n,
        compat.i18n,
        I18N_KNOWN_GAPS,
        getMemberNames
      ),
    ]).toEqual([]);
  });
});
