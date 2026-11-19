// @vitest-environment node
import {
  getExportDifferences,
  getMemberDifferences,
  getMemberNames,
  getResolvedGaps,
  type KnownGaps,
} from '@utils/compat-api-parity';
import * as upstream from 'i18next';
import { describe, expect, it } from 'vitest';
import * as compat from './index';

/** `i18next` exports the compat does not match yet, and why. */
const KNOWN_GAPS: KnownGaps = {
  isSafeLanguageCode: 'Not implemented by the compat yet.',
};

/** Instance members the compat does not match yet, and why. */
const INSTANCE_KNOWN_GAPS: KnownGaps = {
  hydrate: 'Not implemented by the compat yet.',
  logger: 'Internal i18next logger; intlayer logs through its own logger.',
  observers:
    'Internal event-emitter storage; events go through on()/off()/emit().',
  setResolvedLanguage: 'Not implemented by the compat yet.',
  userOptions:
    'Raw init() options; the compat keeps only the resolved `options`.',
};

describe('i18next compat API parity', () => {
  it('exposes every i18next export', () => {
    expect(getExportDifferences(upstream, compat, KNOWN_GAPS)).toEqual([]);
  });

  it('gives createInstance() every upstream i18n member', () => {
    expect(
      getMemberDifferences(
        upstream.default.createInstance(),
        compat.createInstance() as object,
        INSTANCE_KNOWN_GAPS
      )
    ).toEqual([]);
  });

  it('keeps no stale known gap', () => {
    expect([
      ...getResolvedGaps(upstream, compat, KNOWN_GAPS),
      ...getResolvedGaps(
        upstream.default.createInstance(),
        compat.createInstance() as object,
        INSTANCE_KNOWN_GAPS,
        getMemberNames
      ),
    ]).toEqual([]);
  });
});
